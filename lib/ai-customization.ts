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
    // Get the correct data object based on template type
    const targetData = currentData[templateType]
    if (!targetData) {
      return { success: false, error: `${templateType} data not found` }
    }

    // First, use AI to understand the intent and extract structured data
    const aiResponse = await generateText({
      model: openai("gpt-4o"),
      system: `You are an AI assistant that helps users customize their ${templateType}. 
      
      Analyze the user's request and respond with a JSON object containing:
      {
        "action": "add_skill" | "remove_skill" | "update_skill" | "update_profile" | "add_project" | "remove_project" | "update_project" | "update_project_link" | "add_experience" | "remove_experience" | "update_experience" | "update_image" | "add_education" | "remove_education" | "update_education" | "add_certification" | "remove_certification" | "update_certification" | "update_contact" | "update_social" | "update_stats" | "toggle_project_featured" | "reorder_items" | "unknown",
        "data": {
          // Relevant data based on action type
        },
        "description": "Human readable description of what will be changed"
      }

      For different actions, include these data fields:
      
      SKILLS:
      - add_skill: { "skill": "skill name", "level": 85, "category": "language|technology|tool" }
      - remove_skill: { "skill": "skill name" }
      - update_skill: { "skill": "current skill name", "newSkill": "new skill name", "level": 90, "category": "language" }
      
      PROFILE:
      - update_profile: { "field": "name|bio|location|summary|website|phone|email", "value": "new value" }
      
      PROJECTS:
      - add_project: { "name": "project name", "description": "description", "technologies": ["tech1", "tech2"], "github": "url", "demo": "url", "featured": false }
      - remove_project: { "projectName": "project name" | "projectIndex": 0 }
      - update_project: { "projectIndex": 0, "field": "name|title|description|technologies|github|demo", "value": "new value or array" }
      - update_project_link: { "projectIndex": 0, "linkType": "demo|github|url", "url": "new url" }
      - toggle_project_featured: { "projectIndex": 0, "featured": true|false }
      
      EXPERIENCE:
      - add_experience: { "title": "job title", "company": "company name", "period": "2020-2023", "location": "location", "description": ["bullet point 1", "bullet point 2"], "technologies": ["tech1", "tech2"] }
      - remove_experience: { "experienceIndex": 0 | "company": "company name" }
      - update_experience: { "experienceIndex": 0, "field": "title|company|period|location|description|technologies", "value": "new value or array" }
      
      EDUCATION:
      - add_education: { "degree": "degree", "school": "school name", "period": "2018-2022", "gpa": "3.8", "location": "location" }
      - remove_education: { "educationIndex": 0 | "school": "school name" }
      - update_education: { "educationIndex": 0, "field": "degree|school|period|gpa|location", "value": "new value" }
      
      CERTIFICATIONS:
      - add_certification: { "name": "certification name", "issuer": "issuer", "date": "2025", "credentialId": "optional id" }
      - remove_certification: { "certificationIndex": 0 | "name": "certification name" }
      - update_certification: { "certificationIndex": 0, "field": "name|issuer|date|credentialId", "value": "new value" }
      
      CONTACT & SOCIAL:
      - update_contact: { "field": "email|phone|linkedin|github|website", "value": "new value" }
      - update_social: { "platform": "linkedin|github|twitter", "url": "new url" }
      
      IMAGES:
      - update_image: { "imageType": "avatar|cover|project", "projectIndex": 0 }
      
      STATS:
      - update_stats: { "field": "followers|following|repositories|yearsActive", "value": number }
      
      ORDERING:
      - reorder_items: { "itemType": "projects|experience|education|certifications", "fromIndex": 0, "toIndex": 2 }

      Important Guidelines:
      - When adding items to arrays (skills, projects, experience, etc.), NEVER override existing items, always append or prepend
      - When updating arrays like technologies or description, merge with existing unless explicitly told to replace
      - For skills: ${templateType === 'resume' ? 'Use simple string array format' : templateType === 'portfolio' ? 'Use object format with name, level, category' : 'Use simple string array format'}
      - For projects: ${templateType === 'resume' ? 'Use name, description, technologies, github, demo, period format' : templateType === 'portfolio' ? 'Use title, description, technologies, github, demo, featured, lastUpdated format' : 'Use name, description, technologies, github, demo, period format'}
      - Be flexible with field names - projects might use "name" or "title", handle both
      - When user says "change", "update", or "modify", use update actions
      - When user says "add" or "include", use add actions  
      - When user says "remove", "delete", or "take out", use remove actions

      Current ${templateType} data structure: ${JSON.stringify(targetData, null, 2)}
      
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
    const workingData = updatedData[templateType] // Reference to the nested object we're updating
    let changeDescription = ""

    switch (aiParsedData.action) {
      case "add_skill":
        if (aiParsedData.data?.skill) {
          if (!workingData.skills) workingData.skills = []

          // Handle different skill data structures
          if (templateType === 'resume' && Array.isArray(workingData.skills)) {
            // Resume: Simple array of skill names
            if (!workingData.skills.includes(aiParsedData.data.skill)) {
              workingData.skills.push(aiParsedData.data.skill)
              changeDescription = `Added "${aiParsedData.data.skill}" to skills`
            } else {
              return { success: false, error: `"${aiParsedData.data.skill}" is already in your skills` }
            }
          } else {
            // Portfolio: Array of skill objects with name, level, category
            const existingSkill = workingData.skills.find((s: any) => s.name === aiParsedData.data.skill)
            if (!existingSkill) {
              workingData.skills.push({
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
          if (!workingData.skills) {
            return { success: false, error: "No skills found to remove" }
          }

          if (templateType === 'resume' && Array.isArray(workingData.skills)) {
            const index = workingData.skills.indexOf(aiParsedData.data.skill)
            if (index > -1) {
              workingData.skills.splice(index, 1)
              changeDescription = `Removed "${aiParsedData.data.skill}" from skills`
            } else {
              return { success: false, error: `"${aiParsedData.data.skill}" not found in skills` }
            }
          } else {
            const index = workingData.skills.findIndex((s: any) => s.name === aiParsedData.data.skill)
            if (index > -1) {
              workingData.skills.splice(index, 1)
              changeDescription = `Removed "${aiParsedData.data.skill}" from skills`
            } else {
              return { success: false, error: `"${aiParsedData.data.skill}" not found in skills` }
            }
          }
        }
        break

      case "update_skill":
        if (aiParsedData.data?.skill) {
          if (!workingData.skills) {
            return { success: false, error: "No skills found to update" }
          }

          if (templateType === 'portfolio') {
            const skillIndex = workingData.skills.findIndex((s: any) => s.name === aiParsedData.data.skill)
            if (skillIndex > -1) {
              if (aiParsedData.data.newSkill) workingData.skills[skillIndex].name = aiParsedData.data.newSkill
              if (aiParsedData.data.level) workingData.skills[skillIndex].level = aiParsedData.data.level
              if (aiParsedData.data.category) workingData.skills[skillIndex].category = aiParsedData.data.category
              changeDescription = `Updated skill "${aiParsedData.data.skill}"`
            } else {
              return { success: false, error: `"${aiParsedData.data.skill}" not found in skills` }
            }
          }
        }
        break

      case "update_profile":
        if (aiParsedData.data?.field && aiParsedData.data?.value !== undefined) {
          workingData[aiParsedData.data.field] = aiParsedData.data.value
          changeDescription = `Updated ${aiParsedData.data.field} to "${aiParsedData.data.value}"`
        }
        break

      case "add_project":
        if (aiParsedData.data?.name) {
          if (!workingData.projects) workingData.projects = []
          
          const newProject = (templateType === 'resume' || templateType === 'cover-letter') ? {
            name: aiParsedData.data.name,
            description: aiParsedData.data.description || "A new project",
            technologies: aiParsedData.data.technologies || ["JavaScript"],
            github: aiParsedData.data.github || "#",
            demo: aiParsedData.data.demo || "#",
            url: aiParsedData.data.github || "#",
            stars: aiParsedData.data.stars || 0,
            forks: aiParsedData.data.forks || 0,
            image: "/placeholder.svg?height=200&width=300",
            period: aiParsedData.data.period || "2025 - Present",
          } : {
            id: aiParsedData.data.name.toLowerCase().replace(/\s+/g, "-"),
            title: aiParsedData.data.name,
            description: aiParsedData.data.description || "A new project",
            technologies: aiParsedData.data.technologies || ["JavaScript"],
            github: aiParsedData.data.github || "#",
            demo: aiParsedData.data.demo || "#",
            stars: aiParsedData.data.stars || 0,
            forks: aiParsedData.data.forks || 0,
            image: "/placeholder.svg?height=200&width=300",
            featured: aiParsedData.data.featured || false,
            lastUpdated: new Date().toISOString(),
          }
          
          workingData.projects.unshift(newProject)
          changeDescription = `Added new project "${aiParsedData.data.name}"`
        }
        break

      case "remove_project":
        if (!workingData.projects) {
          return { success: false, error: "No projects found to remove" }
        }

        let projectIndex = -1
        if (aiParsedData.data?.projectIndex !== undefined) {
          projectIndex = aiParsedData.data.projectIndex
        } else if (aiParsedData.data?.projectName) {
          projectIndex = workingData.projects.findIndex((p: any) => 
            (p.name && p.name.toLowerCase().includes(aiParsedData.data.projectName.toLowerCase())) ||
            (p.title && p.title.toLowerCase().includes(aiParsedData.data.projectName.toLowerCase()))
          )
        }

        if (projectIndex > -1 && projectIndex < workingData.projects.length) {
          const removedProject = workingData.projects[projectIndex]
          workingData.projects.splice(projectIndex, 1)
          changeDescription = `Removed project "${removedProject.name || removedProject.title}"`
        } else {
          return { success: false, error: "Project not found" }
        }
        break

      case "update_project":
        if (aiParsedData.data?.projectIndex !== undefined && aiParsedData.data?.field && aiParsedData.data?.value !== undefined) {
          if (workingData.projects && workingData.projects[aiParsedData.data.projectIndex]) {
            const project = workingData.projects[aiParsedData.data.projectIndex]
            
            if (aiParsedData.data.field === 'technologies' && Array.isArray(aiParsedData.data.value)) {
              // For technologies, merge with existing unless explicitly told to replace
              project.technologies = aiParsedData.data.value
            } else if (aiParsedData.data.field === 'description' && Array.isArray(aiParsedData.data.value)) {
              // For description arrays, replace
              project.description = aiParsedData.data.value
            } else {
              project[aiParsedData.data.field] = aiParsedData.data.value
            }
            
            // Update lastUpdated for portfolio
            if (templateType === 'portfolio') {
              project.lastUpdated = new Date().toISOString()
            }
            
            const projectName = project.name || project.title
            changeDescription = `Updated ${aiParsedData.data.field} for "${projectName}"`
          } else {
            return { success: false, error: "Project not found" }
          }
        }
        break

      case "update_project_link":
        if (aiParsedData.data?.projectIndex !== undefined && aiParsedData.data?.linkType && aiParsedData.data?.url) {
          if (workingData.projects && workingData.projects[aiParsedData.data.projectIndex]) {
            workingData.projects[aiParsedData.data.projectIndex][aiParsedData.data.linkType] = aiParsedData.data.url
            if (templateType === 'portfolio') {
              workingData.projects[aiParsedData.data.projectIndex].lastUpdated = new Date().toISOString()
            }
            const projectName = workingData.projects[aiParsedData.data.projectIndex].name || workingData.projects[aiParsedData.data.projectIndex].title
            changeDescription = `Updated ${aiParsedData.data.linkType} link for "${projectName}"`
          } else {
            return { success: false, error: "Project not found" }
          }
        }
        break

      case "toggle_project_featured":
        if (templateType === 'portfolio' && aiParsedData.data?.projectIndex !== undefined) {
          if (workingData.projects && workingData.projects[aiParsedData.data.projectIndex]) {
            const project = workingData.projects[aiParsedData.data.projectIndex]
            project.featured = aiParsedData.data.featured !== undefined ? aiParsedData.data.featured : !project.featured
            project.lastUpdated = new Date().toISOString()
            changeDescription = `${project.featured ? 'Featured' : 'Unfeatured'} project "${project.title}"`
          } else {
            return { success: false, error: "Project not found" }
          }
        }
        break

      case "add_experience":
        if (aiParsedData.data?.title && aiParsedData.data?.company) {
          if (!workingData.experience) workingData.experience = []
          const newExperience = {
            title: aiParsedData.data.title,
            company: aiParsedData.data.company,
            period: aiParsedData.data.period || `${new Date().getFullYear()} - Present`,
            location: aiParsedData.data.location || "Remote",
            description: aiParsedData.data.description || [
              `Worked as ${aiParsedData.data.title} at ${aiParsedData.data.company}`,
            ],
            technologies: aiParsedData.data.technologies || [],
          }
          workingData.experience.unshift(newExperience)
          changeDescription = `Added experience: ${aiParsedData.data.title} at ${aiParsedData.data.company}`
        }
        break

      case "remove_experience":
        if (!workingData.experience) {
          return { success: false, error: "No experience found to remove" }
        }

        let expIndex = -1
        if (aiParsedData.data?.experienceIndex !== undefined) {
          expIndex = aiParsedData.data.experienceIndex
        } else if (aiParsedData.data?.company) {
          expIndex = workingData.experience.findIndex((e: any) => 
            e.company.toLowerCase().includes(aiParsedData.data.company.toLowerCase())
          )
        }

        if (expIndex > -1 && expIndex < workingData.experience.length) {
          const removedExp = workingData.experience[expIndex]
          workingData.experience.splice(expIndex, 1)
          changeDescription = `Removed experience at "${removedExp.company}"`
        } else {
          return { success: false, error: "Experience not found" }
        }
        break

      case "update_experience":
        if (aiParsedData.data?.experienceIndex !== undefined && aiParsedData.data?.field && aiParsedData.data?.value !== undefined) {
          if (workingData.experience && workingData.experience[aiParsedData.data.experienceIndex]) {
            workingData.experience[aiParsedData.data.experienceIndex][aiParsedData.data.field] = aiParsedData.data.value
            changeDescription = `Updated ${aiParsedData.data.field} for experience at "${workingData.experience[aiParsedData.data.experienceIndex].company}"`
          } else {
            return { success: false, error: "Experience not found" }
          }
        }
        break

      case "add_education":
        if (aiParsedData.data?.degree && aiParsedData.data?.school) {
          if (!workingData.education) workingData.education = []
          const newEducation = {
            degree: aiParsedData.data.degree,
            school: aiParsedData.data.school,
            period: aiParsedData.data.period || "2018-2022",
            location: aiParsedData.data.location || "Remote Learning",
            gpa: aiParsedData.data.gpa || "",
          }
          workingData.education.unshift(newEducation)
          changeDescription = `Added education: ${aiParsedData.data.degree} from ${aiParsedData.data.school}`
        }
        break

      case "remove_education":
        if (!workingData.education) {
          return { success: false, error: "No education found to remove" }
        }

        let eduIndex = -1
        if (aiParsedData.data?.educationIndex !== undefined) {
          eduIndex = aiParsedData.data.educationIndex
        } else if (aiParsedData.data?.school) {
          eduIndex = workingData.education.findIndex((e: any) => 
            e.school.toLowerCase().includes(aiParsedData.data.school.toLowerCase())
          )
        }

        if (eduIndex > -1 && eduIndex < workingData.education.length) {
          const removedEdu = workingData.education[eduIndex]
          workingData.education.splice(eduIndex, 1)
          changeDescription = `Removed education from "${removedEdu.school}"`
        } else {
          return { success: false, error: "Education not found" }
        }
        break

      case "update_education":
        if (aiParsedData.data?.educationIndex !== undefined && aiParsedData.data?.field && aiParsedData.data?.value !== undefined) {
          if (workingData.education && workingData.education[aiParsedData.data.educationIndex]) {
            workingData.education[aiParsedData.data.educationIndex][aiParsedData.data.field] = aiParsedData.data.value
            changeDescription = `Updated ${aiParsedData.data.field} for education at "${workingData.education[aiParsedData.data.educationIndex].school}"`
          } else {
            return { success: false, error: "Education not found" }
          }
        }
        break

      case "add_certification":
        if (aiParsedData.data?.name && aiParsedData.data?.issuer) {
          if (!workingData.certifications) workingData.certifications = []
          const newCertification = {
            name: aiParsedData.data.name,
            issuer: aiParsedData.data.issuer,
            date: aiParsedData.data.date || new Date().getFullYear().toString(),
            credentialId: aiParsedData.data.credentialId || "",
          }
          workingData.certifications.unshift(newCertification)
          changeDescription = `Added certification: ${aiParsedData.data.name} from ${aiParsedData.data.issuer}`
        }
        break

      case "remove_certification":
        if (!workingData.certifications) {
          return { success: false, error: "No certifications found to remove" }
        }

        let certIndex = -1
        if (aiParsedData.data?.certificationIndex !== undefined) {
          certIndex = aiParsedData.data.certificationIndex
        } else if (aiParsedData.data?.name) {
          certIndex = workingData.certifications.findIndex((c: any) => 
            c.name.toLowerCase().includes(aiParsedData.data.name.toLowerCase())
          )
        }

        if (certIndex > -1 && certIndex < workingData.certifications.length) {
          const removedCert = workingData.certifications[certIndex]
          workingData.certifications.splice(certIndex, 1)
          changeDescription = `Removed certification "${removedCert.name}"`
        } else {
          return { success: false, error: "Certification not found" }
        }
        break

      case "update_certification":
        if (aiParsedData.data?.certificationIndex !== undefined && aiParsedData.data?.field && aiParsedData.data?.value !== undefined) {
          if (workingData.certifications && workingData.certifications[aiParsedData.data.certificationIndex]) {
            workingData.certifications[aiParsedData.data.certificationIndex][aiParsedData.data.field] = aiParsedData.data.value
            changeDescription = `Updated ${aiParsedData.data.field} for certification "${workingData.certifications[aiParsedData.data.certificationIndex].name}"`
          } else {
            return { success: false, error: "Certification not found" }
          }
        }
        break

      case "update_contact":
        if (aiParsedData.data?.field && aiParsedData.data?.value) {
          // Update the field directly in the working data
          workingData[aiParsedData.data.field] = aiParsedData.data.value
          
          // Also update in social object if it exists (for portfolio)
          if (workingData.social && (aiParsedData.data.field === "linkedin" || aiParsedData.data.field === "github" || aiParsedData.data.field === "twitter")) {
            workingData.social[aiParsedData.data.field] = aiParsedData.data.value
          }
          
          changeDescription = `Updated ${aiParsedData.data.field} to "${aiParsedData.data.value}"`
        }
        break

      case "update_social":
        if (templateType === 'portfolio' && aiParsedData.data?.platform && aiParsedData.data?.url) {
          if (!workingData.social) workingData.social = {}
          workingData.social[aiParsedData.data.platform] = aiParsedData.data.url
          changeDescription = `Updated ${aiParsedData.data.platform} to "${aiParsedData.data.url}"`
        }
        break

      case "update_stats":
        if (aiParsedData.data?.field && aiParsedData.data?.value !== undefined) {
          if (!workingData.stats) workingData.stats = {}
          workingData.stats[aiParsedData.data.field] = aiParsedData.data.value
          changeDescription = `Updated ${aiParsedData.data.field} to ${aiParsedData.data.value}`
        }
        break

      case "update_image":
        if (imageUrl) {
          if (aiParsedData.data?.imageType === "avatar" || aiParsedData.data?.imageType === "profile") {
            workingData.avatar = imageUrl
            changeDescription = `Updated profile picture`
          } else if (aiParsedData.data?.imageType === "cover" && templateType === "portfolio") {
            workingData.coverImage = imageUrl
            changeDescription = `Updated cover photo`
          } else if (aiParsedData.data?.projectIndex !== undefined) {
            if (workingData.projects && workingData.projects[aiParsedData.data.projectIndex]) {
              workingData.projects[aiParsedData.data.projectIndex].image = imageUrl
              if (templateType === 'portfolio') {
                workingData.projects[aiParsedData.data.projectIndex].lastUpdated = new Date().toISOString()
              }
              const projectName = workingData.projects[aiParsedData.data.projectIndex].name || workingData.projects[aiParsedData.data.projectIndex].title
              changeDescription = `Updated image for "${projectName}"`
            }
          }
        }
        break

      case "reorder_items":
        if (aiParsedData.data?.itemType && aiParsedData.data?.fromIndex !== undefined && aiParsedData.data?.toIndex !== undefined) {
          const items = workingData[aiParsedData.data.itemType]
          if (items && Array.isArray(items)) {
            const [movedItem] = items.splice(aiParsedData.data.fromIndex, 1)
            items.splice(aiParsedData.data.toIndex, 0, movedItem)
            changeDescription = `Reordered ${aiParsedData.data.itemType} - moved item from position ${aiParsedData.data.fromIndex} to ${aiParsedData.data.toIndex}`
          } else {
            return { success: false, error: `${aiParsedData.data.itemType} not found or not an array` }
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

// Enhanced fallback rule-based parsing
function parsePromptIntent(prompt: string): any {
  const lowerPrompt = prompt.toLowerCase()

  // Skills
  if (lowerPrompt.includes("add") && (lowerPrompt.includes("skill") || lowerPrompt.includes("technology"))) {
    const skillMatch = extractSkillFromPrompt(prompt)
    return { action: "add_skill", data: { skill: skillMatch } }
  }
  if (lowerPrompt.includes("remove") && (lowerPrompt.includes("skill") || lowerPrompt.includes("technology"))) {
    const skillMatch = extractSkillFromPrompt(prompt)
    return { action: "remove_skill", data: { skill: skillMatch } }
  }

  // Projects
  if (lowerPrompt.includes("add") && lowerPrompt.includes("project")) {
    return { action: "add_project", data: {} }
  }
  if (lowerPrompt.includes("remove") && lowerPrompt.includes("project")) {
    return { action: "remove_project", data: {} }
  }

  // Experience
  if (lowerPrompt.includes("add") && (lowerPrompt.includes("experience") || lowerPrompt.includes("job") || lowerPrompt.includes("work"))) {
    return { action: "add_experience", data: {} }
  }

  // Education
  if (lowerPrompt.includes("add") && (lowerPrompt.includes("education") || lowerPrompt.includes("school") || lowerPrompt.includes("university"))) {
    return { action: "add_education", data: {} }
  }

  // Certifications
  if (lowerPrompt.includes("add") && lowerPrompt.includes("certification")) {
    return { action: "add_certification", data: {} }
  }

  // Profile updates
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
    if (lowerPrompt.includes("name")) {
      const nameMatch = extractValueAfterKeyword(prompt, ["name to", "name:", "name"])
      return { action: "update_profile", data: { field: "name", value: nameMatch } }
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