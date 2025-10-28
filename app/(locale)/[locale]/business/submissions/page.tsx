import { requireRole } from '@/lib/auth';
import { getStore, updateSubmissionStatus } from '@/lib/store';
import { updatePointsAndStreak } from '@/lib/gamification';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 bg-clip-text text-transparent">
              Review mission submissions
            </span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
            Approve explorers who completed your challenge or send a friendly rejection with notes.
          </p>
        </div>
        <Badge variant="secondary" className="tracking-normal">
          {pending.length} pending
        </Badge>
      </div>
      <div className="grid gap-4">
        {pending.map((submission) => {
          const mission = store.missions.find((m) => m.id === submission.missionId);
          return (
            <form
              key={submission.id}
              action={handleAction}
              className="grid gap-4 rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:shadow-xl md:grid-cols-[1fr_auto]"
            >
              <input type="hidden" name="submissionId" value={submission.id} />
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-slate-900">{mission?.title}</h2>
                <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">
                  Submitted: {submission.createdAt.toLocaleDateString()}
                </p>
                <p className="text-sm text-slate-600">Notes: {submission.notes ?? 'None provided'}</p>
              </div>
              <div className="flex flex-col gap-2 self-end md:flex-row">
                <Button name="status" value="approved" type="submit" className="md:min-w-[120px]">
                  Approve
                </Button>
                <Button name="status" value="rejected" type="submit" variant="outline" className="md:min-w-[120px]">
                  Reject
                </Button>
              </div>
            </form>
          );
        })}
        {!pending.length ? (
          <p className="rounded-3xl border border-dashed border-white/60 bg-white/60 px-4 py-6 text-center text-sm font-medium text-slate-500">
            All caught up! No pending submissions at the moment.
          </p>
        ) : null}
      </div>
    </div>
  );
}
