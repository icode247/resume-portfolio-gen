interface DarkSidebarResumeProps {
  data: {
    resume: any
  }
}

export function DarkSidebarResume({ data }: DarkSidebarResumeProps) {
  const resume = data?.resume;
  
  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 shadow-2xl" style={{ minHeight: "297mm" }}>
      <div className="grid grid-cols-3 min-h-full">
        {/* Left Sidebar */}
        <div className="col-span-1 bg-slate-800 text-white p-8">
          {/* Profile Photo */}
          <div className="mb-8 flex justify-center">
            <img
              src={resume?.avatar || "/placeholder.svg?height=150&width=150"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>

          {/* Name */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">{resume?.name?.toUpperCase() || "YOUR NAME"}</h1>
            <div className="w-16 h-0.5 bg-white mx-auto mb-2"></div>
            <p className="text-slate-300">
              {resume?.experience?.[0]?.title?.toUpperCase() || "PROFESSIONAL TITLE"}
            </p>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-white">CONTACT</h2>
            <div className="w-12 h-0.5 bg-white mb-4"></div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-slate-300">📱</span>
                <span className="text-slate-300">{resume?.phone || "Phone Number"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-300">✉️</span>
                <span className="text-slate-300">{resume?.email || "email@example.com"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-300">📍</span>
                <span className="text-slate-300">{resume?.location || "Location"}</span>
              </div>
              {resume?.website && (
                <div className="flex items-center gap-2">
                  <span className="text-slate-300">🌐</span>
                  <a href={resume.website} className="text-slate-300 hover:text-white transition-colors">
                    Website
                  </a>
                </div>
              )}
              {resume?.github && (
                <div className="flex items-center gap-2">
                  <span className="text-slate-300">💻</span>
                  <a href={resume.github} className="text-slate-300 hover:text-white transition-colors">
                    GitHub
                  </a>
                </div>
              )}
              {resume?.linkedin && (
                <div className="flex items-center gap-2">
                  <span className="text-slate-300">💼</span>
                  <a href={resume.linkedin} className="text-slate-300 hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-white">EDUCATION</h2>
            <div className="w-12 h-0.5 bg-white mb-4"></div>
            <div className="space-y-6">
              {(resume?.education || []).map((edu: any, index: number) => (
                <div key={index}>
                  <p className="text-sm font-bold text-white">{edu.period}</p>
                  <p className="text-sm font-bold text-slate-300">{edu.school?.toUpperCase()}</p>
                  <p className="text-sm text-slate-400">{edu.degree}</p>
                  {edu.gpa && <p className="text-sm text-slate-400">GPA: {edu.gpa}</p>}
                  {edu.location && <p className="text-sm text-slate-400">{edu.location}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-white">SKILLS</h2>
            <div className="w-12 h-0.5 bg-white mb-4"></div>
            <ul className="space-y-2 text-sm">
              {(resume?.skills || [])
                .slice(0, 8)
                .map((skill: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-slate-300">{skill}</span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Certifications */}
          {resume?.certifications && resume.certifications.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 text-white">CERTIFICATIONS</h2>
              <div className="w-12 h-0.5 bg-white mb-4"></div>
              <div className="space-y-3">
                {resume.certifications.map((cert: any, index: number) => (
                  <div key={index}>
                    <p className="text-sm font-bold text-white">{cert.name}</p>
                    <p className="text-sm text-slate-300">{cert.issuer}</p>
                    <p className="text-sm text-slate-400">{cert.date}</p>
                    {cert.credentialId && (
                      <p className="text-xs text-slate-400">ID: {cert.credentialId}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GitHub Stats */}
          {resume?.stats && (
            <div>
              <h2 className="text-lg font-bold mb-4 text-white">GITHUB STATS</h2>
              <div className="w-12 h-0.5 bg-white mb-4"></div>
              <ul className="space-y-2 text-sm">
                <li className="text-slate-300">
                  <span className="font-medium">Repositories:</span> {resume.stats.repositories}
                </li>
                <li className="text-slate-300">
                  <span className="font-medium">Followers:</span> {resume.stats.followers}
                </li>
                <li className="text-slate-300">
                  <span className="font-medium">Years Active:</span> {resume.stats.yearsActive}
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="col-span-2 p-8">
          {/* Profile */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">PROFILE</h2>
            <div className="w-16 h-0.5 bg-slate-800 mb-4"></div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {resume?.summary || "Professional summary goes here."}
            </p>
          </div>

          {/* Work Experience */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">WORK EXPERIENCE</h2>
            <div className="w-16 h-0.5 bg-slate-800 mb-6"></div>
            <div className="space-y-6">
              {(resume?.experience || []).map((exp: any, index: number) => (
                <div key={index} className="relative pl-6">
                  <div className="absolute left-0 top-2 w-3 h-3 bg-slate-800 rounded-full"></div>
                  {index < (resume?.experience?.length - 1) && (
                    <div className="absolute left-1.5 top-5 w-0.5 h-full bg-slate-300"></div>
                  )}

                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-800">{exp.title}</h3>
                      <p className="text-slate-600 font-medium">{exp.company}</p>
                      {exp.location && (
                        <p className="text-sm text-gray-600">{exp.location}</p>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 font-medium">{exp.period}</p>
                  </div>

                  <ul className="space-y-1 text-sm text-gray-700 mb-3">
                    {(Array.isArray(exp.description) ? exp.description : [exp.description]).map(
                      (item: string, itemIndex: number) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <span className="w-1 h-1 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ),
                    )}
                  </ul>

                  {exp.technologies && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-600 font-medium mb-1">Technologies:</p>
                      <div className="flex flex-wrap gap-1">
                        {[...new Set(exp.technologies as string[])].map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          {resume?.projects && resume.projects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">FEATURED PROJECTS</h2>
              <div className="w-16 h-0.5 bg-slate-800 mb-6"></div>
              <div className="space-y-6">
                {resume.projects.slice(0, 3).map((project: any, index: number) => (
                  <div key={index} className="relative pl-6">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-slate-800 rounded-full"></div>
                    {index < Math.min(resume.projects.length - 1, 2) && (
                      <div className="absolute left-1.5 top-5 w-0.5 h-full bg-slate-300"></div>
                    )}

                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-800">{project.name}</h3>
                        {project.url && (
                          <a href={project.url} className="text-slate-600 hover:text-slate-800 transition-colors text-sm">
                            View Project →
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 font-medium">{project.period}</p>
                    </div>

                    <p className="text-sm text-gray-700 mb-2">
                      {project.description?.split('\n')[0] || project.description}
                    </p>

                    {project.technologies && (
                      <div className="mb-2">
                        <div className="flex flex-wrap gap-1">
                          {(project.technologies as string[]).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {(project.stars > 0 || project.forks > 0) && (
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        {project.stars > 0 && (
                          <span className="flex items-center gap-1">
                            <span>⭐</span>
                            {project.stars} stars
                          </span>
                        )}
                        {project.forks > 0 && (
                          <span className="flex items-center gap-1">
                            <span>🍴</span>
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

          {/* Reference - Only show if we have actual reference data */}
          {resume?.references && resume.references.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">REFERENCE</h2>
              <div className="w-16 h-0.5 bg-slate-800 mb-6"></div>
              <div className="grid grid-cols-2 gap-8">
                {resume.references.slice(0, 2).map((ref: any, index: number) => (
                  <div key={index}>
                    <h3 className="font-bold text-gray-800">{ref.name}</h3>
                    <p className="text-sm text-slate-600 italic">{ref.company} / {ref.title}</p>
                    <div className="mt-2 text-sm text-gray-700">
                      <p>
                        <span className="font-medium">Phone:</span> {ref.phone}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> {ref.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

