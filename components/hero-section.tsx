"use client";

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Play, X } from "lucide-react"

export function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  
  const YOUTUBE_VIDEO_ID = "m2HEeutDZ9g"
  
  const handleVideoPlay = () => {
    setIsVideoPlaying(true)
  }
  
  const handleVideoClose = () => {
    setIsVideoPlaying(false)
  }

  return (
    <>
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Transform Your GitHub Profile Into a Professional Resume
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Generate stunning resumes and portfolios from your GitHub profile in seconds. Showcase your skills,
                  projects, and contributions to potential employers.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/generate">
                  <Button size="lg" className="gap-1.5">
                    <Github className="h-5 w-5" />
                    Connect GitHub
                  </Button>
                </Link>
                <Link href="/examples">
                  <Button size="lg" variant="outline">
                    View Examples
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Enhanced Demo Video Section */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-[16/10] overflow-hidden rounded-xl border-2 border-border/50 bg-gradient-to-br from-background to-muted shadow-2xl group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:border-primary/30">
                
                {/* Video Thumbnail/Preview */}
                <div 
                  className="relative w-full h-full bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center"
                  onClick={handleVideoPlay}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-grid-small-black/[0.05] [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]"></div>
                  
                  {/* Demo Preview Content */}
                  <div className="relative z-10 text-center p-8">
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                        <Play className="h-8 w-8 text-primary fill-current ml-1" />
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2 text-foreground">
                      See It In Action
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Watch how easy it is to generate your resume
                    </p>
                    
                    {/* Animated Demo Elements */}
                    <div className="space-y-2 opacity-60">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs">GitHub Connected</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse delay-200"></div>
                        <span className="text-xs">Data Processed</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse delay-500"></div>
                        <span className="text-xs">Resume Generated</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 opacity-30">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-4 right-4 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    2:30
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            {/* Close Button */}
            <button
              onClick={handleVideoClose}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="h-8 w-8" />
            </button>
            
            {/* YouTube Embed */}
            <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="Product Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            
            {/* Modal Background Click to Close */}
            <div 
              className="absolute inset-0 -z-10" 
              onClick={handleVideoClose}
            ></div>
          </div>
        </div>
      )}
      
      {/* Background Click to Close Modal */}
      {isVideoPlaying && (
        <div 
          className="fixed inset-0 bg-transparent z-40"
          onClick={handleVideoClose}
        ></div>
      )}
    </>
  )
}