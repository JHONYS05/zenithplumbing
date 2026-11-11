"use client";

import { useEffect } from "react";

/**
 * Desktop dropdowns open on hover/focus. After a link inside one is clicked, close the menu
 * (even though the mouse is still over it) until the pointer leaves that menu.
 */
export function MenuCloser() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest(".main-nav .mega a, .main-nav .dropdown a");
      const item = link?.closest<HTMLElement>(".has-menu");
      if (!item) return;
      item.setAttribute("data-closed", "");
      (link as HTMLElement).blur();
      const reopen = () => item.removeAttribute("data-closed");
      item.addEventListener("mouseleave", reopen, { once: true });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
