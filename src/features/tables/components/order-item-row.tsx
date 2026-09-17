import { formatPrice } from '@/features/tables/lib/format-price';
import commentFullIcon from '@/assets/icons/comment-full-icon.svg';
import commentIcon from '@/assets/icons/comment-icon.svg';
import deleteIcon from '@/assets/icons/delete-icon.svg';
import type { OrderItem } from '@/features/tables/types/order.types';

interface OrderItemRowProps {
  item: OrderItem;
  isUpdating: boolean;
  onDecrease: (itemId: string) => void;
  onIncrease: (itemId: string) => void;
  onRemove: (itemId: string) => void;
  onCommentClick: (itemId: string) => void;
}

export function OrderItemRow({
  item,
  isUpdating,
  onDecrease,
  onIncrease,
  onRemove,
  onCommentClick,
}: OrderItemRowProps) {
  const itemTotal = item.price * item.quantity;
  const commentImage = item.comment ? commentFullIcon : commentIcon;

  return (
    <article className="grid h-[60px] grid-cols-[28px_1fr_120px_154px_200px_82px] items-center gap-4 bg-white px-2 py-[10px]">
      <button
        aria-label={`Select ${item.name}`}
        className="size-4 border-2 border-[#7D7D7D] bg-transparent"
        type="button"
      />

      <div className="ml-3 flex min-w-0 items-center gap-4">
        <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#F0F0F0] text-xs font-bold text-[#353535]">
          {item.name.charAt(0)}
        </div>

        <span className="truncate text-lg font-medium leading-[22px] text-[#222222]">
          {item.name}
        </span>
      </div>

      <span className="text-lg font-medium leading-[22px] text-[#222222]">
        {formatPrice(item.price)}
      </span>

      <div className="flex h-[30px] items-center gap-2">
        <button
          aria-label={`Decrease quantity of ${item.name}`}
          className="grid size-[30px] place-items-center rounded-full bg-[#F0F0F0] text-lg leading-none text-[#353535]/30 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isUpdating || item.quantity === 1}
          onClick={() => onDecrease(item.id)}
          type="button"
        >
          −
        </button>

        <span
          aria-label={`Quantity: ${item.quantity}`}
          className="grid size-[30px] place-items-center rounded-full border border-[#D2D2D2] bg-white text-base font-black text-[#222222]"
        >
          {item.quantity}
        </span>

        <button
          aria-label={`Increase quantity of ${item.name}`}
          className="grid size-[30px] place-items-center rounded-full bg-[#F0F0F0] text-lg leading-none text-[#353535] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isUpdating}
          onClick={() => onIncrease(item.id)}
          type="button"
        >
          +
        </button>
      </div>

      <span className="text-lg font-medium leading-[22px] text-[#222222]">
        {item.quantity > 1 ? formatPrice(itemTotal) : ''}
      </span>

      <div className="flex h-[34px] w-[82px] items-center gap-6">
        <button
          aria-label={`Edit comment for ${item.name}`}
          className="grid size-6 place-items-center disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isUpdating}
          onClick={() => onCommentClick(item.id)}
          type="button"
        >
          <img alt="" aria-hidden="true" className="size-6" src={commentImage} />
        </button>

        <button
          aria-label={`Remove ${item.name}`}
          className="grid size-[34px] place-items-center disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isUpdating}
          onClick={() => onRemove(item.id)}
          type="button"
        >
          <img alt="" aria-hidden="true" className="size-[34px]" src={deleteIcon} />
        </button>
      </div>
    </article>
  );
}
