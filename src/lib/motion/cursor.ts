// Custom cursor disabled — GSAP ticker multiplication under HMR locks the main thread.
// Re-enable by calling initCursor() in a useEffect after verifying production behavior.
// GSAP removed — replaced with direct CSS transforms so the module loads zero JS on import.
import { isTouch } from './hooks';

export class PremiumCursor {
  private dot: HTMLDivElement;
  private ring: HTMLDivElement;
  private mouseX = 0;
  private mouseY = 0;
  private ringX = 0;
  private ringY = 0;
  private raf = 0;
  private onMove = (e: MouseEvent) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    this.dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  };
  private onEnter = () => { this.ring.classList.add('cursor-expand'); };
  private onLeave = () => { this.ring.classList.remove('cursor-expand'); };

  constructor() {
    this.dot = document.createElement('div');
    this.ring = document.createElement('div');
    this.dot.className = 'cursor-dot';
    this.ring.className = 'cursor-ring';
    Object.assign(this.dot.style, {
      position: 'fixed', top: '0', left: '0',
      width: '6px', height: '6px', borderRadius: '50%',
      background: '#fff', mixBlendMode: 'difference',
      pointerEvents: 'none', zIndex: '99999',
      marginLeft: '-3px', marginTop: '-3px',
    } as CSSStyleDeclaration);
    Object.assign(this.ring.style, {
      position: 'fixed', top: '0', left: '0',
      width: '32px', height: '32px', borderRadius: '50%',
      border: '1px solid rgba(255,255,255,0.6)',
      mixBlendMode: 'difference', pointerEvents: 'none', zIndex: '99999',
      transition: 'width 0.25s ease, height 0.25s ease',
      marginLeft: '-16px', marginTop: '-16px',
    } as CSSStyleDeclaration);
    document.body.appendChild(this.dot);
    document.body.appendChild(this.ring);
    window.addEventListener('mousemove', this.onMove);
    document.querySelectorAll<HTMLElement>('a, button, [data-cursor="expand"]')
      .forEach((el) => {
        el.addEventListener('mouseenter', this.onEnter);
        el.addEventListener('mouseleave', this.onLeave);
      });
    const loop = () => {
      this.ringX += (this.mouseX - this.ringX) * 0.12;
      this.ringY += (this.mouseY - this.ringY) * 0.12;
      this.ring.style.transform = `translate(${this.ringX}px, ${this.ringY}px)`;
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
    if (!document.getElementById('premium-cursor-style')) {
      const style = document.createElement('style');
      style.id = 'premium-cursor-style';
      style.textContent = `.cursor-ring.cursor-expand{width:64px;height:64px;}`;
      document.head.appendChild(style);
    }
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener('mousemove', this.onMove);
    this.dot.remove();
    this.ring.remove();
  }
}

let instance: PremiumCursor | null = null;

export function initCursor(): (() => void) | undefined {
  if (typeof window === 'undefined') return;
  if (isTouch()) return;
  if (instance) return () => instance?.destroy();
  instance = new PremiumCursor();
  return () => { instance?.destroy(); instance = null; };
}
