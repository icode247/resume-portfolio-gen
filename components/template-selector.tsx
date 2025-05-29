// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { useToast } from "@/hooks/use-toast"
// import { Eye, Download, Rocket, X } from "lucide-react"
// import { AIChatPanel } from "@/components/ai-chat-panel"

// // Import all resume templates
// import { ProfessionalResume } from "./resume-templates/professional-resume"
// import { ModernResume } from "./resume-templates/modern-resume"
// import { CreativeResume } from "./resume-templates/creative-resume"
// import { BlueAccentResume } from "./resume-templates/blue-accent-resume"
// import { MinimalCleanResume } from "./resume-templates/minimal-clean-resume"
// import { DarkSidebarResume } from "./resume-templates/dark-sidebar-resume"

// // Import all portfolio templates
// import { ModernPortfolio } from "./portfolio-templates/modern-portfolio"
// import { MinimalPortfolio } from "./portfolio-templates/minimal-portfolio"
// import { CreativePortfolio } from "./portfolio-templates/creative-portfolio"
// import { ObsidianPortfolio } from "./portfolio-templates/obsidian-portfolio"
// import { ShowoffPortfolio } from "./portfolio-templates/showoff-portfolio"
// import { NicholPortfolio } from "./portfolio-templates/nichol-portfolio"
// import { MikonPortfolio } from "./portfolio-templates/mikon-portfolio"
// import { AstroPortfolio } from "./portfolio-templates/astro-portfolio"
// import { ZyanPortfolio } from "./portfolio-templates/zyan-portfolio"

// interface TemplateSelectorProps {
//   data: any
//   onDownload: (templateType: string, templateName: string) => Promise<void>
//   onPreview: (templateType: string, templateName: string) => void
//   downloadingStates?: any
// }

// export function TemplateSelector({ data, onDownload, onPreview, downloadingStates }: TemplateSelectorProps) {
//   const [previewTemplate, setPreviewTemplate] = useState<{
//     type: string
//     name: string
//     component: React.ComponentType<any>
//   } | null>(null)
//   const [previewData, setPreviewData] = useState(data)
//   const { toast } = useToast()

//   const resumeTemplates = [
//     {
//       name: "Professional",
//       description: "Clean and professional design perfect for corporate roles",
//       component: ProfessionalResume,
//       image: "/prefesional-resume-preview.png",
//       tags: ["Corporate", "Clean", "ATS-Friendly"],
//     },
//     {
//       name: "Modern",
//       description: "Contemporary design with visual elements and progress bars",
//       component: ModernResume,
//       image: "/modern-resume-preview.png",
//       tags: ["Modern", "Visual", "Creative"],
//     },
//     {
//       name: "Creative",
//       description: "Bold and creative design for design and creative roles",
//       component: CreativeResume,
//       image: "/creative-resume-preview.png",
//       tags: ["Creative", "Bold", "Design"],
//     },
//     {
//       name: "Blue Accent",
//       description: "Professional with blue accent colors and clean typography",
//       component: BlueAccentResume,
//       image: "/blue-accent-resume-preview.png",
//       tags: ["Professional", "Blue", "Clean"],
//     },
//     {
//       name: "Minimal Clean",
//       description: "Ultra-minimal design focusing on content and readability",
//       component: MinimalCleanResume,
//       image: "/minimal-clean-resume-review.png",
//       tags: ["Minimal", "Clean", "Simple"],
//     },
//     {
//       name: "Dark Sidebar",
//       description: "Modern design with dark sidebar and professional layout",
//       component: DarkSidebarResume,
//       image: "/dark-sidebar-resume-preview.png",
//       tags: ["Dark", "Modern", "Sidebar"],
//     },
//   ]

