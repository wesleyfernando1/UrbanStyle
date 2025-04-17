let quantidadeTotal = 0;
let totalValor = 0;

const precos = {
  'Camisa Branca': 79.9,
  'Calça Jeans': 129.9,
  'Vestido Floral': 149.9,
  'Blusa Rosa': 69.9,
};

function adicionarAoCarrinho(produto) {
  const lista = document.getElementById("itens-carrinho");
  const item = document.createElement("li");

  item.classList.add("item-animado"); // <-- animação

  item.innerHTML = `
    ${produto} - R$ ${precos[produto].toFixed(2)}
    <button class="remover" onclick="removerItem(this, ${precos[produto]})">Remover</button>
  `;

  lista.appendChild(item);

  quantidadeTotal++;
  totalValor += precos[produto];
  atualizarCarrinho();
}

function removerItem(botao, preco) {
  botao.parentElement.remove();
  quantidadeTotal--;
  totalValor -= preco;
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("itens-carrinho");
  const total = document.getElementById("total");
  const carrinhoDiv = document.getElementById("carrinho");

  lista.innerHTML = "";

  let totalValor = 0;
  carrinho.forEach(item => {
    totalValor += item.preco * item.quantidade;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}
      <button onclick="mudarQuantidade('${item.nome}', 1)">+</button>
      <button onclick="mudarQuantidade('${item.nome}', -1)">-</button>
      <button onclick="removerItem('${item.nome}')">Remover</button>
    `;
    lista.appendChild(li);
  });

  total.textContent = totalValor.toFixed(2);

  // só mostra o carrinho se tiver item
  if (carrinho.length > 0) {
    carrinhoDiv.style.display = "block";
  } else {
    carrinhoDiv.style.display = "none";
  }
}


function filtrarProdutos(categoria) {
  const produtos = document.querySelectorAll('.produto');

  produtos.forEach(produto => {
    if (categoria === 'todos' || produto.classList.contains(categoria)) {
      produto.style.display = 'block';
    } else {
      produto.style.display = 'none';
    }
  });
}
function alternarModo() {
  document.body.classList.toggle('escuro');

  const botao = document.getElementById("modo-escuro");
  if (document.body.classList.contains('escuro')) {
    botao.textContent = '☀️ Modo Claro';
  } else {
    botao.textContent = '🌙 Modo Escuro';
  }
}
function finalizarCompra() {
  if (quantidadeTotal === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const confirmacao = confirm(`Você deseja finalizar a compra com total de R$ ${totalValor.toFixed(2)}?`);
  
  if (confirmacao) {
    alert("Compra finalizada com sucesso! Obrigado pela preferência 😊");

    // Limpa carrinho
    document.getElementById("itens-carrinho").innerHTML = "";
    quantidadeTotal = 0;
    totalValor = 0;
    atualizarCarrinho();
  }
}
function filtrarProdutos(categoria) {
  const produtos = document.querySelectorAll(".produto");
  
  produtos.forEach(produto => {
    if (categoria === 'todos') {
      produto.style.display = "block";
    } else {
      produto.style.display = produto.classList.contains(categoria) ? "block" : "none";
    }
  });
}
let carrinho = [];

function adicionarAoCarrinho(nome, preco) {
  const itemExistente = carrinho.find(item => item.nome === nome);
  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }
  atualizarCarrinho();
}

function removerItem(nome) {
  carrinho = carrinho.filter(item => item.nome !== nome);
  atualizarCarrinho();
}

function mudarQuantidade(nome, delta) {
  const item = carrinho.find(item => item.nome === nome);
  if (item) {
    item.quantidade += delta;
    if (item.quantidade <= 0) removerItem(nome);
  }
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("itens-carrinho");
  const total = document.getElementById("total");
  const carrinhoDiv = document.getElementById("carrinho");

  lista.innerHTML = "";

  let totalValor = 0;
  carrinho.forEach(item => {
    totalValor += item.preco * item.quantidade;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}
      <button onclick="mudarQuantidade('${item.nome}', 1)">+</button>
      <button onclick="mudarQuantidade('${item.nome}', -1)">-</button>
      <button onclick="removerItem('${item.nome}')">Remover</button>
    `;
    lista.appendChild(li);
  });

  total.textContent = totalValor.toFixed(2);
  carrinhoDiv.style.display = carrinho.length > 0 ? "block" : "none";
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  const confirmacao = confirm(`Você deseja finalizar a compra com total de R$ ${calcularTotal().toFixed(2)}?`);
  if (confirmacao) {
    alert("Compra finalizada com sucesso! Obrigado pela preferência 😊");
    carrinho = [];
    atualizarCarrinho();
  }
}

function calcularTotal() {
  return carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
}

function filtrarProdutos(categoria) {
  const produtos = document.querySelectorAll(".produto");
  produtos.forEach(produto => {
    produto.style.display = categoria === 'todos' || produto.classList.contains(categoria)
      ? "block"
      : "none";
  });
}

function alternarModo() {
  document.body.classList.toggle('escuro');
  const botao = document.getElementById("modo-escuro");
  botao.textContent = document.body.classList.contains('escuro')
    ? '☀️ Modo Claro'
    : '🌙 Modo Escuro';
}

function fecharModal() {
  document.getElementById("modal-confirmacao").style.display = "none";
}
