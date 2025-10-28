import { requireRole } from '@/lib/auth';
import { getStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { randomUUID } from 'crypto';

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
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Seasons</h1>
      <form action={addSeason} className="flex gap-3">
        <Input name="name" placeholder="Season name" required />
        <Button type="submit">Add season</Button>
      </form>
      <ul className="space-y-3">
        {store.seasons.map((season) => (
          <li key={season.id} className="rounded-xl border bg-card p-4 text-sm">
            <p className="font-semibold">{season.name}</p>
            <p className="text-muted-foreground">{season.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