//   const portfolioTemplates = [
//     {
//       name: "Modern",
//       description: "Clean and modern portfolio with smooth animations",
//       component: ModernPortfolio,
//       image: "/modern-preview.png",
//       tags: ["Modern", "Animated", "Clean"],
//     },
//     {
//       name: "Minimal",
//       description: "Minimalist design focusing on your work",
//       component: MinimalPortfolio,
//       image: "/minimal-preview.png",
//       tags: ["Minimal", "Focus", "Simple"],
//     },
//     {
//       name: "Creative",
//       description: "Bold and creative design with unique layouts",
//       component: CreativePortfolio,
//       image: "/creative-preview.png",
//       tags: ["Creative", "Bold", "Unique"],
//     },
//     {
//       name: "Obsidian",
//       description: "Dark theme with purple accents and modern design",
//       component: ObsidianPortfolio,
//       image: "/obsidian-preview.png",
//       tags: ["Dark", "Purple", "Modern"],
//     },
//     {
//       name: "Showoff",
//       description: "Perfect for showcasing your best projects prominently",
//       component: ShowoffPortfolio,
//       image: "/showoff-preview.png",
//       tags: ["Showcase", "Projects", "Bold"],
//     },
//     {
//       name: "Nichol",
//       description: "Professional design with excellent typography",
//       component: NicholPortfolio,
//       image: "/nichol-preview.png",
//       tags: ["Professional", "Typography", "Clean"],
//     },
//     {
//       name: "Mikon",
//       description: "Modern design with great visual hierarchy",
//       component: MikonPortfolio,
//       image: "/mikon-preview.png",
//       tags: ["Modern", "Hierarchy", "Visual"],
//     },
//     {
//       name: "Astro",
//       description: "Space-inspired design with cosmic elements",
//       component: AstroPortfolio,
//       image: "/astro-preview.png",
//       tags: ["Space", "Cosmic", "Unique"],
//     },
//     {
//       name: "Zyan",
//       description: "Contemporary design with excellent mobile experience",
//       component: ZyanPortfolio,
//       image: "/zyan-preview.png",
//       tags: ["Contemporary", "Mobile", "Responsive"],
//     },
//   ]

//   const handlePreviewClick = (templateType: string, templateName: string, component: React.ComponentType<any>) => {
//     setPreviewTemplate({ type: templateType, name: templateName, component })
//     onPreview(templateType, templateName)
//   }

//   const handleDownloadClick = (templateType: string, templateName: string) => {
//     onDownload(templateType, templateName)
//   }

//   const handleDeployClick = () => {
//     toast({
//       title: "Coming Soon!",
//       description: "One-click deployment feature is coming soon.",
//     })
//   }

//   const handlePreviewDataUpdate = (newData: any) => {
//     setPreviewData(newData)
//   }

//   const renderTemplateGrid = (templates: any[], type: string) => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {templates.map((template) => (
//         <Card key={template.name} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
//           <CardHeader className="pb-3">
//             <div className="aspect-[3/4] bg-gray-700 rounded-lg mb-3 overflow-hidden">
//               <img
//                 src={template.image || "/placeholder.svg"}
//                 alt={`${template.name} template preview`}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <CardTitle className="text-white">{template.name}</CardTitle>
//             <CardDescription className="text-gray-400">{template.description}</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex flex-wrap gap-1 mb-4">
//               {template.tags.map((tag: string) => (
//                 <Badge key={tag} variant="secondary" className="text-xs">
//                   {tag}
//                 </Badge>
//               ))}
//             </div>
//             <div className="flex gap-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => handlePreviewClick(type, template.name, template.component)}
//                 className="flex-1 border-gray-600 text-gray-300 hover:text-white"
//               >
//                 <Eye className="h-4 w-4 mr-2" />
//                 Preview
//               </Button>
//               <Button
//                 size="sm"
//                 onClick={() => handleDownloadClick(type, template.name)}
//                 className="flex-1 bg-blue-600 hover:bg-blue-700"
//                 disabled={downloadingStates && downloadingStates[`${type}-${template.name}`]}
//               >
//                 {downloadingStates && downloadingStates[`${type}-${template.name}`] ? (
//                   <>
//                     <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                     Downloading...
//                   </>
//                 ) : (
//                   <>
//                     <Download className="h-4 w-4 mr-2" />
//                     Download
//                   </>
//                 )}
//               </Button>
//             </div>
//             {type === "Portfolio" && (
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handleDeployClick}
//                 className="w-full mt-2 border-gray-600 text-gray-300 hover:text-white"
//               >
//                 <Rocket className="h-4 w-4 mr-2" />
//                 Deploy (Coming Soon)
//               </Button>
//             )}
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   )

