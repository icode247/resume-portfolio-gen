export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Connect Your GitHub",
      description: "Link your GitHub account to import your repositories, contributions, and activity.",
    },
    {
      number: "02",
      title: "Customize Your Profile",
      description:
        "Select which projects to highlight and add additional information about your skills and experience.",
    },
    {
      number: "03",
      title: "Generate Resume & Portfolio",
      description: "Our AI analyzes your GitHub data to create professional resume content and a stunning portfolio.",
    },
    {
      number: "04",
      title: "Share & Download",
      description: "Get a shareable link to your online portfolio and download your resume in multiple formats.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Four simple steps to create your professional developer resume and portfolio
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-start space-y-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold">
                {step.number}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-12 w-[calc(100%-3rem)] h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
