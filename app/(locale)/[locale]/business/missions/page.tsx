import { requireRole } from '@/lib/auth';
import { getStore } from '@/lib/store';
import { QRPreview } from '@/components/QRPreview';
import { Badge } from '@/components/ui/badge';

export default async function BusinessMissionsPage() {
  const user = await requireRole('business');
  const store = getStore();
  const missions = store.missions.filter((mission) => mission.cityId === user.cityId && mission.businessId);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 bg-clip-text text-transparent">
              Manage partner missions
            </span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
            Download fresh QR codes and keep mission descriptions aligned with your in-store experience.
          </p>
        </div>
        <Badge variant="secondary" className="tracking-normal">
          {missions.length} live missions
        </Badge>
      </div>
      <div className="grid gap-7 md:grid-cols-2">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <h2 className="text-xl font-semibold text-slate-900">{mission.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{mission.description}</p>
            <div className="mt-5">
              <QRPreview text={`${mission.id}:${mission.businessId}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
