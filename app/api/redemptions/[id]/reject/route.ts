import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth';
import { updateRedemptionStatus, adjustRewardStock, getStore } from '@/lib/store';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  await requireRole('business');
  const redemption = updateRedemptionStatus(params.id, 'rejected');
  if (!redemption) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const reward = getStore().rewards.find((r) => r.id === redemption.rewardId);
  if (reward) {
    adjustRewardStock(reward.id, 1);
  }
  return NextResponse.json({ redemption });
}
