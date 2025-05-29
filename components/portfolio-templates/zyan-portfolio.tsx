interface ZyanPortfolioProps {
  data: any;
}

export function ZyanPortfolio({ data }: ZyanPortfolioProps) {
  const portfolio = data?.portfolio || data;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">
                  {portfolio?.name?.charAt(0) || "Z"}
                </span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {portfolio?.name || "Portfolio"}
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                About
              </a>
              <a
                href="#services"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Services
              </a>
              <a
                href="#portfolio"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Portfolio
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Contact
              </a>
            </nav>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
              Hire Me
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 pt-20"
      >
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              👋 Welcome to my portfolio
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-gray-900">I'm</span>{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {portfolio?.name || "Developer"}
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {portfolio?.bio ||
                "Passionate developer building amazing projects"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                View My Work
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all">
                Download CV
              </button>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Available for freelance
              </div>
              {portfolio?.location && (
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  {portfolio.location}
                </div>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10">
              <img
                src={
                  portfolio?.avatar || "/placeholder.svg?height=500&width=500"
                }
                alt="Profile"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Passionate Developer
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {portfolio?.summary}
              </p>
              {/* <p className="text-gray-600 leading-relaxed mb-8">
                With {portfolio?.stats?.followers || 'many'} followers on GitHub, I actively contribute to the open-source community 
                and share knowledge through my projects and collaborations.
              </p> */}

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {portfolio?.stats?.repositories || 0}
                  </div>
                  <div className="text-gray-600">Projects</div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {portfolio?.stats?.followers || 0}
                  </div>
                  <div className="text-gray-600">Followers</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Skills & Expertise
              </h3>
              <div className="space-y-6">
                {portfolio?.skills && portfolio.skills.length > 0 ? (
                  portfolio.skills
                    .slice(0, 5)
                    .map((skill: any, index: number) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            {skill.name}
                          </span>
                          <span className="text-blue-600 font-semibold">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-1000"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-600">
                    Skills information not available
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Services</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              I offer comprehensive web development services to help bring your
              digital vision to life
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-white text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Web Development
              </h3>
              <p className="text-gray-600">
                Full-stack web applications built with modern technologies like
                React, Node.js, and TypeScript
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-white text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                UI/UX Design
              </h3>
              <p className="text-gray-600">
                Beautiful and intuitive user interfaces that provide exceptional
                user experiences
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-white text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Mobile Apps
              </h3>
              <p className="text-gray-600">
                Cross-platform mobile applications using React Native and modern
                development practices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Work
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A selection of my recent projects showcasing my skills in web
              development and design
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio?.projects && portfolio.projects.length > 0 ? (
              portfolio.projects
                .slice(0, 6)
                .map((project: any, index: number) => (
                  <div
                    key={project.id || index}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex gap-2">
                            {project.demo && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold flex-1 hover:bg-gray-100 transition-colors text-center"
                              >
                                View Project
                              </a>
                            )}
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors"
                              >
                                GitHub
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies
                          ?.slice(0, 3)
                          .map((tech: string, techIndex: number) => (
                            <span
                              key={techIndex}
                              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
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
              <div className="col-span-full text-center text-gray-600">
                <p>No projects available to display</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Have a project in mind? I'd love to hear about it and discuss how we
            can bring your ideas to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {portfolio?.email && (
              <a
                href={`mailto:${portfolio.email}`}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transition-all"
              >
                Get In Touch
              </a>
            )}
            {portfolio?.social?.github && (
              <a
                href={portfolio.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-blue-600 text-blue-600 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all"
              >
                View GitHub
              </a>
            )}
          </div>

          {/* Social Links */}
          {portfolio?.social && (
            <div className="flex justify-center gap-6 mt-8">
              {portfolio.social.github && (
                <a
                  href={portfolio.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  GitHub
                </a>
              )}
              {portfolio.social.linkedin && (
                <a
                  href={portfolio.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {portfolio.social.twitter && (
                <a
                  href={portfolio.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Twitter
                </a>
              )}
              {portfolio?.website && (
                <a
                  href={portfolio.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Website
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p>
            &copy; 2024 {portfolio?.name || "Portfolio"}. Crafted with love and
            code.
          </p>
        </div>
      </footer>
    </div>
  );
}
