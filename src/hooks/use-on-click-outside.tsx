'use client';

import { useEffect, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: (event: Event) => void,
  mouseEvent: 'mousedown' | 'mouseup' | 'click' = 'click'
): void {
  useEffect(() => {
    const onClickHandler = (event: Event) => {
      const el = ref?.current;

      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      callback(event);
    };

    document.addEventListener(mouseEvent, onClickHandler);
    return () => {
      document.removeEventListener(mouseEvent, onClickHandler);
    };
  }, [callback, mouseEvent, ref]);
}
