import { ReactNode } from 'react';
import { Role } from '@/lib/models';
import { getCurrentUser } from '@/lib/auth';

interface RoleGuardProps {
  roles: Role[];
  children: ReactNode;
}

export async function RoleGuard({ roles, children }: RoleGuardProps) {
  const user = await getCurrentUser();
  if (!user || !roles.includes(user.role)) {
    return <p className="text-sm text-muted-foreground">You do not have access to this area.</p>;
  }
  return <>{children}</>;
}
