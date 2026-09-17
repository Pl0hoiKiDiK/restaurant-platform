import { Link, type ErrorComponentProps } from '@tanstack/react-router';
import { AsyncState } from '@/components/async-state';
import { getErrorMessage } from '@/lib/get-error-message';

export function RouteError({ error, reset }: ErrorComponentProps) {
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">Unable to open this page</h1>
      <AsyncState
        title="Something went wrong"
        description={getErrorMessage(error)}
        onRetry={reset}
      />
      <Link className="underline" to="/">
        Back to home
      </Link>
    </main>
  );
}
