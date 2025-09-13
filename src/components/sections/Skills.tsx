"use client";
import React from "react";
import type { UIStrings } from "@/data/content";
import { Badge } from "@/components/ui/Badge";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function SkillsSection({
  skills,
  t,
  isDark,
}: {
  skills: string[];
  t: UIStrings;
  isDark: boolean;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10" id="skills">
      <SectionTitle>{t.coreSkills}</SectionTitle>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((s) => (
          <Badge key={s} isDark={isDark}>
            {s}
          </Badge>
        ))}
      </div>
    </section>
  );
}
