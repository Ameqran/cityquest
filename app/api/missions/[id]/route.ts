import { NextResponse } from 'next/server';
import { getStore } from '@/lib/store';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const mission = getStore().missions.find((m) => m.id === params.id);
  if (!mission) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ mission });
}
