import React from 'react';
import { LinkedInPosition } from '@/lib/linkedin'; // Adjust path as necessary

interface LinkedInExperienceItemProps {
  experience: LinkedInPosition;
}

const LinkedInExperienceItem: React.FC<LinkedInExperienceItemProps> = ({ experience }) => {
  const { companyName, title, description, startDate, endDate, location, isCurrent } = experience;

  const formatDate = (date?: { year?: number; month?: number }) => {
    if (!date || !date.year) return 'Present';
    const monthName = date.month ? new Date(date.year, date.month - 1).toLocaleString('default', { month: 'short' }) : '';
    return `${monthName} ${date.year}`;
  };

  const period = `${formatDate(startDate)} - ${isCurrent ? 'Present' : formatDate(endDate)}`;

  return (
    <div className="py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h4>
      <p className="text-md text-blue-600 dark:text-blue-400 mb-1">{companyName}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
        {period}
        {location && ` • ${location}`}
      </p>
      {description && (
        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {description.length > 250 ? `${description.substring(0, 250)}...` : description}
        </p>
      )}
    </div>
  );
};

export default LinkedInExperienceItem;
