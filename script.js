  // nav scroll state
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // hide hero fallback illustration once user drops an image
  const heroSlot = document.querySelector('image-slot#hero-visual');
  const heroIllu = document.querySelector('.hero-illustration');
  if(heroSlot && heroIllu){
    const sync = () => {
      const filled = !!heroSlot.getAttribute('src') || heroSlot.hasAttribute('filled');
      heroIllu.style.opacity = filled ? '0' : '1';
    };
    new MutationObserver(sync).observe(heroSlot, {attributes:true});
    sync();
  }

  // mobile menu toggle
  const navToggle = document.getElementById('navToggle');
  const closeMenu = () => {
    nav.classList.remove('menu-open');
    if(navToggle) navToggle.setAttribute('aria-expanded', 'false');
  };
  if(navToggle){
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('menu-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // smooth scroll for in-page nav
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      if(!id) return;
      const el = document.getElementById(id);
      if(el){
        e.preventDefault();
        closeMenu();
        window.scrollTo({top: el.offsetTop - 60, behavior:'smooth'});
      }
    });
  });
