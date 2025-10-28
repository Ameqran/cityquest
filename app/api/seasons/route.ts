import { NextResponse } from 'next/server';
import { getStore } from '@/lib/store';
import { requireRole } from '@/lib/auth';
import { randomUUID } from 'crypto';

export async function GET() {
  return NextResponse.json({ seasons: getStore().seasons });
}

export async function POST(request: Request) {
  await requireRole('admin');
  const payload = await request.json();
  const store = getStore();
  store.seasons.push({
    id: `season-${randomUUID()}`,
    name: payload.name,
    slug: payload.slug ?? payload.name.toLowerCase().replace(/\s+/g, '-'),
    startAt: new Date(payload.startAt ?? new Date()),
    endAt: new Date(payload.endAt ?? new Date()),
    description: payload.description ?? '',
    cityId: payload.cityId
  });
  return NextResponse.json({ ok: true });
}
