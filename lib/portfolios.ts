// Mock data and functions for portfolios
// In a real implementation, these would interact with Firebase Firestore

interface Portfolio {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  views: number
  previewUrl: string
}

const mockPortfolios: Portfolio[] = [
  {
    id: "1",
    title: "Developer Portfolio",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    views: 78,
    previewUrl: "/placeholder.svg?height=300&width=500",
  },
]

export async function getUserPortfolios(): Promise<Portfolio[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockPortfolios
}

export async function deletePortfolio(id: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log(`Deleting portfolio with id: ${id}`)
}

export async function createPortfolio(data: any): Promise<Portfolio> {
  const newPortfolio: Portfolio = {
    id: Date.now().toString(),
    title: data.title || "New Portfolio",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    views: 0,
    previewUrl: "/placeholder.svg?height=300&width=500",
  }
  return newPortfolio
}
