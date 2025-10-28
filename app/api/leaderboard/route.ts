import { NextResponse } from 'next/server';
import { getStore } from '@/lib/store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cityId = searchParams.get('city');
  const period = (searchParams.get('period') as 'weekly' | 'monthly' | 'all') ?? 'weekly';
  const entries = getStore().leaderboard.filter((entry) => {
    if (cityId && entry.cityId !== cityId) return false;
    return entry.period === period;
  });
  return NextResponse.json({ entries });
}
