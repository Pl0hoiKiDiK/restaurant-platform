import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

const discountOptions = [0, 5, 10, 15, 20] as const;

interface OrderDiscountSheetProps {
  discountPercent: number;
  isUpdating: boolean;
  onClose: () => void;
  onSelectDiscount: (discountPercent: number) => void;
  open: boolean;
}

export function OrderDiscountSheet({
  discountPercent,
  isUpdating,
  onClose,
  onSelectDiscount,
  open,
}: OrderDiscountSheetProps) {
  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen && !isUpdating) {
      onClose();
    }
  }

  function handleSelectDiscount(value: number) {
    onSelectDiscount(value);
    onClose();
  }

  return (
    <Sheet onOpenChange={handleOpenChange} open={open}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Discount</SheetTitle>

          <SheetDescription>
            Choose a discount for this order.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-2 px-6">
          {discountOptions.map((value) => (
            <Button
              disabled={isUpdating}
              key={value}
              onClick={() => handleSelectDiscount(value)}
              type="button"
              variant={discountPercent === value ? 'default' : 'outline'}
            >
              {value === 0 ? 'No discount' : `${value}% discount`}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}