"use client";
import React from "react";
import { Mail, Phone, Github } from "lucide-react";
import type { Info, UIStrings } from "@/data/content";

export function Footer({
  data,
  t,
  isDark,
}: {
  data: Info;
  t: UIStrings;
  isDark: boolean;
}) {
  const ext = { target: "_blank", rel: "noopener noreferrer" as const };

  return (
    <footer className="mx-auto max-w-6xl px-6 pb-16" id="contact">
      <div
        className={`rounded-3xl ring-1 p-6 md:p-8 shadow-sm ${
          isDark
            ? "ring-zinc-800 bg-zinc-900/40"
            : "ring-zinc-200 bg-zinc-50/40"
        }`}
      >
        {/* strictly aligned block on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-8 items-center">
          <div className="space-y-1">
            <h3 className="text-lg md:text-xl font-semibold">
              {t.letsTalkTitle}
            </h3>
            <p className={`${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
              {t.letsTalkText}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-start md:justify-end gap-3 text-sm">
            <a
              className={`inline-flex items-center gap-2 rounded-2xl ring-1 px-4 py-2 shadow-sm ${
                isDark
                  ? "ring-zinc-700 bg-zinc-900/80 text-zinc-100"
                  : "ring-zinc-300 bg-zinc-50/80 text-zinc-900"
              }`}
              href={`mailto:${data.email}`}
            >
              <Mail className="h-4 w-4" /> {data.email}
            </a>
            <a
              className={`inline-flex items-center gap-2 rounded-2xl ring-1 px-4 py-2 shadow-sm ${
                isDark
                  ? "ring-zinc-700 bg-zinc-900/80 text-zinc-100"
                  : "ring-zinc-300 bg-zinc-50/80 text-zinc-900"
              }`}
              href={`tel:${data.phone}`}
            >
              <Phone className="h-4 w-4" /> {data.phone}
            </a>
            {data.github && (
              <a
                className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 shadow-sm ring-1 ${
                  isDark
                    ? "ring-zinc-700 bg-zinc-100 text-zinc-900"
                    : "ring-zinc-900 bg-zinc-900 text-white"
                }`}
                href={data.github}
                {...ext}
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      <p
        className={`mt-6 text-center text-xs ${
          isDark ? "text-zinc-400" : "text-zinc-500"
        }`}
      >
        {t.footerNote(data.name)}
      </p>
    </footer>
  );
}
