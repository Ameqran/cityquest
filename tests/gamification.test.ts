import { describe, it, expect, beforeEach } from 'vitest';
import { awardBadges, calculateStreak, canCompleteDaily } from '@/lib/gamification';
import { getStore, resetStore } from '@/lib/store';
import type { Submission } from '@/lib/models';

describe('gamification helpers', () => {
  beforeEach(() => {
    resetStore();
  });

  it('prevents completing daily mission twice', () => {
    const store = getStore();
    const user =
      store.users.find((u) => !u.badges.includes('badge-first')) ?? store.users.find((u) => u.role === 'tourist')!;
    const mission = store.missions.find((m) => m.isDaily) ?? store.missions[0];
    const today = new Date();
    const existingSubmission = store.submissions.find(
      (sub) => sub.missionId === mission.id && sub.status === 'approved' && sub.userId === user.id
    );
    if (!existingSubmission) {
      const approvedSubmission: Submission = {
        id: 'test-approved-sub',
        missionId: mission.id,
        userId: user.id,
        createdAt: today,
        status: 'approved',
        proofPhotoUrl: null,
        checkinType: 'qr',
        notes: null
      };
      store.submissions.push(approvedSubmission);
    }
    expect(canCompleteDaily(user, mission, today)).toBe(false);
  });

  it('increments streak when completing on consecutive days', () => {
    const store = getStore();
    const user =
      store.users.find((u) => !u.badges.includes('badge-first')) ?? store.users.find((u) => u.role === 'tourist')!;
    const mission = store.missions[0];
    const newDate = new Date(user.lastMissionAt ?? new Date());
    newDate.setDate(newDate.getDate() + 1);
    expect(calculateStreak(user, newDate)).toBe(user.streakCount + 1);
  });

  it('awards first mission badge after points increase', () => {
    const store = getStore();
    const user =
      store.users.find((u) => !u.badges.includes('badge-first')) ?? store.users.find((u) => u.role === 'tourist')!;
    user.badges = [];
    user.totalPoints = 0;
    const mission = store.missions[0];
    const earned = awardBadges(user, store.badges, mission);
    expect(earned).not.toContain('badge-first');
    user.totalPoints = 10;
    const earnedAfter = awardBadges(user, store.badges, mission);
    expect(earnedAfter).toContain('badge-first');
  });
});
