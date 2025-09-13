"use client";
import React from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Experience, UIStrings } from "@/data/content";

export function ExperienceSection({
  experience,
  t,
  isDark,
}: {
  experience: Experience[];
  t: UIStrings;
  isDark: boolean;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10" id="experience">
      <SectionTitle>{t.experience}</SectionTitle>
      <ol
        className={`relative mt-6 border-l ${
          isDark ? "border-zinc-800" : "border-zinc-200"
        }`}
      >
        {experience.map((job, idx) => (
          <li key={idx} className="ml-6 mb-8">
            <span
              className={`absolute -left-1.5 mt-1 h-3 w-3 rounded-full border ${
                isDark
                  ? "border-zinc-900 bg-zinc-600"
                  : "border-zinc-100 bg-zinc-300"
              }`}
            />
            <div
              className={`rounded-2xl ring-1 p-4 shadow-sm ${
                isDark
                  ? "ring-zinc-800 bg-zinc-900/40"
                  : "ring-zinc-200 bg-zinc-50/40"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
                <h3 className="font-semibold text-lg">
                  {job.title} — {job.company}
                </h3>
                <div
                  className={`text-sm ${
                    isDark ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  {job.start}–{job.end} • {job.location}
                </div>
              </div>
              <ul
                className={`mt-2 list-disc pl-5 ${
                  isDark ? "text-zinc-200" : "text-zinc-800"
                }`}
              >
                {job.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
