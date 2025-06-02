import React from 'react';
import { LinkedInEducationEntry } from '@/lib/linkedin'; // Adjust path as necessary

interface LinkedInEducationItemProps {
  education: LinkedInEducationEntry;
}

const LinkedInEducationItem: React.FC<LinkedInEducationItemProps> = ({ education }) => {
  const { schoolName, degreeName, fieldOfStudy, startDate, endDate, description } = education;

  const formatDate = (date?: { year?: number }) => {
    if (!date || !date.year) return '';
    return date.year.toString();
  };

  const startYear = formatDate(startDate);
  const endYear = formatDate(endDate);
  const period = startYear && endYear ? `${startYear} - ${endYear}` : (startYear || endYear);

  return (
    <div className="py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{schoolName}</h4>
      {(degreeName || fieldOfStudy) && (
        <p className="text-md text-blue-600 dark:text-blue-400 mb-1">
          {degreeName}{degreeName && fieldOfStudy ? ', ' : ''}{fieldOfStudy}
        </p>
      )}
      {period && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          {period}
        </p>
      )}
      {description && (
        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {description.length > 250 ? `${description.substring(0, 250)}...` : description}
        </p>
      )}
    </div>
  );
};

export default LinkedInEducationItem;
