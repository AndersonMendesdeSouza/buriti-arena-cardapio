const $ = (selector) => document.querySelector(selector);
const productsNode = $('#products');
const categoriesNode = $('#categories');
const search = $('#search');
let currentCategory = 'todos';
const money = (n) => n.toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
const normalize = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const escapeHTML = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function renderCategories(){
  categoriesNode.innerHTML = categorias.map(cat => `<button class="category-chip ${cat.id === currentCategory ? 'active' : ''}" data-category="${cat.id}" aria-pressed="${cat.id === currentCategory}"><span>${cat.icone}</span>${escapeHTML(cat.nome)}</button>`).join('');
}
function renderProductCard(product) {
  const category = categorias.find(cat => cat.id === product.categoria);

  return `<article class="product-card">
    <div class="product-image">
      <img src="${escapeHTML(product.imagem)}" alt="${escapeHTML(product.nome)}" loading="lazy"
        onerror="this.style.display='none';this.parentElement.classList.add('image-fallback')" />
      ${product.selo ? `<span class="product-badge">${escapeHTML(product.selo)}</span>` : ''}
    </div>
    <div class="product-info">
      <h3>${escapeHTML(product.nome)}</h3>
      <p>${escapeHTML(product.descricao)}</p>
      ${product.adicional ? `<details class="product-additionals">
        <summary>Adicionais</summary>
        <div class="product-additional">
          <span>${escapeHTML(product.adicional.nome)}</span>
          <strong>${money(product.adicional.preco)}</strong>
        </div>
      </details>` : ''}
      <div class="product-bottom"><strong>${money(product.preco)}</strong></div>
    </div>
  </article>`;
}

function renderProducts() {
  const query = normalize(search.value.trim());
  const filtered = produtos.filter(product => {
    const matchesSearch = normalize(`${product.nome} ${product.descricao}`).includes(query);

    if (currentCategory === 'destaques') {
      return matchesSearch && product.destaque;
    }
    if (currentCategory !== 'todos') {
      return matchesSearch && product.categoria === currentCategory;
    }
    return matchesSearch;
  });

  let sectionsHTML = '';

  for (const category of categorias) {
    if (category.id === 'todos') continue;
    if (currentCategory !== 'todos' && category.id !== currentCategory) continue;

    const sectionProducts = filtered.filter(product => {
      if (category.id === 'destaques') return product.destaque;
      return product.categoria === category.id;
    });

    if (sectionProducts.length === 0) continue;

    const titleId = `title-${category.id}`;
    const hintId = `hint-${category.id}`;
    const hasMultipleProducts = sectionProducts.length > 1;

    sectionsHTML += `<section class="product-section" data-category="${escapeHTML(category.id)}" aria-labelledby="${titleId}">
      <div class="category-heading">
        <h2 id="${titleId}">${escapeHTML(category.nome)}</h2>
        <span class="results-count">${sectionProducts.length} ${sectionProducts.length === 1 ? 'item' : 'itens'}</span>
      </div>
      ${hasMultipleProducts ? `<p class="carousel-hint" id="${hintId}">Deslize para explorar os produtos <span aria-hidden="true">↔</span></p>` : ''}
      <div class="product-grid" role="region" aria-labelledby="${titleId}"
        ${hasMultipleProducts ? `aria-describedby="${hintId}"` : ''} tabindex="0">
        ${sectionProducts.map(renderProductCard).join('')}
      </div>
    </section>`;
  }

  productsNode.innerHTML = sectionsHTML;
  $('#total-products').textContent = String(produtos.length).padStart(2, '0');
  $('#empty-state').hidden = filtered.length > 0;

  const summary = $('#search-summary');
  summary.hidden = !query;
  summary.textContent = query
    ? `Buscando “${search.value.trim()}” · ${filtered.length} ${filtered.length === 1 ? 'item encontrado' : 'itens encontrados'}`
    : '';
}
categoriesNode.addEventListener('click', (e) => {
  const chip = e.target.closest('[data-category]');
  if (!chip) return;
  currentCategory = chip.dataset.category;
  renderCategories(); renderProducts();
});
search.addEventListener('input', renderProducts);
$('#reset-filters').addEventListener('click', () => {currentCategory='todos';search.value='';renderCategories();renderProducts();search.focus();});
renderCategories(); renderProducts();
