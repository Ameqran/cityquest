import { requireRole } from '@/lib/auth';
import { getStore, updateSubmissionStatus } from '@/lib/store';
import { updatePointsAndStreak } from '@/lib/gamification';
import { Button } from '@/components/ui/button';

export default async function BusinessSubmissionsPage() {
  await requireRole('business');
  const store = getStore();

  async function handleAction(formData: FormData) {
    'use server';
    const submissionId = formData.get('submissionId') as string;
    const status = formData.get('status') as 'approved' | 'rejected';
    const submission = updateSubmissionStatus(submissionId, status);
    if (submission && status === 'approved') {
      const store = getStore();
      const mission = store.missions.find((m) => m.id === submission.missionId);
      const user = store.users.find((u) => u.id === submission.userId);
      if (mission && user) {
        updatePointsAndStreak(user, mission, submission, store.badges);
      }
    }
  }

  const pending = store.submissions.filter((sub) => sub.status === 'pending');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Review submissions</h1>
      <div className="space-y-4">
        {pending.map((submission) => {
          const mission = store.missions.find((m) => m.id === submission.missionId);
          return (
            <form key={submission.id} action={handleAction} className="rounded-xl border bg-card p-6 shadow-sm">
              <input type="hidden" name="submissionId" value={submission.id} />
              <h2 className="text-xl font-semibold">{mission?.title}</h2>
              <p className="text-sm text-muted-foreground">Notes: {submission.notes ?? 'None'}</p>
              <div className="mt-4 flex gap-3">
                <Button name="status" value="approved" type="submit">
                  Approve
                </Button>
                <Button name="status" value="rejected" type="submit" variant="outline">
                  Reject
                </Button>
              </div>
            </form>
          );
        })}
      </div>
    </div>
  );
}
