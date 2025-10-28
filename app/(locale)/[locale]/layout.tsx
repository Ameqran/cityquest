import { ReactNode } from 'react';
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
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-background">
        {/* @ts-expect-error Async Server Component */}
        <Navbar locale={locale} />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </div>
    </NextIntlClientProvider>
  );
}
