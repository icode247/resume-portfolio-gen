interface AstroPortfolioProps {
  data: any;
}

export function AstroPortfolio({ data }: AstroPortfolioProps) {
  const portfolio = data?.portfolio || data; // Handle both data structures

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {portfolio?.name?.charAt(0) || "P"}
                </span>
              </div>
              <span className="text-xl font-bold">
                {portfolio?.name?.split(" ")[0] || "Portfolio"}
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                About
              </a>
              <a
                href="#projects"
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                Projects
              </a>
              <a
                href="#blog"
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                Blog
              </a>
              <a
                href="#contact"
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                Contact
              </a>
            </nav>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all">
              Get in Touch
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      >
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Floating elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-pink-500 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <img
              src={portfolio?.avatar || "/placeholder.svg?height=120&width=120"}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-6 border-2 border-purple-500/50 shadow-2xl shadow-purple-500/25"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
              {portfolio?.name || "Developer"}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-purple-300 mb-4 font-medium">
            {portfolio?.bio
              ? portfolio.bio
              : "Full-Stack Developer & Open Source Contributor"}
          </p>

          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {portfolio?.bio ||
              "Building the future of web development with modern technologies. Passionate about creating scalable applications and contributing to the open-source community."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all">
              View My Work
            </button>
            <button className="border border-purple-500/50 text-purple-300 px-8 py-3 rounded-lg font-semibold hover:bg-purple-500/10 transition-all">
              Download Resume
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-purple-400">
                Developer & Creator
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                {portfolio?.summary}
              </p>
              {/* <p className="text-gray-300 leading-relaxed mb-8">
                My GitHub profile shows {portfolio?.stats?.followers || 'active'} followers and continuous 
                contributions across various technologies including modern web frameworks and development tools.
              </p> */}

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-400">
                    {portfolio?.stats?.repositories || 0}
                  </div>
                  <div className="text-gray-400 text-sm">Repositories</div>
                </div>
                <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/20">
                  <div className="text-2xl font-bold text-pink-400">
                    {portfolio?.stats?.followers || 0}
                  </div>
                  <div className="text-gray-400 text-sm">Followers</div>
                </div>
                <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-400">
                    {portfolio?.stats?.yearsActive || 0}
                  </div>
                  <div className="text-gray-400 text-sm">Years</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-8 text-purple-400">
                Tech Stack
              </h3>
              {portfolio?.skills && portfolio.skills.length > 0 ? (
                portfolio.skills
                  .slice(0, 5)
                  .map((skill: any, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-medium">
                          {skill.name}
                        </span>
                        <span className="text-purple-400 font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-gray-400">
                  Skills information not available
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A showcase of my recent work, from open-source contributions to
              full-stack applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio?.projects && portfolio.projects.length > 0 ? (
              portfolio.projects
                .slice(0, 6)
                .map((project: any, index: number) => (
                  <div
                    key={project.id || index}
                    className="group bg-slate-900/50 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={
                          project.image ||
                          "/placeholder.svg?height=200&width=300"
                        }
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex gap-2">
                            {project.demo && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-purple-500 px-3 py-1 rounded text-sm font-medium flex-1 hover:bg-purple-600 transition-colors text-center"
                              >
                                Live Demo
                              </a>
                            )}
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-slate-700 px-3 py-1 rounded text-sm font-medium hover:bg-slate-600 transition-colors"
                              >
                                GitHub
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 mb-4 text-sm line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies
                          ?.slice(0, 3)
                          .map((tech: string, techIndex: number) => (
                            <span
                              key={techIndex}
                              className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <span>⭐</span> {project.stars || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <span>🍴</span> {project.forks || 0}
                        </span>
                        {project.lastUpdated && (
                          <span className="text-xs">
                            Updated:{" "}
                            {new Date(project.lastUpdated).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="col-span-full text-center text-gray-400">
                <p>No projects available to display</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Ready to collaborate on your next project? Let's discuss how we can
            bring your ideas to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {portfolio?.email && (
              <a
                href={`mailto:${portfolio.email}`}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-10 py-4 rounded-lg text-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                Start a Project
              </a>
            )}
            {portfolio?.social?.github && (
              <a
                href={portfolio.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-purple-500/50 text-purple-300 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-purple-500/10 transition-all"
              >
                View GitHub
              </a>
            )}
          </div>

          {/* Additional Social Links */}
          {portfolio?.social && (
            <div className="flex justify-center gap-6 mt-8">
              {portfolio.social.linkedin && (
                <a
                  href={portfolio.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {portfolio.social.twitter && (
                <a
                  href={portfolio.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Twitter
                </a>
              )}
              {portfolio?.website && (
                <a
                  href={portfolio.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Website
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>
            &copy; 2024 {portfolio?.name || "Portfolio"}. Built with passion for
            great code.
          </p>
        </div>
      </footer>
    </div>
  );
}
