import { randomUUID } from 'crypto';
import { addDays, isSameDay, subDays } from 'date-fns';
import type {
  Badge,
  City,
  LeaderboardEntry,
  Mission,
  PartnerBusiness,
  Redemption,
  Reward,
  Season,
  Submission,
  User
} from './models';

export type DataStore = {
  cities: City[];
  categories: {
    id: string;
    slug: string;
    name: string;
    icon: string;
    color: string;
  }[];
  businesses: PartnerBusiness[];
  missions: Mission[];
  rewards: Reward[];
  users: User[];
  submissions: Submission[];
  redemptions: Redemption[];
  badges: Badge[];
  seasons: Season[];
  leaderboard: LeaderboardEntry[];
};

const now = new Date();
const yesterday = subDays(now, 1);
const twoDaysAgo = subDays(now, 2);

const seedCities: City[] = [
  {
    id: 'agadir',
    name: 'Agadir',
    slug: 'agadir',
    country: 'Morocco',
    heroImage: '/logos/agadir.jpg',
    description: 'Surf-friendly coastal city with bustling souks and golden beaches.'
  },
  {
    id: 'marrakech',
    name: 'Marrakech',
    slug: 'marrakech',
    country: 'Morocco',
    heroImage: '/logos/marrakech.jpg',
    description: 'Historic red city with vibrant medina, gardens, and mountain escapes.'
  }
];

const seedCategories = [
  { id: 'cat-food', slug: 'food', name: 'Foodie', icon: 'Utensils', color: 'bg-amber-500' },
  {
    id: 'cat-culture',
    slug: 'culture',
    name: 'Culture',
    icon: 'Landmark',
    color: 'bg-indigo-500'
  },
  {
    id: 'cat-adventure',
    slug: 'adventure',
    name: 'Adventure',
    icon: 'Mountain',
    color: 'bg-emerald-500'
  },
  {
    id: 'cat-photo',
    slug: 'photography',
    name: 'Photography',
    icon: 'Camera',
    color: 'bg-sky-500'
  }
];

const seedBusinesses: PartnerBusiness[] = [
  {
    id: 'biz-agadir-cafe',
    name: 'Agadir Sunrise Cafe',
    cityId: 'agadir',
    address: '12 Beach Ave, Agadir',
    lat: 30.4278,
    lng: -9.5981,
    description: 'Coastal cafe partnering for breakfast missions.',
    logo: '/logos/agadir-cafe.png',
    qrSecret: 'agadir-cafe-secret'
  },
  {
    id: 'biz-agadir-gallery',
    name: 'Kasbah Gallery',
    cityId: 'agadir',
    address: 'Kasbah St, Agadir',
    lat: 30.4232,
    lng: -9.6025,
    description: 'Community art gallery featuring local artists.',
    logo: '/logos/agadir-gallery.png',
    qrSecret: 'agadir-gallery-secret'
  },
  {
    id: 'biz-agadir-surf',
    name: 'Surf Souls Morocco',
    cityId: 'agadir',
    address: 'Tamraght beach',
    lat: 30.5185,
    lng: -9.7042,
    description: 'Surf school offering sunrise lessons.',
    logo: '/logos/agadir-surf.png',
    qrSecret: 'agadir-surf-secret'
  },
  {
    id: 'biz-marrakech-spice',
    name: 'Spice Souk Collective',
    cityId: 'marrakech',
    address: 'Medina Market, Marrakech',
    lat: 31.6295,
    lng: -7.9811,
    description: 'Heritage spice vendors with tasting tours.',
    logo: '/logos/marrakech-spice.png',
    qrSecret: 'marrakech-spice-secret'
  },
  {
    id: 'biz-marrakech-hammam',
    name: 'Atlas Hammam',
    cityId: 'marrakech',
    address: 'Rue Yves St Laurent, Marrakech',
    lat: 31.6363,
    lng: -7.9942,
    description: 'Traditional hammam experience with modern twist.',
    logo: '/logos/marrakech-hammam.png',
    qrSecret: 'marrakech-hammam-secret'
  },
  {
    id: 'biz-marrakech-desert',
    name: 'Dunes & Stars Tours',
    cityId: 'marrakech',
    address: 'Agafay Desert Camp',
    lat: 31.2306,
    lng: -8.2066,
    description: 'Sunset camel rides and stargazing experiences.',
    logo: '/logos/marrakech-desert.png',
    qrSecret: 'marrakech-desert-secret'
  }
];

