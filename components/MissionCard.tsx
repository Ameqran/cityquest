'use client';

import type { Mission, PartnerBusiness } from '@/lib/models';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useToastStore } from '@/lib/use-toast';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ArrowRight, CalendarDays, Camera, MapPin, Sparkles, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MissionCardProps {
  mission: Mission;
  business?: PartnerBusiness | null;
  onStart?: (mission: Mission) => void;
  locale?: string;
}

const tierBadgeStyles: Record<Mission['tier'], string> = {
  easy: 'border-emerald-400/40 bg-emerald-500/15 text-emerald-700',
  medium: 'border-amber-400/40 bg-amber-500/15 text-amber-700',
  hard: 'border-rose-400/40 bg-rose-500/15 text-rose-700'
};

const tierGlow: Record<Mission['tier'], string> = {
  easy: 'from-emerald-200/45 via-transparent to-teal-200/40',
  medium: 'from-amber-200/45 via-transparent to-orange-200/35',
  hard: 'from-rose-200/45 via-transparent to-purple-200/35'
};

export function MissionCard({ mission, business, onStart, locale = 'en' }: MissionCardProps) {
  const addToast = useToastStore((state) => state.addToast);
  const router = useRouter();
  const t = useTranslations('toasts');

  const meta = [
    {
      key: 'points',
      label: `${mission.points} pts`,
      icon: Sparkles,
      className: 'bg-purple-100/70 text-purple-700'
    },
    mission.isDaily
      ? {
          key: 'daily',
          label: 'Daily mission',
          icon: Sun,
          className: 'bg-amber-100/70 text-amber-700'
        }
      : null,
    mission.requiresPhotoProof
      ? {
          key: 'photo',
          label: 'Photo proof',
          icon: Camera,
          className: 'bg-blue-100/70 text-blue-700'
        }
      : null,
    mission.seasonId
      ? {
          key: 'season',
          label: 'Seasonal',
          icon: CalendarDays,
          className: 'bg-fuchsia-100/70 text-fuchsia-700'
        }
      : null
  ].filter(Boolean) as {
    key: string;
    label: string;
    icon: typeof Sparkles;
    className: string;
  }[];

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/50 bg-white/80 p-6 shadow-lg backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl md:p-8">
      <div
        className={cn(
          'pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100',
          `bg-gradient-to-br ${tierGlow[mission.tier]}`
        )}
        aria-hidden
      />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">
              {mission.isDaily ? 'Daily spotlight' : 'Featured challenge'}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900 md:text-2xl">{mission.title}</h3>
          </div>
          <Badge
            className={cn(
              'border px-3 py-1 text-[11px] font-bold uppercase tracking-wide',
              tierBadgeStyles[mission.tier]
            )}
            variant="outline"
          >
            {mission.tier}
          </Badge>
        </div>
        <p className="mt-4 text-sm text-slate-600 md:text-base">{mission.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {mission.categories.map((category) => (
            <span
              key={category}
              className="inline-flex items-center rounded-full bg-purple-100/70 px-3 py-1 text-xs font-semibold text-purple-700"
            >
              #{category}
            </span>
          ))}
        </div>
        {business ? (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/40 bg-white/70 p-4 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/30 text-purple-600">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{business.name}</p>
              <p className="text-xs text-slate-600">{business.address}</p>
            </div>
          </div>
        ) : null}
        {meta.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {meta.map((item) => {
              const Icon = item.icon;
              return (
                <span
                  key={item.key}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold',
                    item.className
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </span>
              );
            })}
          </div>
        ) : null}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            className="flex-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 text-white shadow-lg transition hover:shadow-xl"
            onClick={() => {
              addToast({ title: t('missionStarted') });
              onStart?.(mission);
              router.push(`/${locale}/missions/${mission.id}`);
            }}
          >
            Start mission
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            className="flex-1 border border-transparent bg-white/60 text-purple-600 shadow-sm transition hover:bg-white hover:text-purple-700"
            onClick={() => router.push(`/${locale}/missions/${mission.id}`)}
          >
            View details
          </Button>
        </div>
      </div>
    </div>
  );
}
