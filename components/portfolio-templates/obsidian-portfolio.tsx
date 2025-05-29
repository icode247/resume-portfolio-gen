interface ObsidianPortfolioProps {
  data: any;
}

export function ObsidianPortfolio({ data }: ObsidianPortfolioProps) {
  const portfolio = data?.portfolio || data; // Handle both data structures

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <span className="text-white">
                {portfolio?.name?.split(" ")[0] || "Portfolio"}
              </span>
              <span className="text-gray-400">.</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#home"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="#work"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Work
              </a>
              <a
                href="#contact"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </a>
            </nav>
            <button className="md:hidden text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/50"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-800/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-700/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <img
              src={portfolio?.avatar || "/placeholder.svg?height=150&width=150"}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-8 border-2 border-gray-700 shadow-2xl"
            />
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {portfolio?.name || "Developer"}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
            {portfolio?.bio ||
              "Passionate developer building amazing digital experiences"}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all">
              View My Work
            </button>
            <button className="border border-gray-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all">
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                {portfolio?.summary}
              </p>
              {/* <p className="text-lg text-gray-300 leading-relaxed mb-8">
                My GitHub profile showcases {portfolio?.stats?.repositories || 'many'} repositories with a focus on modern web technologies.
                I'm passionate about pushing the boundaries of what's possible on the web.
              </p> */}
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-white">
                    {portfolio?.stats?.repositories || 0}
                  </div>
                  <div className="text-gray-400">Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {portfolio?.stats?.followers || 0}
                  </div>
                  <div className="text-gray-400">Followers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {portfolio?.stats?.yearsActive || 0}
                  </div>
                  <div className="text-gray-400">Years</div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">Skills</h3>
              {portfolio?.skills && portfolio.skills.length > 0 ? (
                portfolio.skills
                  .slice(0, 4)
                  .map((skill: any, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-white">{skill.name}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-white to-gray-400 h-2 rounded-full transition-all duration-1000"
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

      {/* Work Section */}
      <section id="work" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Selected Work
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {portfolio?.projects && portfolio.projects.length > 0 ? (
              portfolio.projects
                .slice(0, 4)
                .map((project: any, index: number) => (
                  <div
                    key={project.id || index}
                    className="group relative bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={
                          project.image ||
                          "/placeholder.svg?height=300&width=500"
                        }
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center">
                          <div className="flex gap-2 justify-center">
                            {project.demo && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors"
                              >
                                View Project
                              </a>
                            )}
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-gray-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors"
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
                      <p className="text-gray-400 mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies
                          ?.slice(0, 3)
                          .map((tech: string, techIndex: number) => (
                            <span
                              key={techIndex}
                              className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
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
      <section id="contact" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            Let's Create Something Amazing
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Ready to bring your vision to life? Let's discuss your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {portfolio?.email && (
              <a
                href={`mailto:${portfolio.email}`}
                className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all"
              >
                Start a Project
              </a>
            )}
            {portfolio?.social?.github && (
              <a
                href={portfolio.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all"
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
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {portfolio.social.twitter && (
                <a
                  href={portfolio.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Twitter
                </a>
              )}
              {portfolio?.website && (
                <a
                  href={portfolio.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Website
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>
            &copy; 2024 {portfolio?.name || "Portfolio"}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
