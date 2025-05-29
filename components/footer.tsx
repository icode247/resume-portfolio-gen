import Link from "next/link"
import { Brain, Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 md:px-6 py-8 md:py-12 m-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {/* Logo and description on the left */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Limi.ai</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Transform your GitHub profile into a professional resume and portfolio.
            </p>
          </div>

          {/* Social links on the right */}
          <div className="flex flex-col space-y-4 md:items-end justify-center">
            <h3 className="font-medium text-sm">Connect with us</h3>
            <div className="flex gap-4">
              <Link href="https://github.com/icode247" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
              <Link href="https://twitter.com/icode247" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
              <Link href="https://www.linkedin.com/in/ekekenta-clinton-97569b191/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} DevFolio. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
