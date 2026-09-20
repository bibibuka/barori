import { useEffect, useRef, type RefObject } from 'react';

/** Native dialogs supply Escape, focus containment and focus restoration on Safari too. */
export const useModalDialog = (open: boolean, returnFocusTo?: RefObject<HTMLElement | null>) => {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const overflow = document.body.style.overflow;
    const trigger = returnFocusTo?.current ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [open, returnFocusTo]);
  return ref;
};
