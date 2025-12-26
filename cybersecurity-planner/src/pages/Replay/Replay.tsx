import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

const Replay = () => {
  return (
    <MainLayout>
      <h1 className='text-3xl font-bold mb-6'>Replay a Test</h1>
      <p className='text-muted-foreground mb-4'>Select an existing plan to rerun with updated parameters.</p>
      {/* Placeholder content */}
      <div className='bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-6'>
        <p>No previous tests found.</p>
      </div>
    </MainLayout>
  );
};

export default Replay;
