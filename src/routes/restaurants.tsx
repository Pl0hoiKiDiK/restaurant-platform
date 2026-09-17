import { createFileRoute } from '@tanstack/react-router';
import { RestaurantsPage } from '@/features/restaurants/pages/restaurants-page';

export const Route = createFileRoute('/restaurants')({ component: RestaurantsPage });
