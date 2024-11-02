export function generateStrategySuggestions(pmfScore: number): string[] {
  if (pmfScore < 30) {
    return [
      "Focus on customer interviews to better understand pain points",
      "Iterate on your product's core features",
      "Consider pivoting if current direction shows no traction"
    ]
  } else if (pmfScore < 70) {
    return [
      "Optimize your customer acquisition channels",
      "Improve your onboarding process to increase activation",
      "Gather more customer feedback to inform product roadmap"
    ]
  } else {
    return [
      "Scale your marketing efforts",
      "Focus on customer retention and reducing churn",
      "Explore expansion opportunities in adjacent markets"
    ]
  }
}
