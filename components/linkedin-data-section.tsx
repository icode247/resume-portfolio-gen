import React from 'react';
import {
  LinkedInPosition,
  LinkedInEducationEntry,
} from '@/lib/linkedin'; // Adjust path as necessary
import LinkedInProfileCard from './linkedin-profile-card';
import LinkedInExperienceItem from './linkedin-experience-item';
import LinkedInEducationItem from './linkedin-education-item';

// Assuming PortfolioContentType or a relevant subset is passed
// For this component, we only need the LinkedIn specific fields from the main portfolio data
interface LinkedInDataSectionProps {
  // From portfolio.name, portfolio.bio, portfolio.summary, portfolio.avatar
  name?: string;
  headline?: string; // Mapped to portfolio.bio or a specific linkedinHeadline field
  summary?: string;  // Mapped to portfolio.summary or a specific linkedinSummary field
  avatarUrl?: string | null;

  // From portfolio.linkedInProfileUrl
  linkedInProfileUrl?: string | null;

  // From portfolio.linkedInExperience
  experiences: LinkedInPosition[];

  // From portfolio.linkedInEducation
  educations: LinkedInEducationEntry[];

  // From portfolio.skills (which might be a mix, or a specific portfolio.linkedInSkills)
  skills: string[];

  // Flag to indicate if LinkedIn connection has been attempted/established via OAuth
  isLinkedInConnected: boolean;
}

const LinkedInDataSection: React.FC<LinkedInDataSectionProps> = ({
  name,
  headline,
  summary,
  avatarUrl,
  linkedInProfileUrl,
  experiences,
  educations,
  skills,
  isLinkedInConnected,
}) => {
  const hasProfileDetails = name || headline || summary || avatarUrl || linkedInProfileUrl;
  const hasExperiences = experiences && experiences.length > 0;
  const hasEducations = educations && educations.length > 0;
  const hasSkills = skills && skills.length > 0;

  // Only render the section if there's some LinkedIn data or if it's connected (to show prompt)
  if (!isLinkedInConnected && !hasProfileDetails && !hasExperiences && !hasEducations && !hasSkills && !linkedInProfileUrl) {
     // If not connected and no data at all (even a manual URL), render nothing.
    return null;
  }

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-800/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-8 sm:mb-12">
          LinkedIn Insights
        </h2>

        {hasProfileDetails && (
          <LinkedInProfileCard
            name={name}
            headline={headline}
            summary={summary}
            profileUrl={linkedInProfileUrl}
            avatarUrl={avatarUrl}
          />
        )}

        {!isLinkedInConnected && !hasProfileDetails && linkedInProfileUrl && (
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6 text-center">
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Displaying manually added LinkedIn profile. Connect your account to import detailed experience, education, and skills.
                </p>
                <a
                    href={linkedInProfileUrl} // Assuming this is a valid URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                >
                    View LinkedIn Profile &rarr;
                </a>
                {/* TODO: Add a "Connect LinkedIn" button here that triggers the AI/OAuth flow */}
            </div>
        )}

        {isLinkedInConnected && !hasProfileDetails && !hasExperiences && !hasEducations && !hasSkills && (
           <div className="text-center py-8 px-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
             <p className="text-gray-600 dark:text-gray-300 mb-3">
               LinkedIn account is connected, but we couldn't fetch detailed profile data.
               This might be due to permissions or an issue with the LinkedIn API.
               You can try refreshing the data or check your LinkedIn app permissions.
             </p>
             {linkedInProfileUrl && (
                <a
                    href={linkedInProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                >
                    View LinkedIn Profile &rarr;
                </a>
             )}
           </div>
        )}


        {hasExperiences && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Experience</h3>
            {experiences.map((exp, index) => (
              <LinkedInExperienceItem key={exp.companyName + index} experience={exp} />
            ))}
          </div>
        )}

        {hasEducations && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Education</h3>
            {educations.map((edu, index) => (
              <LinkedInEducationItem key={edu.schoolName + index} education={edu} />
            ))}
          </div>
        )}

        {hasSkills && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LinkedInDataSection;
