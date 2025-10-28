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
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Welcome, {user.displayName}</h1>
      <PointsWallet totalPoints={user.totalPoints} streak={user.streakCount} badges={user.badges} />
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Recent submissions</h2>
        <ul className="space-y-3">
          {submissions.map((submission) => {
            const mission = store.missions.find((m) => m.id === submission.missionId);
            return (
              <li key={submission.id} className="rounded-xl border bg-card p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{mission?.title}</span>
                  <span className="uppercase text-muted-foreground">{submission.status}</span>
                </div>
                <p className="text-xs text-muted-foreground">{submission.createdAt.toDateString()}</p>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Redemptions</h2>
        <ul className="space-y-3">
          {redemptions.map((redemption) => {
            const reward = store.rewards.find((r) => r.id === redemption.rewardId);
            return (
              <li key={redemption.id} className="rounded-xl border bg-card p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{reward?.title}</span>
                  <span className="uppercase text-muted-foreground">{redemption.status}</span>
                </div>
                <p className="text-xs text-muted-foreground">Code: {redemption.code}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
