import { NextResponse } from 'next/server';
import { getStore } from '@/lib/store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const store = getStore();
  const cityId = searchParams.get('city');
  const businessId = searchParams.get('businessId');
  const rewards = store.rewards.filter((reward) => {
    if (businessId && reward.businessId !== businessId) return false;
    if (cityId) {
      const business = store.businesses.find((biz) => biz.id === reward.businessId);
      if (business?.cityId !== cityId) return false;
    }
    return true;
  });
  return NextResponse.json({ rewards });
}
