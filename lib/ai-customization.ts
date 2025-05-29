import { generateText } from "ai"
import { openai } from "./ai-config"

// AI-powered customization processing
interface CustomizationRequest {
  prompt: string
  currentData: any
  templateType: "resume" | "portfolio" | "cover-letter"
  imageUrl?: string | null
  imageName?: string
}

interface CustomizationResult {
  success: boolean
  updatedData?: any
  changeDescription?: string
  error?: string
}

export async function processAICustomization(request: CustomizationRequest): Promise<CustomizationResult> {
  const { prompt, currentData, templateType, imageUrl, imageName } = request

  try {
    // First, use AI to understand the intent and extract structured data
    const aiResponse = await generateText({
      model: openai("gpt-4o"),
      system: `You are an AI assistant that helps users customize their ${templateType}. 
      
      Analyze the user's request and respond with a JSON object containing:
      {
        "action": "add_skill" | "remove_skill" | "update_profile" | "add_project" | "update_project_link" | "add_experience" | "update_image" | "add_education" | "update_contact" | "unknown",
        "data": {
          // Relevant data based on action type
        },
        "description": "Human readable description of what will be changed"
      }

      For different actions, include these data fields:
      - add_skill: { "skill": "skill name", "level": 85, "category": "technology|language|tool" }
      - remove_skill: { "skill": "skill name" }
      - update_profile: { "field": "bio|location|name|title|summary", "value": "new value" }
      - add_project: { "name": "project name", "description": "description", "technologies": ["tech1", "tech2"], "github": "url", "demo": "url" }
      - update_project_link: { "projectIndex": 0, "linkType": "demo|github", "url": "new url" }
      - add_experience: { "title": "job title", "company": "company name", "period": "2020-2023", "location": "location", "description": ["bullet point 1", "bullet point 2"] }
      - update_image: { "imageType": "avatar|cover|project", "projectIndex": 0 }
      - add_education: { "degree": "degree", "school": "school name", "period": "2018-2022", "gpa": "3.8" }
      - update_contact: { "field": "email|phone|linkedin|github", "value": "new value" }

      Current data structure: ${JSON.stringify(currentData, null, 2)}
      
      User request: "${prompt}"
      ${imageUrl ? `User uploaded image: ${imageName}` : ""}`,
      prompt: `Parse this request and return the appropriate JSON response.`,
    })

    let aiParsedData
    try {
      // Extract JSON from AI response
      const jsonMatch = aiResponse.text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        aiParsedData = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("No JSON found in AI response")
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError)
      // Fallback to rule-based parsing
      aiParsedData = parsePromptIntent(prompt)
    }

    // Create a deep copy of current data
    const updatedData = JSON.parse(JSON.stringify(currentData))
    let changeDescription = ""

    switch (aiParsedData.action) {
      case "add_skill":
        if (aiParsedData.data?.skill) {
          if (!updatedData.skills) updatedData.skills = []

          // Handle different skill data structures
          if (Array.isArray(updatedData.skills)) {
            if (!updatedData.skills.includes(aiParsedData.data.skill)) {
              updatedData.skills.push(aiParsedData.data.skill)
              changeDescription = `Added "${aiParsedData.data.skill}" to skills`
            } else {
              return { success: false, error: `"${aiParsedData.data.skill}" is already in your skills` }
            }
          } else {
            const existingSkill = updatedData.skills.find((s: any) => s.name === aiParsedData.data.skill)
            if (!existingSkill) {
              updatedData.skills.push({
                name: aiParsedData.data.skill,
                level: aiParsedData.data.level || 85,
                category: aiParsedData.data.category || "technology",
              })
              changeDescription = `Added "${aiParsedData.data.skill}" to skills`
            } else {
              return { success: false, error: `"${aiParsedData.data.skill}" is already in your skills` }
            }
          }
        }
        break

      case "remove_skill":
        if (aiParsedData.data?.skill) {
          if (Array.isArray(updatedData.skills)) {
            const index = updatedData.skills.indexOf(aiParsedData.data.skill)
            if (index > -1) {
              updatedData.skills.splice(index, 1)
              changeDescription = `Removed "${aiParsedData.data.skill}" from skills`
            } else {
              return { success: false, error: `"${aiParsedData.data.skill}" not found in skills` }
            }
          } else {
            const index = updatedData.skills.findIndex((s: any) => s.name === aiParsedData.data.skill)
            if (index > -1) {
              updatedData.skills.splice(index, 1)
              changeDescription = `Removed "${aiParsedData.data.skill}" from skills`
            } else {
              return { success: false, error: `"${aiParsedData.data.skill}" not found in skills` }
            }
          }
        }
        break

      case "update_profile":
        if (aiParsedData.data?.field && aiParsedData.data?.value) {
          updatedData[aiParsedData.data.field] = aiParsedData.data.value
          changeDescription = `Updated ${aiParsedData.data.field} to "${aiParsedData.data.value}"`
        }
        break

      case "add_project":
        if (aiParsedData.data?.name) {
          if (!updatedData.projects) updatedData.projects = []
          const newProject = {
            id: aiParsedData.data.name.toLowerCase().replace(/\s+/g, "-"),
            title: aiParsedData.data.name,
            description: aiParsedData.data.description || "A new project",
            technologies: aiParsedData.data.technologies || ["JavaScript"],
            github: aiParsedData.data.github || "#",
            demo: aiParsedData.data.demo || "#",
            stars: 0,
            forks: 0,
            image: "/placeholder.svg?height=200&width=300",
            ...aiParsedData.data,
          }
          updatedData.projects.unshift(newProject)
          changeDescription = `Added new project "${aiParsedData.data.name}"`
        }
        break

      case "update_project_link":
        if (aiParsedData.data?.projectIndex !== undefined && aiParsedData.data?.linkType && aiParsedData.data?.url) {
          if (updatedData.projects && updatedData.projects[aiParsedData.data.projectIndex]) {
            updatedData.projects[aiParsedData.data.projectIndex][aiParsedData.data.linkType] = aiParsedData.data.url
            changeDescription = `Updated ${aiParsedData.data.linkType} link for "${updatedData.projects[aiParsedData.data.projectIndex].title}"`
          } else {
            return { success: false, error: "Project not found" }
          }
        }
        break

      case "add_experience":
        if (aiParsedData.data?.title && aiParsedData.data?.company) {
          if (!updatedData.experience) updatedData.experience = []
          const newExperience = {
            title: aiParsedData.data.title,
            company: aiParsedData.data.company,
            period: aiParsedData.data.period || "2023 - Present",
            location: aiParsedData.data.location || "Remote",
            description: aiParsedData.data.description || [
              `Worked as ${aiParsedData.data.title} at ${aiParsedData.data.company}`,
            ],
            technologies: aiParsedData.data.technologies || [],
            ...aiParsedData.data,
          }
          updatedData.experience.unshift(newExperience)
          changeDescription = `Added experience: ${aiParsedData.data.title} at ${aiParsedData.data.company}`
        }
        break

      case "add_education":
        if (aiParsedData.data?.degree && aiParsedData.data?.school) {
          if (!updatedData.education) updatedData.education = []
          const newEducation = {
            degree: aiParsedData.data.degree,
            school: aiParsedData.data.school,
            period: aiParsedData.data.period || "2018-2022",
            gpa: aiParsedData.data.gpa || "",
            ...aiParsedData.data,
          }
          updatedData.education.unshift(newEducation)
          changeDescription = `Added education: ${aiParsedData.data.degree} from ${aiParsedData.data.school}`
        }
        break

      case "update_contact":
        if (aiParsedData.data?.field && aiParsedData.data?.value) {
          if (!updatedData.contact) updatedData.contact = {}
          updatedData.contact[aiParsedData.data.field] = aiParsedData.data.value
          // Also update top-level fields for backward compatibility
          if (aiParsedData.data.field === "email") updatedData.email = aiParsedData.data.value
          if (aiParsedData.data.field === "phone") updatedData.phone = aiParsedData.data.value
          changeDescription = `Updated ${aiParsedData.data.field} to "${aiParsedData.data.value}"`
        }
        break

      case "update_image":
        if (imageUrl) {
          if (aiParsedData.data?.imageType === "avatar" || aiParsedData.data?.imageType === "profile") {
            updatedData.avatar = imageUrl
            changeDescription = `Updated profile picture`
          } else if (aiParsedData.data?.imageType === "cover" && templateType === "portfolio") {
            updatedData.coverImage = imageUrl
            changeDescription = `Updated cover photo`
          } else if (aiParsedData.data?.projectIndex !== undefined) {
            if (updatedData.projects && updatedData.projects[aiParsedData.data.projectIndex]) {
              updatedData.projects[aiParsedData.data.projectIndex].image = imageUrl
              changeDescription = `Updated image for "${updatedData.projects[aiParsedData.data.projectIndex].title}"`
            }
          }
        }
        break

      default:
        return {
          success: false,
          error: aiParsedData.description || "I couldn't understand your request. Please try rephrasing it.",
        }
    }

    return {
      success: true,
      updatedData,
      changeDescription: changeDescription || aiParsedData.description,
    }
  } catch (error) {
    console.error("AI customization error:", error)
    return {
      success: false,
      error: "Failed to process your request. Please try again.",
    }
  }
}

