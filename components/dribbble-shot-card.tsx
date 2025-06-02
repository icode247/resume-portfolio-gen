import React from 'react';
import { DribbbleShot } from '@/lib/dribbble'; // Adjust path as necessary

interface DribbbleShotCardProps {
  shot: DribbbleShot;
}

const DribbbleShotCard: React.FC<DribbbleShotCardProps> = ({ shot }) => {
  // Sanitize HTML description (basic example, consider a more robust library for production)
  const sanitizedDescription = shot.description?.replace(/<[^>]*>?/gm, '').substring(0, 100);

  return (
    <a
      href={shot.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="aspect-w-4 aspect-h-3">
        <img
          src={shot.imageUrl}
          alt={shot.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1 truncate" title={shot.title}>
          {shot.title}
        </h3>
        {sanitizedDescription && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 h-10 overflow-hidden">
            {sanitizedDescription}...
          </p>
        )}
        {shot.tags && shot.tags.length > 0 && (
          <div className="mt-2">
            {shot.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-0.5 text-xs font-semibold text-gray-700 dark:text-gray-300 mr-1 mb-1"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
};

export default DribbbleShotCard;