//   return (
//     <>
//       <Tabs defaultValue="portfolios" className="w-full">
//         <TabsList className="grid w-full grid-cols-2 bg-gray-800 border-gray-700">
//           <TabsTrigger value="portfolios" className="text-gray-300 data-[state=active]:text-white">
//             Portfolio Websites ({portfolioTemplates.length})
//           </TabsTrigger>
//           <TabsTrigger value="resumes" className="text-gray-300 data-[state=active]:text-white">
//             Resume Templates ({resumeTemplates.length})
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="portfolios" className="mt-6">
//           {renderTemplateGrid(portfolioTemplates, "Portfolio")}
//         </TabsContent>

//         <TabsContent value="resumes" className="mt-6">
//           {renderTemplateGrid(resumeTemplates, "Resume")}
//         </TabsContent>
//       </Tabs>

//       {/* Preview Modal */}
//       <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
//         <DialogContent className="max-w-7xl h-[90vh] bg-gray-900 border-gray-700 p-0">
//           <DialogHeader className="p-6 border-b border-gray-700">
//             <div className="flex items-center justify-between">
//               <DialogTitle className="text-white">
//                 {previewTemplate?.name} {previewTemplate?.type} Preview
//               </DialogTitle>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setPreviewTemplate(null)}
//                 className="text-gray-400 hover:text-white"
//               >
//                 <X className="h-4 w-4" />
//               </Button>
//             </div>
//           </DialogHeader>
//           <div className="flex-1 overflow-auto bg-white">
//             {previewTemplate && <previewTemplate.component data={previewData} />}
//           </div>

//           {/* AI Chat Panel for Preview */}
//           {previewTemplate && (
//             <AIChatPanel
//               data={previewData}
//               onDataUpdate={handlePreviewDataUpdate}
//               templateType={previewTemplate.type.toLowerCase().includes("resume") ? "resume" : "portfolio"}
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }


// components/template-selector.tsx - Fixed with preview images and proper styling
"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Eye, Loader2, X } from "lucide-react"

// Import all template components for preview
import { BlueAccentResume } from "@/components/resume-templates/blue-accent-resume"
import { CreativeResume } from "@/components/resume-templates/creative-resume"
import { DarkSidebarResume } from "@/components/resume-templates/dark-sidebar-resume"
import { MinimalCleanResume } from "@/components/resume-templates/minimal-clean-resume"
import { ModernResume } from "@/components/resume-templates/modern-resume"
import { ProfessionalResume } from "@/components/resume-templates/professional-resume"

import { AstroPortfolio } from "@/components/portfolio-templates/astro-portfolio"
import { CreativePortfolio } from "@/components/portfolio-templates/creative-portfolio"
import { MikonPortfolio } from "@/components/portfolio-templates/mikon-portfolio"
import { MinimalPortfolio } from "@/components/portfolio-templates/minimal-portfolio"
import { ModernPortfolio } from "@/components/portfolio-templates/modern-portfolio"
import { NicholPortfolio } from "@/components/portfolio-templates/nichol-portfolio"
import { ObsidianPortfolio } from "@/components/portfolio-templates/obsidian-portfolio"
import { ShowoffPortfolio } from "@/components/portfolio-templates/showoff-portfolio"
import { ZyanPortfolio } from "@/components/portfolio-templates/zyan-portfolio"

interface TemplateSelectorProps {
  data: any
  onDownload: (templateType: string, templateName: string) => Promise<void>
  onPreview: (templateType: string, templateName: string) => void
  downloadingStates?: {[key: string]: boolean}
}

const RESUME_TEMPLATES = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and professional design perfect for corporate environments',
    component: ProfessionalResume,
    tags: ['Corporate', 'Traditional', 'ATS-Friendly'],
    color: 'bg-blue-500',
    image: '/prefesional-resume-preview.png'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with beautiful gradients and modern typography',
    component: ModernResume,
    tags: ['Modern', 'Colorful', 'Tech'],
    color: 'bg-purple-500',
    image: '/modern-resume-preview.png'
  },
  {
    id: 'blue-accent',
    name: 'Blue Accent',
    description: 'Elegant design with blue accents and diagonal elements',
    component: BlueAccentResume,
    tags: ['Elegant', 'Unique', 'Professional'],
    color: 'bg-blue-600',
    image: '/blue-accent-resume-preview.png'
  },
  {
    id: 'dark-sidebar',
    name: 'Dark Sidebar',
    description: 'Bold design with dark sidebar and professional layout',
    component: DarkSidebarResume,
    tags: ['Bold', 'Contrast', 'Professional'],
    color: 'bg-gray-800',
    image: '/dark-sidebar-resume-preview.png'
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    description: 'Ultra-clean minimal design focusing on content and readability',
    component: MinimalCleanResume,
    tags: ['Minimal', 'Clean', 'Simple'],
    color: 'bg-gray-500',
    image: '/minimal-clean-resume-review.png'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold creative design perfect for designers and creatives',
    component: CreativeResume,
    tags: ['Creative', 'Bold', 'Unique'],
    color: 'bg-yellow-500',
    image: '/creative-resume-preview.png'
  }
]

