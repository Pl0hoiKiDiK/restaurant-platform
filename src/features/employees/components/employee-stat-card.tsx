import { toast } from 'sonner';

interface EmployeeStatCardProps {
  label: string;
  value: number;
}

function handleViewClick(label: string) {
  toast.info(`${label} details are coming soon`, {
    description: 'Detailed employee statistics are not implemented yet.',
  });
}

export function EmployeeStatCard({ label, value }: EmployeeStatCardProps) {
  return (
    <article className="stat-card">
      <p className="stat-card-label">{label}</p>

      <div className="stat-card-value-row">
        <span className="stat-card-value">{value}</span>

        <div className="stat-card-divider" />

        <button
          className="stat-card-action"
          onClick={() => handleViewClick(label)}
          type="button"
        >
          View
        </button>
      </div>
    </article>
  );
}
