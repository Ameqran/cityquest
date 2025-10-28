import { requireRole } from '@/lib/auth';
import { getStore } from '@/lib/store';
import { Badge } from '@/components/ui/badge';
import { Building2, Map, Users } from 'lucide-react';

export default async function AdminDashboard() {
  await requireRole('admin');
  const store = getStore();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Badge variant="secondary" className="tracking-normal">
          Control center
        </Badge>
        <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
          <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 bg-clip-text text-transparent">
            Admin overview
          </span>
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 md:text-base">
          A quick look at live content across CityQuest. Jump into categories, seasons, or moderation queues from here.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Cities</p>
            <Map className="h-5 w-5 text-purple-500" />
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-900">{store.cities.length}</p>
        </div>
        <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Missions</p>
            <Building2 className="h-5 w-5 text-purple-500" />
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-900">{store.missions.length}</p>
        </div>
        <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Users</p>
            <Users className="h-5 w-5 text-purple-500" />
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-900">{store.users.length}</p>
        </div>
      </div>
    </div>
  );
}
