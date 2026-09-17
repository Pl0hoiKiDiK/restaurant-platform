import ireneAvatar from '@/assets/employees/irene.png';
import janaAvatar from '@/assets/employees/jana.png';
import larryAvatar from '@/assets/employees/larry.png';
import minaAvatar from '@/assets/employees/mina.png';
import nealAvatar from '@/assets/employees/neal.png';
import peteAvatar from '@/assets/employees/pete.png';

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