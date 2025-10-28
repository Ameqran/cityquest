import { LeaderboardEntry, User } from '@/lib/models';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  users: User[];
}

export function Leaderboard({ entries, users }: LeaderboardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top explorers</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-3">
          {entries.map((entry, index) => {
            const user = users.find((u) => u.id === entry.userId);
            return (
              <li key={entry.userId} className="flex items-center justify-between rounded-lg bg-muted/60 p-3">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-semibold">#{index + 1}</span>
                  <div>
                    <p className="text-sm font-medium">{user?.displayName ?? entry.userId}</p>
                    <p className="text-xs text-muted-foreground">{entry.period.toUpperCase()}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold">{entry.points} pts</span>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
