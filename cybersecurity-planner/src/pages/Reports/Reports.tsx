import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Download, Trash2, Copy } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { toast } from 'react-hot-toast';

interface SavedPlan {
  name: string;
  techniques: string[];
  timestamp: string;
}

const Reports = () => {
  const [plans, setPlans] = useState<SavedPlan[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('savedPlans');
    if (stored) {
      setPlans(JSON.parse(stored));
    }
  }, []);

  const deletePlan = (index: number) => {
    const updated = [...plans];
    updated.splice(index, 1);
    setPlans(updated);
    toast.success('Plan deleted.');
    localStorage.setItem('savedPlans', JSON.stringify(updated));
  };

  const confirmDelete = (index: number) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      deletePlan(index);
    }
  };

  const exportPlan = (plan: SavedPlan) => {
    const blob = new Blob([JSON.stringify(plan, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeName = plan.name.replace(/\s+/g, '-').toLowerCase();
    a.download = `plan-${safeName}-${new Date(plan.timestamp).toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const editPlan = (plan: SavedPlan) => {
    localStorage.setItem('editPlan', JSON.stringify(plan));
    navigate('/planner');
  };

  const duplicatePlan = (plan: SavedPlan) => {
    const cloned = {
      ...plan,
      name: plan.name + ' (copy)',
      timestamp: new Date().toISOString()
    };
    const current = JSON.parse(localStorage.getItem('savedPlans') || '[]');
    current.push(cloned);
    localStorage.setItem('savedPlans', JSON.stringify(current));
    setPlans(current);
    toast.success('Plan duplicated!');
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">My Reports</h1>

      {plans.length === 0 ? (
        <p className="text-muted-foreground">No saved plans yet. Create one in the Planner!</p>
      ) : (
        <div className="grid gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="relative bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => editPlan(plan)}
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => exportPlan(plan)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Download size={18} />
                </button>
                <button
                  onClick={() => confirmDelete(idx)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={() => duplicatePlan(plan)}
                  className="text-green-500 hover:text-green-700"
                >
                  <Copy size={18} />
                </button>
              </div>
              <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
              <p className="text-sm text-muted-foreground mb-2">
                Saved on {new Date(plan.timestamp).toLocaleString()}
              </p>
              <div className="flex flex-wrap gap-2">
                {plan.techniques.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs rounded-full bg-green-500 text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default Reports;