// Fallback rule-based parsing for when AI fails
function parsePromptIntent(prompt: string): any {
  const lowerPrompt = prompt.toLowerCase()

  // Add skill patterns
  if (lowerPrompt.includes("add") && (lowerPrompt.includes("skill") || lowerPrompt.includes("technology"))) {
    const skillMatch = extractSkillFromPrompt(prompt)
    return { action: "add_skill", data: { skill: skillMatch } }
  }

  // Remove skill patterns
  if (lowerPrompt.includes("remove") && (lowerPrompt.includes("skill") || lowerPrompt.includes("technology"))) {
    const skillMatch = extractSkillFromPrompt(prompt)
    return { action: "remove_skill", data: { skill: skillMatch } }
  }

  // Update profile fields
  if (lowerPrompt.includes("change") || lowerPrompt.includes("update")) {
    if (lowerPrompt.includes("location")) {
      const locationMatch = extractValueAfterKeyword(prompt, ["location to", "location:", "location"])
      return { action: "update_profile", data: { field: "location", value: locationMatch } }
    }
    if (lowerPrompt.includes("email")) {
      const emailMatch = extractValueAfterKeyword(prompt, ["email to", "email:", "email"])
      return { action: "update_contact", data: { field: "email", value: emailMatch } }
    }
    if (lowerPrompt.includes("bio") || lowerPrompt.includes("summary")) {
      const bioMatch = extractValueAfterKeyword(prompt, ["bio to", "bio:", "summary to", "summary:", "bio", "summary"])
      return { action: "update_profile", data: { field: "bio", value: bioMatch } }
    }
  }

  return { action: "unknown", description: "I couldn't understand your request. Please try rephrasing it." }
}

function extractSkillFromPrompt(prompt: string): string | null {
  const patterns = [
    /add\s+([a-zA-Z\s.#+]+?)(?:\s+to|\s+skill|\s*$)/i,
    /remove\s+([a-zA-Z\s.#+]+?)(?:\s+from|\s+skill|\s*$)/i,
    /"([^"]+)"/,
    /'([^']+)'/,
  ]

  for (const pattern of patterns) {
    const match = prompt.match(pattern)
    if (match && match[1]) {
      return match[1].trim()
    }
  }

  return null
}

function extractValueAfterKeyword(prompt: string, keywords: string[]): string | null {
  for (const keyword of keywords) {
    const regex = new RegExp(`${keyword}\\s+(.+?)(?:\\s*$|\\s+and\\s|\\s+,)`, "i")
    const match = prompt.match(regex)
    if (match && match[1]) {
      return match[1].trim().replace(/['"]/g, "")
    }
  }
  return null
}
