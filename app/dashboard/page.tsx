"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ResumeList } from "@/components/resume-list"
import { PortfolioList } from "@/components/portfolio-list"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("resumes")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Create and manage your resumes and portfolios.">
        <Button onClick={() => router.push("/generate")}>Create New</Button>
      </DashboardHeader>
      <div className="grid gap-8">
        <Tabs defaultValue="resumes" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="resumes">Resumes</TabsTrigger>
              <TabsTrigger value="portfolios">Portfolios</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="resumes" className="space-y-4">
            <ResumeList />
          </TabsContent>
          <TabsContent value="portfolios" className="space-y-4">
            <PortfolioList />
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
