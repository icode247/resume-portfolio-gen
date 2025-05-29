interface NicholPortfolioProps {
  data: any
}

export function NicholPortfolio({ data }: NicholPortfolioProps) {
  const portfolio = data?.portfolio || data; // Handle both data structures
  
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-green-600">{portfolio?.name?.split(" ")[0] || "Portfolio"}</div>
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
                Home
              </a>
              <a href="#about" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
                About
              </a>
              <a href="#projects" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
                Projects
              </a>
              <a href="#skills" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
                Skills
              </a>
              <a href="#contact" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
                Contact
              </a>
            </nav>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
              Hire Me
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-50"
      >
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="text-gray-900">Hi, I'm</span>
              <br />
              <span className="text-green-600">{portfolio?.name?.split(" ")[0] || "Developer"}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {portfolio?.bio || "Passionate developer creating modern, responsive web applications with clean code and beautiful user interfaces."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                View My Work
              </button>
              <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors">
                Download CV
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="w-80 h-80 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-full blur-3xl opacity-20"></div>
              <img
                src={portfolio?.avatar || "/placeholder.svg?height=320&width=320"}
                alt="Profile"
                className="relative z-10 w-full h-full object-cover rounded-full border-8 border-white shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Developer</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                I'm a dedicated developer with {portfolio?.stats?.yearsActive || 'several'} years of experience building
                scalable web applications. My GitHub profile showcases {portfolio?.stats?.repositories || 'many'} repositories
                with a focus on modern web technologies and best practices.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                I believe in writing clean, maintainable code and creating user experiences that are both beautiful and
                functional. My goal is to help businesses achieve their digital objectives through innovative web
                solutions.
              </p>

              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">{portfolio?.stats?.repositories || 0}</div>
                  <div className="text-gray-600 text-sm">Projects</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">{portfolio?.stats?.followers || 0}</div>
                  <div className="text-gray-600 text-sm">Followers</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">{portfolio?.stats?.yearsActive || 0}</div>
                  <div className="text-gray-600 text-sm">Years</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Technical Expertise</h3>
              <div className="space-y-6">
                {portfolio?.skills && portfolio.skills.length > 0 ? (
                  portfolio.skills.slice(0, 5).map((skill: any, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold text-gray-900">{skill.name}</span>
                        <span className="text-green-600 font-semibold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">Skills information not available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and expertise in web development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio?.projects && portfolio.projects.length > 0 ? (
              portfolio.projects.slice(0, 6).map((project: any, index: number) => (
                <div
                  key={project.id || index}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg?height=250&width=400"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-green-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center">
                        <div className="flex flex-col gap-2">
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                            >
                              View Project
                            </a>
                          )}
                          <div className="flex gap-2 justify-center">
                            {project.demo && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/20 text-white px-4 py-1 rounded text-sm hover:bg-white/30 transition-colors"
                              >
                                Live Demo
                              </a>
                            )}
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/20 text-white px-4 py-1 rounded text-sm hover:bg-white/30 transition-colors"
                              >
                                GitHub
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.slice(0, 3).map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
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
                          Updated: {new Date(project.lastUpdated).toLocaleDateString()}
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

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Technologies</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Dynamic skills based on actual data */}
            {portfolio?.skills && portfolio.skills.length > 0 ? (
              (() => {
                // Group skills by category
                const skillsByCategory = portfolio.skills.reduce((acc: any, skill: any) => {
                  const category = skill.category || 'other';
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(skill);
                  return acc;
                }, {});

                // Create category mappings with friendly names
                const categoryMappings: { [key: string]: string } = {
                  'language': 'Languages',
                  'technology': 'Technologies', 
                  'framework': 'Frameworks',
                  'backend': 'Backend',
                  'frontend': 'Frontend',
                  'other': 'Other Skills'
                };

                // Create categories array with only non-empty categories
                const categories = Object.entries(skillsByCategory)
                  .map(([key, skills]: [string, any]) => ({
                    category: categoryMappings[key] || key.charAt(0).toUpperCase() + key.slice(1),
                    skills: skills.slice(0, 6) // Show up to 6 skills per category
                  }))
                  .filter(cat => cat.skills.length > 0);

                // If we have few categories, add a "Top Skills" category
                if (categories.length < 3) {
                  categories.push({
                    category: "Top Skills",
                    skills: portfolio.skills.slice(0, 6)
                  });
                }

                return categories.map((category, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{category.category}</h3>
                    <ul className="space-y-2">
                      {category.skills.map((skill: any, skillIndex: number) => (
                        <li key={skillIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span className="text-gray-600">{skill.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ));
              })()
            ) : (
              // Fallback generic categories
              [
                { category: "Frontend", skills: ["JavaScript", "TypeScript", "React", "Vue.js"] },
                { category: "Styling", skills: ["CSS3", "SCSS", "Tailwind", "Bootstrap"] },
                { category: "Backend", skills: ["Node.js", "Express", "MongoDB", "PostgreSQL"] },
                { category: "Tools", skills: ["Git", "Webpack", "Vite", "Docker"] },
              ].map((category, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-gray-600">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Let's Work Together</h2>
          <p className="text-xl text-gray-600 mb-12">
            Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {portfolio?.email && (
              <a
                href={`mailto:${portfolio.email}`}
                className="bg-green-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Get In Touch
              </a>
            )}
            {portfolio?.social?.github && (
              <a
                href={portfolio.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-green-600 text-green-600 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 hover:text-white transition-colors"
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
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {portfolio.social.twitter && (
                <a
                  href={portfolio.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Twitter
                </a>
              )}
              {portfolio?.website && (
                <a
                  href={portfolio.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600 transition-colors"
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
          <p>&copy; 2024 {portfolio?.name || "Portfolio"}. Built with passion and code.</p>
        </div>
      </footer>
    </div>
  )
}