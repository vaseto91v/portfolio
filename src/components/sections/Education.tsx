"use client";
import React from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Education, UIStrings } from "@/data/content";

export function EducationSection({
  education,
  t,
  isDark,
}: {
  education: Education[];
  t: UIStrings;
  isDark: boolean;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10" id="education">
      <SectionTitle>{t.education}</SectionTitle>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {education.map((e, idx) => (
          <div
            key={idx}
            className={`rounded-2xl ring-1 p-4 shadow-sm ${
              isDark
                ? "ring-zinc-800 bg-zinc-900/40"
                : "ring-zinc-200 bg-zinc-50/40"
            }`}
          >
            <div className="font-semibold">{e.school}</div>
            <div className={`${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
              {e.program}
            </div>
            <div
              className={`text-sm ${
                isDark ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              {e.dates}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
