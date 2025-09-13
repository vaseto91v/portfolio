'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Languages, Sun, Moon, Mail, Phone, Github, Globe, Download, ExternalLink, MapPin } from 'lucide-react';
import type { Info, UIStrings } from '@/data/content';

export function Header({
  data, t, isDark, lang, onToggleLang, onToggleTheme, mounted,
}: {
  data: Info; t: UIStrings; isDark: boolean; lang: 'en' | 'bg';
  onToggleLang: () => void; onToggleTheme: () => void; mounted: boolean;
}) {
  const [isMac, setIsMac] = useState(false);
  useEffect(() => { setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.platform)); }, []);
  const ext = { target: "_blank", rel: "noopener noreferrer" as const };
  const pdfHref = `/api/cv.pdf?lang=${lang}&theme=${isDark ? 'dark' : 'light'}`;

  return (
    <header className="relative overflow-hidden" id="top">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="flex items-center justify-between">
          <div className={`inline-flex items-center gap-2 rounded-full ring-1 px-4 py-1 text-sm shadow-sm backdrop-blur ${isDark ? "ring-zinc-800 bg-zinc-900/70 text-zinc-100" : "ring-zinc-200 bg-zinc-50/70 text-zinc-900"}`}>
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" /> {t.available}
          </div>

          <div className="no-print inline-flex items-center gap-2">
            <button onClick={onToggleLang} className={`inline-flex items-center gap-2 rounded-full ring-1 px-3 py-1 text-sm shadow-sm hover:shadow transition ${isDark ? "ring-zinc-800 bg-zinc-900/80 text-zinc-100" : "ring-zinc-200 bg-zinc-50/80 text-zinc-900"}`} aria-label="Toggle language" title={t.langToggle}>
              <Languages className="h-4 w-4" /> {lang === "en" ? "BG" : "EN"}
            </button>
            {mounted && (
              <button onClick={onToggleTheme} className={`inline-flex items-center gap-2 rounded-full ring-1 px-3 py-1 text-sm shadow-sm hover:shadow transition ${isDark ? "ring-zinc-800 bg-zinc-900/80 text-zinc-100" : "ring-zinc-200 bg-zinc-50/80 text-zinc-900"}`} aria-label="Toggle dark mode" aria-pressed={isDark} title="Dark Mode">
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {isDark ? "Light" : "Dark"}
              </button>
            )}
          </div>
        </div>

        <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight">{data.name}</h1>
        <p className={`mt-2 text-xl md:text-2xl ${isDark ? "text-zinc-200" : "text-zinc-700"}`}>{data.tag}</p>
        <p className={`mt-4 max-w-3xl ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>{data.summary}</p>

        <div className={`mt-6 flex flex-wrap items-center gap-3 text-sm ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
          <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {data.location}</span>
          <a className="inline-flex items-center gap-1 underline underline-offset-2 hover:opacity-90" href={`mailto:${data.email}`}><Mail className="h-4 w-4" /> {data.email}</a>
          <a className="inline-flex items-center gap-1 underline underline-offset-2 hover:opacity-90" href={`tel:${data.phone}`}><Phone className="h-4 w-4" /> {data.phone}</a>
          {data.github && (<a className="inline-flex items-center gap-1 underline underline-offset-2 hover:opacity-90" href={data.github} {...ext}><Github className="h-4 w-4" /> GitHub</a>)}
          {data.website && (<a className="inline-flex items-center gap-1 underline underline-offset-2 hover:opacity-90" href={data.website} {...ext}><Globe className="h-4 w-4" /> Website</a>)}
        </div>

        <div className="mt-8 flex flex-wrap gap-3 items-center">
          {/* Download real PDF (server-generated) */}
          <a
            href={pdfHref}
            className={`inline-flex items-center gap-2 rounded-2xl ring-1 px-4 py-2 text-sm font-medium shadow-sm hover:shadow transition ${
              isDark ? "ring-zinc-700 bg-zinc-900/80 text-zinc-100" : "ring-zinc-300 bg-zinc-50/80 text-zinc-900"
            }`}
          >
            <Download className="h-4 w-4" /> {t.download}
          </a>

          {data.github && (
            <a href={data.github} {...ext} className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium shadow-sm hover:shadow transition ring-1 ${isDark ? "ring-zinc-700 bg-zinc-100 text-zinc-900" : "ring-zinc-900 bg-zinc-900 text-white"}`}>
              <ExternalLink className="h-4 w-4" /> {t.viewGithub}
            </a>
          )}

          <span className={`ml-auto hidden md:inline-flex items-center gap-2 text-xs ${isDark ? "text-zinc-400" : "text-zinc-500"}`} />
        </div>
      </motion.div>

      <div className={`pointer-events-none absolute -top-24 right-0 -z-10 h-72 w-72 rounded-full blur-3xl ${isDark ? "bg-emerald-900/30" : "bg-emerald-200/40"}`} />
      <div className={`pointer-events-none absolute -bottom-24 left-0 -z-10 h-72 w-72 rounded-full blur-3xl ${isDark ? "bg-indigo-900/30" : "bg-indigo-200/40"}`} />
    </header>
  );
}
