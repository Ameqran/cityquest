import { requireRole } from '@/lib/auth';
import { getStore } from '@/lib/store';

export default async function AdminDashboard() {
  await requireRole('admin');
  const store = getStore();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Admin overview</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Cities</p>
          <p className="text-3xl font-semibold">{store.cities.length}</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Missions</p>
          <p className="text-3xl font-semibold">{store.missions.length}</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Users</p>
          <p className="text-3xl font-semibold">{store.users.length}</p>
        </div>
      </div>
    </div>
  );
}
