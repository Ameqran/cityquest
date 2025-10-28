import { requireRole } from '@/lib/auth';
import { getStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default async function AdminCitiesPage() {
  await requireRole('admin');
  const store = getStore();

  async function addCity(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    store.cities.push({
      id: slug,
      name,
      slug,
      country: 'Morocco',
      heroImage: '/logos/placeholder.png',
      description: 'New city description pending.'
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 bg-clip-text text-transparent">
              Manage cities
            </span>
          </h1>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Add new destinations and keep descriptions fresh to inspire visiting explorers.
          </p>
        </div>
        <Badge variant="secondary" className="tracking-normal">
          {store.cities.length} cities live
        </Badge>
      </div>
      <form
        action={addCity}
        className="flex flex-col gap-3 rounded-full border border-white/60 bg-white/70 p-3 shadow-sm backdrop-blur md:flex-row md:items-center"
      >
        <Input name="name" placeholder="City name" required className="bg-white/0" />
        <Button type="submit" className="md:min-w-[140px]">
          Add city
        </Button>
      </form>
      <ul className="grid gap-3 md:grid-cols-2">
        {store.cities.map((city) => (
          <li
            key={city.id}
            className="rounded-3xl border border-white/60 bg-white/80 p-5 text-sm shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <p className="text-sm font-semibold text-slate-900">{city.name}</p>
            <p className="mt-1 text-xs text-slate-600">{city.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
