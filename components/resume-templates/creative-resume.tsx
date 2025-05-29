interface CreativeResumeProps {
  data: {
    resume: any
  }
}

export function CreativeResume({ data }: CreativeResumeProps) {
  const resume = data?.resume;
  
  return (
    <div className="max-w-4xl mx-auto bg-black text-white relative overflow-hidden" style={{ minHeight: "297mm" }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-yellow-400/30 rotate-45"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-yellow-400/20 rotate-12"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 border border-yellow-400/25 -rotate-12"></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 border border-yellow-400/15 rotate-45"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-8 border-b border-yellow-400/20">
        <div className="flex items-center gap-8">
          <div className="relative">
            <img
              src={resume?.avatar || "/placeholder.svg?height=120&width=120"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-yellow-400 object-cover"
            />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full"></div>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-black mb-2">
              <span className="text-yellow-400">{resume?.name?.split(" ")[0] || "YOUR"}</span>
              <span className="text-white"> {resume?.name?.split(" ").slice(1).join(" ") || "NAME"}</span>
            </h1>
            <p className="text-xl text-gray-300 mb-4 font-light">
              {resume?.experience?.[0]?.title?.toUpperCase() || "PROFESSIONAL TITLE"}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                {resume?.email || "email@example.com"}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                {resume?.phone || "Phone Number"}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                {resume?.website ? (
                  <a href={resume.website} className="hover:text-blue-400 transition-colors">
                    Website
                  </a>
                ) : "Website"}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                {resume?.location || "Location"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-3 gap-8 p-8">
        {/* Left Column */}
        <div className="col-span-1 space-y-8">
          {/* About */}
          <div>
            <h2 className="text-xl font-black text-yellow-400 mb-4 flex items-center gap-2">
              <span className="w-4 h-4 bg-yellow-400 rounded-full"></span>
              ABOUT
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              {resume?.summary || "Professional summary goes here."}
            </p>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xl font-black text-yellow-400 mb-4 flex items-center gap-2">
              <span className="w-4 h-4 bg-yellow-400 rounded-full"></span>
              SKILLS
            </h2>
            <div className="space-y-3">
              {(resume?.skills || [])
                .slice(0, 8)
                .map((skill: string, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{skill}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div
                          key={dot}
                          className={`w-2 h-2 ${
                            dot <= (3 + Math.floor(Math.random() * 3)) ? "bg-yellow-400" : "bg-gray-600"
                          }`}
                          style={{
                            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xl font-black text-yellow-400 mb-4 flex items-center gap-2">
              <span className="w-4 h-4 bg-yellow-400 rounded-full"></span>
              EDUCATION
            </h2>
            <div className="space-y-4">
              {(resume?.education || []).map((edu: any, index: number) => (
                <div key={index} className="border-l-2 border-purple-400 pl-4">
                  <h3 className="font-bold text-sm text-white">{edu.degree}</h3>
                  <p className="text-sm text-purple-300">{edu.school}</p>
                  <p className="text-xs text-gray-400">{edu.period}</p>
                  {edu.gpa && <p className="text-xs text-gray-400">GPA: {edu.gpa}</p>}
                  {edu.location && <p className="text-xs text-gray-400">{edu.location}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          {resume?.certifications && resume.certifications.length > 0 && (
            <div>
              <h2 className="text-xl font-black text-blue-400 mb-4 flex items-center gap-2">
                <span className="w-4 h-4 bg-blue-400 rounded-full"></span>
                CERTIFICATIONS
              </h2>
              <div className="space-y-3">
                {resume.certifications.slice(0, 3).map((cert: any, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-yellow-400 text-lg">🏆</span>
                    <div>
                      <p className="text-sm font-bold">{cert.name}</p>
                      <p className="text-xs text-gray-400">{cert.issuer} • {cert.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GitHub Stats */}
          {resume?.stats && (
            <div>
              <h2 className="text-xl font-black text-green-400 mb-4 flex items-center gap-2">
                <span className="w-4 h-4 bg-green-400 rounded-full"></span>
                GITHUB STATS
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-lg">📚</span>
                  <div>
                    <p className="text-sm font-bold">{resume.stats.repositories} Repositories</p>
                    <p className="text-xs text-gray-400">Public Projects</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-lg">👥</span>
                  <div>
                    <p className="text-sm font-bold">{resume.stats.followers} Followers</p>
                    <p className="text-xs text-gray-400">GitHub Community</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-lg">⭐</span>
                  <div>
                    <p className="text-sm font-bold">{resume.stats.yearsActive} Years Active</p>
                    <p className="text-xs text-gray-400">Coding Experience</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-8">
          {/* Experience */}
          <div>
            <h2 className="text-2xl font-black text-yellow-400 mb-6 flex items-center gap-3">
              <span className="w-6 h-6 bg-yellow-400 rounded-full"></span>
              EXPERIENCE
            </h2>
            <div className="space-y-6">
              {(resume?.experience || []).map((exp: any, index: number) => (
                <div key={index} className="relative">
                  <div className="bg-gray-900 border border-yellow-400/30 rounded-lg p-6 hover:border-yellow-400 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-black text-lg text-white">{exp.title}</h3>
                        <p className="text-yellow-400 font-bold">{exp.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-purple-400">{exp.period}</p>
                        {exp.location && <p className="text-xs text-gray-400">{exp.location}</p>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {(Array.isArray(exp.description) ? exp.description : [exp.description]).map(
                        (item: string, itemIndex: number) => (
                          <div key={itemIndex} className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                            <p className="text-sm text-gray-300">{item}</p>
                          </div>
                        ),
                      )}
                    </div>
                    {exp.technologies && (
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                          {[...new Set(exp.technologies as string[])].map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="bg-blue-400/20 text-blue-400 px-2 py-1 text-xs font-bold border border-blue-400/30 rounded"
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
              <h2 className="text-2xl font-black text-purple-400 mb-6 flex items-center gap-3">
                <span className="w-6 h-6 bg-purple-400 rounded-full"></span>
                FEATURED PROJECTS
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {resume.projects.slice(0, 3).map((project: any, index: number) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-400/30 rounded-lg p-6 hover:border-purple-400 transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-black text-lg text-white">{project.name}</h3>
                      <span className="text-sm text-gray-400">{project.period}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      {project.description?.split('\n')[0] || project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(project.technologies as string[])?.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-yellow-400/20 text-yellow-400 px-3 py-1 text-xs font-bold border border-yellow-400/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs">
                        {project.stars > 0 && (
                          <span className="flex items-center gap-1 text-yellow-400">
                            <span>⭐</span>
                            {project.stars}
                          </span>
                        )}
                        {project.forks > 0 && (
                          <span className="flex items-center gap-1 text-blue-400">
                            <span>🍴</span>
                            {project.forks}
                          </span>
                        )}
                      </div>
                      {project.url && (
                        <a
                          href={project.url}
                          className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          VIEW PROJECT →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-yellow-400/20 p-6 text-center">
        <p className="text-gray-400 text-sm">
          <span className="text-yellow-400">CRAFTED WITH CODE</span> •
          <span className="text-purple-400"> DESIGNED WITH PASSION</span> •
          <span className="text-blue-400"> BUILT FOR THE FUTURE</span>
        </p>
      </div>
    </div>
  )
}