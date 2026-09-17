import { RouteError } from '@/app/route-error';
import { createRouter } from '@tanstack/react-router';

import { routeTree } from '@/routeTree.gen';

export const router = createRouter({
  routeTree,
  defaultErrorComponent: RouteError,
  defaultPreload: 'intent',
  scrollRestoration: true,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
