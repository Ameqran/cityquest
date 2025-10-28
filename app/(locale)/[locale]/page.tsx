import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getStore } from '@/lib/store';
import { MissionCard } from '@/components/MissionCard';
import { SeasonBanner } from '@/components/SeasonBanner';

export default async function LandingPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations('landing');
  const { missions, seasons, cities } = getStore();
  const featuredMissions = missions.slice(0, 3);
  const activeSeason = seasons[0];
  const featuredCity = cities[0];

  return (
    <div className="space-y-12">
      <section className="grid gap-6 rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/40 to-background p-10">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">CityQuests</p>
          <h1 className="text-4xl font-bold md:text-5xl">{t('heroTitle')}</h1>
          <p className="max-w-2xl text-lg text-muted-foreground">{t('heroSubtitle')}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/${params.locale}/missions`} className="inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
              {t('cta')}
            </Link>
            <span className="rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground">{t('dailyMissions')}</span>
          </div>
        </div>
        {activeSeason ? <SeasonBanner season={activeSeason} /> : null}
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Featured missions</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredMissions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              business={getStore().businesses.find((b) => b.id === mission.businessId)}
              locale={params.locale}
            />
          ))}
        </div>
      </section>
      <section className="rounded-2xl border bg-card p-8 shadow-sm">
        <h2 className="text-2xl font-semibold">Why {featuredCity.name}?</h2>
        <p className="mt-2 text-muted-foreground">{featuredCity.description}</p>
      </section>
    </div>
  );
}
