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
    <div className="space-y-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 bg-clip-text text-transparent">
              Missions
            </span>
          </h1>
          <p className="mt-2 max-w-xl text-sm text-slate-600 md:text-base">
            Fine-tune the challenges to match your mood and discover partner rewards tailored to each quest.
          </p>
        </div>
        <p className="text-sm font-medium text-purple-700 md:text-base">{missions.length} missions available</p>
      </div>
      <form className="grid gap-4 rounded-3xl border border-white/50 bg-white/80 p-6 shadow-lg backdrop-blur md:grid-cols-4">
        <Select
          name="city"
          defaultValue={city ?? ''}
          className="border-white/50 bg-white/90 text-sm font-medium text-slate-700"
        >
          <option value="">All cities</option>
          {store.cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
        <Select
          name="category"
          defaultValue={category ?? ''}
          className="border-white/50 bg-white/90 text-sm font-medium text-slate-700"
        >
          <option value="">All categories</option>
          {store.categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </Select>
        <Select
          name="tier"
          defaultValue={tier ?? ''}
          className="border-white/50 bg-white/90 text-sm font-medium text-slate-700"
        >
          <option value="">All tiers</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </Select>
        <Input
          name="q"
          defaultValue={search ?? ''}
          placeholder="Search missions"
          className="border-white/50 bg-white/90 text-sm font-medium text-slate-700 placeholder:text-slate-400"
        />
        <button
          type="submit"
          className="col-span-full rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
        >
          Filter
        </button>
      </form>
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
    </div>
  );
}
