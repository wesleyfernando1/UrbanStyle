let carrinho = [];

document.addEventListener('DOMContentLoaded', () => {
  const carrinhoSalvo = localStorage.getItem('carrinho');
  if (carrinhoSalvo) {
    carrinho = JSON.parse(carrinhoSalvo);
    atualizarCarrinho();
  }
});

function adicionarAoCarrinho(nome, preco) {
  const itemExistente = carrinho.find(item => item.nome === nome);
  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }
  atualizarCarrinho();
  exibirNotificacao(`${nome} adicionado ao carrinho!`);
}

function atualizarCarrinho() {
  const lista = document.getElementById('itens-carrinho');
  const totalSpan = document.getElementById('total');
  const quantidadeSpan = document.getElementById('quantidade');

  lista.innerHTML = '';
  let total = 0;
  let quantidadeTotal = 0;

  if (carrinho.length === 0) {
    lista.innerHTML = '<li>Seu carrinho está vazio.</li>';
  }

  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('item-animado');
    li.innerHTML = `
      ${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}
      <button onclick="aumentarQuantidade('${item.nome}')">+</button>
      <button onclick="diminuirQuantidade('${item.nome}')">-</button>
      <button class="remover" onclick="removerItem('${item.nome}')">x</button>
    `;
    lista.appendChild(li);

    total += item.preco * item.quantidade;
    quantidadeTotal += item.quantidade;
  });

  totalSpan.textContent = total.toFixed(2);
  quantidadeSpan.textContent = quantidadeTotal;

  const carrinhoDiv = document.getElementById('carrinho');
  carrinhoDiv.style.display = carrinho.length ? 'block' : 'none';

  localStorage.setItem('carrinho', JSON.stringify(carrinho));

  atualizarContadorCarrinho(); // Atualiza o botão flutuante também
}

function aumentarQuantidade(nome) {
  const item = carrinho.find(i => i.nome === nome);
  if (item) {
    item.quantidade++;
    atualizarCarrinho();
  }
}

function diminuirQuantidade(nome) {
  const item = carrinho.find(i => i.nome === nome);
  if (item && item.quantidade > 1) {
    item.quantidade--;
  } else {
    carrinho = carrinho.filter(i => i.nome !== nome);
  }
  atualizarCarrinho();
}

function removerItem(nome) {
  carrinho = carrinho.filter(i => i.nome !== nome);
  atualizarCarrinho();
}

function finalizarCompra() {
  if (carrinho.length === 0) return;

  carrinho = [];
  atualizarCarrinho();
  localStorage.removeItem('carrinho');

  const modal = document.getElementById('modal-confirmacao');
  modal.style.display = 'flex';

  setTimeout(() => {
    modal.style.display = 'none';
  }, 4000);
}

function fecharModal() {
  document.getElementById('modal-confirmacao').style.display = 'none';
}

function exibirNotificacao(mensagem) {
  const notificacao = document.getElementById('notificacao');
  notificacao.textContent = mensagem;
  notificacao.classList.add('ativa');

  setTimeout(() => {
    notificacao.classList.remove('ativa');
  }, 3000);
}

function rolarParaCarrinho() {
  const carrinhoSecao = document.getElementById('carrinho');
  if (carrinhoSecao) {
    carrinhoSecao.scrollIntoView({ behavior: 'smooth' });
  }
}


function atualizarContadorCarrinho() {
  const contador = document.getElementById('contador-carrinho');
  const quantidadeTotal = carrinho.reduce((total, item) => total + item.quantidade, 0);
  contador.textContent = quantidadeTotal;
}
