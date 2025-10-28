import { NextResponse } from 'next/server';
import { getStore } from '@/lib/store';
import { requireRole } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await requireRole('admin');
  const payload = await request.json();
  const season = getStore().seasons.find((s) => s.id === params.id);
  if (!season) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  Object.assign(season, payload);
  return NextResponse.json({ season });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await requireRole('admin');
  const store = getStore();
  store.seasons = store.seasons.filter((s) => s.id !== params.id);
  return NextResponse.json({ ok: true });
}
