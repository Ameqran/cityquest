import { getCurrentUser } from '@/lib/auth';
import { getStore, createRedemption, adjustRewardStock } from '@/lib/store';
import { RewardCard } from '@/components/RewardCard';

export default async function RewardsPage() {
  const store = getStore();
  const user = await getCurrentUser();

  async function redeemReward(formData: FormData) {
    'use server';
    const rewardId = formData.get('rewardId') as string;
    const reward = getStore().rewards.find((r) => r.id === rewardId);
    const currentUser = await getCurrentUser();
    if (!currentUser || !reward) return;
    if (currentUser.totalPoints < reward.costPoints || reward.stock <= 0) return;
    currentUser.totalPoints -= reward.costPoints;
    adjustRewardStock(reward.id, -1);
    createRedemption({ rewardId: reward.id, userId: currentUser.id });
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Rewards</h1>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {store.rewards.map((reward) => {
          const business = store.businesses.find((biz) => biz.id === reward.businessId);
          return (
            <form key={reward.id} action={redeemReward}>
              <input type="hidden" name="rewardId" value={reward.id} />
              <RewardCard reward={reward} userPoints={user?.totalPoints ?? 0} businessName={business?.name} />
              <button type="submit" className="mt-2 w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                Redeem via server action
              </button>
            </form>
          );
        })}
      </div>
    </div>
  );
}
