import { requireRole } from '@/lib/auth';
import { getStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { randomUUID } from 'crypto';
import { Badge } from '@/components/ui/badge';

export default async function AdminCategoriesPage() {
  await requireRole('admin');
  const store = getStore();

  async function addCategory(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    store.categories.push({ id: `cat-${randomUUID()}`, slug, name, icon: 'Star', color: 'bg-slate-500' });
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 bg-clip-text text-transparent">
              Mission categories
            </span>
          </h1>
          <p className="mt-2 text-sm text-slate-600 md:text-base">Keep categories fresh to help travelers find missions they love.</p>
        </div>
        <Badge variant="secondary" className="tracking-normal">
          {store.categories.length} categories
        </Badge>
      </div>
      <form
        action={addCategory}
        className="flex flex-col gap-3 rounded-full border border-white/60 bg-white/70 p-3 shadow-sm backdrop-blur md:flex-row md:items-center"
      >
        <Input name="name" placeholder="Category name" required className="bg-white/0" />
        <Button type="submit" className="md:min-w-[150px]">
          Add category
        </Button>
      </form>
      <ul className="flex flex-wrap gap-3">
        {store.categories.map((category) => (
          <li
            key={category.id}
            className="rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm font-medium text-purple-700 shadow-sm backdrop-blur"
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
