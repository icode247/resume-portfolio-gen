import { HeroSection } from "@/components/hero-section"
import { FeatureSection } from "@/components/feature-section"
import { HowItWorks } from "@/components/how-it-works"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { NewsletterSignup } from "@/components/newsletter-signup"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 m-auto">
        <HeroSection />
        <FeatureSection />
        <HowItWorks />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  )
}
