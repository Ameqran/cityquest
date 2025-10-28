import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/lib/auth';
import { getStore, createRedemption, adjustRewardStock } from '@/lib/store';
import { RewardCard } from '@/components/RewardCard';
import { PointsWallet } from '@/components/PointsWallet';

export default async function RewardsPage() {
  const t = await getTranslations('rewards');
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
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
          <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </h1>
        <p className="max-w-3xl text-sm text-slate-600 md:text-base">{t('subtitle')}</p>
      </div>
      {user ? <PointsWallet totalPoints={user.totalPoints} streak={user.streakCount} badges={user.badges} /> : null}
      <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
        {store.rewards.map((reward) => {
          const business = store.businesses.find((biz) => biz.id === reward.businessId);
          const userPoints = user?.totalPoints ?? 0;
          const missingPoints = Math.max(0, reward.costPoints - userPoints);
          const insufficientLabel = t('insufficient', { points: missingPoints });
          return (
            <form key={reward.id} action={redeemReward} className="flex h-full flex-col">
              <input type="hidden" name="rewardId" value={reward.id} />
              <RewardCard
                reward={reward}
                userPoints={userPoints}
                businessName={business?.name}
                ctaLabel={t('redeem')}
                insufficientLabel={insufficientLabel}
                soldOutLabel={t('soldOut')}
              />
            </form>
          );
        })}
      </div>
    </div>
  );
}