const festivalStart = subDays(now, 5);
const festivalEnd = addDays(now, 20);

const seedSeasons: Season[] = [
  {
    id: 'season-agadir-autumn',
    name: 'Agadir Autumn Festival',
    slug: 'agadir-autumn-festival',
    startAt: festivalStart,
    endAt: festivalEnd,
    description: 'Celebrate the sea breeze with limited-time missions.',
    cityId: 'agadir'
  }
];

function mission(
  id: string,
  title: string,
  cityId: string,
  categories: string[],
  tier: Mission['tier'],
  points: number,
  description: string,
  howTo: string,
  options?: Partial<Mission>
): Mission {
  return {
    id,
    title,
    cityId,
    categories,
    tier,
    points,
    description,
    howToComplete: howTo,
    requiresPhotoProof: options?.requiresPhotoProof ?? false,
    businessId: options?.businessId ?? null,
    startAt: options?.startAt,
    endAt: options?.endAt,
    seasonId: options?.seasonId,
    isDaily: options?.isDaily ?? false
  };
}

const seedMissions: Mission[] = [
  mission(
    'mission-agadir-breakfast',
    'Sunrise Breakfast Club',
    'agadir',
    ['food', 'culture'],
    'easy',
    15,
    'Enjoy a Moroccan breakfast with ocean views.',
    'Order the mint tea and amlou toast special.',
    { businessId: 'biz-agadir-cafe', requiresPhotoProof: true, isDaily: true }
  ),
  mission(
    'mission-agadir-surf',
    'First Wave Session',
    'agadir',
    ['adventure'],
    'hard',
    60,
    'Catch a sunrise wave with the Surf Souls team.',
    'Check in with the instructor and ride a wave.',
    {
      businessId: 'biz-agadir-surf',
      requiresPhotoProof: true,
      seasonId: 'season-agadir-autumn'
    }
  ),
  mission(
    'mission-agadir-gallery',
    'Kasbah Art Hunt',
    'agadir',
    ['culture', 'photography'],
    'medium',
    35,
    'Find the featured local artist piece inside the gallery.',
    'Use the QR code near the painting to log your visit.',
    { businessId: 'biz-agadir-gallery' }
  ),
  mission(
    'mission-agadir-market',
    'Souk Spice Sampler',
    'agadir',
    ['food'],
    'easy',
    20,
    'Sample three different spice blends from the market.',
    'Record the flavors you liked best.',
    { requiresPhotoProof: false, isDaily: true }
  ),
  mission(
    'mission-agadir-promenade',
    'Promenade Sunset Shot',
    'agadir',
    ['photography'],
    'medium',
    30,
    'Capture the perfect sunset shot along the promenade.',
    'Upload your favorite photo.',
    { requiresPhotoProof: true }
  ),
  mission(
    'mission-agadir-festival',
    'Festival Stage Check-in',
    'agadir',
    ['culture', 'adventure'],
    'medium',
    40,
    'Join a live performance during the autumn festival.',
    'Check in via GPS near the main stage.',
    {
      seasonId: 'season-agadir-autumn',
      requiresPhotoProof: false,
      isDaily: false
    }
  ),
  mission(
    'mission-agadir-kasbah',
    'Kasbah Sunrise Hike',
    'agadir',
    ['adventure'],
    'hard',
    55,
    'Hike to the Kasbah viewpoint for sunrise.',
    'Track your hike and share a note about the experience.',
    { requiresPhotoProof: false }
  ),
  mission(
    'mission-marrakech-food',
    'Medina Tasting Trail',
    'marrakech',
    ['food', 'culture'],
    'medium',
    35,
    'Taste three street food favorites recommended by locals.',
    'Collect flavor notes and redeem at Spice Souk.',
    { businessId: 'biz-marrakech-spice', requiresPhotoProof: false }
  ),
  mission(
    'mission-marrakech-garden',
    'Majorelle Morning Sketch',
    'marrakech',
    ['photography', 'culture'],
    'easy',
    20,
    'Sketch or photograph your favorite garden detail.',
    'Share your artistic take.',
    { requiresPhotoProof: true }
  ),
  mission(
    'mission-marrakech-hammam',
    'Atlas Hammam Ritual',
    'marrakech',
    ['culture'],
    'medium',
    40,
    'Experience the hammam ritual and share a reflection.',
    'Check-in at the hammam reception.',
    { businessId: 'biz-marrakech-hammam', requiresPhotoProof: false }
  ),
  mission(
    'mission-marrakech-desert',
    'Agafay Sunset Camel Ride',
    'marrakech',
    ['adventure'],
    'hard',
    65,
    'Ride a camel across the Agafay dunes at sunset.',
    'Upload a photo proof with the dunes.',
    { businessId: 'biz-marrakech-desert', requiresPhotoProof: true }
  ),
  mission(
    'mission-marrakech-market',
    'Souk Artisan Stories',
    'marrakech',
    ['culture'],
    'easy',
    15,
    'Interview an artisan about their craft and write a note.',
    'Submit your story summary.',
    { requiresPhotoProof: false, isDaily: true }
  ),
  mission(
    'mission-marrakech-street',
    'Street Music Session',
    'marrakech',
    ['culture', 'photography'],
    'medium',
    30,
    'Record street musicians performing in Jemaa el-Fnaa.',
    'Share a clip description or photo.',
    { requiresPhotoProof: true }
  ),
  mission(
    'mission-marrakech-spice',
    'Spice Blending Workshop',
    'marrakech',
    ['food'],
    'medium',
    35,
    'Blend your own ras el hanout with the spice experts.',
    'Check-in via QR code.',
    { businessId: 'biz-marrakech-spice', requiresPhotoProof: false }
  )
];

