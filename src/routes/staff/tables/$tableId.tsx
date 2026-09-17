import { createFileRoute } from '@tanstack/react-router';
import { TableDetailsPage } from '@/features/tables/pages/table-details-page';

export const Route = createFileRoute('/staff/tables/$tableId')({
  component: TableDetailsRoute,
});

function TableDetailsRoute() {
  const { tableId } = Route.useParams();
  return <TableDetailsPage key={tableId} tableId={tableId} />;
}
