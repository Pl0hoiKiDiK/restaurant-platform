import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/restaurants')({
  component: RestaurantsPage,
});

function RestaurantsPage() {
  return (
    <main className="min-h-screen bg-neutral-100 p-6">
      <section className="mx-auto max-w-6xl rounded-lg border border-neutral-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-neutral-500">Customer mode</p>

        <h1 className="mt-2 text-3xl font-semibold text-neutral-900">
          Restaurants
        </h1>

        <p className="mt-3 text-sm text-neutral-600">
          Restaurant discovery map will be implemented here.
        </p>
      </section>
    </main>
  );
}