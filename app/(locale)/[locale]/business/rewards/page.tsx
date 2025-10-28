import { requireRole } from '@/lib/auth';
import { getStore } from '@/lib/store';

export default async function BusinessRewardsPage() {
  const user = await requireRole('business');
  const store = getStore();
  const businessRewards = store.rewards.filter((reward) => store.businesses.find((biz) => biz.id === reward.businessId)?.cityId === user.cityId);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Rewards</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {businessRewards.map((reward) => (
          <div key={reward.id} className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold">{reward.title}</h2>
            <p className="text-sm text-muted-foreground">{reward.description}</p>
            <p className="mt-2 text-sm font-semibold">Cost: {reward.costPoints} pts</p>
            <p className="text-sm text-muted-foreground">Stock: {reward.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
