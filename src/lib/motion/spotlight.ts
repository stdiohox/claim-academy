export function initSpotlight(selector: string): () => void {
  if (typeof window === 'undefined') return () => {};
  const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
  const handlers = new Map<HTMLElement, (e: MouseEvent) => void>();
  elements.forEach((el) => {
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };
    el.addEventListener('mousemove', handler);
    handlers.set(el, handler);
  });
  return () => {
    handlers.forEach((handler, el) => el.removeEventListener('mousemove', handler));
    handlers.clear();
  };
}
