import { NextResponse } from 'next/server';
import { getStore } from '@/lib/store';
import { requireRole } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await requireRole('admin');
  const payload = await request.json();
  const store = getStore();
  const city = store.cities.find((c) => c.id === params.id);
  if (!city) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  Object.assign(city, payload);
  return NextResponse.json({ city });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await requireRole('admin');
  const store = getStore();
  store.cities = store.cities.filter((city) => city.id !== params.id);
  return NextResponse.json({ ok: true });
}
