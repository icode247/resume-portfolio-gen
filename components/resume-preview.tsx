interface ResumePreviewProps {
  data: any
}

export function ResumePreview({ data }: ResumePreviewProps) {
  // This is a placeholder component
  // In a real implementation, this would render the actual resume with the data
  return (
    <div className="p-8 bg-white text-black min-h-[800px]">
      <div className="max-w-[800px] mx-auto">
        <div className="border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold">{data?.name || "John Doe"}</h1>
          <div className="flex flex-wrap gap-2 mt-2 text-sm">
            <span>{data?.location || "San Francisco, CA"}</span>
            <span>•</span>
            <span>{data?.email || "john@example.com"}</span>
            <span>•</span>
            <span>{data?.phone || "(123) 456-7890"}</span>
            <span>•</span>
            <a href="#" className="text-blue-600 hover:underline">
              {data?.website || "johndoe.com"}
            </a>
            <span>•</span>
            <a href="#" className="text-blue-600 hover:underline">
              {data?.github || "github.com/johndoe"}
            </a>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Summary</h2>
          <p>{data?.summary || "Experienced software engineer with a passion for building scalable web applications and contributing to open-source projects."}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {(data?.skills || ["JavaScript", "TypeScript", "React", "Node.js", "GraphQL", "AWS"]).map((skill: string, index: number) => (
              <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        \
