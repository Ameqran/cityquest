import { notFound } from 'next/navigation';
import { getStore } from '@/lib/store';
import { ProofDialog } from '@/components/ProofDialog';
import { getCurrentUser } from '@/lib/auth';

export default async function MissionDetail({ params }: { params: { id: string } }) {
  const store = getStore();
  const mission = store.missions.find((m) => m.id === params.id);
  if (!mission) notFound();
  const business = mission.businessId ? store.businesses.find((b) => b.id === mission.businessId) : undefined;
  const user = await getCurrentUser();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-card p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">{mission.title}</h1>
        <p className="mt-3 text-muted-foreground">{mission.description}</p>
        <p className="mt-4 text-sm font-semibold">How to complete</p>
        <p className="text-sm text-muted-foreground">{mission.howToComplete}</p>
        <div className="mt-6 flex flex-wrap gap-3 text-xs font-medium text-muted-foreground">
          {mission.categories.map((category) => (
            <span key={category} className="rounded-full bg-muted px-3 py-1">
              #{category}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-lg font-semibold text-primary">{mission.points} points</span>
          {mission.requiresPhotoProof ? <span className="text-sm text-muted-foreground">Photo proof required</span> : null}
        </div>
      </section>
      {business ? (
        <section className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Partner</h2>
          <p className="mt-2 text-sm font-medium">{business.name}</p>
          <p className="text-sm text-muted-foreground">{business.address}</p>
        </section>
      ) : null}
      {user ? (
        <ProofDialog missionId={mission.id} />
      ) : (
        <p className="text-sm text-muted-foreground">Sign in to submit your proof.</p>
      )}
    </div>
  );
}
