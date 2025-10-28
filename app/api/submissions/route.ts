import { NextResponse } from 'next/server';
import { createSubmission, getStore } from '@/lib/store';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const user = await getCurrentUser();
  const store = getStore();
  let submissions = store.submissions;
  if (status) {
    submissions = submissions.filter((sub) => sub.status === status);
  }
  if (user?.role === 'tourist') {
    submissions = submissions.filter((sub) => sub.userId === user.id);
  }
  return NextResponse.json({ submissions });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const payload = await request.json();
  const submission = createSubmission({
    missionId: payload.missionId,
    userId: user.id,
    checkinType: payload.checkinType ?? 'gps',
    proofPhotoUrl: payload.proofPhotoUrl,
    notes: payload.notes
  });
  return NextResponse.json({ submission });
}
