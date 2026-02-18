export function initScrollAnimator(): void {
  const targets = document.querySelectorAll<HTMLElement>('.anim-target');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = el.dataset.animDelay || '0';
          el.style.animationDelay = delay + 'ms';
          el.classList.add('anim-visible');
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.1 }
  );

  targets.forEach((el) => observer.observe(el));
}
