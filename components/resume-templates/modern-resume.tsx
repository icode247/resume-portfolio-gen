interface ModernResumeProps {
  data: {
    resume: any
  }
}

export function ModernResume({ data }: ModernResumeProps) {
  const resume = data?.resume;
  
  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900" style={{ minHeight: "297mm" }}>
      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-8 mb-6">
            <img
              src={resume?.avatar || "/placeholder.svg?height=100&width=100"}
              alt="Profile"
              className="w-20 h-20 rounded-full border-3 border-white shadow-lg object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold mb-1">{resume?.name || "Your Name"}</h1>
              <p className="text-lg text-purple-100">
                {resume?.experience?.[0]?.title || "Professional Title"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xs">✉️</span>
              </div>
              <span>{resume?.email || "email@example.com"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xs">📱</span>
              </div>
              <span>{resume?.phone || "Phone Number"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xs">🌐</span>
              </div>
              {resume?.website ? (
                <a href={resume.website} className="hover:text-purple-200 transition-colors">
                  Website
                </a>
              ) : (
                <span>Website</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xs">📍</span>
              </div>
              <span>{resume?.location || "Location"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {resume?.summary || "Professional summary goes here."}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-1 space-y-8">
            {/* Skills */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                Skills
              </h2>
              <div className="space-y-4">
                {(resume?.skills || [])
                  .slice(0, 8)
                  .map((skill: string, index: number) => {
                    const proficiency = 85 + Math.floor(Math.random() * 15);
                    return (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{skill}</span>
                          <span className="text-xs text-gray-500">{proficiency}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full"
                            style={{ width: `${proficiency}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                Education
              </h2>
              <div className="space-y-4">
                {(resume?.education || []).map((edu: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-sm text-gray-800">{edu.degree}</h3>
                    <p className="text-sm text-purple-600 font-medium">{edu.school}</p>
                    <p className="text-xs text-gray-500">{edu.period}</p>
                    {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                    {edu.location && <p className="text-xs text-gray-500">{edu.location}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            {resume?.certifications && resume.certifications.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                  Certifications
                </h2>
                <div className="space-y-3">
                  {resume.certifications.map((cert: any, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <span className="text-sm font-medium">{cert.name}</span>
                        <p className="text-xs text-gray-500">{cert.issuer}</p>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{cert.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GitHub Stats */}
            {resume?.stats && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                  GitHub Stats
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Repositories</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{resume.stats.repositories}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Followers</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{resume.stats.followers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Years Active</span>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">{resume.stats.yearsActive}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-2 space-y-8">
            {/* Experience */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                Experience
              </h2>
              <div className="space-y-6">
                {(resume?.experience || []).map((exp: any, index: number) => (
                  <div key={index} className="relative pl-8 pb-6">
                    <div className="absolute left-0 top-2 w-4 h-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full"></div>
                    {index < (resume?.experience?.length - 1) && (
                      <div className="absolute left-2 top-6 w-0.5 h-full bg-gray-200"></div>
                    )}

                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{exp.title}</h3>
                          <p className="text-purple-600 font-semibold">{exp.company}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-600">{exp.period}</p>
                          {exp.location && <p className="text-xs text-gray-500">{exp.location}</p>}
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {(Array.isArray(exp.description) ? exp.description : [exp.description]).map(
                          (item: string, itemIndex: number) => (
                            <li key={itemIndex} className="text-sm text-gray-700 flex items-start gap-2">
                              <span className="text-purple-600 mt-1">▸</span>
                              {item}
                            </li>
                          ),
                        )}
                      </ul>
                      {exp.technologies && (
                        <div className="mt-4">
                          <div className="flex flex-wrap gap-2">
                            {[...new Set(exp.technologies as string[])].map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            {resume?.projects && resume.projects.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                  Featured Projects
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {resume.projects.slice(0, 3).map((project: any, index: number) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{project.name}</h3>
                          {project.url && (
                            <a href={project.url} className="text-purple-600 hover:text-purple-800 transition-colors text-sm">
                              View Project →
                            </a>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{project.period}</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">
                        {project.description?.split('\n')[0] || project.description}
                      </p>
                      {project.technologies && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {(project.technologies as string[])?.slice(0, 4).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="bg-white text-purple-700 px-3 py-1 rounded-full text-xs font-medium border border-purple-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      {(project.stars > 0 || project.forks > 0) && (
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          {project.stars > 0 && (
                            <span className="flex items-center gap-1">
                              <span className="text-yellow-500">⭐</span>
                              {project.stars} stars
                            </span>
                          )}
                          {project.forks > 0 && (
                            <span className="flex items-center gap-1">
                              <span className="text-blue-500">🍴</span>
                              {project.forks} forks
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
