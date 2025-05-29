import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export function HeroSection() {
  return (
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
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-[4/3] overflow-hidden rounded-lg border bg-background shadow-xl">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Resume preview"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
