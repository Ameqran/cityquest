import { requireRole } from '@/lib/auth';
import { getStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Cities</h1>
      <form action={addCity} className="flex gap-3">
        <Input name="name" placeholder="City name" required />
        <Button type="submit">Add city</Button>
      </form>
      <ul className="space-y-3">
        {store.cities.map((city) => (
          <li key={city.id} className="rounded-xl border bg-card p-4 text-sm">
            <p className="font-semibold">{city.name}</p>
            <p className="text-muted-foreground">{city.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
