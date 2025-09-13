"use client";
import React from "react";
import { motion } from "framer-motion";
import { Eye, ExternalLink, Github } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Project, UIStrings } from "@/data/content";

export function ProjectsSection({
  projects,
  t,
  isDark,
  onOpenLightbox,
}: {
  projects: Project[];
  t: UIStrings;
  isDark: boolean;
  onOpenLightbox: (images: string[], index: number) => void;
}) {
  const ext = { target: "_blank", rel: "noopener noreferrer" as const };
  return (
    <section className="mx-auto max-w-6xl px-6 py-10" id="projects">
      <SectionTitle>{t.projects}</SectionTitle>
      <p className={`mt-2 ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
        {t.projectsNote}
      </p>

      {/* 2x2 on md+ to align four items nicely */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, idx) => (
          <motion.article
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className={`group rounded-2xl ring-1 p-4 shadow-sm hover:shadow-md transition ${
              isDark
                ? "ring-zinc-800 bg-zinc-900/40"
                : "ring-zinc-200 bg-zinc-50/40"
            } h-full flex flex-col`}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <span
                className={`text-xs rounded-full ring-1 px-2 py-0.5 ${
                  isDark
                    ? "ring-zinc-700 text-zinc-200 bg-zinc-900/60"
                    : "ring-zinc-300 text-zinc-700 bg-zinc-50/60"
                }`}
              >
                {p.role}
              </span>
            </div>

            <p className={`mt-2 ${isDark ? "text-zinc-200" : "text-zinc-800"}`}>
              {p.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className={`rounded-full ring-1 px-2 py-0.5 ${
                    isDark
                      ? "ring-zinc-700 text-zinc-200 bg-zinc-900/60"
                      : "ring-zinc-300 text-zinc-700 bg-zinc-50/60"
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex-1" />

            {/* fixed gallery height for uniform layout */}
            <div className="mt-4 min-h-[96px]">
              <div className="grid grid-cols-3 gap-2">
                {p.screenshots.map((src, i) => (
                  <button
                    key={i}
                    className={`relative overflow-hidden rounded-xl ring-1 ${
                      isDark ? "ring-zinc-800" : "ring-zinc-200"
                    }`}
                    onClick={() => onOpenLightbox(p.screenshots, i)}
                    aria-label={`Open screenshot ${i + 1}`}
                  >
                    <img
                      src={src}
                      alt={`${p.name} screenshot ${i + 1}`}
                      className="h-24 w-full object-cover transition group-hover:scale-[1.02]"
                    />
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <Eye className="h-5 w-5 text-white drop-shadow" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 text-sm">
              {p.live && p.live !== "(private)" && (
                <a
                  className="inline-flex items-center gap-1 underline underline-offset-2 hover:opacity-90"
                  href={p.live}
                  {...ext}
                >
                  <ExternalLink className="h-4 w-4" /> {t.live}
                </a>
              )}
              {p.repo && p.repo !== "(private)" && (
                <a
                  className="inline-flex items-center gap-1 underline underline-offset-2 hover:opacity-90"
                  href={p.repo}
                  {...ext}
                >
                  <Github className="h-4 w-4" /> {t.repo}
                </a>
              )}
              {p.live === "(private)" && (
                <span
                  className={`${isDark ? "text-zinc-400" : "text-zinc-500"}`}
                >
                  {t.live} ({t.private})
                </span>
              )}
              {p.repo === "(private)" && (
                <span
                  className={`${isDark ? "text-zinc-400" : "text-zinc-500"}`}
                >
                  {t.repo} ({t.private})
                </span>
              )}
              <span className={`${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                Demo can be requested.
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
