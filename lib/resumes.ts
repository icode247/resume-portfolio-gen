// Mock data and functions for resumes
// In a real implementation, these would interact with Firebase Firestore

interface Resume {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  views: number
  downloads: number
  previewUrl: string
}

const mockResumes: Resume[] = [
  {
    id: "1",
    title: "Software Engineer Resume",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    views: 45,
    downloads: 12,
    previewUrl: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "2",
    title: "Full Stack Developer Resume",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
    views: 32,
    downloads: 8,
    previewUrl: "/placeholder.svg?height=400&width=300",
  },
]

export async function getUserResumes(): Promise<Resume[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockResumes
}

export async function deleteResume(id: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log(`Deleting resume with id: ${id}`)
}

export async function createResume(data: any): Promise<Resume> {
  const newResume: Resume = {
    id: Date.now().toString(),
    title: data.title || "New Resume",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    views: 0,
    downloads: 0,
    previewUrl: "/placeholder.svg?height=400&width=300",
  }
  return newResume
}