const PORTFOLIO_TEMPLATES = [
  {
    id: 'astro',
    name: 'Astro',
    description: 'Futuristic design with space-themed elements and smooth animations',
    component: AstroPortfolio,
    tags: ['Futuristic', 'Animated', 'Tech'],
    color: 'bg-purple-600',
    image: '/astro-preview.png'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary portfolio with gradient backgrounds and modern UI',
    component: ModernPortfolio,
    tags: ['Modern', 'Gradient', 'Professional'],
    color: 'bg-blue-600',
    image: '/modern-preview.png'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and creative design with vibrant colors',
    component: CreativePortfolio,
    tags: ['Creative', 'Bold', 'Vibrant'],
    color: 'bg-yellow-500',
    image: '/creative-preview.png'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean minimal design focusing on content and typography',
    component: MinimalPortfolio,
    tags: ['Minimal', 'Clean', 'Typography'],
    color: 'bg-gray-500',
    image: '/minimal-preview.png'
  },
  {
    id: 'mikon',
    name: 'Mikon',
    description: 'Professional design with geometric elements and blue accents',
    component: MikonPortfolio,
    tags: ['Professional', 'Geometric', 'Blue'],
    color: 'bg-blue-500',
    image: '/mikon-preview.png'
  },
  {
    id: 'nichol',
    name: 'Nichol',
    description: 'Fresh design with green accents and modern layout',
    component: NicholPortfolio,
    tags: ['Fresh', 'Green', 'Modern'],
    color: 'bg-green-500',
    image: '/nichol-preview.png'
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    description: 'Dark elegant design with sophisticated layout',
    component: ObsidianPortfolio,
    tags: ['Dark', 'Elegant', 'Sophisticated'],
    color: 'bg-gray-800',
    image: '/obsidian-preview.png'
  },
  {
    id: 'showoff',
    name: 'Showoff',
    description: 'Bold portfolio design perfect for showcasing creative work',
    component: ShowoffPortfolio,
    tags: ['Bold', 'Showcase', 'Creative'],
    color: 'bg-purple-500',
    image: '/showoff-preview.png'
  },
  {
    id: 'zyan',
    name: 'Zyan',
    description: 'Modern professional design with clean typography',
    component: ZyanPortfolio,
    tags: ['Modern', 'Professional', 'Clean'],
    color: 'bg-blue-400',
    image: '/zyan-preview.png'
  }
]

