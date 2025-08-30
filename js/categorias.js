const precoRange = document.getElementById('precoRange');
const precoValor = document.getElementById('precoValor');
const produtosGrid = document.getElementById('produtosGrid');

if (precoRange && precoValor) {
  precoRange.addEventListener('input', function() {
    precoValor.textContent = `Até R$ ${this.value}`;
    filtrarProdutos();
  });
}

const filtros = document.querySelectorAll('input[type="checkbox"]');
filtros.forEach(filtro => {
  filtro.addEventListener('change', filtrarProdutos);
});

function filtrarProdutos() {
  const precoMax = precoRange ? parseInt(precoRange.value) : 500;
  const tipos = Array.from(document.querySelectorAll('input[type="checkbox"][id$="Check"]:checked')).map(cb => cb.value);


  const cards = document.querySelectorAll('.row-cols-1.row-cols-md-3.g-4 .col');
  cards.forEach(card => {
    const preco = parseFloat(card.querySelector('.fw-bold').textContent.replace('R$', '').replace('.', '').replace(',', '.'));
    const titulo = card.querySelector('.card-title').textContent.toLowerCase();
    let tipo = '';
    if (
      titulo.includes('fone') || titulo.includes('carregador') || titulo.includes('luminária') ||
      titulo.includes('relógio') || titulo.includes('teclado') || titulo.includes('mouse') ||
      titulo.includes('powerbank') || titulo.includes('caixa') || titulo.includes('lâmpada') ||
      titulo.includes('câmera') || titulo.includes('painel')
    ) {
      tipo = 'tecnologia';
    } else {
      tipo = 'casa';
    }
    const tipoOk = tipos.length === 0 || tipos.includes(tipo);
    const precoOk = preco <= precoMax;
    card.style.display = (tipoOk && precoOk) ? '' : 'none';
  });
}