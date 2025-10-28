'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToastStore } from '@/lib/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('tourist@demo.app');
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const locale = pathname?.split('/').filter(Boolean)[0] ?? 'en';
  const addToast = useToastStore((state) => state.addToast);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (response.ok) {
      addToast({ title: 'Welcome back' });
      const next = params.get('next') ?? `/${locale}`;
      router.push(next);
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 rounded-3xl border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur">
      <div className="space-y-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-600">Welcome back</p>
        <h1 className="text-3xl font-semibold text-slate-900">Sign in to CityQuest</h1>
        <p className="text-sm text-slate-600">Use one of the demo accounts or your own email to continue exploring.</p>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            placeholder="you@example.com"
          />
        </div>
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
      <div className="rounded-2xl border border-white/60 bg-white/70 p-4 text-xs text-slate-500">
        Try `tourist@demo.app`, `biz@demo.app`, or `admin@demo.app` to jump into different roles instantly.
      </div>
    </div>
  );
}
