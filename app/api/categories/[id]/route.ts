import { NextResponse } from 'next/server';
import { getStore } from '@/lib/store';
import { requireRole } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await requireRole('admin');
  const payload = await request.json();
  const category = getStore().categories.find((c) => c.id === params.id);
  if (!category) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  Object.assign(category, payload);
  return NextResponse.json({ category });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await requireRole('admin');
  const store = getStore();
  store.categories = store.categories.filter((category) => category.id !== params.id);
  return NextResponse.json({ ok: true });
}
