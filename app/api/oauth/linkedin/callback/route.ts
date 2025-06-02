import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForToken } from '@/lib/linkedin'; // Adjust path as necessary

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state'); // For CSRF protection, not fully implemented in lib/linkedin.ts yet

  // TODO: Validate state parameter here against a stored value to prevent CSRF attacks.

  if (!code) {
    console.error("LinkedIn OAuth callback: Missing authorization code.");
    // Redirect to an error page or back to a settings page with an error message
    return NextResponse.redirect(new URL('/?error=linkedin_oauth_failed&reason=no_code', request.url).toString());
  }

  try {
    const accessToken = await exchangeCodeForToken(code);

    if (accessToken) {
      console.log("--- LinkedIn Access Token Obtained (TEMPORARY LOGGING) ---");
      console.log(accessToken);
      console.log("--- End of LinkedIn Access Token ---");
      console.warn("IMPORTANT: This access token needs to be securely stored and associated with the user. Currently, it is only logged. This is NOT production-ready.");

      // TODO: Securely store the accessToken and associate it with the logged-in user.
      // This might involve:
      // 1. Fetching user ID from session/cookie.
      // 2. Updating user record in Firestore/database with the new token.
      // 3. Encrypting the token before storage.
      // 4. Handling token expiration and refresh tokens (if applicable from LinkedIn's flow).

      // For now, redirect to a success indication page or the main app page.
      // Ideally, you'd redirect to a page that then triggers a data refresh for the user.
      // The access token should NOT be passed via query parameters in a real scenario.
      // This is a simplified redirect for the subtask.
      return NextResponse.redirect(new URL('/?linkedin_oauth_success=true', request.url).toString());
    } else {
      console.error("LinkedIn OAuth callback: Failed to exchange code for token.");
      return NextResponse.redirect(new URL('/?error=linkedin_oauth_failed&reason=token_exchange_failed', request.url).toString());
    }
  } catch (error) {
    console.error("LinkedIn OAuth callback: Exception during token exchange process.", error);
    return NextResponse.redirect(new URL('/?error=linkedin_oauth_failed&reason=exception', request.url).toString());
  }
}
