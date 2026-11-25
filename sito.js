// GiSquare Veicoli · sito: menu sui telefoni e schede delle tre viste.
(function () {
  var bottone = document.querySelector('.apri-menu');
  var nav = document.getElementById('nav');
  if (bottone && nav) {
    bottone.addEventListener('click', function () {
      var aperto = nav.classList.toggle('aperto');
      bottone.setAttribute('aria-expanded', String(aperto));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('aperto');
        bottone.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var schede = Array.prototype.slice.call(document.querySelectorAll('.elenco-viste [role="tab"]'));
  function scegli(t, fuoco) {
    schede.forEach(function (s) {
      var su = s === t;
      s.setAttribute('aria-selected', String(su));
      s.tabIndex = su ? 0 : -1;
      document.getElementById(s.getAttribute('aria-controls')).hidden = !su;
    });
    if (fuoco) t.focus();
  }
  schede.forEach(function (t, i) {
    t.addEventListener('click', function () { scegli(t, false); });
    t.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      scegli(schede[(i + d + schede.length) % schede.length], true);
    });
  });
})();
