import type { Season } from '@/lib/models';
import { differenceInCalendarDays } from 'date-fns';
import { CalendarDays, Sparkles } from 'lucide-react';

interface SeasonBannerProps {
  season: Season;
}

export function SeasonBanner({ season }: SeasonBannerProps) {
  const daysLeft = differenceInCalendarDays(season.endAt, new Date());
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/15 via-blue-500/15 to-fuchsia-500/15" />
      <div className="relative z-10 flex flex-col gap-4 text-slate-800">
        <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-purple-600">
          <Sparkles className="h-4 w-4" />
          Seasonal highlight
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-slate-900 md:text-3xl">{season.name}</h3>
          <p className="mt-2 text-sm text-slate-600 md:text-base">{season.description}</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-purple-700">
          <CalendarDays className="h-4 w-4" />
          {daysLeft > 0 ? `${daysLeft} days remaining` : 'Final day to participate'}
        </div>
      </div>
    </div>
  );
}
