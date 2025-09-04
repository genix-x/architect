'use client'

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  data: {
    title: string;
    subtitle?: string;
    type?: string;
    periods: string[];
    values: string[];
    changes: string[];
    goal?: string;
    hasChart: boolean;
  };
}

// Mock chart data
const generateChartData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    value: Math.random() * 100 + 50
  }));
};

const MetricCard: React.FC<MetricCardProps> = ({ data }) => {
  const { title, subtitle, type, periods, values, changes, goal, hasChart } = data;
  const chartData = generateChartData();

  const getChangeIcon = (change: string) => {
    if (change.includes('-')) return <TrendingDown className="w-3 h-3 text-red-500" />;
    if (change === 'No change') return <Minus className="w-3 h-3 text-gray-400" />;
    return <TrendingUp className="w-3 h-3 text-green-500" />;
  };

  const getChangeColor = (change: string) => {
    if (change.includes('-')) return 'text-red-500';
    if (change === 'No change') return 'text-gray-400';
    return 'text-green-500';
  };

  return (
    <div className="bg-white rounded shadow-sm border border-gray-200 p-4 min-w-[280px] max-w-[320px]">
      <Handle type="target" position={Position.Left} className="w-3 h-3" />
      <Handle type="source" position={Position.Right} className="w-3 h-3" />
      
      <div className="mb-3">
        <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        {type && (
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            <span>Metric ({type})</span>
          </div>
        )}
      </div>

      {hasChart && (
        <div className="h-16 mb-3 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="space-y-2">
        {periods.map((period, index) => (
          <div key={period} className="flex justify-between items-center text-xs">
            <span className="text-gray-500">{period}</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{values[index]}</span>
              <div className={`flex items-center gap-1 ${getChangeColor(changes[index])}`}>
                {getChangeIcon(changes[index])}
                <span className="font-medium">{changes[index]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {goal && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-600">
            <span className="font-medium">Goal</span> • {goal}
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricCard;