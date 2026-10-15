// ==================== INTERAÇÕES E MOVIMENTO ====================

const header = document.querySelector('.header');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const cursor = document.querySelector('.cursor');
const filters = [...document.querySelectorAll('.filter')];
const products = [...document.querySelectorAll('.product')];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGSAP = typeof window.gsap !== 'undefined';

const updateHeader = () => header.classList.toggle('scrolled', scrollY > 35);
updateHeader();
addEventListener('scroll', updateHeader, { passive: true });

// ==================== NAVEGAÇÃO MOBILE ====================

menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');

    if (hasGSAP && !reduceMotion && open) {
        gsap.fromTo(nav.querySelectorAll('a'), { opacity: 0, x: -16 }, {
            opacity: 1, x: 0, duration: .38, stagger: .055, ease: 'power2.out'
        });
    }
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
}));

// ==================== FILTRO DE PRODUTOS ====================

function selectCategory(category) {
    filters.forEach(button => button.classList.toggle('active', button.dataset.filter === category));

    products.forEach((product, index) => {
        const show = category === 'all' || product.dataset.category === category;

        if (show) {
            product.classList.remove('hidden');
            if (hasGSAP && !reduceMotion) {
                gsap.killTweensOf(product);
                gsap.fromTo(product, { autoAlpha: 0, y: 28, scale: .96 }, {
                    autoAlpha: 1, y: 0, scale: 1, duration: .55,
                    delay: index * .035, ease: 'back.out(1.35)'
                });
            }
        } else {
            product.classList.add('hidden');
        }
    });

    if (window.ScrollTrigger) ScrollTrigger.refresh();
}

filters.forEach(button => button.addEventListener('click', () => selectCategory(button.dataset.filter)));

document.querySelectorAll('.category').forEach(card => card.addEventListener('click', () => {
    selectCategory(card.dataset.target);
    document.querySelector('#produtos').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
}));

// Mantém a página funcional se a biblioteca externa não carregar.
if (!hasGSAP || reduceMotion) {
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
}

// ==================== GSAP ====================

