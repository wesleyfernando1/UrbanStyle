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

function calcularTotal() {
  return carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
}

function finalizarCompra() {
  // Limpa o carrinho
  carrinho = [];
  atualizarCarrinho();

  // Salva no localStorage para mostrar no agradecimento se quiser
  localStorage.setItem('compraFinalizada', 'true');

  // Redireciona para a página de agradecimento
  window.location.href = 'agradecimento.html';
}

  const confirmacao = confirm(`Você deseja finalizar a compra com total de R$ ${calcularTotal().toFixed(2)}?`);
  if (confirmacao) {
    alert("Compra finalizada com sucesso! Obrigado pela preferência 😊");
    carrinho = [];
    atualizarCarrinho();
  }
}

function filtrarProdutos(categoria) {
  const produtos = document.querySelectorAll(".produto");
  
  produtos.forEach(produto => {
    if (categoria === 'todos' || produto.classList.contains(categoria)) {
      produto.style.display = "block";
    } else {
      produto.style.display = "none";
    }
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
