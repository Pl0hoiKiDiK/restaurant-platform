import { Button } from '@/components/ui/button';

interface AsyncStateProps {
  title: string;
  description?: string;
  onRetry?: () => void;
  loading?: boolean;
}

export function AsyncState({
  title,
  description,
  onRetry,
  loading = false,
}: AsyncStateProps) {
  return (
    <section
      aria-live="polite"
      aria-busy={loading}
      className="my-6 rounded-lg border bg-muted/30 p-6"
    >
      <h2 className="font-semibold">{title}</h2>
      {description ? (
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      ) : null}
      {onRetry ? (
        <Button className="mt-4" onClick={onRetry} type="button" variant="outline">
          Try again
        </Button>
      ) : null}
    </section>
  );
}
