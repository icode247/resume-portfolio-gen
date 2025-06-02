import React from 'react';
import { BehanceProject } from '@/lib/behance'; // Adjust path as necessary
import BehanceProjectCard from './behance-project-card'; // Adjust path as necessary

interface BehanceProjectsSectionProps {
  projects: BehanceProject[];
  title?: string;
}

const BehanceProjectsSection: React.FC<BehanceProjectsSectionProps> = ({ projects, title = "My Behance Projects" }) => {
  if (!projects || projects.length === 0) {
    return null; // Render nothing if there are no projects
  }

  return (
    <section className="py-12 md:py-16 bg-gray-100 dark:bg-gray-800/70"> {/* Slightly different background for variety */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-8 sm:mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <BehanceProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BehanceProjectsSection;
