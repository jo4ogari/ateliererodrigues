const catalog = {
    'biscuit-01': {
        name: 'Vela de biscuit personalizada — Country',
        category: 'Biscuit',
        image: 'BIS1.png',
        description: 'Personagem e idade feitos para combinar com a festa.'
    },
    'biscuit-02': {
        name: 'Vela de biscuit personalizada — Aniversário',
        category: 'Biscuit',
        image: 'BIS2.png',
        description: 'Modelagem delicada com nome, idade e tema à escolha.'
    },
    'biscuit-03': {
        name: 'Vela de biscuit personalizada',
        category: 'Velas',
        image: 'BIS3.png',
        description: 'Um detalhe exclusivo para deixar o parabéns mais especial.'
    },
    'biscuit-04': {
        name: 'Vela de biscuit feita à mão',
        category: 'Biscuit',
        image: 'BIS4.png',
        description: 'Cores e detalhes modelados com cuidado em cada peça.'
    },
    'impressao-01': {
        name: 'Organizador de tintas',
        category: 'Impressão 3D',
        image: 'impre1.png',
        description: 'Praticidade sob medida para manter materiais à mão.'
    },
    'impressao-02': {
        name: 'Utilitário personalizado',
        category: 'Impressão 3D',
        image: 'impre2.png',
        description: 'Projeto funcional feito para a sua necessidade.'
    },
    'laser-01': {
        name: 'Lembrancinha',
        category: 'Laser',
        image: 'LASER1.png',
        description: 'Corte preciso e acabamento cuidadoso feito com carinho.'
    },
    'laser-02': {
        name: 'Memória em madeira',
        category: 'Laser',
        image: 'LASER2.png',
        description: 'Uma lembrança afetiva criada para durar.'
    },
    'laser-03': {
        name: 'Peça decorativa',
        category: 'Laser',
        image: 'LASER3.png',
        description: 'Desenhos personalizados com recorte elegante.'
    },
    'laser-04': {
        name: 'Gravação especial',
        category: 'Laser',
        image: 'LASER4.png',
        description: 'Nomes e mensagens para tornar a peça só sua.'
    },
    'religioso-01': {
        name: 'Santa Teresinha',
        category: 'Artigos Religiosos',
        image: 'RELI1.png',
        description: 'Personalizado com nome para celebrar proteção.'
    },
    'religioso-02': {
        name: 'Nossa Senhora',
        category: 'Artigos Religiosos',
        image: 'RELI2.png',
        description: 'Uma presença delicada no cantinho de oração.'
    },
    'religioso-03': {
        name: 'Nossa Senhora de Fátima',
        category: 'Artigos Religiosos',
        image: 'RELI3.png',
        description: 'Delicadeza, fé e significado em uma só peça.'
    },
    'religioso-04': {
        name: 'Ore e Confie com Jesus',
        category: 'Artigos Religiosos',
        image: 'RELI4.png',
        description: 'Quadro de decoração para transmitir fé, esperança e confiança.'
    }
};

const productId = new URLSearchParams(window.location.search).get('produto');
const product = catalog[productId];

if (!product) {
    window.location.replace('index.html#produtos');
} else {
    const image = document.querySelector('#product-image');
    const quantity = document.querySelector('#quantity');
    const details = document.querySelector('#details');
    const buyButton = document.querySelector('#whatsapp-buy');

    document.title = `${product.name} | Atelie Rerodrigues`;
    image.src = product.image;
    image.alt = product.name;
    document.querySelector('#product-category').textContent = product.category;
    document.querySelector('#product-name').textContent = product.name;
    document.querySelector('#product-description').textContent = product.description;
    document.querySelector('#summary-product').textContent = product.name;

    function normalizedQuantity() {
        const value = Math.min(99, Math.max(1, Number.parseInt(quantity.value, 10) || 1));
        quantity.value = value;
        return value;
    }

    function updateOrder() {
        const amount = normalizedQuantity();
        const note = details.value.trim();
        const message = [
            'Olá! Gostaria de fazer um pedido pelo site.',
            '',
            `Produto: ${product.name}`,
            `Quantidade: ${amount}`,
            note ? `Personalização: ${note}` : 'Personalização: quero combinar os detalhes',
            '',
            'Pode me informar o valor e o prazo?'
        ].join('\n');

        document.querySelector('#summary-quantity').textContent = amount;
        buyButton.href = `https://wa.me/5516993959095?text=${encodeURIComponent(message)}`;
    }

    document.querySelector('#quantity-minus').addEventListener('click', () => {
        quantity.value = normalizedQuantity() - 1;
        updateOrder();
    });

    document.querySelector('#quantity-plus').addEventListener('click', () => {
        quantity.value = normalizedQuantity() + 1;
        updateOrder();
    });

    quantity.addEventListener('input', updateOrder);
    details.addEventListener('input', updateOrder);
    updateOrder();
}
