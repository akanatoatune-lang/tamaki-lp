'use client';

import { useEffect, useState } from 'react';

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function ScrollEffects() {
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(1);

  useEffect(() => {
    const scroller = document.querySelector<HTMLElement>('.lp-content');
    const wrapper = document.querySelector<HTMLElement>('.site-wrapper');
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('.swipe-section, .scroll-section'),
    );
    const videos = Array.from(
      document.querySelectorAll<HTMLVideoElement>('video[data-loop-start][data-loop-end]'),
    );
    if (!scroller || !wrapper || sections.length === 0) {
      return;
    }

    setTotal(sections.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-active', entry.isIntersecting);
        });
      },
      {
        root: scroller,
        threshold: [0.35, 0.58, 0.78],
      },
    );

    sections.forEach((section, index) => {
      section.dataset.slide = String(index + 1).padStart(2, '0');
      observer.observe(section);
    });

    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollerRect = scroller.getBoundingClientRect();
      const center = scrollerRect.top + scrollerRect.height / 2;
      let nearest = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - center);
        const progress = clamp(
          (center - rect.top) / Math.max(rect.height, 1),
          0,
          1,
        );
        section.style.setProperty('--section-progress', progress.toFixed(3));

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = index;
        }
      });

      wrapper.style.setProperty(
        '--page-progress',
        String(nearest / Math.max(sections.length - 1, 1)),
      );
      setCurrent(nearest + 1);
    };

    const schedule = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(update);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      wrapper.style.setProperty(
        '--mx',
        ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5).toFixed(3),
      );
      wrapper.style.setProperty(
        '--my',
        ((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5).toFixed(3),
      );
    };

    const anchorLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
    );
    const scrollToHash = (hash: string, behavior: ScrollBehavior) => {
      if (!hash || hash === '#') {
        return;
      }

      const target = document.querySelector<HTMLElement>(hash);
      if (!target) {
        return;
      }

      const snapTarget =
        target.matches('.swipe-section, .scroll-section')
          ? target
          : target.closest<HTMLElement>('.swipe-section, .scroll-section') ?? target;
      const top =
        snapTarget.getBoundingClientRect().top -
        scroller.getBoundingClientRect().top +
        scroller.scrollTop;
      scroller.scrollTo({
        top,
        behavior,
      });
    };

    const onAnchorClick = (event: MouseEvent) => {
      const link = event.currentTarget as HTMLAnchorElement;
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') {
        return;
      }

      event.preventDefault();
      scrollToHash(hash, 'smooth');
      window.history.replaceState(null, '', hash);
    };

    const onHashChange = () => {
      scrollToHash(window.location.hash, 'auto');
    };

    update();
    const videoCleanups = videos.map((video) => {
      const start = Number(video.dataset.loopStart);
      const end = Number(video.dataset.loopEnd);
      const seekToStart = () => {
        if (!Number.isNaN(start) && video.currentTime < start) {
          video.currentTime = start;
        }
      };
      const keepInRange = () => {
        if (!Number.isNaN(start) && !Number.isNaN(end) && video.currentTime >= end) {
          video.currentTime = start;
          void video.play();
        }
      };

      video.addEventListener('loadedmetadata', seekToStart);
      video.addEventListener('timeupdate', keepInRange);
      seekToStart();
      void video.play();

      return () => {
        video.removeEventListener('loadedmetadata', seekToStart);
        video.removeEventListener('timeupdate', keepInRange);
        video.pause();
      };
    });
    scroller.addEventListener('scroll', schedule, { passive: true });
    wrapper.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('hashchange', onHashChange);
    anchorLinks.forEach((link) => {
      link.addEventListener('click', onAnchorClick);
    });
    window.requestAnimationFrame(() => {
      scrollToHash(window.location.hash, 'auto');
    });

    return () => {
      observer.disconnect();
      videoCleanups.forEach((cleanup) => cleanup());
      scroller.removeEventListener('scroll', schedule);
      wrapper.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('hashchange', onHashChange);
      anchorLinks.forEach((link) => {
        link.removeEventListener('click', onAnchorClick);
      });
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div className="lp-progress" aria-live="polite" aria-label="表示中のスライド">
      <span>{String(current).padStart(2, '0')}</span>
      <i aria-hidden="true" />
      <span>{String(total).padStart(2, '0')}</span>
    </div>
  );
}
