import { NextResponse } from 'next/server';
import { getStore } from '@/lib/store';
import { requireRole } from '@/lib/auth';
import { randomUUID } from 'crypto';

export async function GET() {
  return NextResponse.json({ cities: getStore().cities });
}

export async function POST(request: Request) {
  await requireRole('admin');
  const payload = await request.json();
  const store = getStore();
  const id = payload.slug ?? `city-${randomUUID()}`;
  store.cities.push({
    id,
    name: payload.name,
    slug: payload.slug ?? payload.name.toLowerCase().replace(/\s+/g, '-'),
    country: payload.country ?? 'Morocco',
    heroImage: payload.heroImage ?? '/logos/placeholder.png',
    description: payload.description ?? 'New city'
  });
  return NextResponse.json({ ok: true });
}
