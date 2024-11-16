(function ($) {
  'use strict';

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($('#spinner').length > 0) {
        $('#spinner').removeClass('show');
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.sticky-top').addClass('shadow-sm').css('top', '0px');
    } else {
      $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
  });

  // Testimonials carousel
  $('.testimonial-carousel').owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    items: 1,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  });
})(jQuery);

//Navbar hambureger CLOSE
document.querySelectorAll('.navbar-nav .nav-link').forEach((item) => {
  item.addEventListener('click', () => {
    const navbarCollapse = document.getElementById('navbarCollapse');
    if (window.getComputedStyle(navbarCollapse).display === 'block') {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false,
      });
      bsCollapse.hide();
    }
  });
});

// Uvijeti korištenja

// Funkcija za otvaranje modala
function openModal() {
  document.getElementById('termsModal').style.display = 'flex';
}

// Funkcija za zatvaranje modala
function closeModal() {
  document.getElementById('termsModal').style.display = 'none';
}

// Zatvaranje modala klikom izvan sadržaja
window.onclick = function (event) {
  var modal = document.getElementById('termsModal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

// kopiraj IBN
function copyIBAN() {
  const iban = 'HR4123400091111299876';
  navigator.clipboard
    .writeText(iban)
    .then(() => {
      const message = document.getElementById('copy-message');
      message.style.display = 'block';
      setTimeout(() => {
        message.style.display = 'none';
      }, 2000);
    })
    .catch((err) => {
      console.error('Kopiranje nije uspjelo: ', err);
    });
}

function provjeriRadnoVrijeme() {
  const sada = new Date();
  const sat = sada.getHours();
  const dan = sada.getDay(); // 0 = Nedjelja, 1 = Ponedjeljak, ..., 6 = Subota

  // Provjera je li trenutno radno vrijeme (Pon-Sub, 08:00 - 18:00)
  const otvoreno = dan >= 1 && dan <= 6 && sat >= 8 && sat < 18;

  // Ažuriraj oba statusa
  const statusi = ['status1', 'status2'];
  statusi.forEach((id) => {
    const statusElement = document.getElementById(id);
    if (statusElement) {
      statusElement.innerHTML = otvoreno
        ? '<span style="color: green; font-weight: 500;">Trenutno: Otvoreno</span>'
        : '<span style="color: red; font-weight: 500;">Trenutno: Zatvoreno</span>';
    }
  });
}

// Pozovi funkciju kod učitavanja stranice
provjeriRadnoVrijeme();

// Ažuriraj status svake minute
setInterval(provjeriRadnoVrijeme, 60000);
