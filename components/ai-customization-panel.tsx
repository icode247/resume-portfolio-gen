"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Wand2, MessageSquare, Loader2, Check, X } from "lucide-react"
import { processAICustomization } from "@/lib/ai-customization"

interface AICustomizationPanelProps {
  data: any
  onDataUpdate: (newData: any) => void
  templateType: "resume" | "portfolio"
}

export function AICustomizationPanel({ data, onDataUpdate, templateType }: AICustomizationPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [recentChanges, setRecentChanges] = useState<string[]>([])
  const { toast } = useToast()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type.startsWith("image/")) {
        setUploadedFile(file)
        toast({
          title: "Image uploaded",
          description: "You can now reference this image in your AI prompt.",
        })
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, etc.)",
          variant: "destructive",
        })
      }
    }
  }

  const handleAICustomization = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter what you'd like to change.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      // Convert uploaded file to URL if exists
      let imageUrl = null
      if (uploadedFile) {
        // Create a blob URL for the uploaded image
        imageUrl = URL.createObjectURL(uploadedFile)
      }

      const result = await processAICustomization({
        prompt,
        currentData: data,
        templateType,
        imageUrl,
        imageName: uploadedFile?.name,
      })

      if (result.success) {
        onDataUpdate(result.updatedData)
        setRecentChanges((prev) => [result.changeDescription, ...prev.slice(0, 4)])
        setPrompt("")
        setUploadedFile(null)

        toast({
          title: "Changes applied!",
          description: result.changeDescription,
        })
      } else {
        toast({
          title: "Error processing request",
          description: result.error || "Please try rephrasing your request.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("AI customization error:", error)
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const examplePrompts = [
    "Add React Native to my skills",
    "Change my location to New York, NY",
    "Update my bio to mention I'm a full-stack developer",
    "Add a new project called 'Weather App' built with Next.js",
    "Change the demo link of my first project to https://myapp.com",
    "Remove Python from my skills",
    "Add 2 years experience as Frontend Developer at Google",
    "Update my email to john.doe@gmail.com",
  ]

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-4"
        >
          <Wand2 className="h-5 w-5 mr-2" />
          AI Customize
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96">
      <Card className="bg-gray-900 border-gray-700 shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-purple-400" />
              <CardTitle className="text-white">AI Customization</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription className="text-gray-400">
            Tell me what you'd like to change in your {templateType}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* File Upload */}
          <div>
            <Label htmlFor="image-upload" className="text-sm font-medium text-gray-300">
              Upload Image (optional)
            </Label>
            <div className="mt-1">
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="bg-gray-800 border-gray-600 text-gray-300"
              />
              {uploadedFile && (
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-600 text-white">
                    <Check className="h-3 w-3 mr-1" />
                    {uploadedFile.name}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* AI Prompt */}
          <div>
            <Label htmlFor="ai-prompt" className="text-sm font-medium text-gray-300">
              What would you like to change?
            </Label>
            <Textarea
              id="ai-prompt"
              placeholder="e.g., 'Add this photo as my profile picture' or 'Add React to my skills' or 'Change my first project's demo link to https://myapp.com'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mt-1 bg-gray-800 border-gray-600 text-gray-300 min-h-[80px]"
            />
          </div>

          {/* Action Button */}
          <Button
            onClick={handleAICustomization}
            disabled={isProcessing || !prompt.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <MessageSquare className="h-4 w-4 mr-2" />
                Apply Changes
              </>
            )}
          </Button>

          {/* Recent Changes */}
          {recentChanges.length > 0 && (
            <div>
              <Label className="text-sm font-medium text-gray-300">Recent Changes</Label>
              <div className="mt-2 space-y-1">
                {recentChanges.map((change, index) => (
                  <div key={index} className="text-xs text-gray-400 bg-gray-800 p-2 rounded">
                    {change}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Example Prompts */}
          <div>
            <Label className="text-sm font-medium text-gray-300">Example prompts:</Label>
            <div className="mt-2 flex flex-wrap gap-1">
              {examplePrompts.slice(0, 4).map((example, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs cursor-pointer hover:bg-gray-700 border-gray-600 text-gray-400"
                  onClick={() => setPrompt(example)}
                >
                  {example}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
