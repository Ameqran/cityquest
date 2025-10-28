import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getStore } from '@/lib/store';
import { PointsWallet } from '@/components/PointsWallet';

export default async function ProfilePage({ params }: { params: { locale: string } }) {
  const user = await getCurrentUser();
  if (!user) redirect(`/${params.locale}/login`);
  const store = getStore();
  const submissions = store.submissions.filter((sub) => sub.userId === user.id);
  const redemptions = store.redemptions.filter((red) => red.userId === user.id);

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-purple-600">Explorer profile</p>
        <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
          <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 bg-clip-text text-transparent">
            Welcome back, {user.displayName}
          </span>
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 md:text-base">
          Keep an eye on your missions, reward redemptions, and daily streaks. Your progress fuels new quests across the city.
        </p>
      </div>
      <PointsWallet totalPoints={user.totalPoints} streak={user.streakCount} badges={user.badges} />
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">Recent submissions</h2>
          <span className="text-xs font-semibold uppercase tracking-wide text-purple-600">{submissions.length} logged</span>
        </div>
        <ul className="grid gap-3 md:grid-cols-2">
          {submissions.length ? (
            submissions.map((submission) => {
              const mission = store.missions.find((m) => m.id === submission.missionId);
              return (
                <li
                  key={submission.id}
                  className="rounded-3xl border border-white/60 bg-white/80 p-5 text-sm shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-slate-900">{mission?.title}</span>
                    <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-purple-600">
                      {submission.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{submission.createdAt.toDateString()}</p>
                  {submission.notes ? <p className="mt-2 text-xs text-slate-600">“{submission.notes}”</p> : null}
                </li>
              );
            })
          ) : (
            <li className="rounded-3xl border border-dashed border-white/60 bg-white/50 p-5 text-sm text-slate-500">
              No submissions yet. Start a mission to log your first adventure.
            </li>
          )}
        </ul>
      </section>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">Reward redemptions</h2>
          <span className="text-xs font-semibold uppercase tracking-wide text-purple-600">{redemptions.length} redeemed</span>
        </div>
        <ul className="grid gap-3 md:grid-cols-2">
          {redemptions.length ? (
            redemptions.map((redemption) => {
              const reward = store.rewards.find((r) => r.id === redemption.rewardId);
              return (
                <li
                  key={redemption.id}
                  className="rounded-3xl border border-white/60 bg-white/80 p-5 text-sm shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-slate-900">{reward?.title}</span>
                    <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-purple-600">
                      {redemption.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">Code: {redemption.code}</p>
                  <p className="mt-1 text-xs text-slate-500">{redemption.createdAt.toDateString()}</p>
                </li>
              );
            })
          ) : (
            <li className="rounded-3xl border border-dashed border-white/60 bg-white/50 p-5 text-sm text-slate-500">
              Redeem a reward to see it show up here.
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
