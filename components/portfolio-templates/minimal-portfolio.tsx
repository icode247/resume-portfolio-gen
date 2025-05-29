interface MinimalPortfolioProps {
  data: any
}

export function MinimalPortfolio({ data }: MinimalPortfolioProps) {
  const portfolio = data?.portfolio || data; // Handle both data structures
  
  return (
    <div className="min-h-screen bg-white text-gray-900 font-light">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-light tracking-wide">{portfolio?.name || "Portfolio"}</div>
            <div className="hidden md:flex space-x-12 text-sm">
              <a href="#work" className="hover:text-gray-600 transition-colors">
                Work
              </a>
              <a href="#about" className="hover:text-gray-600 transition-colors">
                About
              </a>
              <a href="#contact" className="hover:text-gray-600 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-6xl lg:text-8xl font-extralight mb-8 leading-none">
                Digital
                <br />
                <span className="font-light">Craftsman</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-md">
                {portfolio?.bio || "Passionate developer creating thoughtful digital experiences with focus on simplicity and functionality."}
              </p>
              <div className="flex items-center gap-8">
                <button className="bg-black text-white px-8 py-3 text-sm tracking-wide hover:bg-gray-800 transition-colors">
                  VIEW WORK
                </button>
                <a
                  href="#contact"
                  className="text-sm tracking-wide border-b border-gray-300 hover:border-gray-600 transition-colors"
                >
                  GET IN TOUCH
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto">
                <img
                  src={portfolio?.avatar || "/placeholder.svg?height=400&width=400"}
                  alt="Profile"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-extralight mb-4">Selected Work</h2>
            <p className="text-gray-600 max-w-2xl">
              A curated collection of projects that showcase my approach to problem-solving and attention to detail.
            </p>
          </div>

          <div className="space-y-24">
            {portfolio?.projects && portfolio.projects.length > 0 ? (
              portfolio.projects.slice(0, 4).map((project: any, index: number) => (
                <div
                  key={project.id || index}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                >
                  <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                    <div className="aspect-video bg-gray-200 overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg?height=400&width=600"}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                  <div className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-light mb-2">{project.title}</h3>
                        <p className="text-gray-600 leading-relaxed line-clamp-4">{project.description}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500 uppercase tracking-wide">Technologies</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies?.map((tech: string, techIndex: number) => (
                            <span key={techIndex} className="text-sm text-gray-700 border-b border-gray-300">
                              {tech}
                            </span>
                          ))}
                        </div>
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
                            Updated: {new Date(project.lastUpdated).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-6 pt-4">
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm tracking-wide border-b border-gray-300 hover:border-gray-600 transition-colors"
                          >
                            VIEW PROJECT
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm tracking-wide border-b border-gray-300 hover:border-gray-600 transition-colors"
                          >
                            SOURCE CODE
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-600">
                <p>No projects available to display</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-extralight mb-8">About</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  I'm a passionate developer with {portfolio?.stats?.yearsActive || 'several'} years of experience creating digital
                  solutions that matter. My GitHub profile showcases {portfolio?.stats?.repositories || 'many'} repositories, 
                  demonstrating my commitment to continuous learning and open-source contribution.
                </p>
                <p>
                  I believe in the power of simplicity and the importance of details. Every project is an opportunity to
                  learn, grow, and create something meaningful that makes a positive impact.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, reading design books, or enjoying the
                  outdoors. I'm always open to discussing new opportunities and interesting projects.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-4">Expertise</h3>
                <div className="space-y-2">
                  {portfolio?.skills && portfolio.skills.length > 0 ? (
                    portfolio.skills.slice(0, 6).map((skill: any, index: number) => (
                      <div key={index} className="text-gray-700">
                        {skill.name}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">Skills information not available</div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-4">Recognition</h3>
                <div className="space-y-2 text-gray-700">
                  <div>{portfolio?.stats?.repositories || 0} Projects</div>
                  <div>{portfolio?.stats?.followers || 0} GitHub Followers</div>
                  <div>{portfolio?.stats?.yearsActive || 0} Years Active</div>
                  {portfolio?.stats?.following && (
                    <div>{portfolio.stats.following} Following</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-extralight mb-8">Let's Connect</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                I'm always interested in hearing about new projects and opportunities. Whether you have a question or
                just want to say hello, I'd love to hear from you.
              </p>
              <div className="space-y-4">
                {portfolio?.email && (
                  <div>
                    <a
                      href={`mailto:${portfolio.email}`}
                      className="text-lg hover:text-gray-600 transition-colors"
                    >
                      {portfolio.email}
                    </a>
                  </div>
                )}
                <div className="flex gap-6">
                  {portfolio?.social?.github && (
                    <a
                      href={portfolio.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm tracking-wide border-b border-gray-300 hover:border-gray-600 transition-colors"
                    >
                      GITHUB
                    </a>
                  )}
                  {portfolio?.social?.linkedin && (
                    <a
                      href={portfolio.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm tracking-wide border-b border-gray-300 hover:border-gray-600 transition-colors"
                    >
                      LINKEDIN
                    </a>
                  )}
                  {portfolio?.social?.twitter && (
                    <a
                      href={portfolio.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm tracking-wide border-b border-gray-300 hover:border-gray-600 transition-colors"
                    >
                      TWITTER
                    </a>
                  )}
                  {portfolio?.website && (
                    <a
                      href={portfolio.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm tracking-wide border-b border-gray-300 hover:border-gray-600 transition-colors"
                    >
                      WEBSITE
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-white p-8">
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full border-b border-gray-200 py-3 focus:border-gray-400 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border-b border-gray-200 py-3 focus:border-gray-400 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Message"
                    rows={4}
                    className="w-full border-b border-gray-200 py-3 focus:border-gray-400 focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>
                <button className="bg-black text-white px-8 py-3 text-sm tracking-wide hover:bg-gray-800 transition-colors">
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>&copy; 2024 {portfolio?.name || "Portfolio"}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}