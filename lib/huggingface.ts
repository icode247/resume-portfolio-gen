// Hugging Face AI integration for content generation
import { generateText } from "ai";
import { openai } from "./ai-config";

interface HuggingFaceResponse {
  generated_text: string;
}

export async function generateProfessionalSummary(
  profile: any,
  repositories: any[]
): Promise<string> {
  try {
    const prompt = `Generate a professional summary for a software developer with the following information:
    
Name: ${profile.name || profile.login}
Bio: ${profile.bio || "Software Developer"}
Public Repositories: ${profile.public_repos}
Top Languages: ${repositories
      .slice(0, 5)
      .map((r) => r.language)
      .filter(Boolean)
      .join(", ")}
Notable Projects: ${repositories
      .slice(0, 3)
      .map((r) => r.name)
      .join(", ")}

Write a concise, professional summary (2-3 sentences) highlighting their skills and experience:
Return the summary as a string.`;
    const response = await generateText({
      model: openai("gpt-4o"),
      system:
        "You are an AI assistant that helps users customize their resumes and portfolios.",
      prompt,
    });
    const summary = response.text.replace(prompt, "").trim();
    if (!summary || summary.length < 50) {
      return generateTemplateSummary(profile, repositories);
    }
    return summary;
    // const response = await fetch(
    //   "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-32B-Instruct",
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
    //       "Content-Type": "application/json",
    //     },
    //     method: "POST",
    //     body: JSON.stringify({
    //       inputs: prompt,
    //       parameters: {
    //         max_length: 150,
    //         temperature: 0.7,
    //         do_sample: true,
    //       },
    //     }),
    //   }
    // );

    // if (!response.ok) {
    //   throw new Error(`Hugging Face API error: ${response.status}`);
    // }

    // const result: HuggingFaceResponse[] = await response.json();

    // if (result && result[0]?.generated_text) {
    //   // Clean up the generated text
    //   const summary = result[0].generated_text.replace(prompt, "").trim();

    //   // Fallback to a template-based summary if AI generation fails
    //   if (!summary || summary.length < 50) {
    //     return generateTemplateSummary(profile, repositories);
    //   }

    //   return summary;
    // }

    // Fallback to template-based summary
    return generateTemplateSummary(profile, repositories);
  } catch (error) {
    console.error("Hugging Face API error:", error);
    // Fallback to template-based summary
    return generateTemplateSummary(profile, repositories);
  }
}

function generateTemplateSummary(profile: any, repositories: any[]): string {
  const topLanguages = repositories
    .map((repo) => repo.language)
    .filter(Boolean)
    .reduce((acc: Record<string, number>, lang) => {
      acc[lang] = (acc[lang] || 0) + 1;
      return acc;
    }, {});

  const primaryLanguage =
    Object.entries(topLanguages).sort(
      ([, a], [, b]) => (b as number) - (a as number)
    )[0]?.[0] || "Software";

  const totalStars = repositories.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );
  const yearsActive = Math.max(
    1,
    new Date().getFullYear() -
      new Date(repositories[0]?.created_at || "2020").getFullYear()
  );

  const templates = [
    `Experienced ${primaryLanguage} developer with ${yearsActive}+ years of experience and ${profile.public_repos} public repositories. Demonstrated expertise in building scalable applications with ${totalStars} total GitHub stars. ${profile.bio || "Passionate about creating innovative solutions and contributing to open-source projects."}`,

    `${primaryLanguage} specialist with a strong track record of ${profile.public_repos} open-source contributions and ${totalStars} community stars. Proven ability to deliver high-quality code and collaborate effectively in development teams. ${profile.bio || "Committed to continuous learning and best practices in software development."}`,

    `Full-stack developer proficient in ${primaryLanguage} and modern development practices. Maintains ${profile.public_repos} active repositories with focus on code quality and innovation. ${profile.bio || "Experienced in building user-centric applications and contributing to the developer community."}`,
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

export async function generateProjectDescription(
  projectName: string,
  originalDescription: string,
  language: string,
  topics: string[]
): Promise<string> {
  if (originalDescription && originalDescription.length > 20) {
    return originalDescription;
  }

  try {
    const prompt = `Write a professional project description for a ${language} project named "${projectName}" with topics: ${topics.join(", ")}. Description should be 1-2 sentences in first person sentence:`;

    // const response = await fetch(
    //   "https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-32B-Instruct",
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
    //       "Content-Type": "application/json",
    //     },
    //     method: "POST",
    //     body: JSON.stringify({
    //       inputs: prompt,
    //       parameters: {
    //         max_length: 100,
    //         temperature: 0.8,
    //       },
    //     }),
    //   }
    // );

    // if (!response.ok) {
    //   throw new Error(`Hugging Face API error: ${response.status}`);
    // }

    // const result: HuggingFaceResponse[] = await response.json();

    // if (result && result[0]?.generated_text) {
    //   const description = result[0].generated_text.replace(prompt, "").trim();

    //   if (description && description.length > 20) {
    //     return description;
    //   }
    // }

    // Fallback to template-based description

    const response = await generateText({
      model: openai("gpt-4o"),
      system:
        "You are an AI assistant that helps users customize their resumes and portfolios.",
      prompt,
    });
    const description = response.text.replace(prompt, "").trim();
    if (!description || description.length < 20) {
      return generateTemplateDescription(projectName, language, topics);
    }
    return description;
  } catch (error) {
    console.error("Project description generation error:", error);
    return generateTemplateDescription(projectName, language, topics);
  }
}

export async function generateSkillsLevel(
  projects: any[],
  skills: any[]
): Promise<any[]> {
  try {
    const skillLevels = skills.map((skill: any) => {
      const skillCount = projects.reduce((acc: number, project: any) => {
        return acc + (project.technologies.includes(skill) ? 1 : 0);
      }, 0);
      const level = Math.round((skillCount / projects.length) * 100);
      return { name: skill, level };
    });
    return skillLevels;
  } catch (error) {
    console.error("Skills level generation error:", error);
    return [];
  }
}

function generateTemplateDescription(
  projectName: string,
  language: string,
  topics: string[]
): string {
  const templates = [
    `A ${language} application focused on ${topics[0] || "modern development practices"}. Built with attention to code quality and user experience.`,
    `${language}-based project implementing ${topics[0] || "innovative solutions"}. Demonstrates proficiency in modern development frameworks and best practices.`,
    `Professional ${language} implementation showcasing ${topics.slice(0, 2).join(" and ") || "technical expertise"}. Designed with scalability and maintainability in mind.`,
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}
