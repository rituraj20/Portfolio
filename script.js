const revealElements = document.querySelectorAll('.reveal');
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');
const cursorGlow = document.querySelector('.cursor-glow');
const projectCards = document.querySelectorAll('.project-card-inner');
const sections = document.querySelectorAll('section[id]');

const revealOnScroll = () => {
  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < window.innerHeight - 100) {
      el.classList.add('active');
    }
  });
};

const updateActiveNavLink = () => {
  let currentId = '';
  sections.forEach((section) => {
    const top = section.offsetTop - 140;
    if (window.scrollY >= top) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${currentId}`;
    link.classList.toggle('active-link', isActive);
  });
};

window.addEventListener('scroll', () => {
  revealOnScroll();
  updateActiveNavLink();
});
window.addEventListener('load', () => {
  revealOnScroll();
  updateActiveNavLink();
});

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

window.addEventListener('mousemove', (event) => {
  cursorGlow.style.transform = `translate(${event.clientX - 120}px, ${event.clientY - 120}px)`;
});

projectCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const ry = ((x / rect.width) - 0.5) * 14;
    const rx = (((y / rect.height) - 0.5) * -14);

    card.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
    card.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
  });

  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--ry', '0deg');
    card.style.setProperty('--rx', '0deg');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
