import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { Toaster } from 'sonner';

import 'leaflet/dist/leaflet.css';

import { QueryProvider } from '@/app/providers/query-provider';
import { router } from '@/app/router';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
      <Toaster
        closeButton
        position="bottom-right"
        richColors
        toastOptions={{
          className: 'font-sans',
        }}
      />
    </QueryProvider>
  </StrictMode>,
);