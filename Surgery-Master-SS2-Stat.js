  function animateCount(el, target, suffix = '') {
    let start = 0;
    const duration = 1500; // in ms
    const startTime = performance.now();

    function update(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * target);
      el.textContent = `${current}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${target}${suffix}`; // Ensure final number is exact
      }
    }

    el.textContent = `0${suffix}`;
    requestAnimationFrame(update);
  }

  function setupIntersectionObserver() {
    const counters = document.querySelectorAll('.count');
    const seen = new Set();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !seen.has(entry.target)) {
          const target = parseInt(entry.target.getAttribute('data-target'), 10);
          const suffix = entry.target.getAttribute('data-suffix') || '';
          animateCount(entry.target, target, suffix);
          seen.add(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  setupIntersectionObserver();