const seedRewards: Reward[] = [
  {
    id: 'reward-agadir-coffee',
    businessId: 'biz-agadir-cafe',
    title: 'Free Mint Tea',
    description: 'Redeem for a cup of traditional mint tea.',
    costPoints: 30,
    stock: 20
  },
  {
    id: 'reward-agadir-breakfast',
    businessId: 'biz-agadir-cafe',
    title: 'Breakfast for Two',
    description: 'Complimentary breakfast for two guests.',
    costPoints: 80,
    stock: 5
  },
  {
    id: 'reward-agadir-art',
    businessId: 'biz-agadir-gallery',
    title: 'Gallery Print',
    description: 'Limited edition postcard from Kasbah Gallery.',
    costPoints: 40,
    stock: 15
  },
  {
    id: 'reward-agadir-surf',
    businessId: 'biz-agadir-surf',
    title: 'Surf Lesson Discount',
    description: '50% off next surf lesson.',
    costPoints: 90,
    stock: 10
  },
  {
    id: 'reward-marrakech-spice',
    businessId: 'biz-marrakech-spice',
    title: 'Spice Gift Pack',
    description: 'Take home a sampler of local spices.',
    costPoints: 70,
    stock: 12
  },
  {
    id: 'reward-marrakech-hammam',
    businessId: 'biz-marrakech-hammam',
    title: 'Hammam Entry',
    description: 'One complimentary hammam session.',
    costPoints: 120,
    stock: 6
  },
  {
    id: 'reward-marrakech-desert',
    businessId: 'biz-marrakech-desert',
    title: 'Sunset Tour Upgrade',
    description: 'Upgrade to private campfire experience.',
    costPoints: 100,
    stock: 8
  }
];

