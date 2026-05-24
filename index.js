const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }

  });

}, {
  threshold: 0.1
});

const fadeElements = document.querySelectorAll('.fade-in');

fadeElements.forEach((el) => {
  observer.observe(el);
});
