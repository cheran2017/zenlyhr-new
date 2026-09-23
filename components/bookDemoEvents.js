export const BOOK_DEMO_EVENT = "book-demo:open";

export function openBookDemo() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(BOOK_DEMO_EVENT));
  }
}
