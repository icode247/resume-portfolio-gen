"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { Download, ExternalLink, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { getUserResumes, deleteResume, incrementResumeDownloads } from "@/lib/database"
import { useAuth } from "@/hooks/use-auth"
import type { Resume } from "@/lib/database"

export function ResumeList() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    const fetchResumes = async () => {
      if (!user) return

      try {
        const data = await getUserResumes(user.uid)
        setResumes(data)
      } catch (error) {
        console.error("Error fetching resumes:", error)
        toast({
          title: "Error",
          description: "Failed to load resumes. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchResumes()
  }, [user, toast])

  const handleDelete = async (id: string) => {
    try {
      await deleteResume(id)
      setResumes(resumes.filter((resume) => resume.id !== id))
      toast({
        title: "Resume deleted",
        description: "Your resume has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete resume. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDownload = async (id: string) => {
    try {
      await incrementResumeDownloads(id)
      // Update local state
      setResumes(
        resumes.map((resume) => (resume.id === id ? { ...resume, downloads: (resume.downloads || 0) + 1 } : resume)),
      )

      toast({
        title: "Download started",
        description: "Your resume is being downloaded.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download resume. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (resumes.length === 0) {
    return (
      <EmptyPlaceholder
        title="No resumes found"
        description="You haven't created any resumes yet. Create your first resume to get started."
        action={<Button onClick={() => (window.location.href = "/generate")}>Create Resume</Button>}
      />
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {resumes.map((resume) => (
        <Card key={resume.id}>
          <CardHeader className="p-4">
            <div className="flex items-start justify-between">
              <CardTitle className="line-clamp-1">{resume.title}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => (window.location.href = `/preview/${resume.id}`)}>
                    View
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem onClick={() => (window.location.href = `/edit/${resume.id}`)}>
                    Edit
                  </DropdownMenuItem> */}
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(resume.id)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-[3/4] relative overflow-hidden">
              <img
                src={resume.content.avatar}
                alt={resume.title}
                className="object-cover w-full h-full"
              />
            </div>
          </CardContent>
          <CardFooter className="p-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <p>Views: {resume.views || 0}</p>
              <p>Downloads: {resume.downloads || 0}</p>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" onClick={() => handleDownload(resume.id)}>
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
              <Button size="icon" variant="outline" onClick={() => (window.location.href = `/preview/${resume.id}`)}>
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">View</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
