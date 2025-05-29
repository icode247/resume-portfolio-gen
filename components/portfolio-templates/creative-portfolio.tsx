interface CreativePortfolioProps {
  data: any
}

export function CreativePortfolio({ data }: CreativePortfolioProps) {
  const portfolio = data?.portfolio || data; // Handle both data structures
  
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Navigation - Fixed with lower z-index */}
      <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <span className="text-yellow-400">&lt;</span>
              {portfolio?.name?.split(" ")[0] || "Dev"}
              <span className="text-yellow-400">/&gt;</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="hover:text-yellow-400 transition-colors">
                Home
              </a>
              <a href="#projects" className="hover:text-yellow-400 transition-colors">
                Projects
              </a>
              <a href="#skills" className="hover:text-yellow-400 transition-colors">
                Skills
              </a>
              <a href="#contact" className="hover:text-yellow-400 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-orange-600/10"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
          <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-yellow-500 rounded-full animate-bounce"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-200 rounded-full animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <img
              src={portfolio?.avatar || "/placeholder.svg?height=200&width=200"}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-yellow-400 shadow-lg shadow-yellow-400/25"
            />
          </div>

          <h1 className="text-6xl lg:text-8xl font-black mb-6">
            <span className="text-yellow-400">CREATIVE</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              DEVELOPER
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {portfolio?.bio || "Transforming ideas into digital reality through innovative code and creative solutions"}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-yellow-400 text-black px-8 py-4 font-bold hover:bg-yellow-300 transition-all transform hover:scale-105">
              EXPLORE WORK
            </button>
            <button className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 font-bold hover:bg-yellow-400 hover:text-black transition-all">
              DOWNLOAD CV
            </button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16">
            <span className="text-yellow-400">FEATURED</span> PROJECTS
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {portfolio?.projects && portfolio.projects.length > 0 ? (
              portfolio.projects.slice(0, 4).map((project: any, index: number) => (
                <div
                  key={project.id || index}
                  className="group relative bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg?height=300&width=500"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-yellow-400/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-black">
                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                        <p className="mb-4 px-4 line-clamp-3">{project.description}</p>
                        <div className="flex gap-4 justify-center">
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-black text-yellow-400 px-4 py-2 font-bold hover:bg-gray-800 transition-colors"
                            >
                              VIEW LIVE
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="border-2 border-black text-black px-4 py-2 font-bold hover:bg-black hover:text-yellow-400 transition-all"
                            >
                              SOURCE
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.slice(0, 3).map((tech: string, techIndex: number) => (
                        <span key={techIndex} className="bg-yellow-400/20 text-yellow-400 px-3 py-1 text-sm font-bold">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>⭐ {project.stars || 0}</span>
                      <span>🍴 {project.forks || 0}</span>
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
              <div className="col-span-full text-center text-gray-400">
                <p>No projects available to display</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16">
            <span className="text-yellow-400">TECH</span> ARSENAL
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolio?.skills && portfolio.skills.length > 0 ? (
              portfolio.skills.map((skill: any, index: number) => (
                <div
                  key={index}
                  className="bg-black p-6 rounded-lg border border-yellow-400/20 hover:border-yellow-400 transition-all group"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-purple-400 rounded-full flex items-center justify-center text-black font-bold text-lg group-hover:scale-110 transition-transform">
                      {skill.level}%
                    </div>
                    <h3 className="text-xl font-bold text-yellow-400 mb-2">{skill.name}</h3>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-purple-400 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400">
                <p>Skills information not available</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-gradient-to-br from-yellow-400/10 to-purple-400/10 p-8 rounded-lg border border-yellow-400/20">
              <div className="text-4xl font-black text-yellow-400 mb-2">{portfolio?.stats?.repositories || 0}</div>
              <div className="text-gray-300">PROJECTS</div>
            </div>
            <div className="bg-gradient-to-br from-purple-400/10 to-blue-400/10 p-8 rounded-lg border border-purple-400/20">
              <div className="text-4xl font-black text-purple-400 mb-2">{portfolio?.stats?.followers || 0}</div>
              <div className="text-gray-300">FOLLOWERS</div>
            </div>
            <div className="bg-gradient-to-br from-blue-400/10 to-green-400/10 p-8 rounded-lg border border-blue-400/20">
              <div className="text-4xl font-black text-blue-400 mb-2">{portfolio?.stats?.yearsActive || 0}</div>
              <div className="text-gray-300">YEARS EXP</div>
            </div>
            <div className="bg-gradient-to-br from-green-400/10 to-yellow-400/10 p-8 rounded-lg border border-green-400/20">
              <div className="text-4xl font-black text-green-400 mb-2">{portfolio?.stats?.following || '∞'}</div>
              <div className="text-gray-300">FOLLOWING</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-yellow-400/5 to-purple-400/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-8">
            <span className="text-yellow-400">LET'S</span> CREATE
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Ready to build something amazing? Let's turn your vision into reality.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {portfolio?.email && (
              <a
                href={`mailto:${portfolio.email}`}
                className="bg-yellow-400 text-black px-8 py-4 font-bold hover:bg-yellow-300 transition-all transform hover:scale-105"
              >
                START PROJECT
              </a>
            )}
            {portfolio?.social?.github && (
              <a
                href={portfolio.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 font-bold hover:bg-yellow-400 hover:text-black transition-all"
              >
                VIEW GITHUB
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
                  className="text-gray-400 hover:text-yellow-400 transition-colors font-bold"
                >
                  LINKEDIN
                </a>
              )}
              {portfolio.social.twitter && (
                <a
                  href={portfolio.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors font-bold"
                >
                  TWITTER
                </a>
              )}
              {portfolio?.website && (
                <a
                  href={portfolio.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-yellow-400 transition-colors font-bold"
                >
                  WEBSITE
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-yellow-400/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            &copy; 2024 {portfolio?.name || "Portfolio"}.<span className="text-yellow-400"> Coded with passion</span> ⚡
          </p>
        </div>
      </footer>
    </div>
  )
}