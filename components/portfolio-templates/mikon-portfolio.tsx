interface MikonPortfolioProps {
  data: any;
}

export function MikonPortfolio({ data }: MikonPortfolioProps) {
  const portfolio = data?.portfolio || data; // Handle both data structures

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-slate-900/80 backdrop-blur-lg border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <span className="text-blue-400">
                {portfolio?.name?.split(" ")[0]?.toUpperCase() || "DEV"}
              </span>
              <span className="text-white">.PORTFOLIO</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#home"
                className="text-gray-300 hover:text-blue-400 transition-colors relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-blue-400 transition-colors relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
              </a>
              <a
                href="#services"
                className="text-gray-300 hover:text-blue-400 transition-colors relative group"
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
              </a>
              <a
                href="#portfolio"
                className="text-gray-300 hover:text-blue-400 transition-colors relative group"
              >
                Portfolio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
              </a>
              <a
                href="#contact"
                className="text-gray-300 hover:text-blue-400 transition-colors relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
              </a>
            </nav>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all">
              Hire Me
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Geometric background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 border border-blue-500/30 rotate-45 animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-indigo-500/30 rotate-12 animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/3 w-40 h-40 border border-blue-400/20 -rotate-12 animate-pulse delay-500"></div>
          <div className="absolute bottom-20 right-1/4 w-28 h-28 border border-indigo-400/25 rotate-45 animate-pulse delay-1500"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <div className="mb-8">
            <div className="relative inline-block">
              <img
                src={
                  portfolio?.avatar || "/placeholder.svg?height=180&width=180"
                }
                alt="Profile"
                className="w-36 h-36 rounded-full mx-auto mb-8 border-4 border-blue-400 shadow-2xl shadow-blue-500/25"
              />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-ping"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">I'm</span>{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              {portfolio?.name || "Developer"}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            {portfolio?.bio
              ? portfolio.bio
              : "Full Stack Developer & Problem Solver"}
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            {portfolio?.bio ||
              "Passionate about creating innovative web applications and solving complex problems through clean, efficient code."}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 px-10 py-4 rounded-lg text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all">
              View Portfolio
            </button>
            <button className="border-2 border-blue-400 text-blue-400 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-blue-400 hover:text-white transition-all">
              Download CV
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-blue-400">
                Full Stack Developer
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                {portfolio?.summary}
              </p>
              {/* <p className="text-lg text-gray-300 leading-relaxed mb-8">
                My GitHub profile showcases {portfolio?.stats?.repositories || 'many'} repositories, demonstrating my expertise
                across the entire development lifecycle, from initial concept and design to deployment and maintenance.
              </p> */}

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 p-6 rounded-lg border border-blue-500/30">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {portfolio?.stats?.repositories || 0}
                  </div>
                  <div className="text-gray-300">Projects Completed</div>
                </div>
                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-600/20 p-6 rounded-lg border border-indigo-500/30">
                  <div className="text-3xl font-bold text-indigo-400 mb-2">
                    {portfolio?.stats?.followers || 0}
                  </div>
                  <div className="text-gray-300">GitHub Followers</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-8 text-blue-400">
                Technical Skills
              </h3>
              {portfolio?.skills && portfolio.skills.length > 0 ? (
                portfolio.skills
                  .slice(0, 5)
                  .map((skill: any, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white font-semibold">
                          {skill.name}
                        </span>
                        <span className="text-blue-400 font-bold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000"
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

      {/* Services Section */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Services</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              I offer comprehensive web development services to help bring your
              digital vision to life
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">
                Web Development
              </h3>
              <p className="text-gray-400 text-center">
                Custom web applications built with modern frameworks and best
                practices
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">
                UI/UX Design
              </h3>
              <p className="text-gray-400 text-center">
                Beautiful and intuitive user interfaces that enhance user
                experience
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">
                Performance Optimization
              </h3>
              <p className="text-gray-400 text-center">
                Optimizing applications for speed, performance, and scalability
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Portfolio</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Explore my latest projects showcasing modern web development and
              creative solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio?.projects && portfolio.projects.length > 0 ? (
              portfolio.projects
                .slice(0, 6)
                .map((project: any, index: number) => (
                  <div
                    key={project.id || index}
                    className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={
                          project.image ||
                          "/placeholder.svg?height=250&width=400"
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
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold flex-1 hover:shadow-lg transition-all text-center"
                              >
                                View Project
                              </a>
                            )}
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-slate-700/80 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-600 transition-all"
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
                              className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs border border-blue-500/30"
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
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Ready to start your next project? Let's discuss how I can help bring
            your ideas to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {portfolio?.email && (
              <a
                href={`mailto:${portfolio.email}`}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 px-10 py-4 rounded-lg text-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                Start a Project
              </a>
            )}
            {portfolio?.social?.github && (
              <a
                href={portfolio.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-blue-400 text-blue-400 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-blue-400 hover:text-white transition-all"
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
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {portfolio.social.twitter && (
                <a
                  href={portfolio.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Twitter
                </a>
              )}
              {portfolio?.website && (
                <a
                  href={portfolio.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Website
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-blue-500/20">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>
            &copy; 2024 {portfolio?.name || "Portfolio"}. Built with passion for
            great development.
          </p>
        </div>
      </footer>
    </div>
  );
}
