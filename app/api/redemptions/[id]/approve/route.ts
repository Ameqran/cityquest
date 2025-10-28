import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth';
import { getStore, updateRedemptionStatus } from '@/lib/store';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  await requireRole('business');
  const redemption = updateRedemptionStatus(params.id, 'approved');
  if (!redemption) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ redemption });
}
