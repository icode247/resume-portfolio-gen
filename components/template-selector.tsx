"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Eye, Download, Rocket, X } from "lucide-react"
import { AIChatPanel } from "@/components/ai-chat-panel"

// Import all resume templates
import { ProfessionalResume } from "./resume-templates/professional-resume"
import { ModernResume } from "./resume-templates/modern-resume"
import { CreativeResume } from "./resume-templates/creative-resume"
import { BlueAccentResume } from "./resume-templates/blue-accent-resume"
import { MinimalCleanResume } from "./resume-templates/minimal-clean-resume"
import { DarkSidebarResume } from "./resume-templates/dark-sidebar-resume"

// Import all portfolio templates
import { ModernPortfolio } from "./portfolio-templates/modern-portfolio"
import { MinimalPortfolio } from "./portfolio-templates/minimal-portfolio"
import { CreativePortfolio } from "./portfolio-templates/creative-portfolio"
import { ObsidianPortfolio } from "./portfolio-templates/obsidian-portfolio"
import { ShowoffPortfolio } from "./portfolio-templates/showoff-portfolio"
import { NicholPortfolio } from "./portfolio-templates/nichol-portfolio"
import { MikonPortfolio } from "./portfolio-templates/mikon-portfolio"
import { AstroPortfolio } from "./portfolio-templates/astro-portfolio"
import { ZyanPortfolio } from "./portfolio-templates/zyan-portfolio"

interface TemplateSelectorProps {
  data: any
  onDownload: (templateType: string, templateName: string) => void
  onPreview: (templateType: string, templateName: string) => void
}

