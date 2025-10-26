<script>
// /assets/js/sticky-logo.js
(function () {
  const BP = 991.98; // Bootstrap md/lg Breakpoint

  function mount() {
    const isDesktop = window.innerWidth > BP;
    if (!isDesktop) { remove(); return; }
    if (document.getElementById('zb-fixed-logo')) return;

    // Style
    const style = document.createElement('style');
    style.id = 'zb-fixed-logo-style';
    style.textContent = `
      #zb-fixed-logo{position:fixed;top:12px;right:12px;z-index:1100;display:block}
      #zb-fixed-logo img{width:192px;height:192px}
      @media (max-width:${BP}px){ #zb-fixed-logo{display:none} }
    `;
    document.head.appendChild(style);

    // Element
    const a = document.createElement('a');
    a.id = 'zb-fixed-logo';
    a.href = '/index.html';
    a.setAttribute('aria-label','Zukunftsberatung');

    const img = document.createElement('img');
    img.alt = 'Zukunftsberatung';
    img.width = 192; img.height = 192;
    // Bild NUR auf Desktop laden
    img.src = '/android-chrome-192x192.png';

    a.appendChild(img);
    document.body.appendChild(a);
  }

  function remove() {
    document.getElementById('zb-fixed-logo')?.remove();
    document.getElementById('zb-fixed-logo-style')?.remove();
  }

  // Init + Breakpoint-Reaktion
  const run = () => mount();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else { run(); }
  window.addEventListener('resize', () => {
    // einfache, robuste Variante
    if (window.innerWidth > BP) mount(); else remove();
  });
})();
</script>
