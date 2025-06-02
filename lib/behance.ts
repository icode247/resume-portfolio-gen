// lib/behance.ts

/**
 * NOTE: How to acquire BEHANCE_API_KEY
 * 1. Go to the Behance Developer Portal (typically found via Adobe I/O or a direct Behance developer link).
 *    As of late 2023/early 2024, direct access to Behance API documentation on Adobe I/O has been problematic.
 *    You may need to search for "Register an app Behance" or similar terms to find the current process.
 * 2. You'll likely need to register a new application.
 * 3. After registration, Behance should provide an API Key (also referred to as a Client ID).
 * 4. Add this key to your environment variables as BEHANCE_API_KEY.
 *
 * IMPORTANT: The Behance API details (endpoints, response structure) can change.
 * The implementation below is based on common practices for Behance's API
 * but should be verified against the latest official documentation if available.
 */

export interface BehanceProjectCover {
  original?: string;
  "404"?: string; // Example size, actual sizes might vary
  "202"?: string; // Example size
  [key: string]: string | undefined; // For other potential cover sizes
}

export interface BehanceProject {
  id: number;
  name: string;
  description?: string; // Often not available in list view, might need separate call
  url: string;
  covers: BehanceProjectCover;
  fields: string[]; // Tags or categories
  published_on: number; // Timestamp
  modified_on: number; // Timestamp
}

interface BehanceAPIResponse {
  projects: BehanceProject[];
  // The API might also include pagination info, http_code, etc.
}

const BEHANCE_API_BASE_URL = "https://www.behance.net/v2"; // Common base URL, could also be api.behance.net

/**
 * Fetches a user's public projects from Behance.
 *
 * @param username - The Behance username.
 * @returns A promise that resolves to an array of BehanceProject objects.
 */
export async function fetchBehanceProjects(username: string): Promise<BehanceProject[]> {
  const apiKey = process.env.BEHANCE_API_KEY;

  if (!apiKey) {
    console.warn("BEHANCE_API_KEY is not set. Skipping Behance projects fetch.");
    return [];
  }

  // Constructing the URL: Behance typically uses the username in the path
  // and the API key as a query parameter (often 'client_id' or 'api_key').
  // Using 'client_id' as it's common for Behance.
  const apiUrl = `${BEHANCE_API_BASE_URL}/users/${username}/projects?client_id=${apiKey}`;
  // Alternative common query param: `?api_key=${apiKey}`

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: "Failed to parse error response from Behance API." };
      }
      console.error(
        `Error fetching Behance projects for "${username}": ${response.status} ${response.statusText}`,
        errorData
      );
      return [];
    }

    const data: BehanceAPIResponse = await response.json();

    if (!data.projects) {
      console.warn(`No 'projects' field in Behance API response for "${username}". Response:`, data);
      return [];
    }

    // Transform the API response to our BehanceProject interface
    return data.projects.map((project: any) => ({
      id: project.id,
      name: project.name,
      description: project.description || (project.short_description || ""), // Taking first available description
      url: project.url,
      covers: project.covers || { original: "/placeholder.svg" }, // Ensure covers exist
      fields: project.fields || [],
      published_on: project.published_on,
      modified_on: project.modified_on,
    }));

  } catch (error) {
    console.error(`Failed to fetch or parse Behance projects for "${username}":`, error);
    return [];
  }
}