export function TemplateSelector({ data, onDownload, onPreview }: TemplateSelectorProps) {
  const [previewTemplate, setPreviewTemplate] = useState<{
    type: string
    name: string
    component: React.ComponentType<any>
  } | null>(null)
  const [previewData, setPreviewData] = useState(data)
  const { toast } = useToast()

  const resumeTemplates = [
    {
      name: "Professional",
      description: "Clean and professional design perfect for corporate roles",
      component: ProfessionalResume,
      image: "/prefesional-resume-preview.png",
      tags: ["Corporate", "Clean", "ATS-Friendly"],
    },
    {
      name: "Modern",
      description: "Contemporary design with visual elements and progress bars",
      component: ModernResume,
      image: "/modern-resume-preview.png",
      tags: ["Modern", "Visual", "Creative"],
    },
    {
      name: "Creative",
      description: "Bold and creative design for design and creative roles",
      component: CreativeResume,
      image: "/creative-resume-preview.png",
      tags: ["Creative", "Bold", "Design"],
    },
    {
      name: "Blue Accent",
      description: "Professional with blue accent colors and clean typography",
      component: BlueAccentResume,
      image: "/blue-accent-resume-preview.png",
      tags: ["Professional", "Blue", "Clean"],
    },
    {
      name: "Minimal Clean",
      description: "Ultra-minimal design focusing on content and readability",
      component: MinimalCleanResume,
      image: "/minimal-clean-resume-review.png",
      tags: ["Minimal", "Clean", "Simple"],
    },
    {
      name: "Dark Sidebar",
      description: "Modern design with dark sidebar and professional layout",
      component: DarkSidebarResume,
      image: "/dark-sidebar-resume-preview.png",
      tags: ["Dark", "Modern", "Sidebar"],
    },
  ]

  const portfolioTemplates = [
    {
      name: "Modern",
      description: "Clean and modern portfolio with smooth animations",
      component: ModernPortfolio,
      image: "/modern-preview.png",
      tags: ["Modern", "Animated", "Clean"],
    },
    {
      name: "Minimal",
      description: "Minimalist design focusing on your work",
      component: MinimalPortfolio,
      image: "/minimal-preview.png",
      tags: ["Minimal", "Focus", "Simple"],
    },
    {
      name: "Creative",
      description: "Bold and creative design with unique layouts",
      component: CreativePortfolio,
      image: "/creative-preview.png",
      tags: ["Creative", "Bold", "Unique"],
    },
    {
      name: "Obsidian",
      description: "Dark theme with purple accents and modern design",
      component: ObsidianPortfolio,
      image: "/obsidian-preview.png",
      tags: ["Dark", "Purple", "Modern"],
    },
    {
      name: "Showoff",
      description: "Perfect for showcasing your best projects prominently",
      component: ShowoffPortfolio,
      image: "/showoff-preview.png",
      tags: ["Showcase", "Projects", "Bold"],
    },
    {
      name: "Nichol",
      description: "Professional design with excellent typography",
      component: NicholPortfolio,
      image: "/nichol-preview.png",
      tags: ["Professional", "Typography", "Clean"],
    },
    {
      name: "Mikon",
      description: "Modern design with great visual hierarchy",
      component: MikonPortfolio,
      image: "/mikon-preview.png",
      tags: ["Modern", "Hierarchy", "Visual"],
    },
    {
      name: "Astro",
      description: "Space-inspired design with cosmic elements",
      component: AstroPortfolio,
      image: "/astro-preview.png",
      tags: ["Space", "Cosmic", "Unique"],
    },
    {
      name: "Zyan",
      description: "Contemporary design with excellent mobile experience",
      component: ZyanPortfolio,
      image: "/zyan-preview.png",
      tags: ["Contemporary", "Mobile", "Responsive"],
    },
  ]

  const handlePreviewClick = (templateType: string, templateName: string, component: React.ComponentType<any>) => {
    setPreviewTemplate({ type: templateType, name: templateName, component })
    onPreview(templateType, templateName)
  }

  const handleDownloadClick = (templateType: string, templateName: string) => {
    onDownload(templateType, templateName)
  }

  const handleDeployClick = () => {
    toast({
      title: "Coming Soon!",
      description: "One-click deployment feature is coming soon.",
    })
  }

  const handlePreviewDataUpdate = (newData: any) => {
    setPreviewData(newData)
  }

  const renderTemplateGrid = (templates: any[], type: string) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card key={template.name} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
          <CardHeader className="pb-3">
            <div className="aspect-[3/4] bg-gray-700 rounded-lg mb-3 overflow-hidden">
              <img
                src={template.image || "/placeholder.svg"}
                alt={`${template.name} template preview`}
                className="w-full h-full object-cover"
              />
            </div>
            <CardTitle className="text-white">{template.name}</CardTitle>
            <CardDescription className="text-gray-400">{template.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1 mb-4">
              {template.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePreviewClick(type, template.name, template.component)}
                className="flex-1 border-gray-600 text-gray-300 hover:text-white"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button
                size="sm"
                onClick={() => handleDownloadClick(type, template.name)}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
            {type === "Portfolio" && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeployClick}
                className="w-full mt-2 border-gray-600 text-gray-300 hover:text-white"
              >
                <Rocket className="h-4 w-4 mr-2" />
                Deploy (Coming Soon)
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <>
      <Tabs defaultValue="portfolios" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800 border-gray-700">
          <TabsTrigger value="portfolios" className="text-gray-300 data-[state=active]:text-white">
            Portfolio Websites ({portfolioTemplates.length})
          </TabsTrigger>
          <TabsTrigger value="resumes" className="text-gray-300 data-[state=active]:text-white">
            Resume Templates ({resumeTemplates.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="portfolios" className="mt-6">
          {renderTemplateGrid(portfolioTemplates, "Portfolio")}
        </TabsContent>

        <TabsContent value="resumes" className="mt-6">
          {renderTemplateGrid(resumeTemplates, "Resume")}
        </TabsContent>
      </Tabs>

      {/* Preview Modal */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-7xl h-[90vh] bg-gray-900 border-gray-700 p-0">
          <DialogHeader className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-white">
                {previewTemplate?.name} {previewTemplate?.type} Preview
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPreviewTemplate(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-auto bg-white">
            {previewTemplate && <previewTemplate.component data={previewData} />}
          </div>

          {/* AI Chat Panel for Preview */}
          {previewTemplate && (
            <AIChatPanel
              data={previewData}
              onDataUpdate={handlePreviewDataUpdate}
              templateType={previewTemplate.type.toLowerCase().includes("resume") ? "resume" : "portfolio"}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
