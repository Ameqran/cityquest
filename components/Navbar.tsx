import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { CityPicker } from './CityPicker';
import { Button } from './ui/button';
import { getTranslations } from 'next-intl/server';
import { ToastViewport } from './ToastViewport';
import { getStore } from '@/lib/store';

export async function Navbar({ locale }: { locale: string }) {
  const user = await getCurrentUser();
  const t = await getTranslations('navbar');
  const cities = getStore().cities.map((city) => ({ slug: city.slug, name: city.name }));

  return (
    <header className="border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={`/${locale}`} className="text-xl font-semibold">
          CityQuests
        </Link>
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          <Link href={`/${locale}/missions`} className="hover:text-primary">
            {t('missions')}
          </Link>
          <Link href={`/${locale}/rewards`} className="hover:text-primary">
            {t('rewards')}
          </Link>
          <Link href={`/${locale}/leaderboard`} className="hover:text-primary">
            {t('leaderboard')}
          </Link>
          {user ? (
            <Link href={`/${locale}/profile`} className="hover:text-primary">
              {t('profile')}
            </Link>
          ) : null}
          {user?.role === 'business' ? (
            <Link href={`/${locale}/business/dashboard`} className="hover:text-primary">
              {t('business')}
            </Link>
          ) : null}
          {user?.role === 'admin' ? (
            <Link href={`/${locale}/admin/dashboard`} className="hover:text-primary">
              {t('admin')}
            </Link>
          ) : null}
        </nav>
        <div className="flex items-center space-x-4">
          <CityPicker locale={locale} cities={cities} />
          {user ? (
            <form action={`/${locale}/logout`}>
              <Button variant="outline" type="submit">
                {t('logout')}
              </Button>
            </form>
          ) : (
            <Button asChild>
              <Link href={`/${locale}/login`}>{t('login')}</Link>
            </Button>
          )}
        </div>
      </div>
      <ToastViewport />
    </header>
  );
}
