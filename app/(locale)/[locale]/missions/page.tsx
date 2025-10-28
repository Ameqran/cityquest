import { getStore } from '@/lib/store';
import { MissionCard } from '@/components/MissionCard';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function MissionsPage({
  searchParams,
  params
}: {
  searchParams: Record<string, string | string[] | undefined>;
  params: { locale: string };
}) {
  const store = getStore();
  const tier = typeof searchParams.tier === 'string' ? searchParams.tier : undefined;
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const city = typeof searchParams.city === 'string' ? searchParams.city : undefined;
  const search = typeof searchParams.q === 'string' ? searchParams.q : undefined;

  const missions = store.missions.filter((mission) => {
    if (tier && mission.tier !== tier) return false;
    if (category && !mission.categories.includes(category)) return false;
    if (city && mission.cityId !== city) return false;
    if (search && !mission.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Missions</h1>
      <form className="grid gap-4 rounded-xl border bg-card p-6 shadow-sm md:grid-cols-4">
        <Select name="city" defaultValue={city ?? ''}>
          <option value="">All cities</option>
          {store.cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
        <Select name="category" defaultValue={category ?? ''}>
          <option value="">All categories</option>
          {store.categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </Select>
        <Select name="tier" defaultValue={tier ?? ''}>
          <option value="">All tiers</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </Select>
        <Input name="q" defaultValue={search ?? ''} placeholder="Search" />
        <button type="submit" className="col-span-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          Filter
        </button>
      </form>
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
    </div>
  );
}
