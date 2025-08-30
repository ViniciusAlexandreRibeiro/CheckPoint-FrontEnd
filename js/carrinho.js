document.addEventListener('DOMContentLoaded', function() {

  function getCarrinho() {
    return JSON.parse(localStorage.getItem('carrinho')) || [];
  }
  function setCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }
  function calcularTotal(carrinho) {
    return carrinho.reduce((acc, item) => acc + (item.preco * item.qtd), 0);
  }

  function renderizarCarrinho() {
    const carrinho = getCarrinho();
    const tbody = document.querySelector('table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    carrinho.forEach((item, idx) => {
      const tr = document.createElement('tr');
      const totalItem = item.preco * item.qtd;
      tr.innerHTML = `
        <td><img src="${item.img}" alt="${item.nome}" width="60" class="rounded me-2"> ${item.nome}</td>
        <td><input type="number" class="form-control w-50" value="${item.qtd}" min="1" readonly></td>
        <td>R$ ${item.preco.toFixed(2).replace('.', ',')}</td>
        <td>R$ ${totalItem.toFixed(2).replace('.', ',')}</td>
        <td><button class="btn btn-outline-danger btn-sm btn-remover" data-idx="${idx}"><i class="fa fa-trash"></i></button></td>
      `;
      tbody.appendChild(tr);
    });
    localStorage.setItem('cartCount', carrinho.length);
  const totalCell = document.getElementById('carrinho-total');
  if (totalCell) totalCell.textContent = `R$ ${calcularTotal(carrinho).toFixed(2).replace('.', ',')}`;
    addRemoveListeners();
    const cartBadge = document.getElementById('cartCount');
    if (cartBadge) {
      if (carrinho.length > 0) {
        cartBadge.style.display = 'inline-block';
        cartBadge.textContent = carrinho.length;
      } else {
        cartBadge.style.display = 'none';
      }
    }
  }

  function addRemoveListeners() {
    document.querySelectorAll('.btn-remover').forEach(btn => {
      btn.addEventListener('click', function() {
        const idx = parseInt(btn.getAttribute('data-idx'));
        let carrinho = getCarrinho();
        carrinho.splice(idx, 1);
        setCarrinho(carrinho);
        renderizarCarrinho();
      });
    });
  }

  const btnEsvaziar = document.getElementById('btnEsvaziar');
  if (btnEsvaziar) {
    btnEsvaziar.addEventListener('click', function() {
      setCarrinho([]);
      renderizarCarrinho();
    });
  }

  renderizarCarrinho();

  const btnContinuar = document.getElementById('btnContinuar');
  if (btnContinuar) {
    btnContinuar.addEventListener('click', function() {
      window.location.href = 'categorias.html';
    });
  }
});