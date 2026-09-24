import { useLayoutEffect, useRef } from 'react';

const REVEAL_TARGETS = [
  '.home-section-head',
  '.home-benefit-card',
  '#partners h2',
  '.home-partners__item',
  '.home-direction-card',
  '.home-tariff-panel',
  '.home-reviews-heading',
  '.home-steps-grid article',
  '.home-schedule-copy',
  '.home-schedule-photos',
  '#calculator .home-calculator-panel',
  '.home-about-intro > div',
  '.home-stats article',
  '.home-work-gallery figure',
  '.home-bonus-card',
  '.home-faq-grid > div:first-child',
  '.home-faq-list',
  '.home-form-card',
].join(',');

const STAGGER_TARGETS = [
  '.home-benefit-card',
  '.home-partners__item',
  '.home-direction-card',
  '.home-steps-grid article',
  '.home-stats article',
  '.home-work-gallery figure',
  '.home-bonus-card',
].join(',');

export const useHomeReveals = () => {
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const main = mainRef.current;
    if (!main || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const prepared = new WeakSet<Element>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.06, rootMargin: '0px 0px -7% 0px' });

    const prepare = (element: Element) => {
      if (!(element instanceof HTMLElement) || prepared.has(element)) return;
      prepared.add(element);

      // Keep the first viewport and restored scroll positions visible immediately.
      if (element.getBoundingClientRect().top < window.innerHeight * 0.88) return;

      if (element.matches(STAGGER_TARGETS) && element.parentElement) {
        const index = Array.prototype.indexOf.call(element.parentElement.children, element) as number;
        element.style.setProperty('--home-reveal-delay', `${(index % 4) * 55}ms`);
      }

      element.classList.add('home-reveal');
      observer.observe(element);
    };

    const scan = (element: Element) => {
      if (element.matches(REVEAL_TARGETS)) prepare(element);
      element.querySelectorAll(REVEAL_TARGETS).forEach(prepare);
    };

    scan(main);

    // Lazy sections appear after the first scan; observe only newly inserted trees.
    const mutations = new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node instanceof Element) scan(node);
        }
      }
    });
    mutations.observe(main, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return mainRef;
};
