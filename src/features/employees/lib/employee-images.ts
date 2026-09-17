import ireneAvatar from '@/assets/employees/irene.webp';
import janaAvatar from '@/assets/employees/jana.webp';
import larryAvatar from '@/assets/employees/larry.webp';
import minaAvatar from '@/assets/employees/mina.webp';
import nealAvatar from '@/assets/employees/neal.webp';
import peteAvatar from '@/assets/employees/pete.webp';

const employeeImages: Record<string, string> = {
  irene: ireneAvatar,
  jana: janaAvatar,
  larry: larryAvatar,
  mina: minaAvatar,
  neal: nealAvatar,
  pete: peteAvatar,
};

export function getEmployeeImage(avatarKey: string): string | undefined {
  return employeeImages[avatarKey];
}
