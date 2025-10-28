import { requireRole } from '@/lib/auth';
import { getStore } from '@/lib/store';
import { Badge } from '@/components/ui/badge';
import { MapPin, ClipboardList, Gift } from 'lucide-react';

export default async function BusinessDashboard() {
  const user = await requireRole('business');
  const store = getStore();
  const business = store.businesses.find((biz) => biz.cityId === user.cityId);
  const pendingSubmissions = store.submissions.filter((sub) => sub.status === 'pending').length;
  const pendingRedemptions = store.redemptions.filter((red) => red.status === 'pending').length;

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <Badge variant="secondary" className="tracking-normal">
          Partner hub
        </Badge>
        <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
          <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 bg-clip-text text-transparent">
            Business dashboard
          </span>
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 md:text-base">
          Keep tabs on mission activity, manage redemptions, and spotlight your location to travelers.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pending submissions</p>
            <ClipboardList className="h-5 w-5 text-purple-500" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">{pendingSubmissions}</p>
        </div>
        <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pending redemptions</p>
            <Gift className="h-5 w-5 text-purple-500" />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-900">{pendingRedemptions}</p>
        </div>
      </div>
      <section className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900 md:text-2xl">
          <MapPin className="h-5 w-5 text-purple-500" />
          Your location
        </h2>
        <p className="mt-2 text-sm text-slate-600">{business?.name}</p>
        <p className="text-sm text-slate-500">{business?.address}</p>
      </section>
    </div>
  );
}
