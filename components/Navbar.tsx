import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { Button } from './ui/button';
import { getTranslations } from 'next-intl/server';
import { ToastViewport } from './ToastViewport';
import { MapPin } from 'lucide-react';

export async function Navbar({ locale }: { locale: string }) {
  const user = await getCurrentUser();
  const t = await getTranslations('navbar');

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/80 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="flex items-center gap-2 text-xl font-semibold text-slate-900 transition hover:text-purple-600">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg">
            <MapPin className="h-4 w-4" />
          </span>
          <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 bg-clip-text text-transparent">
            CityQuest
          </span>
        </Link>
        <nav className="hidden items-center space-x-6 text-sm font-semibold md:flex">
          <Link href={`/${locale}/missions`} className="text-slate-600 transition hover:text-purple-600">
            {t('missions')}
          </Link>
          <Link href={`/${locale}/rewards`} className="text-slate-600 transition hover:text-purple-600">
            {t('rewards')}
          </Link>
          <Link href={`/${locale}/leaderboard`} className="text-slate-600 transition hover:text-purple-600">
            {t('leaderboard')}
          </Link>
          {user ? (
            <Link href={`/${locale}/profile`} className="text-slate-600 transition hover:text-purple-600">
              {t('profile')}
            </Link>
          ) : null}
          {user?.role === 'business' ? (
            <Link href={`/${locale}/business/dashboard`} className="text-slate-600 transition hover:text-purple-600">
              {t('business')}
            </Link>
          ) : null}
          {user?.role === 'admin' ? (
            <Link href={`/${locale}/admin/dashboard`} className="text-slate-600 transition hover:text-purple-600">
              {t('admin')}
            </Link>
          ) : null}
        </nav>
        <div className="flex items-center space-x-3">
          {user ? (
            <form action={`/${locale}/logout`}>
              <Button
                variant="outline"
                type="submit"
                className="border-transparent bg-white/70 text-purple-600 shadow-sm transition hover:bg-white hover:text-purple-700"
              >
                {t('logout')}
              </Button>
            </form>
          ) : (
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 text-white shadow-lg transition hover:shadow-xl"
            >
              <Link href={`/${locale}/login`}>{t('login')}</Link>
            </Button>
          )}
        </div>
      </div>
      <ToastViewport />
    </header>
  );
}
