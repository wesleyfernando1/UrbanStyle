let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function adicionarAoCarrinho(nome, preco) {
  const itemExistente = carrinho.find(item => item.nome === nome);
  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarCarrinho();
  mostrarNotificacao(`${nome} adicionado ao carrinho`);
}

function removerDoCarrinho(nome) {
  carrinho = carrinho.filter(item => item.nome !== nome);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("itens-carrinho");
  lista.innerHTML = "";
  let total = 0;
  let quantidadeTotal = 0;

  carrinho.forEach(item => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.marginBottom = "12px";
    li.style.borderBottom = "1px solid #ccc";
    li.style.paddingBottom = "8px";

    // Miniatura da imagem (simples – personalizável)
    const img = document.createElement("img");
    img.src = obterImagemProduto(item.nome); // função abaixo
    img.alt = item.nome;
    img.style.width = "50px";
    img.style.marginRight = "10px";
    img.style.borderRadius = "6px";

    const info = document.createElement("div");
    info.innerHTML = `
      <strong>${item.nome}</strong><br>
      Quantidade: ${item.quantidade}<br>
      Total: R$ ${(item.preco * item.quantidade).toFixed(2)}
    `;

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "🗑️";
    botaoRemover.style.marginLeft = "auto";
    botaoRemover.style.background = "#c0392b";
    botaoRemover.style.color = "white";
    botaoRemover.style.border = "none";
    botaoRemover.style.padding = "8px 12px";
    botaoRemover.style.borderRadius = "6px";
    botaoRemover.style.cursor = "pointer";
    botaoRemover.onclick = () => removerDoCarrinho(item.nome);

    li.appendChild(img);
    li.appendChild(info);
    li.appendChild(botaoRemover);
    lista.appendChild(li);

    total += item.preco * item.quantidade;
    quantidadeTotal += item.quantidade;
  });

  document.getElementById("total").textContent = total.toFixed(2);
  document.getElementById("quantidade").textContent = quantidadeTotal;
  document.getElementById("contador-carrinho").textContent = quantidadeTotal;
}

function obterImagemProduto(nome) {
  if (nome.includes("Branca")) return "img/camiseta1.jpg";
  if (nome.includes("Oversized")) return "img/camiseta1.jpg";
  if (nome.includes("Preta")) return "img/camiseta1.jpg";
  // Adicione mais casos conforme seus produtos
  return "img/placeholder.jpg";
}

function finalizarCompra() {
  if (carrinho.length === 0) return;
  carrinho = [];
  localStorage.removeItem("carrinho");
  atualizarCarrinho();
  abrirModal();
}

document.addEventListener("DOMContentLoaded", atualizarCarrinho);
