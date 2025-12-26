export interface Project {
  id: number;
  name: string;
  description?: string | null;
  created_at?: string | null;
  horizon_months?: number | null;
  end_override?: string | null;
}
