import { NextResponse } from 'next/server';
import { getStore } from '@/lib/store';
import { requireRole } from '@/lib/auth';
import { randomUUID } from 'crypto';

export async function GET() {
  return NextResponse.json({ categories: getStore().categories });
}

export async function POST(request: Request) {
  await requireRole('admin');
  const payload = await request.json();
  const store = getStore();
  store.categories.push({
    id: `cat-${randomUUID()}`,
    slug: payload.slug ?? payload.name.toLowerCase().replace(/\s+/g, '-'),
    name: payload.name,
    icon: payload.icon ?? 'Star',
    color: payload.color ?? 'bg-slate-500'
  });
  return NextResponse.json({ ok: true });
}
