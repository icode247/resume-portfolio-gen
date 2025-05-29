import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, FileText, Globe, Sparkles } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: Github,
      title: "GitHub Integration",
      description:
        "Connect your GitHub profile to automatically generate professional content from your repositories and contributions.",
    },
    {
      icon: FileText,
      title: "AI-Powered Resumes",
      description:
        "Generate ATS-friendly resumes with AI-enhanced content that highlights your skills and experience effectively.",
    },
    {
      icon: Globe,
      title: "Portfolio Websites",
      description:
        "Create stunning portfolio websites with modern designs that showcase your projects and professional brand.",
    },
    {
      icon: Sparkles,
      title: "AI Customization",
      description:
        "Use natural language to customize your content. Just tell our AI what you want to change and it will update instantly.",
    },
  ]

  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Stand Out
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our AI-powered platform transforms your GitHub profile into professional resumes and portfolios that get you
            noticed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-400">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
