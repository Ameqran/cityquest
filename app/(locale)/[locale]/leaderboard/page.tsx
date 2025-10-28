import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getStore } from '@/lib/store';
import { Leaderboard } from '@/components/Leaderboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Crown, MapPin, Sparkles } from 'lucide-react';

export default async function LeaderboardPage({
  searchParams,
  params
}: {
  searchParams: Record<string, string | undefined>;
  params: { locale: string };
}) {
  const t = await getTranslations('leaderboard');
  const store = getStore();
  const cityId = searchParams.city ?? store.cities[0]?.id;
  const activeCity = store.cities.find((city) => city.id === cityId) ?? store.cities[0];
  const basePath = `/${params.locale}/leaderboard`;
  const cities = store.cities;
  const entriesByPeriod = (period: 'weekly' | 'monthly' | 'all') =>
    store.leaderboard
      .filter((entry) => entry.cityId === (activeCity?.id ?? '') && entry.period === period)
      .sort((a, b) => b.points - a.points);

  const weeklyEntries = entriesByPeriod('weekly');
  const monthlyEntries = entriesByPeriod('monthly');
  const allEntries = entriesByPeriod('all');
  const topExplorer = weeklyEntries[0];
  const topUser = topExplorer ? store.users.find((user) => user.id === topExplorer.userId) : undefined;

  const buildHref = (id: string) => {
    const paramsClone = new URLSearchParams();
    paramsClone.set('city', id);
    const queryString = paramsClone.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  };

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">{t('subtitle')}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-purple-600">{t('cityPicker')}</span>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <Link
                key={city.id}
                href={buildHref(city.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition backdrop-blur',
                  city.id === activeCity?.id
                    ? 'border-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 text-white shadow-lg'
                    : 'border-white/60 bg-white/70 text-slate-600 hover:border-white/80 hover:bg-white/90 hover:text-purple-600'
                )}
                prefetch={false}
              >
                <MapPin className="h-4 w-4" />
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
        <Card className="overflow-hidden border-transparent bg-white/85">
          <CardHeader className="relative z-10 flex flex-col gap-2">
            <Badge variant="default" className="w-fit tracking-normal">
              <MapPin className="mr-1 h-3.5 w-3.5" />
              {t('activeCity')}
            </Badge>
            <CardTitle className="text-2xl font-semibold text-slate-900">{activeCity?.name}</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 pt-0 text-sm text-slate-600">{activeCity?.description ?? ''}</CardContent>
        </Card>
        <Card className="overflow-hidden border-transparent bg-white/85">
          <CardHeader className="relative z-10 flex flex-col gap-2">
            <Badge variant="secondary" className="w-fit tracking-normal">
              <Crown className="mr-1 h-3.5 w-3.5" />
              {t('topExplorer')}
            </Badge>
          </CardHeader>
          <CardContent className="text-sm text-slate-600">
            {topExplorer && topUser ? (
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-base font-semibold text-slate-900">{topUser.displayName}</p>
                  <p className="text-xs text-slate-500">{activeCity?.name}</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-purple-100/70 px-3 py-1 text-sm font-semibold text-purple-700">
                  <Sparkles className="h-4 w-4" />
                  {topExplorer.points} {t('points')}
                </span>
              </div>
            ) : (
              t('empty')
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="weekly" className="space-y-6">
        <TabsList className="mx-auto">
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="all">All time</TabsTrigger>
        </TabsList>
        <TabsContent value="weekly">
          {weeklyEntries.length ? (
            <Leaderboard entries={weeklyEntries} users={store.users} />
          ) : (
            <p className="rounded-3xl border border-dashed border-white/60 bg-white/60 px-6 py-8 text-center text-sm font-medium text-slate-500">
              {t('empty')}
            </p>
          )}
        </TabsContent>
        <TabsContent value="monthly">
          {monthlyEntries.length ? (
            <Leaderboard entries={monthlyEntries} users={store.users} />
          ) : (
            <p className="rounded-3xl border border-dashed border-white/60 bg-white/60 px-6 py-8 text-center text-sm font-medium text-slate-500">
              {t('empty')}
            </p>
          )}
        </TabsContent>
        <TabsContent value="all">
          {allEntries.length ? (
            <Leaderboard entries={allEntries} users={store.users} />
          ) : (
            <p className="rounded-3xl border border-dashed border-white/60 bg-white/60 px-6 py-8 text-center text-sm font-medium text-slate-500">
              {t('empty')}
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
