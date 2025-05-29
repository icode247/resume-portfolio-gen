"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Github, Loader2 } from "lucide-react"
import { generateFromGithub } from "@/lib/generator"
import { useAuth } from "@/hooks/use-auth"

export default function GeneratePage() {
  const [githubUsername, setGithubUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("github")
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()

  const handleGenerateFromGithub = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!githubUsername) return

    setIsLoading(true)
    try {
      const result = await generateFromGithub(githubUsername, user?.uid, user?.email || undefined)

      toast({
        title: "Success!",
        description: "Your resume and portfolio have been generated.",
      })

      router.push(`/preview/${result.id}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate from GitHub profile. Please check the username and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-4xl m-auto py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Generate Your Resume & Portfolio
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Create a professional resume and portfolio from your GitHub profile or upload your own data
        </p>
      </div>

      <Tabs defaultValue="github" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="github">GitHub Profile</TabsTrigger>
          <TabsTrigger value="manual">Manual Input</TabsTrigger>
        </TabsList>
        <TabsContent value="github">
          <Card>
            <CardHeader>
              <CardTitle>Generate from GitHub</CardTitle>
              <CardDescription>
                Enter your GitHub username to automatically import your repositories, contributions, and activity.
                {!user && (
                  <span className="block mt-2 text-amber-600">
                    💡 Sign in to save your generated resume and portfolio to your dashboard.
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleGenerateFromGithub}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="github-username">GitHub Username</Label>
                  <div className="flex gap-2">
                    <div className="flex-1 flex items-center border rounded-md px-3 bg-muted/50">
                      <Github className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground">github.com/</span>
                      <Input
                        id="github-username"
                        value={githubUsername}
                        onChange={(e) => setGithubUsername(e.target.value)}
                        placeholder="username"
                        className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading || !githubUsername} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Resume & Portfolio"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle>Manual Input</CardTitle>
              <CardDescription>
                Enter your information manually to create a custom resume and portfolio.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
