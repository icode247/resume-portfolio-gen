interface ModernPortfolioProps {
  data: any;
}

export function ModernPortfolio({ data }: ModernPortfolioProps) {
  const portfolio = data?.portfolio || data;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative">
      {/* Navigation - Fixed with lower z-index */}
      <nav className="fixed top-0 w-full z-40 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {portfolio?.name || "Portfolio"}
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#about"
                className="hover:text-blue-400 transition-colors"
              >
                About
              </a>
              <a
                href="#projects"
                className="hover:text-blue-400 transition-colors"
              >
                Projects
              </a>
              <a
                href="#skills"
                className="hover:text-blue-400 transition-colors"
              >
                Skills
              </a>
              <a
                href="#contact"
                className="hover:text-blue-400 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {portfolio?.name.split(" ")[0]}
                </span>
                <br />
                <span className="font-light">{portfolio?.name.split(" ")[1]}</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {portfolio?.bio ||
                  "Passionate developer building amazing digital experiences with cutting-edge technology."}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                  View My Work
                </button>
                <button className="border border-white/20 px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all">
                  Download CV
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="w-80 h-80 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-30"></div>
                <img
                  src={
                    portfolio?.avatar || "/placeholder.svg?height=320&width=320"
                  }
                  alt="Profile"
                  className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">About Me</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                {portfolio?.summary}
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-2xl font-bold text-blue-400 mb-2">
                  {portfolio?.stats?.repositories || 0}
                </h3>
                <p className="text-gray-300">Projects Completed</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">
                  {portfolio?.stats?.followers || 0}
                </h3>
                <p className="text-gray-300">GitHub Followers</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-2xl font-bold text-blue-400 mb-2">
                  {portfolio?.stats?.yearsActive || 0}+
                </h3>
                <p className="text-gray-300">Years Active</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Skills & Technologies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio?.skills && portfolio.skills.length > 0 ? (
              portfolio.skills.map((skill: any, index: number) => (
                <div
                  key={index}
                  className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{skill.name}</h3>
                    <span className="text-sm text-gray-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
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

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio?.projects && portfolio.projects.length > 0 ? (
              portfolio.projects
                .slice(0, 6)
                .map((project: any, index: number) => (
                  <div
                    key={project.id || index}
                    className="group bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={
                          project.image ||
                          "/placeholder.svg?height=200&width=400"
                        }
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex gap-2">
                            {project.demo && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
                              >
                                Live Demo
                              </a>
                            )}
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
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
                      <p className="text-gray-300 mb-4 text-sm line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies
                          ?.slice(0, 3)
                          .map((tech: string, techIndex: number) => (
                            <span
                              key={techIndex}
                              className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md text-xs"
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
          <h2 className="text-4xl font-bold mb-8">Let's Work Together</h2>
          <p className="text-xl text-gray-300 mb-12">
            Ready to bring your ideas to life? Let's discuss how we can create
            something amazing together.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {portfolio?.email && (
              <a
                href={`mailto:${portfolio.email}`}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                Get In Touch
              </a>
            )}
            {portfolio?.social?.github && (
              <a
                href={portfolio.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all"
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
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>
            &copy; 2024 {portfolio?.name || "Portfolio"}. Crafted with passion
            and code.
          </p>
        </div>
      </footer>
    </div>
  );
}
