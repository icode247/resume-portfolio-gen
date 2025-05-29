import {
  generateProfessionalSummary,
  generateProjectDescription,
} from "./huggingface";
import { sendResumeGeneratedEmail } from "./actions";
import { createResume, createPortfolio, getPortfolio } from "./database";

interface GitHubProfile {
  login: string;
  name: string;
  bio: string;
  location: string;
  email: string;
  blog: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  avatar_url: string;
}

interface Repository {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  fork: boolean;
}

// Temporary storage for non-authenticated users
const temporaryStorage = new Map<
  string,
  { resume: any; portfolio: any; timestamp: number }
>();

// Clean up old temporary data (older than 24 hours)
const cleanupOldData = () => {
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;

  for (const [key, value] of temporaryStorage.entries()) {
    if (now - value.timestamp > oneDayMs) {
      temporaryStorage.delete(key);
    }
  }
};

// Run cleanup periodically
setInterval(cleanupOldData, 60 * 60 * 1000); // Every hour

export async function generateFromGithub(
  username: string,
  userId?: string,
  userEmail?: string
) {
  try {
    // Fetch GitHub profile data
    const profileResponse = await fetch(
      `https://api.github.com/users/${username}`
    );
    if (!profileResponse.ok) {
      throw new Error("GitHub user not found");
    }
    const profile: GitHubProfile = await profileResponse.json();

    // Fetch repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`
    );
    const repos: Repository[] = await reposResponse.json();

    // Filter out forks and get most relevant repositories
    const originalRepos = repos
      .filter((repo) => !repo.fork && repo.stargazers_count >= 0)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 12);

    // Generate AI-powered content using Hugging Face
    const resumeContent = await generateResumeContent(profile, originalRepos);
    const portfolioContent = await generatePortfolioContent(
      profile,
      originalRepos
    );

    let resumeId: string;
    let portfolioId: string;

    if (userId) {
      // Save to Firestore database for authenticated users
      resumeId = `${Date.now()}-${username}`;
      portfolioId = `${Date.now()}-${username}`;

      await createResume(userId, {
        title: `${profile.name || profile.login} - Resume`,
        content: resumeContent,
        githubUsername: username,
        id: resumeId,
      });

      await createPortfolio(userId, {
        title: `${profile.name || profile.login} - Portfolio`,
        content: portfolioContent,
        githubUsername: username,
        id: portfolioId,
      });
    } else {
      // Generate temporary IDs and store content in memory for non-authenticated users
      resumeId = `temp-${Date.now()}-resume`;
      portfolioId = `temp-${Date.now()}-portfolio`;

      // Store the generated content temporarily
      temporaryStorage.set(resumeId, {
        resume: resumeContent,
        portfolio: portfolioContent,
        timestamp: Date.now(),
      });

      // Also store with portfolio ID for consistency
      temporaryStorage.set(portfolioId, {
        resume: resumeContent,
        portfolio: portfolioContent,
        timestamp: Date.now(),
      });
    }

    const resumeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/preview/${resumeId}`;

    // Send notification email if user email is provided
    if (userEmail && resumeContent.name) {
      try {
        await sendResumeGeneratedEmail(
          userEmail,
          resumeUrl,
          `${resumeContent.name} - Resume`
        );
      } catch (emailError) {
        console.error("Failed to send notification email:", emailError);
        // Don't fail the entire generation if email fails
      }
    }

    return {
      id: resumeId,
      portfolioId,
      resume: resumeContent,
      portfolio: portfolioContent,
      url: resumeUrl,
    };
  } catch (error) {
    console.error("Generation error:", error);
    throw new Error("Failed to generate from GitHub profile");
  }
}

async function generateResumeContent(
  profile: GitHubProfile,
  repos: Repository[]
) {
  // Extract skills from repository languages and topics
  const languages = repos.map((repo) => repo.language).filter(Boolean);
  const topics = repos.flatMap((repo) => repo.topics);
  const skills = [...new Set([...languages, ...topics])];

  // Generate professional summary using AI
  const summary = await generateProfessionalSummary(profile, repos);

  // Calculate years of experience based on account age
  const accountAge =
    new Date().getFullYear() - new Date(profile.created_at).getFullYear();
  const experience = Math.max(1, accountAge);

  return {
    name: profile.name || profile.login,
    bio: profile.bio,
    email: profile.email || `${profile.login}@gmail.com`,
    location: profile.location || "Remote",
    website: profile.blog || `https://${profile.login}.github.io`,
    github: `https://github.com/${profile.login}`,
    linkedin: `https://linkedin.com/in/${profile.login}`,
    phone: "+1 (555) 123-4567", // Placeholder
    avatar: profile.avatar_url,
    summary,
    skills: skills.slice(0, 15), // Top 15 skills
    experience: await generateExperience(repos, profile),
    education: generateEducation(),
    projects: await Promise.all(
      repos.slice(0, 6).map(async (repo) => ({
        name: repo.name
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        description: await generateProjectDescription(
          repo.name,
          repo.description || "",
          repo.language || "",
          repo.topics
        ),
        technologies: [repo.language, ...repo.topics.slice(0, 3)].filter(
          Boolean
        ),
        url: repo.html_url,
        github: repo.html_url,
        demo: extractDemoUrl(repo),
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        period: `${new Date(repo.created_at).getFullYear()} - ${new Date(repo.updated_at).getFullYear()}`,
        image: `/placeholder.svg?height=200&width=300`,
      }))
    ),
    certifications: generateCertifications(skills),
    stats: {
      repositories: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      yearsActive: experience,
    },
  };
}
async function generatePortfolioContent(
  profile: GitHubProfile,
  repos: Repository[]
) {
  const summary = await generateProfessionalSummary(profile, repos)
  
  return {
    name: profile.name || profile.login,
    bio: profile.bio || "Passionate developer building amazing projects",
    avatar: profile.avatar_url,
    location: profile.location,
    website: profile.blog,
    email: profile.email || `${profile.login}@gmail.com`,
    social: {
      github: `https://github.com/${profile.login}`,
      linkedin: `https://linkedin.com/in/${profile.login}`,
      twitter: `https://twitter.com/${profile.login}`,
    },
    stats: {
      repositories: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      yearsActive: Math.max(
        1,
        new Date().getFullYear() - new Date(profile.created_at).getFullYear()
      ),
    },
    summary,
    skills: extractSkillsWithProficiency(repos),
    projects: await Promise.all(
      repos.slice(0, 9).map(async (repo) => ({
        id: repo.name,
        title: repo.name
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        description: await generateProjectDescription(
          repo.name,
          repo.description || "",
          repo.language || "",
          repo.topics
        ),
        image: `/placeholder.svg?height=200&width=300`,
        technologies: [repo.language, ...repo.topics.slice(0, 4)].filter(
          Boolean
        ),
        github: repo.html_url,
        demo: extractDemoUrl(repo),
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        lastUpdated: repo.updated_at,
        featured: repo.stargazers_count > 5,
      }))
    ),
  };
}

