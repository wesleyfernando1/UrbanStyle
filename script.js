function adicionarAoCarrinho(produto) {
  const lista = document.getElementById("itens-carrinho");
  const item = document.createElement("li");
  item.textContent = produto;
  lista.appendChild(item);
}
