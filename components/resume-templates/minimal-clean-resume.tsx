interface MinimalCleanResumeProps {
  data: {
    resume: any
  }
}

export function MinimalCleanResume({ data }: MinimalCleanResumeProps) {
  const resume = data?.resume;
  
  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 shadow-2xl" style={{ minHeight: "297mm" }}>
      {/* Header */}
      <div className="text-center py-12 border-b border-gray-200">
        <h1 className="text-5xl font-light tracking-wide text-gray-800 mb-2">
          {resume?.name?.toUpperCase() || "YOUR NAME"}
        </h1>
        <p className="text-lg text-gray-600 tracking-widest uppercase">
          {resume?.experience?.[0]?.title || "Professional Title"}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-12 p-12">
        {/* Left Column */}
        <div className="col-span-1 space-y-10">
          {/* Contact */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-6 tracking-wide uppercase">Contact</h2>
            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex items-center gap-3">
                <span className="text-gray-500">📞</span>
                {resume?.phone || "Phone Number"}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500">✉️</span>
                {resume?.email || "email@example.com"}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500">📍</span>
                {resume?.location || "Location"}
              </div>
              {resume?.website && (
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">🌐</span>
                  <a href={resume.website} className="hover:text-gray-900 transition-colors">
                    Website
                  </a>
                </div>
              )}
              {resume?.github && (
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">💻</span>
                  <a href={resume.github} className="hover:text-gray-900 transition-colors">
                    GitHub
                  </a>
                </div>
              )}
              {resume?.linkedin && (
                <div className="flex items-center gap-3">
                  <span className="text-gray-500">💼</span>
                  <a href={resume.linkedin} className="hover:text-gray-900 transition-colors">
                    LinkedIn
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-6 tracking-wide uppercase">Education</h2>
            <div className="space-y-6">
              {(resume?.education || []).map((edu: any, index: number) => (
                <div key={index}>
                  <p className="text-sm font-bold text-gray-800">{edu.period}</p>
                  <p className="text-sm font-bold text-gray-800 uppercase">{edu.school}</p>
                  <p className="text-sm text-gray-600">{edu.degree}</p>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  {edu.location && <p className="text-sm text-gray-600">{edu.location}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-6 tracking-wide uppercase">Skills</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              {(resume?.skills || [])
                .slice(0, 8)
                .map((skill: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    {skill}
                  </li>
                ))}
            </ul>
          </div>

          {/* Certifications */}
          {resume?.certifications && resume.certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-6 tracking-wide uppercase">Certifications</h2>
              <div className="space-y-4">
                {resume.certifications.map((cert: any, index: number) => (
                  <div key={index}>
                    <p className="text-sm font-bold text-gray-800">{cert.name}</p>
                    <p className="text-sm text-gray-600">{cert.issuer}</p>
                    <p className="text-sm text-gray-600">{cert.date}</p>
                    {cert.credentialId && (
                      <p className="text-xs text-gray-500">Credential ID: {cert.credentialId}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GitHub Stats */}
          {resume?.stats && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-6 tracking-wide uppercase">GitHub Stats</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  {resume.stats.repositories} Repositories
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  {resume.stats.followers} Followers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  {resume.stats.yearsActive} Years Active
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-10">
          {/* Profile Summary */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-6 tracking-wide uppercase">Profile Summary</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {resume?.summary || "Professional summary goes here."}
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-6 tracking-wide uppercase">Work Experience</h2>
            <div className="space-y-8">
              {(resume?.experience || []).map((exp: any, index: number) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-800">{exp.title}</h3>
                      <p className="text-gray-600 font-medium">{exp.company}</p>
                      {exp.location && (
                        <p className="text-sm text-gray-600">{exp.location}</p>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 font-medium">{exp.period}</p>
                  </div>
                  
                  <ul className="space-y-2 text-sm text-gray-700 mb-4">
                    {(Array.isArray(exp.achievements)
                      ? exp.achievements
                      : Array.isArray(exp.description)
                      ? exp.description
                      : exp.description
                      ? [exp.description]
                      : []
                    ).map((achievement: string, achievementIndex: number) => (
                      <li key={achievementIndex} className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>

                  {exp.technologies && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-600 font-medium mb-2">Technologies:</p>
                      <div className="flex flex-wrap gap-2">
                        {[...new Set(exp.technologies as string[])].map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
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
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-6 tracking-wide uppercase">Featured Projects</h2>
              <div className="space-y-8">
                {resume.projects.slice(0, 3).map((project: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-gray-800">{project.name}</h3>
                        {project.url && (
                          <a href={project.url} className="text-gray-600 hover:text-gray-800 transition-colors text-sm">
                            View Project →
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 font-medium">{project.period}</p>
                    </div>
                    
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">
                      {project.description?.split('\n')[0] || project.description}
                    </p>

                    {project.technologies && (
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-2">
                          {(project.technologies as string[]).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
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
        </div>
      </div>
    </div>
  )
}