if (hasGSAP && !reduceMotion) {
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('gsap-ready');
    gsap.set('.reveal', { opacity: 1, y: 0 });

    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTimeline
        .from('.header__inner', { y: -70, opacity: 0, duration: .9 })
        .from('.hero__copy > *', { y: 38, opacity: 0, duration: .85, stagger: .11 }, '-=.5')
        .from('.hero__halo', { scale: .55, opacity: 0, duration: 1.25, ease: 'expo.out' }, '-=.9')
        .from('.hero-card--back', { x: 90, y: -40, rotation: 18, scale: .72, opacity: 0, duration: 1 }, '-=.95')
        .from('.hero-card--main', { y: 85, rotation: -14, scale: .72, opacity: 0, duration: 1.1 }, '-=.82')
        .from('.hero-card--front', { x: 80, y: 80, rotation: 17, scale: .68, opacity: 0, duration: .95 }, '-=.78')
        .from('.floating-label', { scale: .4, opacity: 0, stagger: .12, duration: .65, ease: 'back.out(2)' }, '-=.45')
        .from('.scroll-cue', { y: -12, opacity: 0, duration: .6 }, '-=.3');

    gsap.to('.hero__halo', { scale: 1.055, opacity: .78, duration: 3.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.hero-card--main', { y: -14, duration: 3.3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.hero-card--back', { y: 12, duration: 4.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.hero-card--front', { y: -10, duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.floating-label--one', { y: -10, rotation: -5, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.floating-label--two', { y: 9, rotation: 2, duration: 3.1, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    gsap.utils.toArray('.section-heading, .showcase__header').forEach(heading => {
        gsap.from(heading.children, {
            scrollTrigger: { trigger: heading, start: 'top 82%', once: true },
            y: 46, opacity: 0, duration: .8, stagger: .1, ease: 'power3.out'
        });
    });

    gsap.from('.category', {
        scrollTrigger: { trigger: '.category-grid', start: 'top 78%', once: true },
        y: 85, opacity: 0,
        rotation: index => index % 2 ? 2.5 : -2.5,
        duration: .9, stagger: .13, ease: 'power3.out'
    });

    document.querySelectorAll('.category img').forEach(image => {
        gsap.fromTo(image, { yPercent: 8 }, {
            yPercent: -8, ease: 'none',
            scrollTrigger: {
                trigger: image.closest('.category'), start: 'top bottom', end: 'bottom top', scrub: 1.2
            }
        });
    });

    gsap.from('.product', {
        scrollTrigger: { trigger: '.products', start: 'top 82%', once: true },
        y: 60, opacity: 0, scale: .96, duration: .75,
        stagger: { each: .055, from: 'start' }, ease: 'power3.out'
    });

    gsap.from('.review', {
        scrollTrigger: { trigger: '.reviews', start: 'top 80%', once: true },
        x: index => index % 2 ? 45 : -45,
        y: 25, opacity: 0,
        rotation: index => index % 2 ? 1.5 : -1.5,
        duration: .85, stagger: .1, ease: 'power3.out'
    });

    gsap.from('.step', {
        scrollTrigger: { trigger: '.steps', start: 'top 82%', once: true },
        y: 65, opacity: 0, scale: .88, duration: .75,
        stagger: .11, ease: 'back.out(1.45)'
    });

    gsap.from('.step > span', {
        scrollTrigger: { trigger: '.steps', start: 'top 76%', once: true },
        rotation: -45, scale: 0, duration: .65, stagger: .11, ease: 'back.out(2)'
    });

    gsap.from('.contact__inner > *', {
        scrollTrigger: { trigger: '.contact', start: 'top 72%', once: true },
        x: -55, opacity: 0, duration: .85, stagger: .1, ease: 'power3.out'
    });

    gsap.fromTo('.contact__product', { yPercent: 12, rotation: 13 }, {
        yPercent: -10, rotation: 5, ease: 'none',
        scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: 1.3 }
    });

    gsap.from('.notice__inner, .footer__grid > *, .footer__bottom', {
        scrollTrigger: { trigger: '.notice', start: 'top 88%', once: true },
        y: 28, opacity: 0, duration: .7, stagger: .08, ease: 'power2.out'
    });

    document.querySelectorAll('.button, .filter, .product__button').forEach(element => {
        element.addEventListener('mouseenter', () => gsap.to(element, { scale: 1.035, duration: .25, ease: 'power2.out' }));
        element.addEventListener('mouseleave', () => gsap.to(element, { scale: 1, duration: .35, ease: 'elastic.out(1, .45)' }));
    });
}

// ==================== CURSOR E PROFUNDIDADE ====================

if (matchMedia('(pointer:fine)').matches) {
    if (hasGSAP && !reduceMotion) {
        const cursorX = gsap.quickTo(cursor, 'x', { duration: .22, ease: 'power3.out' });
        const cursorY = gsap.quickTo(cursor, 'y', { duration: .22, ease: 'power3.out' });
        addEventListener('mousemove', event => {
            cursorX(event.clientX);
            cursorY(event.clientY);
        });
    } else {
        addEventListener('mousemove', event => {
            cursor.style.left = `${event.clientX}px`;
            cursor.style.top = `${event.clientY}px`;
        });
    }

    document.querySelectorAll('a, button, .category, .product').forEach(element => {
        element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    const visual = document.querySelector('.hero__visual');
    visual.addEventListener('mousemove', event => {
        const rect = visual.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;

        visual.querySelectorAll('.hero-card').forEach(card => {
            const depth = Number(card.dataset.depth || 0);
            if (hasGSAP && !reduceMotion) {
                gsap.to(card, { x: x * depth, y: y * depth, duration: .7, ease: 'power3.out', overwrite: 'auto' });
            } else {
                card.style.marginLeft = `${x * depth}px`;
                card.style.marginTop = `${y * depth}px`;
            }
        });
    });

    visual.addEventListener('mouseleave', () => visual.querySelectorAll('.hero-card').forEach(card => {
        if (hasGSAP && !reduceMotion) {
            gsap.to(card, { x: 0, y: 0, duration: .9, ease: 'elastic.out(1, .45)' });
        } else {
            card.style.marginLeft = '0';
            card.style.marginTop = '0';
        }
    }));
}
