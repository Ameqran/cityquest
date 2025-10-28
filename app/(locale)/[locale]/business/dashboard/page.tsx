import { requireRole } from '@/lib/auth';
import { getStore } from '@/lib/store';

export default async function BusinessDashboard() {
  const user = await requireRole('business');
  const store = getStore();
  const business = store.businesses.find((biz) => biz.cityId === user.cityId);
  const pendingSubmissions = store.submissions.filter((sub) => sub.status === 'pending').length;
  const pendingRedemptions = store.redemptions.filter((red) => red.status === 'pending').length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Business dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Pending submissions</p>
          <p className="text-3xl font-semibold">{pendingSubmissions}</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Pending redemptions</p>
          <p className="text-3xl font-semibold">{pendingRedemptions}</p>
        </div>
      </div>
      <section className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Your location</h2>
        <p className="text-sm text-muted-foreground">{business?.name}</p>
        <p className="text-sm text-muted-foreground">{business?.address}</p>
      </section>
    </div>
  );
}
