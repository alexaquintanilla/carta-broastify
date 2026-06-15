// Resalta el chip de la categoría visible mientras se hace scroll.
(function () {
  const links = Array.from(document.querySelectorAll('.chips a'));
  if (!links.length) return;

  const byId = new Map(
    links.map((a) => [a.getAttribute('href').slice(1), a])
  );
  const sections = links
    .map((a) => document.getElementById(a.getAttribute('href').slice(1)))
    .filter(Boolean);

  function setActive(id) {
    links.forEach((a) => a.classList.remove('is-active'));
    const a = byId.get(id);
    if (a) {
      a.classList.add('is-active');
      a.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    }
  }

  // Al hacer click: marca el chip y resalta la sección destino.
  links.forEach((a) => {
    a.addEventListener('click', () => {
      const id = a.getAttribute('href').slice(1);
      setActive(id);
      const target = document.getElementById(id);
      if (target) {
        sections.forEach((s) => s.classList.remove('is-current'));
        target.classList.add('is-current'); // highlight persistente
        target.classList.remove('is-flash');
        void target.offsetWidth; // reinicia la animación
        target.classList.add('is-flash');
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] }
  );

  sections.forEach((s) => observer.observe(s));
})();
