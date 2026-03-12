document.addEventListener("DOMContentLoaded", () => {

  // COUNTDOWN TIMER
  const cdH = document.getElementById("cd-h");
  const cdM = document.getElementById("cd-m");
  const cdS = document.getElementById("cd-s");
  const endTime = new Date().getTime() + 24 * 60 * 60 * 1000;

  function updateCountdown() {
    if (!cdH) return;
    const now = new Date().getTime();
    const distance = endTime - now;
    if (distance <= 0) {
      cdH.textContent = "00"; cdM.textContent = "00"; cdS.textContent = "00";
      return;
    }
    const h = Math.floor(distance / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);
    cdH.textContent = String(h).padStart(2, "0");
    cdM.textContent = String(m).padStart(2, "0");
    cdS.textContent = String(s).padStart(2, "0");
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // PROMO POPUP — show after 3 seconds
  const promoOverlay = document.getElementById("promoOverlay");
  const promoClose = document.getElementById("promoClose");
  if (promoOverlay) {
    // Floating particles background
    const canvas = document.createElement("canvas");
    promoOverlay.insertBefore(canvas, promoOverlay.firstChild);
    const ctx = canvas.getContext("2d");
    const particles = [];
    function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
        r: Math.random() * 3 + 1, dx: (Math.random() - 0.5) * 0.6, dy: -Math.random() * 0.8 - 0.3,
        alpha: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? "220,38,38" : "255,107,53"
      });
    }
    let animFrame;
    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      });
      animFrame = requestAnimationFrame(drawParticles);
    }

    setTimeout(() => {
      promoOverlay.classList.add("active");
      drawParticles();
    }, 3000);

    function closePromo() {
      promoOverlay.classList.remove("active");
      cancelAnimationFrame(animFrame);
    }
    promoClose.addEventListener("click", closePromo);
    promoOverlay.addEventListener("click", (e) => { if (e.target === promoOverlay) closePromo(); });
  }

  // LIGHTBOX
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");
  if (lightbox) {
    document.querySelectorAll(".review-image").forEach(img => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });
    function closeLightbox() {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }
    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });
  }

  // REVIEW CAROUSELS
  document.querySelectorAll(".review-carousel").forEach(carousel => {
    const slides = carousel.querySelectorAll(".carousel-slide");
    const dots = carousel.querySelectorAll(".carousel-dot");
    let current = 0;
    function goTo(index) {
      slides[current].classList.remove("active");
      dots[current].classList.remove("active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("active");
      dots[current].classList.add("active");
    }
    carousel.querySelectorAll(".carousel-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        goTo(current + parseInt(btn.dataset.dir));
      });
    });
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => goTo(i));
    });
  });

  // MOBILE MENU
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
      menuToggle.setAttribute("aria-expanded", navLinks.classList.contains("show"));
    });
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // MASCOT AIRA
  const airaChar = document.getElementById("airaChar");
  const airaBubble = document.getElementById("airaBubble");
  const airaBubbleX = document.getElementById("airaBubbleX");
  if (airaChar && airaBubble) {
    airaChar.addEventListener("click", () => {
      airaBubble.classList.toggle("hidden");
      airaChar.classList.remove("wiggle");
      void airaChar.offsetWidth; // reflow to restart animation
      airaChar.classList.add("wiggle");
    });
    airaBubbleX.addEventListener("click", (e) => {
      e.stopPropagation();
      airaBubble.classList.add("hidden");
    });
    // show bubble after 2s, then auto-hide after 6s
    setTimeout(() => {
      airaBubble.classList.remove("hidden");
      setTimeout(() => airaBubble.classList.add("hidden"), 6000);
    }, 2000);
  }

  // PAUSE CAROUSEL ON HOVER
  const carousel = document.getElementById("carousel");
  if (carousel) {
    carousel.addEventListener("mouseenter", () => {
      carousel.style.animationPlayState = "paused";
    });
    carousel.addEventListener("mouseleave", () => {
      carousel.style.animationPlayState = "running";
    });
  }

  // FAQ CHATBOT
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotBox = document.getElementById("chatbotBox");
  const chatbotClose = document.getElementById("chatbotClose");
  const faqButtons = document.querySelectorAll(".faq-btn");
  const faqAnswer = document.getElementById("faqAnswer");

  if (chatbotToggle && chatbotBox) {
    chatbotToggle.addEventListener("click", () => chatbotBox.classList.toggle("show"));
  }
  if (chatbotClose && chatbotBox) {
    chatbotClose.addEventListener("click", () => chatbotBox.classList.remove("show"));
  }
  faqButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (faqAnswer) faqAnswer.textContent = btn.dataset.answer;
    });
  });

});
