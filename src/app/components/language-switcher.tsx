"use client";

import { useTransition } from "react";
import { setUserLocale } from "../../infrastructure/i18n/language-action";

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (locale: string) => {
    startTransition(() => {
      setUserLocale(locale);
      window.location.reload();
    });
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        disabled={isPending}
        onClick={() => handleLanguageChange("vi")}
        className="px-2 py-1 text-sm bg-orange-500 text-white border rounded hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-orange-500"
      >
        VI
      </button>
      <button
        disabled={isPending}
        onClick={() => handleLanguageChange("en")}
        className="px-2 py-1 text-sm bg-orange-500 text-white border rounded hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-orange-500"
      >
        EN
      </button>
    </div>
  );
}
