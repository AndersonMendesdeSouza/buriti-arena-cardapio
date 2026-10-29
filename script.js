const $ = (selector) => document.querySelector(selector);
const productsNode = $('#products');
const categoriesNode = $('#categories');
const search = $('#search');
let currentCategory = 'todos';
const money = (n) => n.toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
const normalize = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const escapeHTML = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function renderBanners() {
  const carousel = $('#banner-carousel');
  const enabledBanners = banners.filter(banner => banner.exibir !== false);
  const visibleBanners = carrosselAtivo ? enabledBanners : enabledBanners.slice(0, 1);

  carousel.innerHTML = `<div class="banner-viewport"><div class="banner-track">
    ${visibleBanners.map((banner, index) => {
      const hasText = [banner.chamada, banner.titulo, banner.destaque, banner.descricao]
        .some(text => typeof text === 'string' && text.trim() !== '');
      const headingTag = index === 0 ? 'h1' : 'h2';

      return `<div class="section-head ${hasText ? 'section-head--with-text' : 'section-head--image-only'} ${banner.imagemDesktop ? 'section-head--responsive-image' : ''}"
        role="group" aria-label="Banner ${index + 1} de ${visibleBanners.length}" aria-hidden="${index !== 0}">
        <picture>
          ${banner.imagemDesktop ? `<source media="(min-width: 621px)" srcset="${escapeHTML(banner.imagemDesktop)}" />` : ''}
          <img class="welcome-photo" src="${escapeHTML(banner.imagem)}" alt="${escapeHTML(banner.alt || '')}"
            fetchpriority="${index === 0 ? 'high' : 'auto'}" decoding="async" draggable="false" />
        </picture>
        ${hasText ? `<div class="welcome-copy">
          ${banner.chamada?.trim() ? `<div class="section-kicker">${escapeHTML(banner.chamada)}</div>` : ''}
          ${banner.titulo?.trim() || banner.destaque?.trim() ? `<${headingTag} class="banner-title">
            ${banner.titulo?.trim() ? escapeHTML(banner.titulo) : ''}
            ${banner.titulo?.trim() && banner.destaque?.trim() ? '<br />' : ''}
            ${banner.destaque?.trim() ? `<em>${escapeHTML(banner.destaque)}<span class="welcome-period">.</span></em>` : ''}
          </${headingTag}>` : ''}
          ${banner.descricao?.trim() ? `<p>${escapeHTML(banner.descricao)}</p>` : ''}
        </div>` : ''}
        ${hasText && banner.exibirContagem ? `<div class="menu-count"><strong>${String(produtos.length).padStart(2, '0')}</strong><span>opções no cardápio</span></div>` : ''}
      </div>`;
    }).join('')}
  </div></div>`;

  if (visibleBanners.length < 2) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let currentBanner = 0;
  let mouseOver = false;

  carousel.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') mouseOver = true;
  });
  carousel.addEventListener('pointerleave', () => { mouseOver = false; });

  carousel.insertAdjacentHTML('beforeend', `<div class="banner-controls" aria-label="Controles dos banners">
    ${visibleBanners.map((banner, index) => `<button type="button" class="banner-dot"
      data-banner="${index}" aria-label="Mostrar banner ${index + 1}" aria-pressed="${index === 0}"></button>`).join('')}
  </div>`);

  const viewport = carousel.querySelector('.banner-viewport');
  viewport.classList.add('banner-viewport--draggable');
  const track = carousel.querySelector('.banner-track');
  const slides = carousel.querySelectorAll('.section-head');
  const dots = carousel.querySelectorAll('.banner-dot');
  let looping = false;

  // As cópias nas pontas permitem continuar na mesma direção ao completar a volta.
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  [firstClone, lastClone].forEach(clone => {
    clone.setAttribute('aria-hidden', 'true');
    clone.inert = true;
  });
  track.prepend(lastClone);
  track.append(firstClone);
  track.classList.add('banner-track--dragging');
  track.style.transform = 'translateX(-100%)';
  void track.offsetWidth;
  track.classList.remove('banner-track--dragging');

  function finishLoop() {
    if (!looping) return;

    // Volta da cópia para o banner original idêntico, sem uma segunda animação.
    track.classList.add('banner-track--dragging');
    track.style.transform = `translateX(-${(currentBanner + 1) * 100}%)`;
    void track.offsetWidth;
    track.classList.remove('banner-track--dragging');
    looping = false;
  }

  track.addEventListener('transitionend', (event) => {
    if (event.target === track && event.propertyName === 'transform') finishLoop();
  });

  function showBanner(index) {
    if (looping) return;

    currentBanner = (index + visibleBanners.length) % visibleBanners.length;
    looping = index < 0 || index >= visibleBanners.length;
    const targetX = -(index + 1) * viewport.clientWidth;
    const currentX = new DOMMatrixReadOnly(window.getComputedStyle(track).transform).m41;
    track.classList.remove('banner-track--dragging');
    track.style.transform = `translateX(-${(index + 1) * 100}%)`;
    slides.forEach((slide, slideIndex) => slide.setAttribute('aria-hidden', String(slideIndex !== currentBanner)));
    dots.forEach((dot, dotIndex) => dot.setAttribute('aria-pressed', String(dotIndex === currentBanner)));
    if (reducedMotion.matches || Math.abs(currentX - targetX) < 1) finishLoop();
  }

  let timer;
  function restartTimer() {
    window.clearInterval(timer);
    timer = window.setInterval(() => {
      if (reducedMotion.matches || document.hidden || mouseOver || swipeStart || carousel.contains(document.activeElement)) return;
      showBanner(currentBanner + 1);
    }, 4000);
  }

  let swipeStart = null;

  viewport.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0 || swipeStart || looping) return;

    const trackX = new DOMMatrixReadOnly(window.getComputedStyle(track).transform).m41;
    swipeStart = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, trackX, horizontal: false };
    track.classList.add('banner-track--dragging');
    track.style.transform = `translateX(${trackX}px)`;
    viewport.setPointerCapture(event.pointerId);
    window.clearInterval(timer);
  });
  viewport.addEventListener('pointermove', (event) => {
    if (!swipeStart || event.pointerId !== swipeStart.pointerId) return;

    const distanceX = event.clientX - swipeStart.x;
    const distanceY = event.clientY - swipeStart.y;
    if (!swipeStart.horizontal) {
      if (Math.abs(distanceX) < 6 || Math.abs(distanceX) <= Math.abs(distanceY)) return;
      swipeStart.horizontal = true;
    }

    const minX = -(visibleBanners.length + 1) * viewport.clientWidth;
    const positionX = Math.max(minX, Math.min(0, swipeStart.trackX + distanceX));
    track.style.transform = `translateX(${positionX}px)`;
  });
  viewport.addEventListener('pointerup', (event) => {
    if (!swipeStart || event.pointerId !== swipeStart.pointerId) return;

    const distanceX = event.clientX - swipeStart.x;
    const horizontal = swipeStart.horizontal;
    const threshold = Math.min(60, viewport.clientWidth * 0.15);
    swipeStart = null;
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);

    if (horizontal && Math.abs(distanceX) >= threshold) {
      const direction = distanceX < 0 ? 1 : -1;
      showBanner(currentBanner + direction);
    } else {
      showBanner(currentBanner);
    }
    restartTimer();
  });

  function cancelSwipe(event) {
    if (!swipeStart || event.pointerId !== swipeStart.pointerId) return;

    swipeStart = null;
    showBanner(currentBanner);
    restartTimer();
  }
  viewport.addEventListener('pointercancel', cancelSwipe);
  viewport.addEventListener('lostpointercapture', cancelSwipe);

  dots.forEach((dot, index) => dot.addEventListener('click', () => {
    showBanner(index);
    restartTimer();
  }));
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) finishLoop();
    restartTimer();
  });
  restartTimer();
}

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
renderBanners(); renderCategories(); renderProducts();