function extractSkillsWithProficiency(repos: Repository[]) {
  const languageCount = repos.reduce((acc: Record<string, number>, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {});

  const topicCount = repos.reduce((acc: Record<string, number>, repo) => {
    repo.topics.forEach((topic) => {
      acc[topic] = (acc[topic] || 0) + 1;
    });
    return acc;
  }, {});

  const allSkills = { ...languageCount, ...topicCount };
  const maxCount = Math.max(...Object.values(allSkills));

  return Object.entries(allSkills)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 12)
    .map(([skill, count]) => ({
      name: skill,
      level: Math.round((count / maxCount) * 100),
      category: languageCount[skill] ? "language" : "technology",
    }));
}

function extractDemoUrl(repo: Repository): string {
  if (repo.name.includes("github.io") || repo.topics.includes("github-pages")) {
    return `https://${repo.name.replace("-github-io", "")}.github.io`;
  }
  return repo.html_url;
}

async function generateExperience(repos: Repository[], profile: GitHubProfile) {
  const accountAge =
    new Date().getFullYear() - new Date(profile.created_at).getFullYear();
  const experience = Math.max(1, accountAge);

  const topLanguage = repos
    .map((repo) => repo.language)
    .filter(Boolean)
    .reduce((acc: Record<string, number>, lang) => {
      acc[lang] = (acc[lang] || 0) + 1;
      return acc;
    }, {});

  const primaryLanguage =
    Object.entries(topLanguage).sort(([, a], [, b]) => b - a)[0]?.[0] ||
    "Software";

  return [
    {
      title: `Senior ${primaryLanguage} Developer`,
      company: "Freelance / Open Source",
      period: `${new Date().getFullYear() - experience} - Present`,
      location: profile.location || "Remote",
      description: [
        `Developed and maintained ${repos.length}+ open-source projects with focus on ${primaryLanguage} and modern development practices`,
        `Collaborated with the developer community, contributing to various projects and building solutions used by developers worldwide`,
        `Demonstrated expertise in code quality, testing, and documentation with consistent GitHub activity and community engagement`,
      ],
      technologies: repos
        .slice(0, 5)
        .map((r) => r.language)
        .filter(Boolean),
    },
  ];
}

function generateEducation() {
  return [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      period: "2018 - 2022",
      location: "Remote Learning",
      gpa: "3.8/4.0",
    },
  ];
}

function generateCertifications(skills: string[]) {
  const certMap: Record<string, string[]> = {
    JavaScript: ["AWS Certified Developer", "Google Cloud Professional"],
    Python: ["AWS Certified Solutions Architect", "Google Cloud Professional"],
    Java: ["Oracle Certified Professional", "Spring Professional"],
    React: ["Meta React Developer", "Frontend Masters"],
    "Node.js": ["Node.js Certified Developer", "AWS Lambda Specialist"],
  };

  const certs: string[] = [];
  skills.forEach((skill) => {
    if (certMap[skill]) {
      certs.push(...certMap[skill]);
    }
  });

  return [...new Set(certs)].slice(0, 3).map((cert) => ({
    name: cert,
    issuer: cert.split(" ")[0],
    date: new Date().getFullYear().toString(),
    credentialId: `${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
  }));
}

export async function getGeneratedContent(id: string) {
  // Check if it's a temporary ID (for non-authenticated users)
  if (id.startsWith("temp-")) {
    const tempData = temporaryStorage.get(id);
    if (tempData) {
      return {
        resume: tempData.resume,
        portfolio: tempData.portfolio,
      };
    }
    // If temp data not found, it might have expired
    throw new Error("Generated content has expired. Please generate again.");
  }

  // Try to get from database for authenticated users
  try {
    const { getResume, getPortfolio } = await import("./database");
    const resume = await getResume(id);
    const portfolio = await getPortfolio(id);

    if (resume) {
      return {
        resume: resume.content,
        portfolio: portfolio?.content,
      };
    }
  } catch (error) {
    console.error("Error fetching from database:", error);
  }

  // If nothing found, throw error instead of returning fallback
  throw new Error("Content not found");
}