export function TemplateSelector({ data, onDownload, onPreview, downloadingStates = {} }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<{type: string, id: string} | null>(null)
  const [previewMode, setPreviewMode] = useState(false)

  const handlePreview = (templateType: string, templateId: string) => {
    setSelectedTemplate({ type: templateType, id: templateId })
    setPreviewMode(true)
    onPreview(templateType, templateId)
  }

  const handleDownload = async (templateType: string, templateId: string) => {
    await onDownload(templateType, templateId)
  }

  const renderPreview = () => {
    if (!selectedTemplate || !previewMode) return null

    const { type, id } = selectedTemplate
    
    if (type === 'resume') {
      const template = RESUME_TEMPLATES.find(t => t.id === id)
      if (template) {
        const TemplateComponent = template.component
        return <TemplateComponent data={data} />
      }
    } else if (type === 'portfolio') {
      const template = PORTFOLIO_TEMPLATES.find(t => t.id === id)
      if (template) {
        const TemplateComponent = template.component
        return <TemplateComponent data={data} />
      }
    }
    
    return null
  }

  const TemplateCard = ({ template, type }: { template: any, type: string }) => {
    const downloadKey = `${type}-${template.id}`
    const isDownloading = downloadingStates[downloadKey] || false

    return (
      <Card key={template.id} className="group hover:shadow-lg transition-all duration-300 border-gray-700 bg-gray-800 overflow-hidden">
        {/* Preview Image */}
        {/* <div className="aspect-[4/5] relative overflow-hidden bg-white">
          <img
            src={template.image}
            alt={`${template.name} template preview`}
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback to placeholder if image doesn't exist
              const target = e.target as HTMLImageElement;
              target.src = `/api/placeholder/400/500?text=${encodeURIComponent(template.name)}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handlePreview(type, template.id)}
                  className="flex-1 bg-white/90 text-gray-900 hover:bg-white"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDownload(type, template.id)}
                  disabled={isDownloading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isDownloading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div> */}

        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <div className={`w-3 h-3 rounded-full ${template.color}`}></div>
            <div className="flex gap-1">
              {template.tags.slice(0, 2).map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <CardTitle className="text-white text-lg leading-tight">{template.name}</CardTitle>
          <CardDescription className="text-gray-400 text-sm line-clamp-2">
            {template.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 pb-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePreview(type, template.id)}
              className="flex-1 border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </Button>
            <Button
              size="sm"
              onClick={() => handleDownload(type, template.id)}
              disabled={isDownloading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-1" />
                  {type === 'resume' ? 'PDF' : 'HTML'}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (previewMode && selectedTemplate) {
    const template = selectedTemplate.type === 'resume' 
      ? RESUME_TEMPLATES.find(t => t.id === selectedTemplate.id)
      : PORTFOLIO_TEMPLATES.find(t => t.id === selectedTemplate.id)

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(false)}
              className="border-gray-600 text-gray-300 hover:text-white"
            >
              <X className="w-4 h-4 mr-1" />
              Close Preview
            </Button>
            {template && (
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${template.color}`}></div>
                <span className="text-white font-medium">{template.name}</span>
                <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                  {selectedTemplate.type === 'resume' ? 'Resume PDF' : 'Portfolio HTML'}
                </Badge>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handlePreview(selectedTemplate.type, selectedTemplate.id)}
              className="border-gray-600 text-gray-300 hover:text-white"
            >
              <Eye className="w-4 h-4 mr-1" />
              Full Preview
            </Button>
            <Button
              onClick={() => handleDownload(selectedTemplate.type, selectedTemplate.id)}
              disabled={downloadingStates[`${selectedTemplate.type}-${selectedTemplate.id}`]}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {downloadingStates[`${selectedTemplate.type}-${selectedTemplate.id}`] ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-1" />
                  Download {selectedTemplate.type === 'resume' ? 'PDF' : 'HTML'}
                </>
              )}
            </Button>
          </div>
        </div>
        
        {/* Preview Container - Fixed background and scaling */}
        <div className="bg-gray-100 rounded-lg shadow-2xl overflow-hidden">
          <div 
            className="origin-top-left bg-white" 
            style={{ 
              transform: 'scale(0.6)', 
              transformOrigin: 'top left',
              width: '166.67%', // Compensate for 0.6 scale
              minHeight: '200px'
            }}
          >
            {renderPreview()}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800 border-gray-700">
          <TabsTrigger 
            value="portfolio" 
            className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
          >
            Portfolio Websites
          </TabsTrigger>
          <TabsTrigger 
            value="resume" 
            className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
          >
            Resume PDFs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white">Portfolio Templates</h3>
            <p className="text-gray-400">Professional portfolio websites ready to download as HTML files</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO_TEMPLATES.map((template) => (
              <TemplateCard key={template.id} template={template} type="portfolio" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resume" className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white">Resume Templates</h3>
            <p className="text-gray-400">Professional resume templates ready to download as PDF files</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESUME_TEMPLATES.map((template) => (
              <TemplateCard key={template.id} template={template} type="resume" />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-gray-800 rounded-lg p-4 m-auto">
        <div className="text-center text-gray-400 text-sm">
          <p className="flex items-center justify-center gap-2 mb-2">
            <span>💡</span>
            <strong>Download Tips:</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Portfolio websites download as complete HTML files</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Resume templates download as print-ready PDFs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}