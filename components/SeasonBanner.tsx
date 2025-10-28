import { Season } from '@/lib/models';
import { differenceInCalendarDays } from 'date-fns';

interface SeasonBannerProps {
  season: Season;
}

export function SeasonBanner({ season }: SeasonBannerProps) {
  const daysLeft = differenceInCalendarDays(season.endAt, new Date());
  return (
    <div className="rounded-xl border border-primary bg-primary/10 p-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">Seasonal event</p>
      <h3 className="mt-2 text-2xl font-semibold">{season.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{season.description}</p>
      <p className="mt-3 text-sm font-medium text-primary">{daysLeft} days remaining</p>
    </div>
  );
}
