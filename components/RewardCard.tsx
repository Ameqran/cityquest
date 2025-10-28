'use client';

import type { Reward } from '@/lib/models';
import { Gift, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  businessName?: string;
  ctaLabel?: string;
  insufficientLabel?: string;
  soldOutLabel?: string;
}

export function RewardCard({ reward, userPoints, businessName, ctaLabel, insufficientLabel, soldOutLabel }: RewardCardProps) {
  const canRedeem = userPoints >= reward.costPoints && reward.stock > 0;
  const isSoldOut = reward.stock <= 0;
  const missingPoints = Math.max(0, reward.costPoints - userPoints);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-blue-500/15 to-indigo-500/10 opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="relative z-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg">
          <Gift className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{reward.title}</h3>
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">{businessName ?? 'Partner reward'}</p>
        </div>
      </div>
      <p className="relative z-10 mt-4 text-sm text-slate-600">{reward.description}</p>
      <div className="relative z-10 mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <Badge variant="secondary" className="tracking-normal">
          <Sparkles className="mr-1 h-3.5 w-3.5" />
          {reward.costPoints} pts
        </Badge>
        <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm">
          Stock: {reward.stock}
        </span>
      </div>
      <div className="relative z-10 mt-6">
        {canRedeem ? (
          <Button type="submit" className="w-full">
            {ctaLabel ?? 'Redeem reward'}
          </Button>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/60 bg-white/60 px-4 py-3 text-xs font-medium text-slate-500">
            {isSoldOut
              ? soldOutLabel ?? 'This reward is currently out of stock.'
              : insufficientLabel ?? `You need ${missingPoints} more points to redeem this reward.`}
          </div>
        )}
      </div>
    </div>
  );
}
