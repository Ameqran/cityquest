import { requireRole } from '@/lib/auth';
import { getStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { randomUUID } from 'crypto';

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
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Categories</h1>
      <form action={addCategory} className="flex gap-3">
        <Input name="name" placeholder="Category name" required />
        <Button type="submit">Add category</Button>
      </form>
      <ul className="flex flex-wrap gap-3">
        {store.categories.map((category) => (
          <li key={category.id} className="rounded-full bg-muted px-4 py-2 text-sm font-medium">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
