import { notFound } from 'next/navigation';
import { getStore } from '@/lib/store';
import { MissionCard } from '@/components/MissionCard';
import { SeasonBanner } from '@/components/SeasonBanner';

export default function CityPage({ params }: { params: { slug: string; locale: string } }) {
  const store = getStore();
  const city = store.cities.find((c) => c.slug === params.slug);
  if (!city) notFound();
  const missions = store.missions.filter((mission) => mission.cityId === city.id);
  const season = store.seasons.find((s) => s.cityId === city.id);

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border bg-card p-10 shadow-sm">
        <h1 className="text-4xl font-semibold">{city.name}</h1>
        <p className="mt-3 text-muted-foreground">{city.description}</p>
      </section>
      {season ? <SeasonBanner season={season} /> : null}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Missions in {city.name}</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
