import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Fade/slide an element into view as it scrolls into the viewport.
 *
 * SSR-safe: on the server (and before JS runs) nothing is hidden, so content
 * stays visible/crawlable. The hidden state is only applied in the browser.
 *
 * Usage: <div appReveal>...</div>  or  <div [appReveal]="120">…</div> (ms delay)
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  @Input('appReveal') delay: number | '' = '';

  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const node = this.el.nativeElement;
    const delayMs = typeof this.delay === 'number' ? this.delay : 0;
    node.style.transitionDelay = `${delayMs}ms`;
    node.classList.add('reveal');

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('reveal-in');
            this.observer?.unobserve(node);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
