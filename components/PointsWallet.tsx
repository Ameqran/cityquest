import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Flame, Medal, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';

interface PointsWalletProps {
  totalPoints: number;
  streak: number;
  badges: string[];
}

export function PointsWallet({ totalPoints, streak, badges }: PointsWalletProps) {
  return (
    <Card className="overflow-hidden border-transparent bg-white/85">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-blue-500/15 to-pink-500/10 opacity-80" aria-hidden />
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-2 text-xl text-slate-900">
          <Sparkles className="h-5 w-5 text-purple-500" />
          Wallet overview
        </CardTitle>
        <CardDescription className="text-slate-600">Track your milestones and keep the streak alive.</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total points</p>
          <p className="mt-3 flex items-center gap-2 text-3xl font-bold text-slate-900">
            {totalPoints}
            <Sparkles className="h-5 w-5 text-purple-500" />
          </p>
        </div>
        <div className="rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current streak</p>
          <p className="mt-3 flex items-center gap-2 text-2xl font-bold text-slate-900">
            {streak} days
            <Flame className="h-5 w-5 text-amber-500" />
          </p>
        </div>
        <div className="rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Badges</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {badges.length ? (
              badges.map((badge) => (
                <Badge key={badge} variant="secondary" className="text-[11px] uppercase tracking-wide">
                  <Medal className="mr-1 h-3.5 w-3.5" />
                  {badge}
                </Badge>
              ))
            ) : (
              <span className="text-xs font-medium text-slate-500">No badges yet</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
