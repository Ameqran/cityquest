import { logout } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function LogoutPage({ params }: { params: { locale: string } }) {
  await logout();
  redirect(`/${params.locale}`);
}
