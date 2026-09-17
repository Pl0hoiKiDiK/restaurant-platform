import { Link, Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
});

function RootComponent() {
  return <Outlet />;
}

function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-neutral-100 p-6">
      <section className="rounded-lg border border-neutral-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-neutral-500">404</p>

        <h1 className="mt-2 text-2xl font-semibold text-neutral-900">Page not found</h1>

        <p className="mt-3 text-sm text-neutral-500">This route does not exist.</p>
        <Link className="mt-4 inline-block underline" to="/">
          Back to home
        </Link>
      </section>
    </main>
  );
}
