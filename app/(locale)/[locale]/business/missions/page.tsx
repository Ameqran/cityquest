import { requireRole } from '@/lib/auth';
import { getStore } from '@/lib/store';
import { QRPreview } from '@/components/QRPreview';

export default async function BusinessMissionsPage() {
  const user = await requireRole('business');
  const store = getStore();
  const missions = store.missions.filter((mission) => mission.cityId === user.cityId && mission.businessId);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Manage missions</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {missions.map((mission) => (
          <div key={mission.id} className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold">{mission.title}</h2>
            <p className="text-sm text-muted-foreground">{mission.description}</p>
            <div className="mt-4">
              <QRPreview text={`${mission.id}:${mission.businessId}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
