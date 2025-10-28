import { notFound } from 'next/navigation';
import { getStore } from '@/lib/store';
import { MissionCard } from '@/components/MissionCard';
import { SeasonBanner } from '@/components/SeasonBanner';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

export default function CityPage({ params }: { params: { slug: string; locale: string } }) {
  const store = getStore();
  const city = store.cities.find((c) => c.slug === params.slug);
  if (!city) notFound();
  const missions = store.missions.filter((mission) => mission.cityId === city.id);
  const season = store.seasons.find((s) => s.cityId === city.id);

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/85 p-10 shadow-xl backdrop-blur">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-blue-500/15 to-pink-500/10" aria-hidden />
        <div className="relative z-10 space-y-4">
          <Badge variant="secondary" className="w-fit tracking-normal">
            <MapPin className="mr-1 h-3.5 w-3.5" />
            Spotlight city
          </Badge>
          <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">{city.name}</h1>
          <p className="max-w-3xl text-sm text-slate-600 md:text-base">{city.description}</p>
        </div>
      </section>
      {season ? <SeasonBanner season={season} /> : null}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 bg-clip-text text-transparent">
              Missions in {city.name}
            </span>
          </h2>
          <span className="text-xs font-semibold uppercase tracking-wide text-purple-600">{missions.length} experiences</span>
        </div>
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {missions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              business={store.businesses.find((b) => b.id === mission.businessId)}
              locale={params.locale}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
