import { addDays, differenceInCalendarDays } from 'date-fns';
import type { Badge, Mission, Submission, User } from './models';
import { dailyCompletionCount, getStore, updateLeaderboard } from './store';

export function canCompleteDaily(user: User, mission: Mission, date = new Date()) {
  if (!mission.isDaily) return true;
  return dailyCompletionCount(user.id, mission.id, date) === 0;
}

export function calculateStreak(user: User, submissionDate: Date) {
  if (!user.lastMissionAt) {
    return 1;
  }
  const diff = differenceInCalendarDays(submissionDate, user.lastMissionAt);
  if (diff === 1) {
    return user.streakCount + 1;
  }
  if (diff === 0) {
    return user.streakCount;
  }
  return 1;
}

export function awardBadges(user: User, badges: Badge[], mission: Mission) {
  const earned: string[] = [];
  badges.forEach((badge) => {
    if (user.badges.includes(badge.id)) return;
    switch (badge.condition) {
      case 'firstMission':
        if (user.totalPoints > 0) {
          user.badges.push(badge.id);
          earned.push(badge.id);
        }
        break;
      case 'streak5':
        if (user.streakCount >= 5) {
          user.badges.push(badge.id);
          earned.push(badge.id);
        }
        break;
      case 'streak10':
        if (user.streakCount >= 10) {
          user.badges.push(badge.id);
          earned.push(badge.id);
        }
        break;
      case 'cityExplorer':
        {
          const uniqueCategories = new Set([...user.categoriesCompleted, ...mission.categories]);
          if (uniqueCategories.size >= 5) {
            user.badges.push(badge.id);
            earned.push(badge.id);
          }
        }
        break;
      default:
        break;
    }
  });
  return earned;
}

export function updatePointsAndStreak(
  user: User,
  mission: Mission,
  submission: Submission,
  badges: Badge[]
) {
  if (!canCompleteDaily(user, mission, submission.createdAt)) {
    throw new Error('Daily mission already completed.');
  }

  user.totalPoints += mission.points;
  user.streakCount = calculateStreak(user, submission.createdAt);
  user.lastMissionAt = submission.createdAt;
  mission.categories.forEach((cat) => {
    if (!user.categoriesCompleted.includes(cat)) {
      user.categoriesCompleted.push(cat);
    }
  });
  const earned = awardBadges(user, badges, mission);

  const store = getStore();
  const cityId = user.cityId ?? mission.cityId;
  (['weekly', 'monthly', 'all'] as const).forEach((period) => {
    const existing = store.leaderboard.find(
      (entry) => entry.userId === user.id && entry.cityId === cityId && entry.period === period
    );
    const updatedPoints = (existing?.points ?? 0) + mission.points;
    updateLeaderboard({ userId: user.id, cityId, period, points: updatedPoints });
  });

  return { earnedBadges: earned, streak: user.streakCount };
}

export function isSeasonActive(mission: Mission, date = new Date()) {
  if (!mission.seasonId) return true;
  const season = getStore().seasons.find((s) => s.id === mission.seasonId);
  if (!season) return false;
  return date >= season.startAt && date <= addDays(season.endAt, 1);
}

export function isMissionAvailable(mission: Mission, date = new Date()) {
  if (mission.startAt && date < mission.startAt) return false;
  if (mission.endAt && date > mission.endAt) return false;
  return isSeasonActive(mission, date);
}

export function checkGpsDistance(
  missionOrBusiness: { lat: number; lng: number },
  provided: { lat: number; lng: number }
) {
  const R = 6371e3;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const lat1 = toRad(missionOrBusiness.lat);
  const lat2 = toRad(provided.lat);
  const dLat = toRad(provided.lat - missionOrBusiness.lat);
  const dLng = toRad(provided.lng - missionOrBusiness.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance <= 250;
}

export function nextDailyReset(date = new Date()) {
  const tomorrow = addDays(date, 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}
