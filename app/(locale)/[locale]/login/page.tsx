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
    <div className="mx-auto max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-sm">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </div>
  );
}
