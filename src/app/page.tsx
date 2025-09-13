"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { Header } from "@/components/Header";
import { SkillsSection } from "@/components/sections/Skills";
import { EducationSection } from "@/components/sections/Education";
import { ExperienceSection } from "@/components/sections/Experience";
import { ProjectsSection } from "@/components/sections/Projects";
import { Footer } from "@/components/Footer";
import { Lightbox } from "@/components/ui/Lightbox";
import { CommandMenu } from "@/components/CommandMenu";
import { getInfo, UI } from "@/data/content";

export default function Page() {
  const [lang, setLang] = useState<"en" | "bg">("en");
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  const data = useMemo(() => getInfo(lang), [lang]);
  const t = useMemo(() => (lang === "en" ? UI.en : UI.bg), [lang]);

  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
  } | null>(null);

  const onToggleLang = () => setLang((p) => (p === "en" ? "bg" : "en"));
  const onToggleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  return (
    <main
      id="cv-root"
      className={`min-h-screen ${
        isDark ? "bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900"
      }`}
    >
      <Header
        data={data}
        t={t}
        isDark={isDark}
        lang={lang}
        mounted={mounted}
        onToggleLang={onToggleLang}
        onToggleTheme={onToggleTheme}
      />

      <SkillsSection skills={data.skills} t={t} isDark={isDark} />
      <EducationSection education={data.education} t={t} isDark={isDark} />
      <ExperienceSection experience={data.experience} t={t} isDark={isDark} />
      <ProjectsSection
        projects={data.projects}
        t={t}
        isDark={isDark}
        onOpenLightbox={(images, index) => setLightbox({ images, index })}
      />

      <Footer data={data} t={t} isDark={isDark} />
      <CommandMenu
        isDark={isDark}
        info={data}
        onToggleTheme={onToggleTheme}
        onToggleLang={onToggleLang}
      />
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </main>
  );
}
