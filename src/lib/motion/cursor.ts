// Custom cursor disabled — GSAP ticker multiplication under HMR locks the main thread.
// Re-enable by calling initCursor() in a useEffect after verifying production behavior.
import { gsap } from 'gsap';
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
    gsap.to(this.dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'power2.out' });
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
    } as CSSStyleDeclaration);
    Object.assign(this.ring.style, {
      position: 'fixed', top: '0', left: '0',
      width: '32px', height: '32px', borderRadius: '50%',
      border: '1px solid rgba(255,255,255,0.6)',
      mixBlendMode: 'difference', pointerEvents: 'none', zIndex: '99999',
      transition: 'width 0.25s ease, height 0.25s ease',
    } as CSSStyleDeclaration);
    gsap.set(this.dot, { xPercent: -50, yPercent: -50 });
    gsap.set(this.ring, { xPercent: -50, yPercent: -50 });
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
      gsap.set(this.ring, { x: this.ringX, y: this.ringY });
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
