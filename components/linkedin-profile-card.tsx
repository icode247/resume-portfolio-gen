import React from 'react';

// Define a type for the props based on what data we expect to have available
// This will come from the main portfolio data, which includes fields populated by fetchLinkedInData
interface LinkedInProfileCardProps {
  name?: string;          // e.g., portfolio.name (potentially updated from LinkedIn)
  headline?: string;      // e.g., portfolio.bio (potentially updated from LinkedIn headline)
  summary?: string;       // e.g., portfolio.summary (potentially updated from LinkedIn summary)
  profileUrl?: string | null; // e.g., portfolio.linkedInProfileUrl
  avatarUrl?: string | null;    // e.g., portfolio.avatar (potentially updated from LinkedIn)
}

const LinkedInProfileCard: React.FC<LinkedInProfileCardProps> = ({
  name,
  headline,
  summary,
  profileUrl,
  avatarUrl,
}) => {
  const hasProfileData = name || headline || summary || profileUrl || avatarUrl;

  if (!hasProfileData) {
    return null; // Or a message indicating no profile data is available
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-4 mb-4">
        {avatarUrl && (
          <img src={avatarUrl} alt={name || 'Profile'} className="w-16 h-16 rounded-full object-cover" />
        )}
        <div>
          {name && <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{name}</h3>}
          {headline && <p className="text-md text-blue-600 dark:text-blue-400">{headline}</p>}
        </div>
      </div>

      {summary && (
        <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200">Summary</h4>
          <p>{summary.length > 200 ? `${summary.substring(0, 200)}...` : summary}</p>
        </div>
      )}

      {profileUrl && (
        <div className="mt-4">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
          >
            View Full LinkedIn Profile &rarr;
          </a>
        </div>
      )}
    </div>
  );
};

export default LinkedInProfileCard;
