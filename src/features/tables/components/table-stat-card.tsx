import { toast } from 'sonner';

interface TableStatCardProps {
  label: string;
  value: number;
}

function handleShowClick(label: string) {
  toast.info(`${label} tables view is coming soon`, {
    description: 'Filtering the floor plan by table status is not implemented yet.',
  });
}

export function TableStatCard({ label, value }: TableStatCardProps) {
  return (
    <article className="stat-card">
      <p className="stat-card-label">{label}</p>

      <div className="stat-card-value-row">
        <span className="stat-card-value">{value}</span>

        <div className="stat-card-divider" />

        <button
          className="stat-card-action"
          onClick={() => handleShowClick(label)}
          type="button"
        >
          Show
        </button>
      </div>
    </article>
  );
}
