/**
* Template Name: MyResume - v4.7.0
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter (disabled - using Swiper instead)
   */
  // Commented out Isotope since we're using Swiper for horizontal scrolling
  // window.addEventListener('load', () => {
  //   let portfolioContainer = select('.portfolio-container');
  //   if (portfolioContainer && !portfolioContainer.closest('.swiper')) {
  //     let portfolioIsotope = new Isotope(portfolioContainer, {
  //       itemSelector: '.portfolio-item'
  //     });

  //     let portfolioFilters = select('#portfolio-flters li', true);

  //     on('click', '#portfolio-flters li', function(e) {
  //       e.preventDefault();
  //       portfolioFilters.forEach(function(el) {
  //         el.classList.remove('filter-active');
  //       });
  //       this.classList.add('filter-active');

  //       portfolioIsotope.arrange({
  //         filter: this.getAttribute('data-filter')
  //       });
  //       portfolioIsotope.on('arrangeComplete', function() {
  //         AOS.refresh()
  //       });
  //     }, true);
  //   }
  // });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Portfolio slider
   */
  window.addEventListener('load', () => {
    const portfolioSlider = select('.portfolio-slider');
    if (portfolioSlider) {
      // Wait a bit for DOM to be fully ready and AOS to initialize
      setTimeout(() => {
        const paginationEl = portfolioSlider.querySelector('.swiper-pagination');
        const nextEl = portfolioSlider.querySelector('.swiper-button-next');
        const prevEl = portfolioSlider.querySelector('.swiper-button-prev');
        const portfolioSwiper = new Swiper('.portfolio-slider', {
          speed: 600,
          loop: false,
          slidesPerView: 'auto',
          spaceBetween: 40,
          freeMode: true,
          grabCursor: true,
          watchOverflow: true,
          watchSlidesProgress: true,
          observer: true,
          observeParents: true,
          autoplay: {
            delay: 30000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          },
          navigation: {
            nextEl: nextEl,
            prevEl: prevEl,
          },
          pagination: paginationEl ? {
            el: paginationEl,
            type: 'bullets',
            clickable: true
          } : false,
          breakpoints: {
            320: {
              slidesPerView: 'auto',
              spaceBetween: 20
            },
            576: {
              slidesPerView: 'auto',
              spaceBetween: 25
            },
            768: {
              slidesPerView: 'auto',
              spaceBetween: 30
            },
            992: {
              slidesPerView: 'auto',
              spaceBetween: 40
            }
          }
        });
        
        // Update Swiper after initialization and images load
        setTimeout(() => {
          if (portfolioSwiper) {
            portfolioSwiper.update();
            portfolioSwiper.updateSlides();
            portfolioSwiper.updateSlidesClasses();
            portfolioSwiper.updateSize();
          }
        }, 300);
        
        // Truncate portfolio description text by words
        const portfolioItems = portfolioSlider.querySelectorAll('.portfolio-info p');
        portfolioItems.forEach(item => {
          const originalText = item.textContent.trim();
          const words = originalText.split(' ');
          
          // Show only 8 words initially (not hovered)
          const initialWords = 8;
          // Show 15 words on hover (truncated)
          const hoverWords = 15;
          
          if (words.length > initialWords) {
            item.setAttribute('data-full-text', originalText);
            const truncatedText = words.slice(0, initialWords).join(' ') + '...';
            item.textContent = truncatedText;
            item.classList.add('truncated');
            
            // Show more words (but still truncated) on hover
            const portfolioWrap = item.closest('.portfolio-wrap');
            if (portfolioWrap) {
              portfolioWrap.addEventListener('mouseenter', function() {
                if (words.length > hoverWords) {
                  const hoverText = words.slice(0, hoverWords).join(' ') + '...';
                  item.textContent = hoverText;
                } else {
                  item.textContent = originalText;
                }
                item.classList.remove('truncated');
              });
              
              portfolioWrap.addEventListener('mouseleave', function() {
                item.textContent = words.slice(0, initialWords).join(' ') + '...';
                item.classList.add('truncated');
              });
            }
          }
        });
      }, 200);
    }
  });

  /**
   * Portfolio Modal
   */
  const portfolioModal = select('#portfolioModal');
  const portfolioModalClose = select('.portfolio-modal-close');
  const portfolioModalTitle = select('#portfolioModalTitle');
  const portfolioModalDescription = select('#portfolioModalDescription');
  const portfolioModalImages = select('#portfolioModalImages');
  let portfolioModalSwiper = null;

  // Open modal function
  const openPortfolioModal = (title, description, images) => {
    portfolioModalTitle.textContent = title;
    portfolioModalDescription.textContent = description;
    
    // Clear previous images
    portfolioModalImages.innerHTML = '';
    
    // Destroy existing Swiper if it exists
    if (portfolioModalSwiper) {
      portfolioModalSwiper.destroy(true, true);
      portfolioModalSwiper = null;
    }
    
    // Add images as Swiper slides
    if (images && images.length > 0) {
      images.forEach((imageSrc, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'swiper-slide';
        const imgDiv = document.createElement('div');
        imgDiv.className = 'portfolio-modal-image-item';
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = title;
        img.className = 'img-fluid';
        imgDiv.appendChild(img);
        slideDiv.appendChild(imgDiv);
        portfolioModalImages.appendChild(slideDiv);
      });
    }
    
    // Initialize Swiper - always show slider regardless of image count
    portfolioModalSwiper = new Swiper('.portfolio-modal-slider', {
      speed: 400,
      loop: images && images.length > 1, // Only loop if more than one image
      autoplay: images && images.length > 1 ? {
        delay: 5000,
        disableOnInteraction: false
      } : false,
      pagination: {
        el: '.portfolio-modal-slider .swiper-pagination',
        type: 'bullets',
        clickable: true,
        dynamicBullets: images && images.length > 1
      },
      navigation: {
        nextEl: '.portfolio-modal-slider .swiper-button-next',
        prevEl: '.portfolio-modal-slider .swiper-button-prev',
      },
      spaceBetween: 20,
      slidesPerView: 1,
      centeredSlides: true,
      allowTouchMove: true // Allow swiping even with single image
    });
    
    portfolioModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Update Swiper after a short delay to ensure proper rendering
    setTimeout(() => {
      if (portfolioModalSwiper) {
        portfolioModalSwiper.update();
      }
    }, 100);
  };

  // Close modal function
  const closePortfolioModal = () => {
    // Destroy Swiper when closing
    if (portfolioModalSwiper) {
      portfolioModalSwiper.destroy(true, true);
      portfolioModalSwiper = null;
    }
    portfolioModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  };

  // Handle portfolio modal button clicks
  on('click', '.portfolio-modal-btn', function(e) {
    e.preventDefault();
    const title = this.getAttribute('data-title');
    const description = this.getAttribute('data-description');
    const imagesJson = this.getAttribute('data-images');
    let images = [];
    
    try {
      images = JSON.parse(imagesJson);
    } catch (e) {
      console.error('Error parsing images JSON:', e);
    }
    
    openPortfolioModal(title, description, images);
  }, true);

  // Close modal when clicking the close button
  if (portfolioModalClose) {
    portfolioModalClose.addEventListener('click', closePortfolioModal);
  }

  // Close modal when clicking outside the modal content
  window.addEventListener('click', (e) => {
    if (e.target === portfolioModal) {
      closePortfolioModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && portfolioModal.style.display === 'block') {
      closePortfolioModal();
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });
})()
