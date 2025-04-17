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
  document.getElementById("quantidade").textContent = quantidadeTotal;
  document.getElementById("total").textContent = totalValor.toFixed(2);
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
