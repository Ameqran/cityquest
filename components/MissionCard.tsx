'use client';

import { Mission, PartnerBusiness } from '@/lib/models';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useToastStore } from '@/lib/use-toast';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface MissionCardProps {
  mission: Mission;
  business?: PartnerBusiness | null;
  onStart?: (mission: Mission) => void;
  locale?: string;
}

const tierColor: Record<Mission['tier'], string> = {
  easy: 'bg-emerald-500/20 text-emerald-700',
  medium: 'bg-amber-500/20 text-amber-700',
  hard: 'bg-rose-500/20 text-rose-700'
};

export function MissionCard({ mission, business, onStart, locale = 'en' }: MissionCardProps) {
  const addToast = useToastStore((state) => state.addToast);
  const router = useRouter();
  const t = useTranslations('toasts');

  return (
    <div className="flex h-full flex-col rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold">{mission.title}</h3>
        <Badge className={tierColor[mission.tier]} variant="outline">
          {mission.tier.toUpperCase()}
        </Badge>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{mission.description}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
        {mission.categories.map((category) => (
          <span key={category} className="rounded-full bg-muted px-2 py-1">
            #{category}
          </span>
        ))}
      </div>
      {business ? (
        <div className="mt-4 flex items-center space-x-3 text-sm">
          <div className="h-10 w-10 rounded-full bg-muted" aria-hidden />
          <div>
            <p className="font-medium">{business.name}</p>
            <p className="text-xs text-muted-foreground">{business.address}</p>
          </div>
        </div>
      ) : null}
      <div className="mt-4 flex items-center justify-between text-sm font-semibold text-primary">
        <span>{mission.points} pts</span>
        {mission.seasonId ? <Badge variant="secondary">Seasonal</Badge> : null}
      </div>
      <div className="mt-6 flex gap-3">
        <Button
          className="flex-1"
          onClick={() => {
            addToast({ title: t('missionStarted') });
            onStart?.(mission);
            router.push(`/${locale}/missions/${mission.id}`);
          }}
        >
          Start mission
        </Button>
      </div>
    </div>
  );
}
