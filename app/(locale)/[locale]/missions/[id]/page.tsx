import { notFound } from 'next/navigation';
import { getStore } from '@/lib/store';
import { ProofDialog } from '@/components/ProofDialog';
import { getCurrentUser } from '@/lib/auth';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Camera, CalendarDays, Users } from 'lucide-react';

export default async function MissionDetail({ params }: { params: { id: string } }) {
  const store = getStore();
  const mission = store.missions.find((m) => m.id === params.id);
  if (!mission) notFound();
  const business = mission.businessId ? store.businesses.find((b) => b.id === mission.businessId) : undefined;
  const user = await getCurrentUser();

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/85 p-10 shadow-xl backdrop-blur">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/15 to-sky-400/15" aria-hidden />
        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <Badge variant="secondary" className="uppercase tracking-wide">
              Featured mission
            </Badge>
            <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">{mission.title}</h1>
            <p className="max-w-2xl text-sm text-slate-600 md:text-base">{mission.description}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">How to complete</p>
              <p className="mt-2 text-sm text-slate-600">{mission.howToComplete}</p>
            </div>
            <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Mission rewards</p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold">
                <Badge variant="secondary" className="tracking-normal">
                  <Sparkles className="mr-1 h-3.5 w-3.5" />
                  {mission.points} pts
                </Badge>
                {mission.requiresPhotoProof ? (
                  <Badge variant="default" className="tracking-normal">
                    <Camera className="mr-1 h-3.5 w-3.5" />
                    Photo proof
                  </Badge>
                ) : null}
                {mission.seasonId ? (
                  <Badge variant="default" className="tracking-normal">
                    <CalendarDays className="mr-1 h-3.5 w-3.5" />
                    Seasonal
                  </Badge>
                ) : null}
                {mission.isDaily ? (
                  <Badge variant="default" className="tracking-normal">
                    Daily streak
                  </Badge>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {mission.categories.map((category) => (
              <span key={category} className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-purple-700 shadow-sm">
                #{category}
              </span>
            ))}
          </div>
        </div>
      </section>
      {business ? (
        <section className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-lg backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">Partner location</h2>
              <p className="mt-1 text-sm text-slate-600">
                {business.name} · {business.address}
              </p>
            </div>
            <Badge variant="default" className="tracking-normal">
              <Users className="mr-1 h-3.5 w-3.5" />
              Hosted mission
            </Badge>
          </div>
        </section>
      ) : null}
      {user ? (
        <ProofDialog missionId={mission.id} />
      ) : (
        <p className="rounded-full border border-white/60 bg-white/70 px-4 py-2 text-center text-sm font-medium text-slate-600 shadow-sm">
          Sign in to submit your proof and claim the reward.
        </p>
      )}
    </div>
  );
}
