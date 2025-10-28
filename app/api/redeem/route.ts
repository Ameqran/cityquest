import { NextResponse } from 'next/server';
import { createRedemption, adjustRewardStock, getStore } from '@/lib/store';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const payload = await request.json();
  const store = getStore();
  const reward = store.rewards.find((r) => r.id === payload.rewardId);
  if (!reward || reward.stock <= 0 || user.totalPoints < reward.costPoints) {
    return NextResponse.json({ error: 'Cannot redeem' }, { status: 400 });
  }
  user.totalPoints -= reward.costPoints;
  adjustRewardStock(reward.id, -1);
  const redemption = createRedemption({ rewardId: reward.id, userId: user.id });
  return NextResponse.json({ redemption });
}
