"use client";

import { useCallback, useEffect, useState } from "react";
import { COPY, Copy, Lang } from "./copy";

const KEY = "latil-lang";

/**
 * Language state for the redesigned pages. Spanish is the default.
 *
 * If you wire this into the existing `LanguageContext`, drop this hook and read
 * from `useLanguage()` instead: the copy shape in `copy.ts` is a plain object,
 * so it can move into `lib/translations.ts` as-is. Remember the existing context
 * defaults to "en" and `app/layout.tsx` hardcodes `lang="en"`; both must change
 * to "es" for Spanish to be the default.
 */
export function useLang(initial: Lang = "es"): { lang: Lang; setLang: (l: Lang) => void; t: Copy } {
  const [lang, setLangState] = useState<Lang>(initial);

  // Read the stored preference after mount so SSR and the first client render match.
  useEffect(() => {
    const saved = window.localStorage.getItem(KEY) as Lang | null;
    if (saved === "es" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    window.localStorage.setItem(KEY, l);
    setLangState(l);
  }, []);

  return { lang, setLang, t: (COPY[lang] ?? COPY.es) as Copy };
}
