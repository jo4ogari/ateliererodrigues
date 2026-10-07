// ==================== SCRIPT.JS ====================


// ==================== 01. ELEMENTOS PRINCIPAIS ====================

const header = document.querySelector('.header');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const cursor = document.querySelector('.cursor');


// ==================== 02. HEADER AO ROLAR A PÁGINA ====================

const updateHeader = () =>
    header.classList.toggle('scrolled', scrollY > 35);

updateHeader();

addEventListener(
    'scroll',
    updateHeader,
    { passive: true }
);


// ==================== 03. MENU MOBILE ====================

menu.addEventListener('click', () => {

    const open = nav.classList.toggle('open');

    menu.setAttribute(
        'aria-expanded',
        String(open)
    );

    menu.setAttribute(
        'aria-label',
        open ? 'Fechar menu' : 'Abrir menu'
    );

});


// FECHA O MENU AO CLICAR EM UM LINK

nav.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {

        nav.classList.remove('open');

        menu.setAttribute(
            'aria-expanded',
            'false'
        );

    })
);


// ==================== 04. ANIMAÇÃO AO APARECER NA TELA ====================

const observer = new IntersectionObserver(
    entries =>
        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('visible');

                observer.unobserve(
                    entry.target
                );

            }

        }),
    {
        threshold: .12
    }
);


// APLICA O EFEITO NOS ELEMENTOS .REVEAL

document
    .querySelectorAll('.reveal:not(.visible)')
    .forEach((el, index) => {

        el.style.transitionDelay =
            `${Math.min(index % 4, 3) * 70}ms`;

        observer.observe(el);

    });


// ==================== 05. FILTRO DOS PRODUTOS ====================

const filters = [
    ...document.querySelectorAll('.filter')
];

const products = [
    ...document.querySelectorAll('.product')
];


function selectCategory(category) {

    // DEFINE QUAL BOTÃO ESTÁ ATIVO

    filters.forEach(button =>
        button.classList.toggle(
            'active',
            button.dataset.filter === category
        )
    );


    // MOSTRA OU ESCONDE OS PRODUTOS

    products.forEach((product, index) => {

        const show =
            category === 'all' ||
            product.dataset.category === category;

        product.classList.toggle(
            'hidden',
            !show
        );


        // ANIMA O PRODUTO QUANDO ELE APARECE

        if (show) {

            product.animate(
                [
                    {
                        opacity: 0,
                        transform: 'translateY(18px)'
                    },

                    {
                        opacity: 1,
                        transform: 'translateY(0)'
                    }
                ],
                {
                    duration: 380,
                    delay: index * 25,
                    easing: 'ease-out'
                }
            );

        }

    });

}


// ==================== 06. BOTÕES DOS FILTROS ====================

filters.forEach(button =>
    button.addEventListener(
        'click',
        () =>
            selectCategory(
                button.dataset.filter
            )
    )
);


// ==================== 07. CARDS DAS CATEGORIAS ====================

document
    .querySelectorAll('.category')
    .forEach(card =>
        card.addEventListener('click', () => {

            selectCategory(
                card.dataset.target
            );

            document
                .querySelector('#produtos')
                .scrollIntoView({
                    behavior: 'smooth'
                });

        })
    );


// ==================== 08. CURSOR PERSONALIZADO ====================

if (matchMedia('(pointer:fine)').matches) {

    // FAZ O CURSOR ACOMPANHAR O MOUSE

    addEventListener('mousemove', event => {

        cursor.style.left =
            `${event.clientX}px`;

        cursor.style.top =
            `${event.clientY}px`;

    });


    // EFEITO DO CURSOR EM ELEMENTOS CLICÁVEIS

    document
        .querySelectorAll(
            'a,button,.category,.product'
        )
        .forEach(el => {

            el.addEventListener(
                'mouseenter',
                () =>
                    cursor.classList.add('hover')
            );

            el.addEventListener(
                'mouseleave',
                () =>
                    cursor.classList.remove('hover')
            );

        });


    // ==================== 09. EFEITO DE PROFUNDIDADE DO HERO ====================

    const visual =
        document.querySelector('.hero__visual');


    visual.addEventListener(
        'mousemove',
        event => {

            const rect =
                visual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                .5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                .5;


            visual
                .querySelectorAll('.hero-card')
                .forEach(card => {

                    const depth =
                        Number(
                            card.dataset.depth || 0
                        );

                    card.style.marginLeft =
                        `${x * depth}px`;

                    card.style.marginTop =
                        `${y * depth}px`;

                });

        }
    );


    // RETORNA OS CARDS PARA A POSIÇÃO ORIGINAL

    visual.addEventListener(
        'mouseleave',
        () =>
            visual
                .querySelectorAll('.hero-card')
                .forEach(card => {

                    card.style.marginLeft = '0';
                    card.style.marginTop = '0';

                })
    );

}