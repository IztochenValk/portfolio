import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  title: string;
  description: string;
  path: string;
  icon?: React.ElementType;
};

const DashboardCard: React.FC<Props> = ({ title, description, path, icon: Icon }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      className='group border rounded-2xl p-6 cursor-pointer transition hover:shadow-xl bg-white dark:bg-gray-900 hover:border-primary'
    >
      {Icon && <Icon className='w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform' />}
      <h3 className='text-xl font-semibold mb-2'>{title}</h3>
      <p className='text-sm text-muted-foreground'>{description}</p>
    </div>
  );
};

export default DashboardCard;
