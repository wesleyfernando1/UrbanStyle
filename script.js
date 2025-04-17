let quantidadeTotal = 0;

function adicionarAoCarrinho(produto) {
  const lista = document.getElementById("itens-carrinho");
  const item = document.createElement("li");
  item.textContent = produto;
  lista.appendChild(item);

  quantidadeTotal++;
  document.getElementById("quantidade").textContent = quantidadeTotal;
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
