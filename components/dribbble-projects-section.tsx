import React from 'react';
import { DribbbleShot } from '@/lib/dribbble'; // Adjust path as necessary
import DribbbleShotCard from './dribbble-shot-card'; // Adjust path as necessary

interface DribbbleProjectsSectionProps {
  projects: DribbbleShot[];
  title?: string;
}

const DribbbleProjectsSection: React.FC<DribbbleProjectsSectionProps> = ({ projects, title = "From Dribbble" }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500 dark:text-gray-400">
        {/* Optionally, display a message or return null to render nothing */}
        {/* <p>No Dribbble shots to display at the moment.</p> */}
      </div>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-8 sm:mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((shot) => (
            <DribbbleShotCard key={shot.id} shot={shot} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DribbbleProjectsSection;
