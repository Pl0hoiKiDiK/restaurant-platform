export function getErrorMessage(error: Error | null): string {
  if (error === null) {
    return 'An unknown error occurred.';
  }

  return error.message;
}
