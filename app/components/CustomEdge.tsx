'use client'

import React from 'react';
import {
  EdgeProps,
  getSmoothStepPath,
  EdgeLabelRenderer,
} from '@xyflow/react';

const CustomEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  label,
  data,
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const getScoreColor = (score: string) => {
    if (score.startsWith('-')) return 'text-red-600 bg-red-50 border-red-200';
    const numScore = parseFloat(score);
    if (numScore >= 0.9) return 'text-green-600 bg-green-50 border-green-200';
    if (numScore >= 0.5) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getStrokeColor = (score: string) => {
    if (score.startsWith('-')) return '#dc2626';
    const numScore = parseFloat(score);
    if (numScore >= 0.9) return '#16a34a';
    if (numScore >= 0.5) return '#2563eb';
    return '#6b7280';
  };

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        stroke={getStrokeColor(label || '0')}
        strokeWidth={2}
        fill="none"
        markerEnd="url(#arrow)"
      />
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className={`text-xs px-2 py-1 rounded-full border font-medium ${getScoreColor(label)}`}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default CustomEdge;