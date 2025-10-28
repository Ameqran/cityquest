import { describe, it, expect, beforeEach } from 'vitest';
import { awardBadges, calculateStreak, canCompleteDaily } from '@/lib/gamification';
import { getStore, resetStore } from '@/lib/store';

describe('gamification helpers', () => {
  beforeEach(() => {
    resetStore();
  });

  it('prevents completing daily mission twice', () => {
    const store = getStore();
    const user = store.users[0];
    const mission = store.missions.find((m) => m.isDaily) ?? store.missions[0];
    const submission = store.submissions.find((sub) => sub.missionId === mission.id && sub.status === 'approved');
    expect(canCompleteDaily(user, mission, submission?.createdAt ?? new Date())).toBe(false);
  });

  it('increments streak when completing on consecutive days', () => {
    const store = getStore();
    const user = store.users[0];
    const mission = store.missions[0];
    const newDate = new Date(user.lastMissionAt ?? new Date());
    newDate.setDate(newDate.getDate() + 1);
    expect(calculateStreak(user, newDate)).toBe(user.streakCount + 1);
  });

  it('awards first mission badge after points increase', () => {
    const store = getStore();
    const user = store.users[0];
    user.totalPoints = 0;
    const mission = store.missions[0];
    const earned = awardBadges(user, store.badges, mission);
    expect(earned).not.toContain('badge-first');
    user.totalPoints = 10;
    const earnedAfter = awardBadges(user, store.badges, mission);
    expect(earnedAfter).toContain('badge-first');
  });
});
