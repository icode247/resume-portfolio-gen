"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useEffect, useState } from "react";
import { Menu, Brain } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"}`}
    >
      <div className="container flex h-16 items-center justify-between m-auto">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Limi.ai</span>
          </Link>
        </div>

        {/* <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/features"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Blog
          </Link>
        </nav> */}

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {loading ? (
              <Button disabled variant="ghost" size="sm">
                Loading...
              </Button>
            ) : !user ? (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign up</Button>
                </Link>
              </>
            ) : (
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
            )}
          </div>

          <ModeToggle />

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/features"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="/blog"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Blog
                </Link>
                {loading ? (
                  <Button disabled variant="ghost" size="sm">
                    Loading...
                  </Button>
                ) : !user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <Link href="/dashboard">
                    <Button variant="ghost" size="sm">
                      Dashboard
                    </Button>
                  </Link>
                )}

                {loading ? (
                  <Button disabled variant="ghost" size="sm">
                    Loading...
                  </Button>
                ) : !user ? (
                  <div className="flex flex-col gap-2 mt-4">
                    <Link href="/login">
                      <Button variant="outline" className="w-full">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button className="w-full">Sign up</Button>
                    </Link>
                  </div>
                ) : (
                  <Link href="/dashboard">
                    <Button variant="ghost" size="sm">
                      Dashboard
                    </Button>
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
