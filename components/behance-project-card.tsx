import React from 'react';
import { BehanceProject } from '@/lib/behance'; // Adjust path as necessary

interface BehanceProjectCardProps {
  project: BehanceProject;
}

const BehanceProjectCard: React.FC<BehanceProjectCardProps> = ({ project }) => {
  // Behance API returns multiple cover sizes. Prioritize '404', then '202', then 'original'.
  const imageUrl = project.covers?.['404'] || project.covers?.['202'] || project.covers?.original || '/placeholder.svg';
  const shortDescription = project.description?.substring(0, 100) || '';

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="aspect-w-4 aspect-h-3"> {/* Common aspect ratio for project covers */}
        <img
          src={imageUrl}
          alt={project.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1 truncate" title={project.name}>
          {project.name}
        </h3>
        {shortDescription && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 h-10 overflow-hidden">
            {shortDescription}...
          </p>
        )}
        {project.fields && project.fields.length > 0 && (
          <div className="mt-2">
            {project.fields.slice(0, 3).map((field) => (
              <span
                key={field}
                className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-full px-2 py-0.5 text-xs font-semibold mr-1 mb-1"
              >
                {field}
              </span>
            ))}
          </div>
        )}
         <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Published: {new Date(project.published_on * 1000).toLocaleDateString()}
        </p>
      </div>
    </a>
  );
};

export default BehanceProjectCard;
