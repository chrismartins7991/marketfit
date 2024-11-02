import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function PMFScoreDisplay({ score }: { score: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your PMF Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{score}/100</div>
      </CardContent>
    </Card>
  )
}
