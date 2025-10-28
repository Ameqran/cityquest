import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth';
import { getStore, updateSubmissionStatus } from '@/lib/store';
import { updatePointsAndStreak } from '@/lib/gamification';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  await requireRole(['business', 'admin']);
  const store = getStore();
  const submission = store.submissions.find((sub) => sub.id === params.id);
  if (!submission) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const mission = store.missions.find((m) => m.id === submission.missionId);
  const targetUser = store.users.find((u) => u.id === submission.userId);
  if (!mission || !targetUser) return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
  updateSubmissionStatus(submission.id, 'approved');
  updatePointsAndStreak(targetUser, mission, submission, store.badges);
  return NextResponse.json({ submission });
}
