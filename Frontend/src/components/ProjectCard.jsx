import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg group">
      <div className="relative overflow-hidden h-56">
        <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2.5 group-hover:text-blue-600">{project.name}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>
        <span className="inline-flex items-center text-blue-600 text-sm font-medium group-hover:gap-2">
          View project
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
