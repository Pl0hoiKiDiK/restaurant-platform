import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

const applicationSections = [
  {
    description:
      'Browse restaurants, use cuisine filters, search by name, and explore locations on the interactive map.',
    label: 'Customer app',
    title: 'Find restaurants',
    to: '/restaurants' as const,
  },
  {
    description:
      'View the restaurant floor plan, manage active orders, add dish comments, apply discounts, and complete orders.',
    label: 'Staff workspace',
    title: 'Manage tables',
    to: '/staff/tables' as const,
  },
  {
    description:
      'View the employee directory, shift information, employment dates, billing dates, and statistics.',
    label: 'Manager workspace',
    title: 'Manage employees',
    to: '/staff/employees' as const,
  },
] as const;

function HomePage() {
  return (
    <main className="min-h-screen bg-[#F7F7F7] px-6 py-10 text-[#222222] sm:px-10 lg:px-16">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F34336]">
          Restaurant Platform
        </p>

        <h1 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">
          Choose a workspace
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-6 text-[#222222]/60">
          Explore the customer restaurant finder or open the restaurant CRM
          workspace for staff and managers.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {applicationSections.map(
            ({ description, label, title, to }) => (
              <Link
                className="group flex min-h-[260px] flex-col rounded-[8px] border border-black/10 bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#222222]/30 hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F34336] focus-visible:ring-offset-2"
                key={to}
                to={to}
              >
                <p className="text-sm font-semibold text-[#F34336]">
                  {label}
                </p>

                <h2 className="mt-4 text-2xl font-semibold">{title}</h2>

                <p className="mt-3 text-sm leading-6 text-[#222222]/60">
                  {description}
                </p>

                <span className="mt-auto pt-8 text-sm font-semibold text-[#222222] transition-transform group-hover:translate-x-1">
                  Open workspace →
                </span>
              </Link>
            ),
          )}
        </div>
      </section>
    </main>
  );
}