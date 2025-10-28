import { requireRole } from '@/lib/auth';
import { getStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { randomUUID } from 'crypto';
import { Badge } from '@/components/ui/badge';
import { CalendarDays } from 'lucide-react';

export default async function AdminSeasonsPage() {
  await requireRole('admin');
  const store = getStore();

  async function addSeason(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    store.seasons.push({
      id: `season-${randomUUID()}`,
      name,
      slug,
      startAt: new Date(),
      endAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      description: 'Upcoming seasonal event',
      cityId: store.cities[0]?.id
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 bg-clip-text text-transparent">
              Seasonal campaigns
            </span>
          </h1>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Launch new events to spotlight city festivals and guide explorers toward limited-time missions.
          </p>
        </div>
        <Badge variant="secondary" className="tracking-normal">
          {store.seasons.length} active
        </Badge>
      </div>
      <form
        action={addSeason}
        className="flex flex-col gap-3 rounded-full border border-white/60 bg-white/70 p-3 shadow-sm backdrop-blur md:flex-row md:items-center"
      >
        <Input name="name" placeholder="Season name" required className="bg-white/0" />
        <Button type="submit" className="md:min-w-[160px]">
          Add season
        </Button>
      </form>
      <ul className="grid gap-3 md:grid-cols-2">
        {store.seasons.map((season) => (
          <li
            key={season.id}
            className="rounded-3xl border border-white/60 bg-white/80 p-5 text-sm shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">{season.name}</p>
              <Badge variant="default" className="tracking-normal">
                <CalendarDays className="mr-1 h-3.5 w-3.5" />
                {season.startAt.toLocaleDateString()}
              </Badge>
            </div>
            <p className="mt-1 text-xs text-slate-600">{season.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
