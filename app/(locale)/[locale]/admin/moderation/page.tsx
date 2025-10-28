import { requireRole } from '@/lib/auth';
import { Badge } from '@/components/ui/badge';

export default async function AdminModerationPage() {
  await requireRole('admin');
  return (
    <div className="space-y-6">
      <Badge variant="secondary" className="tracking-normal">
        Safety inbox
      </Badge>
      <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
        <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-500 bg-clip-text text-transparent">
          Moderation
        </span>
      </h1>
      <p className="rounded-3xl border border-white/60 bg-white/70 px-5 py-4 text-sm font-medium text-slate-600 shadow-sm backdrop-blur">
        Reports inbox is empty. Keep exploring!
      </p>
    </div>
  );
}
