export interface Task {
  id: number;
  project_id: number;
  name: string;
  color?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  position?: number | null;
}

interface Props {
  tasks: Task[];
  startRef?: string;
  endRef?: string;
  onTaskUpdate?: (updated: Task) => void;
}
