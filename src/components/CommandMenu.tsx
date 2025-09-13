"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Info } from "@/data/content";

type Item = { id: string; label: string; action: () => void; group: string };

function pdfResponse(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes], { type: 'application/pdf' });
  return new Response(blob, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}

export function CommandMenu({
  isDark,
  info,
  onToggleTheme,
  onToggleLang,
}: {
  isDark: boolean;
  info: Info;
  onToggleTheme: () => void;
  onToggleLang: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const [isMac, setIsMac] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.platform));
  }, []);

  // Build items
  const items = useMemo<Item[]>(() => {
    const go = (hash: string) => () => {
      setOpen(false);
      document
        .querySelector(hash)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const base: Item[] = [
      {
        id: "goto-top",
        label: "Go to: Top",
        group: "Navigate",
        action: go("#top"),
      },
      {
        id: "goto-skills",
        label: "Go to: Skills",
        group: "Navigate",
        action: go("#skills"),
      },
      {
        id: "goto-education",
        label: "Go to: Education",
        group: "Navigate",
        action: go("#education"),
      },
      {
        id: "goto-experience",
        label: "Go to: Experience",
        group: "Navigate",
        action: go("#experience"),
      },
      {
        id: "goto-projects",
        label: "Go to: Projects",
        group: "Navigate",
        action: go("#projects"),
      },
      {
        id: "goto-contact",
        label: "Go to: Contact",
        group: "Navigate",
        action: go("#contact"),
      },
      {
        id: "toggle-theme",
        label: "Toggle theme",
        group: "Actions",
        action: () => {
          onToggleTheme();
          setOpen(false);
        },
      },
      {
        id: "toggle-lang",
        label: "Toggle language",
        group: "Actions",
        action: () => {
          onToggleLang();
          setOpen(false);
        },
      },
    ];

    const links: Item[] = [
      info.github && {
        id: "open-github",
        label: "Open GitHub",
        group: "Links",
        action: () => {
          window.open(info.github!, "_blank", "noopener");
          setOpen(false);
        },
      },
    ].filter(Boolean) as Item[];

    const proj: Item[] = info.projects.map((p, i) => ({
      id: `proj-${i}`,
      label: `Project: ${p.name}`,
      group: "Projects",
      action: () => {
        setOpen(false);
        document
          .querySelector("#projects")
          ?.scrollIntoView({ behavior: "smooth" });
      },
    }));

    return [...base, ...links, ...proj];
  }, [info, onToggleLang, onToggleTheme]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((it) => it.label.toLowerCase().includes(s));
  }, [items, q]);

  // Hotkeys: ⌘K (mac) OR Ctrl+/ (win/linux) OR Ctrl+Shift+P (fallback)
  useEffect(() => {
    const isOpenKey = (e: KeyboardEvent) =>
      (isMac && e.metaKey && e.key.toLowerCase() === "k") ||
      (!isMac && e.ctrlKey && e.key === "/") ||
      (!isMac && e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "p");

    const onKey = (e: KeyboardEvent) => {
      if (isOpenKey(e)) {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIdx((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setIdx((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        filtered[idx]?.action();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered, idx, open, isMac]);

  useEffect(() => {
    if (!open) return;
    setIdx(0);
    setQ("");
    const id = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(id);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setOpen(false)}
      />
      <div className="mx-auto mt-24 w-full max-w-xl px-4">
        <div
          className={`overflow-hidden rounded-2xl ring-1 ${
            isDark ? "ring-zinc-700 bg-zinc-900" : "ring-zinc-200 bg-white"
          }`}
        >
          <div
            className={`border-b ${
              isDark ? "border-zinc-800" : "border-zinc-100"
            } p-3`}
          >
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search commands, sections, projects…"
              aria-label="Command search"
              className={`w-full bg-transparent outline-none ${
                isDark
                  ? "text-zinc-100 placeholder:text-zinc-500"
                  : "text-zinc-900 placeholder:text-zinc-400"
              }`}
            />
          </div>
          <ul className="max-h-[50vh] overflow-auto py-2">
            {filtered.length === 0 && (
              <li
                className={`px-4 py-3 text-sm ${
                  isDark ? "text-zinc-500" : "text-zinc-500"
                }`}
              >
                No results
              </li>
            )}
            {filtered.map((it, i) => (
              <li key={it.id}>
                <button
                  className={`w-full text-left px-4 py-2.5 text-sm ${
                    i === idx ? (isDark ? "bg-zinc-800" : "bg-zinc-100") : ""
                  } ${isDark ? "text-zinc-100" : "text-zinc-900"}`}
                  onMouseEnter={() => setIdx(i)}
                  onClick={it.action}
                >
                  <span
                    className={`mr-2 rounded px-1.5 py-0.5 text-[10px] ${
                      isDark
                        ? "bg-zinc-800 text-zinc-300"
                        : "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    {it.group}
                  </span>
                  {it.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`mt-2 text-center text-xs ${
            isDark ? "text-zinc-400" : "text-zinc-500"
          }`}
        >
          {isMac
            ? "Shortcut: ⌘K"
            : "Shortcuts: Ctrl+/  or  Ctrl+Shift+P  •  Esc to close"}
        </div>
      </div>
    </div>
  );
}
