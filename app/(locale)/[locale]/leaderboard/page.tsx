import { getStore } from '@/lib/store';
import { Leaderboard } from '@/components/Leaderboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LeaderboardPage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const store = getStore();
  const cityId = searchParams.city ?? store.cities[0]?.id;
  const entriesByPeriod = (period: 'weekly' | 'monthly' | 'all') =>
    store.leaderboard.filter((entry) => entry.cityId === cityId && entry.period === period).sort((a, b) => b.points - a.points);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Leaderboard</h1>
      <Tabs defaultValue="weekly">
        <TabsList>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="all">All time</TabsTrigger>
        </TabsList>
        <TabsContent value="weekly">
          <Leaderboard entries={entriesByPeriod('weekly')} users={store.users} />
        </TabsContent>
        <TabsContent value="monthly">
          <Leaderboard entries={entriesByPeriod('monthly')} users={store.users} />
        </TabsContent>
        <TabsContent value="all">
          <Leaderboard entries={entriesByPeriod('all')} users={store.users} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
