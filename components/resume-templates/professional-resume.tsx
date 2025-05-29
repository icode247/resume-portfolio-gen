interface ProfessionalResumeProps {
  data: {
    resume: any
  }
}

export function ProfessionalResume({ data }: ProfessionalResumeProps) {
  const resume = data?.resume;
  
  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 shadow-2xl" style={{ minHeight: "297mm" }}>
      {/* Header */}
      <div className="bg-gray-800 text-white p-8">
        <div className="flex items-center gap-8">
          <img
            src={resume?.avatar || "/placeholder.svg?height=120&width=120"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{resume?.name || "Your Name"}</h1>
            <p className="text-xl text-slate-300 mb-4">
              {resume?.experience?.[0]?.title || "Professional Title"}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-xs">📧</span>
                </span>
                {resume?.email || "email@example.com"}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-xs">📱</span>
                </span>
                {resume?.phone || "Phone Number"}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-xs">🌐</span>
                </span>
                {resume?.website ? (
                  <a href={resume.website} className="hover:text-slate-200 transition-colors">
                    Website
                  </a>
                ) : (
                  "Website"
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-xs">📍</span>
                </span>
                {resume?.location || "Location"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 p-8">
        {/* Left Column */}
        <div className="col-span-1 space-y-8">
          {/* Skills */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b-2 border-gray-600">TECHNICAL SKILLS</h2>
            <div className="space-y-3">
              {(resume?.skills || [])
                .slice(0, 8)
                .map((skill: string, index: number) => {
                  const rating = Math.floor(3 + Math.random() * 2); // 3-5 dots
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{skill}</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((dot) => (
                          <div
                            key={dot}
                            className={`w-2 h-2 rounded-full ${
                              dot <= rating ? "bg-gray-600" : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b-2 border-gray-600">EDUCATION</h2>
            <div className="space-y-4">
              {(resume?.education || []).map((edu: any, index: number) => (
                <div key={index}>
                  <h3 className="font-semibold text-sm">{edu.degree}</h3>
                  <p className="text-sm text-gray-600">{edu.school}</p>
                  <p className="text-xs text-gray-500">{edu.period}</p>
                  {edu.gpa && <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>}
                  {edu.location && <p className="text-xs text-gray-500">{edu.location}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b-2 border-gray-600">CERTIFICATIONS</h2>
            <div className="space-y-3">
              {(resume?.certifications || []).map((cert: any, index: number) => (
                <div key={index}>
                  <h3 className="font-semibold text-sm">{cert.name}</h3>
                  <p className="text-xs text-gray-600">
                    {cert.issuer} • {cert.date}
                  </p>
                  {cert.credentialId && (
                    <p className="text-xs text-gray-500">ID: {cert.credentialId}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Stats */}
          {resume?.stats && (
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b-2 border-gray-600">GITHUB STATS</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Repositories</span>
                  <span className="text-sm font-bold text-blue-600">{resume.stats.repositories}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Followers</span>
                  <span className="text-sm font-bold text-blue-600">{resume.stats.followers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Years Active</span>
                  <span className="text-sm font-bold text-blue-600">{resume.stats.yearsActive}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-8">
          {/* Professional Summary */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b-2 border-gray-600">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              {resume?.summary || "Professional summary goes here."}
            </p>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b-2 border-gray-600">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-6">
              {(resume?.experience || []).map((exp: any, index: number) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-base">{exp.title}</h3>
                      <p className="text-sm font-semibold text-blue-600">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{exp.period}</p>
                      {exp.location && <p className="text-xs text-gray-500">{exp.location}</p>}
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 mb-3">
                    {(Array.isArray(exp.description) ? exp.description : [exp.description]).map(
                      (item: string, itemIndex: number) => (
                        <li key={itemIndex}>{item}</li>
                      ),
                    )}
                  </ul>
                  {exp.technologies && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-600 font-medium mb-1">Technologies:</p>
                      <div className="flex flex-wrap gap-1">
                        {[...new Set(exp.technologies as string[])].map((tech, techIndex) => (
                          <span key={techIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
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
              <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b-2 border-gray-600">KEY PROJECTS</h2>
              <div className="grid grid-cols-1 gap-4">
                {resume.projects.slice(0, 3).map((project: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-sm">{project.name}</h3>
                        {project.url && (
                          <a href={project.url} className="text-blue-600 hover:text-blue-800 transition-colors text-xs">
                            View Project →
                          </a>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{project.period}</span>
                    </div>
                    <p className="text-xs text-gray-700 mb-2">
                      {project.description?.split('\n')[0] || project.description}
                    </p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {(project.technologies as string[])?.slice(0, 4).map((tech, techIndex) => (
                          <span key={techIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {(project.stars > 0 || project.forks > 0) && (
                      <div className="flex items-center gap-3 text-xs text-gray-500">
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