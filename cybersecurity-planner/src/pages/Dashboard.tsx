import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useNavigate } from 'react-router-dom';

const cards = [
  {
    title: 'Create a new plan',
    description: 'Configure a new personalized security plan.',
    path: '/planner',
  },
  {
    title: 'My reports',
    description: 'View your past reports and saved analysis.',
    path: '/reports',
  },
  {
    title: 'Replay a test',
    description: 'Rerun an existing test plan with new data.',
    path: '/replay',
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <h1 className="text-4xl font-bold mb-6">Threat Operations Dashboard</h1>
      <p className="mb-10 text-muted-foreground">
        Plan, review, and relaunch your security strategies with confidence.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.path}
            onClick={() => navigate(card.path)}
            className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-300 dark:border-gray-700 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{card.description}</p>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
