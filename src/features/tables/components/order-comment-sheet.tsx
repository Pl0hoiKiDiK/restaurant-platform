import { useState, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import type { OrderItem } from '@/features/tables/types/order.types';

interface OrderCommentSheetProps {
  item: OrderItem | null;
  isUpdating: boolean;
  onClose: () => void;
  onSave: (comment: string) => void;
}

interface CommentFormProps {
  initialComment: string;
  isUpdating: boolean;
  onClose: () => void;
  onSave: (comment: string) => void;
}

export function OrderCommentSheet({
  item,
  isUpdating,
  onClose,
  onSave,
}: OrderCommentSheetProps) {
  function handleOpenChange(open: boolean) {
    if (!open && !isUpdating) {
      onClose();
    }
  }

  return (
    <Sheet onOpenChange={handleOpenChange} open={item !== null}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Dish comment</SheetTitle>

          <SheetDescription>
            {item === null ? 'Add a note for this dish.' : `Add a note for ${item.name}.`}
          </SheetDescription>
        </SheetHeader>

        {item !== null ? (
          <CommentForm
            initialComment={item.comment ?? ''}
            isUpdating={isUpdating}
            key={item.id}
            onClose={onClose}
            onSave={onSave}
          />
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function CommentForm({ initialComment, isUpdating, onClose, onSave }: CommentFormProps) {
  const [comment, setComment] = useState(initialComment);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSave(comment.trim());
  }

  return (
    <form className="mt-6 flex flex-col gap-4 px-6" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-2 text-sm font-medium text-[#222222]">
        Comment
        <textarea
          className="min-h-28 resize-y rounded-[4px] border border-black/15 bg-white px-3 py-2 text-sm font-normal outline-none placeholder:text-[#222222]/40 focus:border-[#222222]"
          disabled={isUpdating}
          maxLength={160}
          onChange={(event) => setComment(event.target.value)}
          placeholder="For example: No onions"
          value={comment}
        />
      </label>

      <p className="text-right text-xs text-[#222222]/40">{comment.length}/160</p>

      <div className="flex justify-end gap-2">
        <Button disabled={isUpdating} onClick={onClose} type="button" variant="outline">
          Cancel
        </Button>

        <Button disabled={isUpdating} type="submit">
          {isUpdating ? 'Saving…' : 'Save comment'}
        </Button>
      </div>
    </form>
  );
}
