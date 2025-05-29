"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Share2, Edit, Download } from "lucide-react"
import { getGeneratedContent } from "@/lib/generator"
import { TemplateSelector } from "@/components/template-selector"
import { AIChatPanel } from "@/components/ai-chat-panel"
import { incrementResumeViews, incrementResumeDownloads } from "@/lib/database"
import { handleDownload } from "@/lib/download-handler"

export default function PreviewPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)
  const [currentTemplateType, setCurrentTemplateType] = useState<"resume" | "portfolio" | "cover-letter">("portfolio")
  const [downloadingStates, setDownloadingStates] = useState<{[key: string]: boolean}>({})
  const id = params.id as string

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getGeneratedContent(id)
        setData(result)

        // Track view
        if (id && !id.startsWith("temp-")) {
          await incrementResumeViews(id)
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load preview. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, toast])

  const handleDownloadTemplate = async (templateType: string, templateName: string) => {
    const downloadKey = `${templateType}-${templateName}`
    
    try {
      // Set loading state for this specific template
      setDownloadingStates(prev => ({ ...prev, [downloadKey]: true }))

      // Track download
      if (id && !id.startsWith("temp-")) {
        await incrementResumeDownloads(id)
      }

      toast({
        title: "Preparing download...",
        description: `Your ${templateType} (${templateName}) is being prepared.`,
      })

      // Call the download handler
      const result = await handleDownload(templateType, templateName, data)

      if (result.success) {
        toast({
          title: "Download successful!",
          description: result.message,
        })
      } else {
        throw new Error(result.message)
      }

    } catch (error) {
      console.error('Download error:', error)
      toast({
        title: "Download failed",
        description: error instanceof Error ? error.message : "Failed to download. Please try again.",
        variant: "destructive",
      })
    } finally {
      // Remove loading state
      setDownloadingStates(prev => ({ ...prev, [downloadKey]: false }))
    }
  }

  const handlePreview = (templateType: string, templateName: string) => {
    // Update current template type for AI context
    if (templateType.includes("resume")) {
      setCurrentTemplateType("resume")
    } else if (templateType.includes("cover")) {
      setCurrentTemplateType("cover-letter")
    } else {
      setCurrentTemplateType("portfolio")
    }

    toast({
      title: "Opening preview",
      description: `Loading ${templateType} - ${templateName} preview`,
    })

    // Here you would open a full preview modal or new tab
    console.log(`Previewing ${templateType} - ${templateName}`)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied!",
      description: "Share link has been copied to clipboard.",
    })
  }

  const handleDataUpdate = (newData: any) => {
    setData(newData)
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your generated content...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="container py-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold text-white">Content not found</h1>
            <p className="text-gray-400">The requested content could not be found.</p>
            <Button onClick={() => router.push("/generate")}>Generate New</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container py-4 m-auto">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard")}
              className="gap-2 text-gray-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleShare}
                className="gap-2 border-gray-600 text-gray-300 hover:text-white"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              {/* <Button
                variant="outline"
                onClick={() => router.push(`/edit/${id}`)}
                className="gap-2 border-gray-600 text-gray-300 hover:text-white"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8 m-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 text-white">Your Content is Ready! 🎉</h1>
            <p className="text-xl text-gray-400">Choose from our professional templates to showcase your work</p>
          </div>

          <TemplateSelector 
            data={data} 
            onDownload={handleDownloadTemplate}
            onPreview={handlePreview}
            downloadingStates={downloadingStates}
          />
        </div>
      </div>

      {/* AI Chat Panel */}
      <AIChatPanel data={data} onDataUpdate={handleDataUpdate} templateType={currentTemplateType} />
    </div>
  )
}