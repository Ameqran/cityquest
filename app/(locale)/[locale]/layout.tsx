import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { locales } from '@/lib/i18n';
import { Navbar } from '@/components/Navbar';

export default function LocaleLayout({ children, params }: { children: ReactNode; params: { locale: string } }) {
  const { locale } = params;
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }
  const messages = useMessages();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50/60 to-pink-50">
        <div className="pointer-events-none absolute inset-x-0 top-[-18rem] h-[32rem] bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.28),_transparent_55%)]" />
        <div className="pointer-events-none absolute inset-y-0 left-[-20rem] w-[36rem] rotate-12 bg-[radial-gradient(circle,_rgba(59,130,246,0.18),_transparent_65%)]" />
        <div className="pointer-events-none absolute inset-y-0 right-[-22rem] w-[40rem] -rotate-12 bg-[radial-gradient(circle,_rgba(244,114,182,0.18),_transparent_65%)]" />
        <Navbar locale={locale} />
        <main className="relative z-10 mx-auto w-full max-w-7xl px-6 py-10 md:px-8 lg:px-10">{children}</main>
        <div className="pointer-events-none absolute inset-x-0 bottom-[-24rem] h-[28rem] bg-[radial-gradient(circle_at_bottom,_rgba(59,130,246,0.16),_transparent_60%)]" />
      </div>
    </NextIntlClientProvider>
  );
}
