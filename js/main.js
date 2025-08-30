let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
const cartIcon = document.getElementById('cartIcon');
const cartBadge = document.getElementById('cartCount');

function updateCartBadge() {
	if (!cartBadge) return;
	if (cartCount > 0) {
		cartBadge.style.display = 'inline-block';
		cartBadge.textContent = cartCount;
	} else {
		cartBadge.style.display = 'none';
	}
}

function animateCart() {
	updateCartBadge();
	cartBadge.classList.add('animate__animated', 'animate__tada');
	setTimeout(() => {
		cartBadge.classList.remove('animate__animated', 'animate__tada');
	}, 700);
}

updateCartBadge();

document.querySelectorAll('.btn-add-cart').forEach(btn => {
	btn.addEventListener('click', function() {
		const card = btn.closest('.card');
		const nome = card.querySelector('.card-title').textContent.trim();
		const precoText = card.querySelector('.fw-bold').textContent.trim();
		const preco = parseFloat(precoText.replace('R$', '').replace(',', '.'));
		const img = card.querySelector('img').getAttribute('src');
		let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
		let idx = carrinho.findIndex(item => item.nome === nome);
		if (idx > -1) {
			carrinho[idx].qtd += 1;
			carrinho[idx].total = carrinho[idx].qtd * carrinho[idx].preco;
		} else {
			carrinho.push({ nome, preco, qtd: 1, total: preco, img });
		}
		localStorage.setItem('carrinho', JSON.stringify(carrinho));
		localStorage.setItem('cartCount', carrinho.length);
		cartCount = carrinho.length;
		animateCart();
		btn.classList.add('btn-success');
		btn.classList.remove('btn-outline-success');
		setTimeout(() => {
			btn.classList.remove('btn-success');
			btn.classList.add('btn-outline-success');
		}, 500);
	});
});
