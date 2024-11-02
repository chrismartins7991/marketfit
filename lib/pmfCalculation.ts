export function calculatePMFScore(data: {
  revenue: number;
  customerSatisfaction: number;
}) {
  const revenueScore = Math.min(data.revenue / 1000000, 50) // Max 50 points for revenue
  const satisfactionScore = data.customerSatisfaction * 5 // Max 50 points for satisfaction

  return Math.round(revenueScore + satisfactionScore)
}
