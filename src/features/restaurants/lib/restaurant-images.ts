import mala1Image from '@/assets/restaurants/mala-1.webp';
import mala2Image from '@/assets/restaurants/mala-2.webp';
import mala3Image from '@/assets/restaurants/mala-3.webp';
import mala4Image from '@/assets/restaurants/mala-4.webp';
import mikado1Image from '@/assets/restaurants/mikado-1.webp';
import mikado2Image from '@/assets/restaurants/mikado-2.webp';
import mikado3Image from '@/assets/restaurants/mikado-3.webp';
import mikado4Image from '@/assets/restaurants/mikado-4.webp';
import nana1Image from '@/assets/restaurants/nana-1.webp';
import nana2Image from '@/assets/restaurants/nana-2.webp';
import nana3Image from '@/assets/restaurants/nana-3.webp';
import nana4Image from '@/assets/restaurants/nana-4.webp';
import thai1Image from '@/assets/restaurants/thai-1.webp';
import thai2Image from '@/assets/restaurants/thai-2.webp';
import thai3Image from '@/assets/restaurants/thai-3.webp';
import thai4Image from '@/assets/restaurants/thai-4.webp';

const restaurantImages: Record<string, string> = {
  'mala-1': mala1Image,
  'mala-2': mala2Image,
  'mala-3': mala3Image,
  'mala-4': mala4Image,
  'mikado-1': mikado1Image,
  'mikado-2': mikado2Image,
  'mikado-3': mikado3Image,
  'mikado-4': mikado4Image,
  'nana-1': nana1Image,
  'nana-2': nana2Image,
  'nana-3': nana3Image,
  'nana-4': nana4Image,
  'thai-1': thai1Image,
  'thai-2': thai2Image,
  'thai-3': thai3Image,
  'thai-4': thai4Image,
};

export function getRestaurantImage(imageKey: string): string {
  return restaurantImages[imageKey] ?? mikado1Image;
}