const seedBadges: Badge[] = [
  {
    id: 'badge-first',
    name: 'First Mission',
    description: 'Completed first mission.',
    condition: 'firstMission',
    icon: 'Sparkles'
  },
  {
    id: 'badge-streak-5',
    name: 'Five Day Streak',
    description: 'Completed missions five days in a row.',
    condition: 'streak5',
    icon: 'Flame'
  },
  {
    id: 'badge-streak-10',
    name: 'Ten Day Streak',
    description: 'Ten consecutive days of adventure.',
    condition: 'streak10',
    icon: 'Crown'
  },
  {
    id: 'badge-city-explorer',
    name: 'City Explorer',
    description: 'Completed missions in five categories.',
    condition: 'cityExplorer',
    icon: 'MapPin'
  }
];

const seedUsers: User[] = [
  {
    id: 'user-tourist',
    email: 'tourist@demo.app',
    displayName: 'Amina Traveler',
    role: 'tourist',
    cityId: 'agadir',
    avatarUrl: null,
    totalPoints: 120,
    streakCount: 3,
    lastMissionAt: yesterday,
    badges: ['badge-first'],
    categoriesCompleted: ['food', 'culture', 'photography']
  },
  {
    id: 'user-business',
    email: 'biz@demo.app',
    displayName: 'Hassan Cafe Owner',
    role: 'business',
    cityId: 'agadir',
    avatarUrl: null,
    totalPoints: 0,
    streakCount: 0,
    lastMissionAt: null,
    badges: [],
    categoriesCompleted: []
  },
  {
    id: 'user-admin',
    email: 'admin@demo.app',
    displayName: 'Admin Layla',
    role: 'admin',
    cityId: null,
    avatarUrl: null,
    totalPoints: 0,
    streakCount: 0,
    lastMissionAt: null,
    badges: [],
    categoriesCompleted: []
  }
];

const seedSubmissions: Submission[] = [
  {
    id: 'sub-1',
    missionId: 'mission-agadir-breakfast',
    userId: 'user-tourist',
    createdAt: twoDaysAgo,
    status: 'approved',
    proofPhotoUrl: '/proofs/breakfast.jpg',
    checkinType: 'qr',
    notes: 'Delicious!'
  },
  {
    id: 'sub-2',
    missionId: 'mission-agadir-promenade',
    userId: 'user-tourist',
    createdAt: yesterday,
    status: 'approved',
    proofPhotoUrl: '/proofs/sunset.jpg',
    checkinType: 'gps',
    notes: 'Amazing sky colors'
  },
  {
    id: 'sub-3',
    missionId: 'mission-agadir-market',
    userId: 'user-tourist',
    createdAt: now,
    status: 'pending',
    proofPhotoUrl: null,
    checkinType: 'gps',
    notes: 'Spicy!'
  }
];

const seedRedemptions: Redemption[] = [
  {
    id: 'red-1',
    userId: 'user-tourist',
    rewardId: 'reward-agadir-coffee',
    createdAt: yesterday,
    status: 'approved',
    code: 'AGADIR-TEA-1'
  },
  {
    id: 'red-2',
    userId: 'user-tourist',
    rewardId: 'reward-agadir-art',
    createdAt: now,
    status: 'pending',
    code: 'AGADIR-ART-2'
  }
];

const seedLeaderboard: LeaderboardEntry[] = [
  { userId: 'user-tourist', cityId: 'agadir', period: 'weekly', points: 90 },
  { userId: 'user-tourist', cityId: 'agadir', period: 'monthly', points: 120 },
  { userId: 'user-tourist', cityId: 'agadir', period: 'all', points: 200 },
  { userId: 'user-tourist', cityId: 'marrakech', period: 'weekly', points: 25 }
];

