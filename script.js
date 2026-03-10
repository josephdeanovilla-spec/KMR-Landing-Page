const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

if (slides.length > 1) {
  setInterval(nextSlide, 3500);
}

const countdownElement = document.getElementById("countdown");
const endTime = new Date().getTime() + 24 * 60 * 60 * 1000;

function updateCountdown() {
  const now = new Date().getTime();
  const distance = endTime - now;

  if (distance <= 0) {
    countdownElement.textContent = "Expired";
    return;
  }

  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownElement.textContent =
    `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
}

if (countdownElement) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    const expanded = navLinks.classList.contains("show");
    menuToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
      navLinks.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}