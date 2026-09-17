import { useEffect, type RefObject } from 'react';

export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  onOutsideClick: () => void,
) {
  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        ref.current !== null &&
        event.target instanceof Node &&
        !ref.current.contains(event.target)
      ) {
        onOutsideClick();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onOutsideClick();
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref, onOutsideClick]);
}