const store: DataStore = {
  cities: seedCities,
  categories: seedCategories,
  businesses: seedBusinesses,
  missions: seedMissions,
  rewards: seedRewards,
  users: seedUsers,
  submissions: seedSubmissions,
  redemptions: seedRedemptions,
  badges: seedBadges,
  seasons: seedSeasons,
  leaderboard: seedLeaderboard
};

export function getStore() {
  return store;
}

export function findUserByEmail(email: string) {
  return store.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function createTourist(email: string) {
  const id = `user-${randomUUID()}`;
  const user: User = {
    id,
    email,
    displayName: email.split('@')[0] ?? 'Traveler',
    role: 'tourist',
    cityId: 'agadir',
    avatarUrl: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(email)}`,
    totalPoints: 0,
    streakCount: 0,
    lastMissionAt: null,
    badges: [],
    categoriesCompleted: []
  };
  store.users.push(user);
  return user;
}

export function upsertSubmission(submission: Submission) {
  const existingIndex = store.submissions.findIndex((s) => s.id === submission.id);
  if (existingIndex >= 0) {
    store.submissions[existingIndex] = submission;
  } else {
    store.submissions.push(submission);
  }
  return submission;
}

export function createSubmission(data: {
  missionId: string;
  userId: string;
  checkinType: Submission['checkinType'];
  proofPhotoUrl?: string | null;
  notes?: string | null;
}) {
  const submission: Submission = {
    id: `sub-${randomUUID()}`,
    missionId: data.missionId,
    userId: data.userId,
    createdAt: new Date(),
    status: 'pending',
    proofPhotoUrl: data.proofPhotoUrl ?? null,
    checkinType: data.checkinType,
    notes: data.notes ?? null
  };
  store.submissions.push(submission);
  return submission;
}

export function updateSubmissionStatus(
  id: string,
  status: Submission['status']
): Submission | undefined {
  const submission = store.submissions.find((s) => s.id === id);
  if (!submission) return undefined;
  submission.status = status;
  return submission;
}

export function createRedemption(data: { userId: string; rewardId: string }) {
  const redemption: Redemption = {
    id: `red-${randomUUID()}`,
    userId: data.userId,
    rewardId: data.rewardId,
    createdAt: new Date(),
    status: 'pending',
    code: `QR-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
  };
  store.redemptions.push(redemption);
  return redemption;
}

export function updateRedemptionStatus(
  id: string,
  status: Redemption['status']
): Redemption | undefined {
  const redemption = store.redemptions.find((r) => r.id === id);
  if (!redemption) return undefined;
  redemption.status = status;
  return redemption;
}

export function adjustRewardStock(rewardId: string, delta: number) {
  const reward = store.rewards.find((r) => r.id === rewardId);
  if (reward) {
    reward.stock += delta;
  }
  return reward;
}

export function updateLeaderboard(entry: LeaderboardEntry) {
  const existing = store.leaderboard.find(
    (e) => e.userId === entry.userId && e.cityId === entry.cityId && e.period === entry.period
  );
  if (existing) {
    existing.points = entry.points;
  } else {
    store.leaderboard.push(entry);
  }
}

export function dailyCompletionCount(userId: string, missionId: string, date: Date) {
  return store.submissions.filter(
    (sub) =>
      sub.userId === userId &&
      sub.missionId === missionId &&
      sub.status === 'approved' &&
      isSameDay(sub.createdAt, date)
  ).length;
}

export function getUserSubmissions(userId: string) {
  return store.submissions.filter((sub) => sub.userId === userId);
}

export function getUserRedemptions(userId: string) {
  return store.redemptions.filter((red) => red.userId === userId);
}

export function resetStore() {
  store.cities = [...seedCities];
  store.categories = [...seedCategories];
  store.businesses = [...seedBusinesses];
  store.missions = [...seedMissions];
  store.rewards = [...seedRewards];
  store.users = [...seedUsers];
  store.submissions = [...seedSubmissions];
  store.redemptions = [...seedRedemptions];
  store.badges = [...seedBadges];
  store.seasons = [...seedSeasons];
  store.leaderboard = [...seedLeaderboard];
}
