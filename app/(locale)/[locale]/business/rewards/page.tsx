import { requireRole } from '@/lib/auth';
import { getStore } from '@/lib/store';
import { Badge } from '@/components/ui/badge';

export default async function BusinessRewardsPage() {
  const user = await requireRole('business');
  const store = getStore();
  const businessRewards = store.rewards.filter((reward) => store.businesses.find((biz) => biz.id === reward.businessId)?.cityId === user.cityId);

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
          <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 bg-clip-text text-transparent">
            Partner rewards
          </span>
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 md:text-base">
          Review the perks linked to your missions. Update stock levels or rotate offers to keep guests coming back.
        </p>
      </div>
      <div className="grid gap-7 md:grid-cols-2">
        {businessRewards.map((reward) => (
          <div
            key={reward.id}
            className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">{reward.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{reward.description}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold">
              <Badge variant="secondary" className="tracking-normal">
                Cost · {reward.costPoints} pts
              </Badge>
              <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-purple-600">
                Stock: {reward.stock}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
