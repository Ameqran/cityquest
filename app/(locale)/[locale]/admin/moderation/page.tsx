import { requireRole } from '@/lib/auth';

export default async function AdminModerationPage() {
  await requireRole('admin');
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Moderation</h1>
      <p className="text-muted-foreground">Reports inbox is empty. Keep exploring!</p>
    </div>
  );
}
