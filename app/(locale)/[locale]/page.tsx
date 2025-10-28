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
    <div className="space-y-12 md:space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/80 p-10 shadow-xl backdrop-blur md:p-14">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10" aria-hidden />
        <div className="grid gap-10 md:grid-cols-[1.2fr,0.8fr] md:items-center">
          <div className="relative z-10 space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-600">CityQuest</p>
            <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 bg-clip-text text-transparent">
                {t('heroTitle')}
              </span>
            </h1>
            <p className="max-w-2xl text-lg text-slate-600">{t('heroSubtitle')}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${params.locale}/missions`}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
              >
                {t('cta')}
              </Link>
              <span className="inline-flex items-center rounded-full bg-white/70 px-6 py-3 text-sm font-semibold text-purple-600 shadow-sm">
                {t('dailyMissions')}
              </span>
            </div>
          </div>
          <div className="relative z-10">
            {activeSeason ? <SeasonBanner season={activeSeason} /> : null}
          </div>
        </div>
      </section>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 bg-clip-text text-transparent">
              Featured missions
            </span>
          </h2>
          <Link
            href={`/${params.locale}/missions`}
            className="hidden text-sm font-semibold text-purple-600 transition hover:text-purple-700 md:inline-flex"
          >
            See all missions →
          </Link>
        </div>
        <div className="grid gap-7 md:grid-cols-3">
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
      <section className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/80 p-10 shadow-lg backdrop-blur">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-sky-500/10" aria-hidden />
        <div className="relative z-10 space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            Why {featuredCity.name}?
          </h2>
          <p className="max-w-2xl text-slate-600">{featuredCity.description}</p>
        </div>
      </section>
    </div>
  );
}
