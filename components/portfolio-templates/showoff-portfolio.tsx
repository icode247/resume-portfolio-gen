interface ShowoffPortfolioProps {
  data: any
}

export function ShowoffPortfolio({ data }: ShowoffPortfolioProps) {
  const portfolio = data?.portfolio || data; // Handle both data structures
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {portfolio?.name?.split(" ")[0] || "Portfolio"}
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-white/80 hover:text-white transition-colors">
                Home
              </a>
              <a href="#about" className="text-white/80 hover:text-white transition-colors">
                About
              </a>
              <a href="#portfolio" className="text-white/80 hover:text-white transition-colors">
                Portfolio
              </a>
              <a href="#services" className="text-white/80 hover:text-white transition-colors">
                Services
              </a>
              <a href="#contact" className="text-white/80 hover:text-white transition-colors">
                Contact
              </a>
            </nav>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all">
              Hire Me
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <div className="mb-8">
            <img
              src={portfolio?.avatar || "/placeholder.svg?height=200&width=200"}
              alt="Profile"
              className="w-40 h-40 rounded-full mx-auto mb-8 border-4 border-white/20 shadow-2xl"
            />
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
             {portfolio?.name.split(" ")[0]}
            </span>
            <br />
            <span className="text-white">{portfolio?.name.split(" ")[1]}</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            {portfolio?.bio || "Passionate developer building amazing digital experiences"}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all">
              View My Work
            </button>
            <button className="border-2 border-white/30 px-10 py-4 rounded-full text-lg font-bold hover:bg-white/10 transition-all">
              Download CV
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">ABOUT ME</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Passionate Developer</h3>
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                {portfolio?.summary}
              </p>
              {/* <p className="text-lg text-white/80 leading-relaxed mb-8">
                My GitHub profile showcases {portfolio?.stats?.repositories || 'many'} repositories with a focus on modern web technologies.
                I believe in the power of great code to transform ideas into reality.
              </p> */}

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white/5 rounded-lg backdrop-blur-sm">
                  <div className="text-3xl font-black text-purple-400 mb-2">{portfolio?.stats?.repositories || 0}</div>
                  <div className="text-white/60">Projects Completed</div>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-lg backdrop-blur-sm">
                  <div className="text-3xl font-black text-pink-400 mb-2">{portfolio?.stats?.followers || 0}</div>
                  <div className="text-white/60">GitHub Followers</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold mb-8">Technical Skills</h3>
              {portfolio?.skills && portfolio.skills.length > 0 ? (
                portfolio.skills.slice(0, 5).map((skill: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white font-semibold">{skill.name}</span>
                      <span className="text-purple-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-white/60">Skills information not available</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">MY PORTFOLIO</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-6"></div>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Explore my latest projects and see how I bring creative visions to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio?.projects && portfolio.projects.length > 0 ? (
              portfolio.projects.slice(0, 6).map((project: any, index: number) => (
                <div
                  key={project.id || index}
                  className="group relative bg-white/5 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg?height=250&width=400"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex gap-2">
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full text-sm font-bold flex-1 text-center hover:shadow-lg transition-all"
                            >
                              View Project
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold hover:bg-white/30 transition-all"
                            >
                              GitHub
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-white/70 mb-4 text-sm line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.slice(0, 3).map((tech: string, techIndex: number) => (
                        <span key={techIndex} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-white/50">
                      <span className="flex items-center gap-1">
                        <span>⭐</span> {project.stars || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <span>🍴</span> {project.forks || 0}
                      </span>
                      {project.lastUpdated && (
                        <span className="text-xs">
                          Updated: {new Date(project.lastUpdated).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-white/60">
                <p>No projects available to display</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">SERVICES</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Web Development</h3>
              <p className="text-white/70">Custom websites and web applications built with modern technologies</p>
            </div>

            <div className="text-center p-8 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold mb-4">UI/UX Design</h3>
              <p className="text-white/70">Beautiful and intuitive user interfaces that enhance user experience</p>
            </div>

            <div className="text-center p-8 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Mobile Apps</h3>
              <p className="text-white/70">Cross-platform mobile applications for iOS and Android</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-8">LET'S WORK TOGETHER</h2>
          <p className="text-xl text-white/80 mb-12">
            Ready to create something amazing? Let's discuss your project and bring your vision to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {portfolio?.email && (
              <a
                href={`mailto:${portfolio.email}`}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all"
              >
                Start a Project
              </a>
            )}
            {portfolio?.social?.github && (
              <a
                href={portfolio.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white/30 px-10 py-4 rounded-full text-lg font-bold hover:bg-white/10 transition-all"
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
                  className="text-white/60 hover:text-purple-400 transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {portfolio.social.twitter && (
                <a
                  href={portfolio.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-purple-400 transition-colors"
                >
                  Twitter
                </a>
              )}
              {portfolio?.website && (
                <a
                  href={portfolio.website}
                  target="_blank"
                  rel="noopener noreferrer"  
                  className="text-white/60 hover:text-purple-400 transition-colors"
                >
                  Website
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center text-white/60">
          <p>&copy; 2024 {portfolio?.name || "Portfolio"}. Crafted with passion and creativity.</p>
        </div>
      </footer>
    </div>
  )
}