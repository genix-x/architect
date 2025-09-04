'use client'

import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import MetricCard from './MetricCard';
import ProjectCard from './ProjectCard';
import CustomEdge from './CustomEdge';

const initialNodes: Node[] = [
  // Project cards (left side)
  {
    id: 'project-1',
    type: 'projectCard',
    position: { x: 50, y: 100 },
    data: { 
      title: 'New marketing campaign',
      issues: 6,
      progress: 67,
      status: 'In progress'
    },
  },
  {
    id: 'project-2',
    type: 'projectCard',
    position: { x: 50, y: 250 },
    data: { 
      title: 'Social notifications',
      issues: 4,
      progress: 50,
      status: 'To do'
    },
  },
  {
    id: 'project-3',
    type: 'projectCard',
    position: { x: 50, y: 400 },
    data: { 
      title: 'Time-based notifications',
      issues: 1,
      progress: 100,
      status: 'Done'
    },
  },
  {
    id: 'project-4',
    type: 'projectCard',
    position: { x: 50, y: 550 },
    data: { 
      title: 'AI model for song recommendations',
      issues: 4,
      progress: 25,
      status: 'In progress'
    },
  },
  {
    id: 'project-5',
    type: 'projectCard',
    position: { x: 50, y: 700 },
    data: { 
      title: 'More prominent sharing prompts',
      issues: 4,
      progress: 50,
      status: 'Done'
    },
  },
  
  // Metric cards (center and right)
  {
    id: 'metric-1',
    type: 'metricCard',
    position: { x: 400, y: 120 },
    data: {
      title: 'Premium trial users',
      type: 'Sum',
      periods: ['Past 7 days', 'Past 6 weeks', 'Past 12 months'],
      values: ['4,570', '26,958', '210,135'],
      changes: ['0.87%', '2.71%', '38.26%'],
      hasChart: true
    },
  },
  {
    id: 'metric-2',
    type: 'metricCard',
    position: { x: 400, y: 320 },
    data: {
      title: 'Avg. sessions per week',
      type: 'Average',
      periods: ['Past 7 days', 'Past 6 weeks', 'Past 12 months'],
      values: ['641.45', '633.3', '570.13'],
      changes: ['1.24%', '1.44%', '39.7%'],
      hasChart: true
    },
  },
  {
    id: 'metric-3',
    type: 'metricCard',
    position: { x: 400, y: 520 },
    data: {
      title: 'Average session duration',
      type: 'Sum',
      periods: ['MTD', 'QTD', 'YTD'],
      values: ['0', '0', '17,085.74'],
      changes: ['-100%', '-100%', '-56.99%'],
      goal: '50,000 for 2023 • 34% complete',
      hasChart: false
    },
  },
  {
    id: 'metric-4',
    type: 'metricCard',
    position: { x: 400, y: 720 },
    data: {
      title: 'Avg. shares per session',
      type: 'Average',
      periods: ['Past 7 days', 'Past 6 weeks', 'Past 12 months'],
      values: ['663.37', '658.83', '593.1'],
      changes: ['0.51%', '2.38%', '33.18%'],
      hasChart: true
    },
  },
  {
    id: 'metric-5',
    type: 'metricCard',
    position: { x: 750, y: 420 },
    data: {
      title: 'Time spent listening to music by subscribers',
      type: 'Sum',
      periods: ['Past 7 days', 'Past 6 weeks', 'Past 12 months'],
      values: ['4.41K mins', '26.15K mins', '198.31K mins'],
      changes: ['0.43%', '2.57%', '38.59%'],
      hasChart: true
    },
  },
  {
    id: 'metric-6',
    type: 'metricCard',
    position: { x: 1100, y: 250 },
    data: {
      title: 'ARR',
      subtitle: 'Amount increased',
      periods: ['Past 7 days', 'Past 6 weeks', 'Past 12 months'],
      values: ['0', '-560', '$56,760'],
      changes: ['100%', '-100.17%', '1,676.67%'],
      hasChart: false
    },
  },
  {
    id: 'metric-7',
    type: 'metricCard',
    position: { x: 1100, y: 420 },
    data: {
      title: 'Monthly retention',
      type: 'Average',
      periods: ['Past 7 days', 'Past 6 weeks', 'Past 12 months'],
      values: ['72,315.8%', '71,521.9%', '63,825.8%'],
      changes: ['No change', '3.32%', '37.7%'],
      hasChart: true
    },
  },
  {
    id: 'metric-8',
    type: 'metricCard',
    position: { x: 1100, y: 590 },
    data: {
      title: 'Monthly premium subscriptions',
      type: 'Sum',
      periods: ['Past 7 days', 'Past 6 weeks', 'Past 12 months'],
      values: ['5,417.23', '32,032.44', '246,597.93'],
      changes: ['0.59%', '3.14%', '35.85%'],
      hasChart: true
    },
  },
];

const initialEdges: Edge[] = [
  // Connections with correlation scores
  { id: 'e1-2', source: 'metric-1', target: 'metric-2', label: '0.998', type: 'smoothstep', animated: true, 
    style: { stroke: '#16a34a', strokeWidth: 2 }, labelBgStyle: { fill: '#dcfce7' }, labelStyle: { fill: '#166534', fontWeight: 500 } },
  { id: 'e2-3', source: 'metric-2', target: 'metric-3', label: '-0.644', type: 'smoothstep', animated: true,
    style: { stroke: '#dc2626', strokeWidth: 2 }, labelBgStyle: { fill: '#fef2f2' }, labelStyle: { fill: '#991b1b', fontWeight: 500 } },
  { id: 'e2-5', source: 'metric-2', target: 'metric-5', label: '0.998', type: 'smoothstep', animated: true,
    style: { stroke: '#16a34a', strokeWidth: 2 }, labelBgStyle: { fill: '#dcfce7' }, labelStyle: { fill: '#166534', fontWeight: 500 } },
  { id: 'e5-6', source: 'metric-5', target: 'metric-6', label: '0.388', type: 'smoothstep', animated: true,
    style: { stroke: '#2563eb', strokeWidth: 2 }, labelBgStyle: { fill: '#dbeafe' }, labelStyle: { fill: '#1d4ed8', fontWeight: 500 } },
  { id: 'e5-7', source: 'metric-5', target: 'metric-7', label: '0.999', type: 'smoothstep', animated: true,
    style: { stroke: '#16a34a', strokeWidth: 2 }, labelBgStyle: { fill: '#dcfce7' }, labelStyle: { fill: '#166534', fontWeight: 500 } },
  { id: 'e5-8', source: 'metric-5', target: 'metric-8', label: '0.998', type: 'smoothstep', animated: true,
    style: { stroke: '#16a34a', strokeWidth: 2 }, labelBgStyle: { fill: '#dcfce7' }, labelStyle: { fill: '#166534', fontWeight: 500 } },
  { id: 'e3-4', source: 'metric-3', target: 'metric-4', label: '0.999', type: 'smoothstep', animated: true,
    style: { stroke: '#16a34a', strokeWidth: 2 }, labelBgStyle: { fill: '#dcfce7' }, labelStyle: { fill: '#166534', fontWeight: 500 } },
];

const nodeTypes = {
  metricCard: MetricCard,
  projectCard: ProjectCard,
};


export default function DashboardFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50"
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}