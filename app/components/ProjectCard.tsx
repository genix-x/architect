'use client'

import React from 'react';
import { Handle, Position } from '@xyflow/react';

interface ProjectCardProps {
  data: {
    title: string;
    issues: number;
    progress: number;
    status: 'To do' | 'In progress' | 'Done';
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  const { title, issues, progress, status } = data;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-800';
      case 'In progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'To do':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="bg-white rounded shadow-sm border border-gray-200 p-4 min-w-[240px] max-w-[280px]">
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
      
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">{title}</h3>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">{issues} issues</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
              {status}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Progress</span>
            <span className="font-medium text-gray-900">{progress}% done</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor(progress)}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;