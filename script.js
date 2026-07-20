document.addEventListener('DOMContentLoaded', function () {

  // Ano dinâmico no rodapé
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Fecha o menu mobile ao clicar em um link
  var navMenu = document.getElementById('navMenu');
  var navLinks = document.querySelectorAll('#navMenu .nav-link, #navMenu .btn-agendar');
  if (navMenu && window.bootstrap) {
    var collapseInstance = new bootstrap.Collapse(navMenu, { toggle: false });
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (navMenu.classList.contains('show')) {
          collapseInstance.hide();
        }
      });
    });
  }

  // Animação de revelação ao rolar a página
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Formulário de captação de lead
  var leadForm = document.getElementById('leadForm');
  var formSuccess = document.getElementById('formSuccess');

  if (leadForm) {
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!leadForm.checkValidity()) {
        leadForm.classList.add('was-validated');
        return;
      }

      var nome = document.getElementById('nome').value.trim();
      var telefone = document.getElementById('telefone').value.trim();
      var area = document.getElementById('area').value;
      var mensagem = document.getElementById('mensagem').value.trim();

      // Encaminha o lead para o WhatsApp com os dados preenchidos
      var texto = 'Olá, Dra. Mirella! Meu nome é ' + nome +
        '. Tenho interesse em ' + area + '.' +
        (telefone ? ' Meu contato: ' + telefone + '.' : '') +
        (mensagem ? ' Detalhes: ' + mensagem : '');

      var whatsappUrl = 'https://wa.me/5582900000000?text=' + encodeURIComponent(texto);

      formSuccess.classList.remove('d-none');
      leadForm.reset();
      leadForm.classList.remove('was-validated');

      window.open(whatsappUrl, '_blank');
    });
  }

});
