import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react'; // Add at the top with other imports

const mitreTechniques = [
  'Initial Access',
  'Privilege Escalation',
  'Execution',
  'Lateral Movement',
  'Credential Access',
  'Command and Control',
];

interface ImportedPlan {
  name: string;
  techniques: string[];
  timestamp: string;
}

const ThreatOpsPlanner = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [savedPlans, setSavedPlans] = useState<any[]>([]);
  const [planName, setPlanName] = useState<string>('');

  useEffect(() => {
    const stored = localStorage.getItem('editPlan');
    if (stored) {
      const plan = JSON.parse(stored);
      if (plan && Array.isArray(plan.techniques)) {
        setPlanName(plan.name || '');
        setSelected(plan.techniques);
        localStorage.removeItem('editPlan'); // Clear after loading
      }
    }
  }, []);
  

  const toggleTechnique = (tech: string) => {
    setSelected(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const handleSave = () => {
    if (!planName.trim()) {
      alert('Please enter a name for your plan.');
      return;
    }
    const newPlan = {
      name: planName,
      techniques: selected,
      timestamp: new Date().toISOString(),
    };
    const updatedPlans = [...savedPlans, newPlan];
    setSavedPlans(updatedPlans);
    localStorage.setItem('savedPlans', JSON.stringify(updatedPlans));
    setPlanName('');
    setSelected([]);
    toast.success('Plan saved successfully!');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data: ImportedPlan = JSON.parse(event.target?.result as string);
        if (data && Array.isArray(data.techniques)) {
          setPlanName(data.name || '');
          setSelected(data.techniques);
          toast.success('Plan imported successfully!');
        } else {
          alert('Invalid plan file.');
        }
      } catch {
        toast.error('Failed to import plan. Invalid JSON.');
      }
    };
    reader.readAsText(file);
  };

  const progress = Math.round((selected.length / mitreTechniques.length) * 100);

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">Threat Operations Planner</h1>

      <div className="progbar w-full h-4 bg-gray-300 dark:bg-gray-700 rounded-xl overflow-hidden mb-10">
        <div
          className="h-full bg-green-500 transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="flex flex-wrap gap-4 mb-10">
        {mitreTechniques.map((tech) => (
          <div
            key={tech}
            onClick={() => toggleTechnique(tech)}
            className={`px-5 py-3 rounded-xl border cursor-pointer transition ${
              selected.includes(tech)
                ? 'bg-green-500 text-white'
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
            }`}
          >
            {tech}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <input
          type="text"
          placeholder="Enter plan name..."
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
        />
        <button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl transition"
        >
          Save Plan
        </button>
      </div>

      <div className="flex items-center gap-4">
        <label className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl cursor-pointer transition">
        📂 Import Plan
          <input
            type="file"
            accept="application/json"
            onChange={handleImport}
            className="hidden"
          />
        </label>
      </div>
    </MainLayout>
  );
};

export default ThreatOpsPlanner;
