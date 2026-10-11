// ==========================================
// 🚨 1. COLOQUE SEU NÚMERO DE WHATSAPP AQUI 🚨
// ==========================================
// Coloque o código do Brasil (55) + DDD + Seu Número
// Exemplo: "5584999999999" (Tudo junto, sem espaços ou traços)
const SEU_WHATSAPP = "5584000000000"; 


// ==========================================
// 🚨 2. ADICIONE OU REMOVA SEUS PRODUTOS AQUI 🚨
// ==========================================
// Para adicionar um novo produto, basta copiar uma linha, mudar o ID (para não repetir)
// e preencher o nome, preço e o link da foto do produto.
const produtos = [
    { 
        id: 1, 
        nome: "Botton Personalizado 32mm", 
        preco: 3.50,
        imagem: "link_da_foto_do_botton_32mm.jpg" 
    },
    { 
        id: 2, 
        nome: "Botton Holográfico 58mm", 
        preco: 5.00,
        imagem: "link_da_foto_do_botton_58mm.jpg" 
    },
    { 
        id: 3, 
        nome: "Botton Transparente 58mm", 
        preco: 4.50,
        imagem: "link_da_foto_do_botton_transparente.jpg" 
    },
    { 
        id: 4, 
        nome: "Chaveiro Hama Beads", 
        preco: 12.00,
        imagem: "link_da_foto_do_hama_beads.jpg" 
    },
    // Quer adicionar mais um? É só colocar uma vírgula no de cima e adicionar embaixo, assim:
    // { id: 5, nome: "Nome do Produto", preco: 10.00, imagem: "link_da_foto.jpg" }
];


// ==========================================
// DAQUI PARA BAIXO É A LÓGICA DO SITE (NÃO PRECISA MEXER)
// ==========================================

let carrinho = [];

function renderizarProdutos() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${produto.imagem}" alt="${produto.nome}" onerror="this.style.display='none'; this.parentNode.innerHTML='[Foto: ${produto.nome}]'">
            </div>
            <h3 class="product-title">${produto.nome}</h3>
            <p class="product-price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
            <div class="card-buttons">
                <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
                <button class="btn-buy-now" onclick="comprarApenasEste(${produto.id})">Comprar Só Este</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function adicionarAoCarrinho(idProduto) {
    const produto = produtos.find(p => p.id === idProduto);
    const itemNoCarrinho = carrinho.find(item => item.id === idProduto);
    if (itemNoCarrinho) {
        itemNoCarrinho.quantidade += 1;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }
    atualizarCarrinho();
}

function removerDoCarrinho(idProduto) {
    carrinho = carrinho.filter(item => item.id !== idProduto);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total-price');
    
    lista.innerHTML = '';
    let total = 0;

    if (carrinho.length === 0) {
        lista.innerHTML = '<li>Seu carrinho está vazio</li>';
    } else {
        carrinho.forEach(item => {
            const subtotal = item.preco * item.quantidade;
            total += subtotal;
            
            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <span>${item.quantidade}x ${item.nome}</span>
                <div>
                    <span>R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
                    <button class="remove-btn" onclick="removerDoCarrinho(${item.id})">X</button>
                </div>
            `;
            lista.appendChild(li);
        });
    }
    totalSpan.textContent = total.toFixed(2).replace('.', ',');
}

function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Adicione alguns produtos ao carrinho primeiro!");
        return;
    }
    let mensagem = "Olá! Gostaria de fazer o seguinte pedido na Craft da Kali:%0A%0A";
    let total = 0;
    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        mensagem += `${item.quantidade}x ${item.nome} - R$ ${subtotal.toFixed(2).replace('.', ',')}%0A`;
    });
    mensagem += `%0A*Total: R$ ${total.toFixed(2).replace('.', ',')}*%0A%0AComo faço para realizar o pagamento e combinar a entrega?`;
    abrirWhatsApp(mensagem);
}

function comprarApenasEste(idProduto) {
    const produto = produtos.find(p => p.id === idProduto);
    const mensagem = `Olá! Tenho interesse em comprar diretamente este produto:%0A%0A- ${produto.nome} (R$ ${produto.preco.toFixed(2).replace('.', ',')})%0A%0AComo faço para finalizar a compra?`;
    abrirWhatsApp(mensagem);
}

function contatoWhatsApp(tipo) {
    let mensagem = "";
    if (tipo === 'duvida') {
        mensagem = "Olá! Acessei o catálogo e tenho uma dúvida, poderia me ajudar?";
    } else if (tipo === 'personalizado') {
        mensagem = "Olá! Gostaria de encomendar uma arte/produto personalizado com vocês. Como funciona o processo?";
    }
    abrirWhatsApp(mensagem);
}

function abrirWhatsApp(textoMensagem) {
    const linkWhatsapp = `https://wa.me/${SEU_WHATSAPP}?text=${textoMensagem}`;
    window.open(linkWhatsapp, '_blank');
}

renderizarProdutos();
atualizarCarrinho();
