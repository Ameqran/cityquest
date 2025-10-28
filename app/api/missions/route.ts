import { NextResponse } from 'next/server';
import { getStore } from '@/lib/store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const store = getStore();
  const city = searchParams.get('city');
  const category = searchParams.get('category');
  const tier = searchParams.get('tier');
  const season = searchParams.get('season');
  const search = searchParams.get('search');

  const missions = store.missions.filter((mission) => {
    if (city && mission.cityId !== city) return false;
    if (category && !mission.categories.includes(category)) return false;
    if (tier && mission.tier !== tier) return false;
    if (season && mission.seasonId !== season) return false;
    if (search && !mission.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return NextResponse.json({ missions });
}
