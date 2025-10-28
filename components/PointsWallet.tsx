import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface PointsWalletProps {
  totalPoints: number;
  streak: number;
  badges: string[];
}

export function PointsWallet({ totalPoints, streak, badges }: PointsWalletProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet</CardTitle>
        <CardDescription>Track your points and streaks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Total Points</p>
          <p className="text-2xl font-semibold">{totalPoints}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Current streak</p>
          <p className="text-xl font-semibold">{streak} days</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Badges</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            {badges.length ? badges.map((badge) => <span key={badge} className="rounded-full bg-muted px-3 py-1">{badge}</span>) : (
              <span className="text-muted-foreground">No badges yet</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
