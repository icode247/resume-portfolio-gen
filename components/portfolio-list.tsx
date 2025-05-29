"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { ExternalLink, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { getUserPortfolios, deletePortfolio } from "@/lib/database"
import { useAuth } from "@/hooks/use-auth"
import type { Portfolio } from "@/lib/database"

export function PortfolioList() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    const fetchPortfolios = async () => {
      if (!user) return

      try {
        const data = await getUserPortfolios(user.uid)
        setPortfolios(data)
      } catch (error) {
        console.error("Error fetching portfolios:", error)
        toast({
          title: "Error",
          description: "Failed to load portfolios. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolios()
  }, [user, toast])

  const handleDelete = async (id: string) => {
    try {
      await deletePortfolio(id)
      setPortfolios(portfolios.filter((portfolio) => portfolio.id !== id))
      toast({
        title: "Portfolio deleted",
        description: "Your portfolio has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete portfolio. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (portfolios.length === 0) {
    return (
      <EmptyPlaceholder
        title="No portfolios found"
        description="You haven't created any portfolios yet. Create your first portfolio to get started."
        action={<Button onClick={() => (window.location.href = "/generate")}>Create Portfolio</Button>}
      />
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {portfolios.map((portfolio) => (
        <Card key={portfolio.id}>
          <CardHeader className="p-4">
            <div className="flex items-start justify-between">
              <CardTitle className="line-clamp-1">{portfolio.title}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => (window.location.href = `/portfolio/${portfolio.id}`)}>
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => (window.location.href = `/edit/portfolio/${portfolio.id}`)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(portfolio.id)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-video relative overflow-hidden">
              <img
                src="/placeholder.svg?height=300&width=500"
                alt={portfolio.title}
                className="object-cover w-full h-full"
              />
            </div>
          </CardContent>
          <CardFooter className="p-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <p>Views: {portfolio.views || 0}</p>
              <p>Created: {new Date(portfolio.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => (window.location.href = `/portfolio/${portfolio.id}`)}
              >
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">View</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
