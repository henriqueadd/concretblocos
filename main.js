// Main Javascript file for Concret Blocos Clone

document.addEventListener('DOMContentLoaded', () => {
  // Add JS-enabled helper class to body for graceful reveal fallback
  document.body.classList.add('js-enabled');

  // Sticky Header scroll styling
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile navigation menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Active navigation link highlighting based on current URL
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || 
        (href === '/' && (currentPath === '' || currentPath === '/index.html')) ||
        (href && href !== '/' && currentPath.includes(href))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Dynamic Product Catalog Filter (runs on produtos.html)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.catalog-grid .product-card');
  
  if (filterBtns.length > 0 && productCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        productCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            // Subtle fade-in animation
            card.style.animation = 'fadeInUp 0.5s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Contact Form Submission Mocking
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Simulate loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Enviando...';
      
      setTimeout(() => {
        // Success feedback
        submitBtn.innerHTML = 'Mensagem Enviada!';
        submitBtn.style.backgroundColor = '#25D366';
        
        // Show success alert
        alert('Obrigado! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.');
        
        // Reset form
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
        }, 3000);
      }, 1500);
    });
  }

  // --- Reveal on Scroll Setup ---
  
  // 1. Auto-delay assignment for benefits cards in features-grid
  const revealGrids = document.querySelectorAll('.features-grid');
  revealGrids.forEach(grid => {
    const cards = grid.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
      card.classList.add('reveal', 'reveal-fade-up');
      card.style.transitionDelay = `${index * 0.15}s`;
    });
  });

  // 2. Assign reveal scale to the video wrapper on Home page
  const homeVideoWrapper = document.querySelector('#home-video-section .empresa-img');
  if (homeVideoWrapper) {
    homeVideoWrapper.classList.add('reveal', 'reveal-scale');
  }

  // 3. Initialize IntersectionObserver for all reveal items
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }
});
