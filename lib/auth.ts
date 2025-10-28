import 'server-only';

import { cookies } from 'next/headers';
import { IronSession, getIronSession } from 'iron-session';
import { findUserByEmail, createTourist, getStore } from './store';
import type { Role, User } from './models';

const sessionOptions = {
  password: process.env.SESSION_PASSWORD ?? 'cityquests-demo-secret-please-change',
  cookieName: 'cityquests_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
};

export type SessionData = {
  userId?: string;
};

async function getIronSessionWrapper() {
  const cookieStore = cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

export async function getSession() {
  return getIronSessionWrapper();
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session.userId) return undefined;
  return getStore().users.find((u) => u.id === session.userId);
}

export async function login(email: string) {
  const session = await getSession();
  let user = findUserByEmail(email);
  if (!user) {
    user = createTourist(email);
  }
  session.userId = user.id;
  await session.save();
  return user;
}

export async function logout() {
  const session = await getSession();
  session.destroy();
}

export async function requireRole(roles: Role[] | Role) {
  const allowed = Array.isArray(roles) ? roles : [roles];
  const user = await getCurrentUser();
  if (!user || !allowed.includes(user.role)) {
    throw new Error('Unauthorized');
  }
  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}
