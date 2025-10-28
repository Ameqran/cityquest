import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth';
import { getStore } from '@/lib/store';

export async function GET() {
  const user = await requireRole('business');
  const store = getStore();
  const submissions = store.submissions.filter((sub) => sub.status === 'pending').length;
  const redemptions = store.redemptions.filter((red) => red.status === 'pending').length;
  const missions = store.missions.filter((mission) => mission.cityId === user.cityId).length;
  return NextResponse.json({ submissions, redemptions, missions });
}
