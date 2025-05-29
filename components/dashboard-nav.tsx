"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Briefcase, Settings, HelpCircle, LogOut } from "lucide-react"
import { signOut } from "@/lib/auth"

export function DashboardNav() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    // {
    //   title: "Resumes",
    //   href: "/dashboard/resumes",
    //   icon: <FileText className="mr-2 h-4 w-4" />,
    // },
    // {
    //   title: "Portfolios",
    //   href: "/dashboard/portfolios",
    //   icon: <Briefcase className="mr-2 h-4 w-4" />,
    // },
    // {
    //   title: "Settings",
    //   href: "/dashboard/settings",
    //   icon: <Settings className="mr-2 h-4 w-4" />,
    // },
    // {
    //   title: "Help",
    //   href: "/dashboard/help",
    //   icon: <HelpCircle className="mr-2 h-4 w-4" />,
    // },
  ]

  return (
    <nav className="grid items-start gap-2 p-4">
      {navItems.map((item, index) => (
        <Link key={index} href={item.href}>
          <Button
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
            )}
          >
            {item.icon}
            {item.title}
          </Button>
        </Link>
      ))}
      <Button
        variant="ghost"
        className="w-full justify-start hover:bg-transparent hover:underline mt-4"
        onClick={() => signOut()}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Log out
      </Button>
    </nav>
  )
}
