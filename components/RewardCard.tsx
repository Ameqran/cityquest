'use client';

import { Reward } from '@/lib/models';

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  businessName?: string;
}

export function RewardCard({ reward, userPoints, businessName }: RewardCardProps) {
  const canRedeem = userPoints >= reward.costPoints && reward.stock > 0;

  return (
    <div className="flex h-full flex-col rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="h-12 w-12 rounded-full bg-muted" aria-hidden />
        <div>
          <h3 className="text-lg font-semibold">{reward.title}</h3>
          <p className="text-xs text-muted-foreground">{businessName}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{reward.description}</p>
      <div className="mt-4 flex items-center justify-between text-sm font-semibold">
        <span>{reward.costPoints} pts</span>
        <span className="text-muted-foreground">Stock: {reward.stock}</span>
      </div>
      {!canRedeem ? <p className="mt-4 text-xs text-muted-foreground">Earn more points to redeem.</p> : null}
    </div>
  );
}
