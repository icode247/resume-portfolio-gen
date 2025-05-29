"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import {
  Wand2,
  Send,
  X,
  Minimize2,
  Maximize2,
  History,
  Lightbulb,
  Upload,
  User,
  Bot,
  Loader2,
  Check,
} from "lucide-react"
import { processAICustomization } from "@/lib/ai-customization"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  status?: "sending" | "success" | "error"
  changes?: string[]
}

interface AIChatPanelProps {
  data: any
  onDataUpdate: (newData: any) => void
  templateType: "resume" | "portfolio" | "cover-letter"
}

export function AIChatPanel({ data, onDataUpdate, templateType }: AIChatPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content: `Hi! I'm your AI assistant. I can help you customize your ${templateType}. Try saying something like "Add React to my skills" or "Change my location to New York".`,
      timestamp: new Date(),
      status: "success",
    },
  ])
  
  const [inputValue, setInputValue] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [showExamples, setShowExamples] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const examplePrompts = [
    "Add TypeScript to my skills",
    "Change my location to San Francisco, CA",
    "Update my bio to mention I'm a full-stack developer",
    "Add a new project called 'E-commerce App' built with Next.js and Stripe",
    "Change the demo link of my first project to https://myapp.com",
    "Remove Python from my skills",
    "Add 3 years experience as Senior Developer at Google",
    "Update my email to john.doe@gmail.com",
    "Add this photo as my profile picture",
    "Change my phone number to +1 (555) 123-4567",
  ]

  const recentChanges = messages
    .filter((msg) => msg.type === "assistant" && msg.changes)
    .flatMap((msg) => msg.changes || [])
    .slice(0, 5)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type.startsWith("image/")) {
        setUploadedFile(file)
        toast({
          title: "Image uploaded",
          description: "You can now reference this image in your message.",
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

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !uploadedFile) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue.trim() || "Uploaded an image",
      timestamp: new Date(),
      status: "success",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsProcessing(true)

    // Add processing message
    const processingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "assistant",
      content: "Processing your request...",
      timestamp: new Date(),
      status: "sending",
    }

    setMessages((prev) => [...prev, processingMessage])

    try {
      // Convert uploaded file to URL if exists
      let imageUrl = null
      if (uploadedFile) {
        imageUrl = URL.createObjectURL(uploadedFile)
      }

      // Use type assertion to handle 'cover-letter' case (TypeScript issue)
      // In practice the function will treat cover-letter similar to resume format
      const safeTemplateType = templateType === 'cover-letter' ? 'resume' as const : templateType;
      
      const result = await processAICustomization({
        prompt: userMessage.content,
        currentData: data,
        templateType: safeTemplateType,
        imageUrl,
        imageName: uploadedFile?.name,
      })

      // Remove processing message and add result
      setMessages((prev) => prev.filter((msg) => msg.id !== processingMessage.id))

      if (result.success) {
        onDataUpdate(result.updatedData)
        console.log(result.updatedData)

        const successMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: "assistant",
          content: `✅ ${result.changeDescription}`,
          timestamp: new Date(),
          status: "success",
          changes: [result.changeDescription || ""],
        }

        setMessages((prev) => [...prev, successMessage])
        setUploadedFile(null)

        toast({
          title: "Changes applied!",
          description: result.changeDescription,
        })
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: "assistant",
          content: `❌ ${result.error || "I couldn't process your request. Please try rephrasing it."}`,
          timestamp: new Date(),
          status: "error",
        }

        setMessages((prev) => [...prev, errorMessage])
      }
    } catch (error) {
      console.error("AI customization error:", error)

      setMessages((prev) => prev.filter((msg) => msg.id !== processingMessage.id))

      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: "assistant",
        content: "❌ Something went wrong. Please try again.",
        timestamp: new Date(),
        status: "error",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleExampleClick = (example: string) => {
    setInputValue(example)
    setShowExamples(false)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-4 h-14 w-14"
              >
                <Wand2 className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>AI Customize</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
      }`}
    >
      <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Wand2 className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{isProcessing ? "Thinking..." : "Online"}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowExamples(!showExamples)}
                    className="h-8 w-8 p-0"
                  >
                    <Lightbulb className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Example prompts</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowHistory(!showHistory)}
                    className="h-8 w-8 p-0"
                  >
                    <History className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Recent changes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)} className="h-8 w-8 p-0">
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Examples Panel */}
            {showExamples && (
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <h4 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">Example prompts:</h4>
                <div className="flex flex-wrap gap-1">
                  {examplePrompts.slice(0, 6).map((example, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => handleExampleClick(example)}
                    >
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* History Panel */}
            {showHistory && (
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <h4 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">Recent changes:</h4>
                {recentChanges.length > 0 ? (
                  <div className="space-y-1">
                    {recentChanges.map((change, index) => (
                      <div
                        key={index}
                        className="text-xs text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 p-2 rounded border"
                      >
                        {change}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 dark:text-gray-400">No changes yet</p>
                )}
              </div>
            )}

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.type === "assistant" && (
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        {message.status === "sending" ? (
                          <Loader2 className="h-4 w-4 text-white animate-spin" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 ${
                        message.type === "user"
                          ? "bg-blue-500 text-white"
                          : message.status === "error"
                            ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    {message.type === "user" && (
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* File Upload Indicator */}
            {uploadedFile && (
              <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700 dark:text-green-300">{uploadedFile.name} ready to use</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setUploadedFile(null)}
                    className="h-6 w-6 p-0 ml-auto"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-shrink-0"
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    disabled={isProcessing}
                    className="pr-10"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isProcessing || (!inputValue.trim() && !uploadedFile)}
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                  >
                    {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
