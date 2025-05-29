interface BlueAccentResumeProps {
  data: {
    resume: any
  }
}

export function BlueAccentResume({ data }: BlueAccentResumeProps) {
  const resume = data?.resume;
  
  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 shadow-2xl" style={{ minHeight: "297mm" }}>
      <div className="relative overflow-hidden">
        {/* Blue Diagonal Accent */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-blue-500 to-blue-700 transform -skew-x-12 -translate-x-8"></div>

        <div className="relative z-10 grid grid-cols-3 min-h-full">
          {/* Left Column */}
          <div className="col-span-1 p-8 text-white relative z-20">
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
              <h1 className="text-3xl font-bold mb-2">{resume?.name || "Your Name"}</h1>
              <p className="text-lg text-blue-100">
                {resume?.experience?.[0]?.title || "Professional Title"}
              </p>
            </div>

            {/* Contact */}
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-xl">📞</span>
                Contact
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-blue-200">📱</span>
                  {resume?.phone || "Phone Number"}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-200">✉️</span>
                  {resume?.email || "email@example.com"}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-200">📍</span>
                  {resume?.location || "Location"}
                </div>
                {resume?.website && (
                  <div className="flex items-center gap-2">
                    <span className="text-blue-200">🌐</span>
                    <a href={resume.website} className="hover:text-blue-200 transition-colors">
                      Website
                    </a>
                  </div>
                )}
                {resume?.linkedin && (
                  <div className="flex items-center gap-2">
                    <span className="text-blue-200">💼</span>
                    <a href={resume.linkedin} className="hover:text-blue-200 transition-colors">
                      LinkedIn
                    </a>
                  </div>
                )}
                {resume?.github && (
                  <div className="flex items-center gap-2">
                    <span className="text-blue-200">💻</span>
                    <a href={resume.github} className="hover:text-blue-200 transition-colors">
                      GitHub
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* About Me */}
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-xl">👤</span>
                About Me
              </h2>
              <p className="text-sm text-blue-100 leading-relaxed">
                {resume?.summary || "Professional summary goes here."}
              </p>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-xl">⚙️</span>
                Skills
              </h2>
              <ul className="space-y-2 text-sm">
                {(resume?.skills || [])
                  .slice(0, 6)
                  .map((skill: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-200 rounded-full"></span>
                      {skill}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-2 p-8 bg-gray-50">
            {/* Education */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-2xl">🎓</span>
                Education
              </h2>
              <div className="space-y-6">
                {(resume?.education || []).map((edu: any, index: number) => (
                  <div key={index} className="relative pl-6">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-blue-500 rounded-full"></div>
                    {index < (resume?.education?.length - 1) && (
                      <div className="absolute left-1.5 top-5 w-0.5 h-full bg-blue-200"></div>
                    )}
                    <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                    <p className="text-blue-600 font-medium italic">{edu.school}</p>
                    <p className="text-sm text-gray-600 mb-2">{edu.period}</p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600 mb-2">GPA: {edu.gpa}</p>
                    )}
                    {edu.location && (
                      <p className="text-sm text-gray-600 mb-2">{edu.location}</p>
                    )}
                    {edu.description && (
                      <p className="text-sm text-gray-700 leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-2xl">💼</span>
                Experience
              </h2>
              <div className="space-y-6">
                {(resume?.experience || []).map((exp: any, index: number) => (
                  <div key={index} className="relative pl-6">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-blue-500 rounded-full"></div>
                    {index < (resume?.experience?.length - 1) && (
                      <div className="absolute left-1.5 top-5 w-0.5 h-full bg-blue-200"></div>
                    )}
                    <h3 className="font-bold text-gray-800">{exp.title}</h3>
                    <p className="text-blue-600 font-medium italic">{exp.company}</p>
                    <p className="text-sm text-gray-600 mb-2">{exp.period}</p>
                    {exp.location && (
                      <p className="text-sm text-gray-600 mb-2">{exp.location}</p>
                    )}
                    <div className="text-sm text-gray-700 leading-relaxed">
                      {Array.isArray(exp.description) ? (
                        <ul className="list-disc list-inside space-y-1">
                          {exp.description.map((item: string, idx: number) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{exp.description}</p>
                      )}
                    </div>
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-600 font-medium">Technologies:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {[...new Set(exp.technologies as string[])].map((tech, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
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
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="text-2xl">🚀</span>
                  Projects
                </h2>
                <div className="space-y-6">
                  {resume.projects.slice(0, 3).map((project: any, index: number) => (
                    <div key={index} className="relative pl-6">
                      <div className="absolute left-0 top-2 w-3 h-3 bg-blue-500 rounded-full"></div>
                      {index < Math.min(resume.projects.length - 1, 2) && (
                        <div className="absolute left-1.5 top-5 w-0.5 h-full bg-blue-200"></div>
                      )}
                      <h3 className="font-bold text-gray-800">{project.name}</h3>
                      {project.url && (
                        <a href={project.url} className="text-blue-600 font-medium italic hover:underline">
                          View Project
                        </a>
                      )}
                      <p className="text-sm text-gray-600 mb-2">{project.period}</p>
                      <p className="text-sm text-gray-700 leading-relaxed mb-2">
                        {project.description?.split('\n')[0] || project.description}
                      </p>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {(project.technologies as string[]).map((tech, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {resume?.certifications && resume.certifications.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  Certifications
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {resume.certifications.map((cert: any, index: number) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="font-bold text-gray-800">{cert.name}</h3>
                      <p className="text-sm text-gray-600 italic">{cert.issuer}</p>
                      <p className="text-sm text-gray-700 mt-1">
                        <span className="font-medium">Date:</span> {cert.date}
                      </p>
                      {cert.credentialId && (
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Credential ID:</span> {cert.credentialId}
                        </p>
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

