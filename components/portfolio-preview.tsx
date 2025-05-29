interface PortfolioPreviewProps {
  data: any
}

export function PortfolioPreview({ data }: PortfolioPreviewProps) {
  return (
    <div className="bg-white text-black min-h-[800px]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12">
        <div className="max-w-4xl mx-auto flex items-center gap-8">
          <img
            src={data?.avatar || "/placeholder.svg?height=150&width=150"}
            alt={data?.name || "Profile"}
            className="w-32 h-32 rounded-full border-4 border-white"
          />
          <div>
            <h1 className="text-4xl font-bold mb-2">{data?.name || "John Doe"}</h1>
            <p className="text-xl mb-4">{data?.bio || "Passionate developer building amazing projects"}</p>
            <div className="flex gap-6 text-sm">
              <div>
                <span className="font-semibold">{data?.stats?.repositories || 25}</span>
                <span className="ml-1">Repositories</span>
              </div>
              <div>
                <span className="font-semibold">{data?.stats?.followers || 150}</span>
                <span className="ml-1">Followers</span>
              </div>
              <div>
                <span className="font-semibold">{data?.stats?.following || 75}</span>
                <span className="ml-1">Following</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="p-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(data?.projects || []).map((project: any, index: number) => (
              <div key={index} className="border rounded-lg overflow-hidden shadow-lg">
                <img
                  src={project.image || "/placeholder.svg?height=200&width=300"}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies?.map((tech: string, techIndex: number) => (
                      <span key={techIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex gap-4">
                      <span>⭐ {project.stars || 0}</span>
                      <span>🍴 {project.forks || 0}</span>
                    </div>
                    <div className="flex gap-2">
                      <a href={project.github} className="text-blue-600 hover:underline">
                        Code
                      </a>
                      <a href={project.demo} className="text-blue-600 hover:underline">
                        Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
