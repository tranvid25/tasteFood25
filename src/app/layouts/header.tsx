import Link from "next/link";
import { ModeToggle } from "../components/mode-toggle";
import { LanguageSwitcher } from "../components/language-switcher";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations('Header');

  return (
    <div className="flex flex-col gap-4 p-4">
      <ul className="flex gap-4">
        <li>
          <Link href="/">{t('home')}</Link>
        </li>
        <li>
          <Link href="/login">{t('login')}</Link>
        </li>
        <li>
          <Link href="/register">{t('register')}</Link>
        </li>
      </ul>
      <div className="flex gap-4 items-center">
        <ModeToggle/>
        <LanguageSwitcher />
      </div>
    </div>
  );
}
