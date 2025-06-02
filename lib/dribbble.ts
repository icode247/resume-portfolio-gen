// lib/dribbble.ts

/**
 * NOTE: How to acquire DRIBBBLE_ACCESS_TOKEN
 * 1. Go to your Dribbble account settings.
 * 2. Navigate to "Applications" or "Developer" (the exact naming might vary).
 * 3. Register a new application.
 * 4. Once your application is registered, you should be able to find your "Client Access Token"
 *    or generate a new "Access Token". This token will need the `public` scope (or `shots:read`)
 *    to read public shots.
 * 5. Add this token to your environment variables as DRIBBBLE_ACCESS_TOKEN.
 */

export interface DribbbleShot {
  id: number;
  title: string;
  description: string | null; // Can be HTML or null
  imageUrl: string;
  htmlUrl: string;
  tags: string[];
  publishedAt: string;
}

const DRIBBBLE_API_BASE_URL = "https://api.dribbble.com/v2";

/**
 * Fetches a user's public shots from Dribbble.
 *
 * @param username - The Dribbble username. Note: The Dribbble API's /user/shots endpoint
 *                   fetches shots for the *authenticated* user, not a specific username.
 *                   This function assumes the DRIBBBLE_ACCESS_TOKEN is for the target user.
 *                   If you need to fetch shots for arbitrary users, the API endpoint might be different
 *                   or require different authentication scopes. For now, this fetches the authenticated user's shots.
 * @returns A promise that resolves to an array of DribbbleShot objects.
 */
export async function fetchDribbbleShots(username?: string): Promise<DribbbleShot[]> {
  // The Dribbble API /user/shots endpoint lists shots for the authenticated user.
  // The 'username' parameter is kept for conceptual clarity but isn't used in this specific API call.
  // If Dribbble API allows fetching specific user's shots by username directly without user-specific token,
  // this function would need to be adjusted.
  // For now, it fetches shots of the user whose Access Token is provided.

  const accessToken = process.env.DRIBBBLE_ACCESS_TOKEN;

  if (!accessToken) {
    console.warn(
      "DRIBBBLE_ACCESS_TOKEN is not set. Skipping Dribbble shots fetch."
    );
    return [];
  }

  try {
    const response = await fetch(`${DRIBBBLE_API_BASE_URL}/user/shots`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
      console.error(
        `Error fetching Dribbble shots: ${response.status} ${response.statusText}`,
        errorData
      );
      // If a specific username was targeted and the API doesn't support it this way, this error might occur.
      // For example, a 404 might mean the token is valid but the endpoint is wrong for "other user's shots".
      // A 401/403 would mean token issues.
      if (username) {
        console.warn(`Note: The current Dribbble API call fetches shots for the authenticated user (token owner), not necessarily for the username: ${username}.`)
      }
      return [];
    }

    const shotsData: any[] = await response.json();

    return shotsData.map((shot) => ({
      id: shot.id,
      title: shot.title,
      description: shot.description, // This is often HTML, handle accordingly in UI
      imageUrl: shot.images?.hidpi || shot.images?.normal || "/placeholder.svg",
      htmlUrl: shot.html_url,
      tags: shot.tags || [],
      publishedAt: shot.published_at,
    }));
  } catch (error) {
    console.error("Failed to fetch or parse Dribbble shots:", error);
    return [];
  }
}

// Example of how you might fetch shots for a specific user IF the API supported it directly
// and if our token had rights (this is a hypothetical alternative for typical APIs):
// export async function fetchUserDribbbleShots(username: string): Promise<DribbbleShot[]> {
//   const accessToken = process.env.DRIBBBLE_ACCESS_TOKEN;
//   if (!accessToken) return [];
//   try {
//     // Note: Dribbble's v2 API uses /user/shots for the authenticated user.
//     // For other users, you might typically see /users/{username}/shots,
//     // but this requires checking Dribbble's specific documentation for such an endpoint.
//     // The current implementation uses /user/shots.
//     const response = await fetch(`${DRIBBBLE_API_BASE_URL}/users/${username}/shots`, { // THIS IS HYPOTHETICAL
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });
//     if (!response.ok) { /* ... error handling ... */ return []; }
//     const shotsData: any[] = await response.json();
//     return shotsData.map(/* ... mapping ... */);
//   } catch (error) { /* ... error handling ... */ return []; }
// }
