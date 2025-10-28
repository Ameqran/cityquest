import type { LeaderboardEntry, User } from '@/lib/models';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Crown, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  users: User[];
}

export function Leaderboard({ entries, users }: LeaderboardProps) {
  const badges = ['bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 text-slate-900', 'bg-gradient-to-r from-gray-200 via-slate-200 to-slate-300 text-slate-800', 'bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-100 text-amber-800'];
  return (
    <Card className="overflow-hidden border-transparent bg-white/85">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-purple-500/25 via-blue-500/25 to-fuchsia-400/25 blur-3xl" aria-hidden />
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold text-slate-900">
          <Crown className="h-5 w-5 text-yellow-400" />
          Top explorers
        </CardTitle>
        <p className="text-sm text-slate-600">Celebrate the streaks and points earned by your fellow adventurers.</p>
      </CardHeader>
      <CardContent className="relative z-10">
        <ol className="space-y-3">
          {entries.map((entry, index) => {
            const user = users.find((u) => u.id === entry.userId);
            const rankLabel = `#${index + 1}`;
            const isTopThree = index < 3;
            const highlight = isTopThree ? badges[index] : 'bg-white/70 text-slate-700 border-white/60';
            const badgeIcon =
              index === 0 ? <Crown className="h-5 w-5" /> : index < 3 ? <Medal className="h-5 w-5" /> : null;
            return (
              <li
                key={entry.userId}
                className={cn(
                  'flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm backdrop-blur',
                  isTopThree && 'border-transparent shadow-lg'
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold uppercase tracking-wide',
                      highlight
                    )}
                  >
                    {badgeIcon ?? rankLabel}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{user?.displayName ?? entry.userId}</p>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-purple-600">{entry.period}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-purple-700">{entry.points} pts</span>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
