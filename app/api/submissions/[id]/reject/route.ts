import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth';
import { updateSubmissionStatus } from '@/lib/store';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  await requireRole(['business', 'admin']);
  const submission = updateSubmissionStatus(params.id, 'rejected');
  if (!submission) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ submission });
}
