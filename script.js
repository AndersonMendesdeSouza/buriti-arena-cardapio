async function registrarAcesso() {
  let visitorId = localStorage.getItem('arena_visitor_id');
  const createdAt = Number(localStorage.getItem('arena_visitor_created_at'));
  const now = Date.now();
  const expirationTime = 12 * 60 * 60 * 1000;

  // Renova o ID após 12 horas ou quando não há um horário de criação válido.
  if (
    !visitorId ||
    !Number.isFinite(createdAt) ||
    createdAt <= 0 ||
    createdAt > now ||
    now - createdAt >= expirationTime
  ) {
    visitorId = crypto.randomUUID();
    localStorage.setItem('arena_visitor_id', visitorId);
    localStorage.setItem('arena_visitor_created_at', String(now));
  }

  try {
    await fetch(`${API_URL}/access`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ visitorId }),
    });
  } catch (error) {
    console.error('Erro ao registrar acesso:', error);
  }
}

// Executa ao carregar o cardápio
registrarAcesso();

const $ = (selector) => document.querySelector(selector);
const productsNode = $('#products');
const categoriesNode = $('#categories');
const search = $('#search');
const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent)
  || (navigator.userAgent.includes('Macintosh') && navigator.maxTouchPoints > 1);
let currentCategory = 'todos';
const money = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const normalize = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const escapeHTML = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

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

  function startSwipe(x, y, inputId) {
    if (swipeStart || looping) return false;

    const trackX = new DOMMatrixReadOnly(window.getComputedStyle(track).transform).m41;
    swipeStart = { inputId, x, y, trackX, direction: null };
    track.classList.add('banner-track--dragging');
    track.style.transform = `translateX(${trackX}px)`;
    window.clearInterval(timer);
    return true;
  }

  function moveSwipe(x, y) {
    const distanceX = x - swipeStart.x;
    const distanceY = y - swipeStart.y;
    if (!swipeStart.direction) {
      if (Math.max(Math.abs(distanceX), Math.abs(distanceY)) < 6) return;
      swipeStart.direction = Math.abs(distanceX) > Math.abs(distanceY) ? 'horizontal' : 'vertical';
    }
    if (swipeStart.direction !== 'horizontal') return;

    const minX = -(visibleBanners.length + 1) * viewport.clientWidth;
    const positionX = Math.max(minX, Math.min(0, swipeStart.trackX + distanceX));
    track.style.transform = `translateX(${positionX}px)`;
  }

  function endSwipe(x) {
    const distanceX = x - swipeStart.x;
    const horizontal = swipeStart.direction === 'horizontal';
    const threshold = Math.min(60, viewport.clientWidth * 0.15);
    swipeStart = null;

    if (horizontal && Math.abs(distanceX) >= threshold) {
      const direction = distanceX < 0 ? 1 : -1;
      showBanner(currentBanner + direction);
    } else {
      showBanner(currentBanner);
    }
    restartTimer();
  }

  function cancelSwipe() {
    if (!swipeStart) return;

    swipeStart = null;
    showBanner(currentBanner);
    restartTimer();
  }

  // No toque, touchmove permite bloquear a rolagem no Safari apenas no gesto horizontal.
  viewport.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 1) {
      cancelSwipe();
      return;
    }

    const touch = event.touches[0];
    startSwipe(touch.clientX, touch.clientY, touch.identifier);
  }, { passive: true });
  viewport.addEventListener('touchmove', (event) => {
    if (event.touches.length !== 1) {
      cancelSwipe();
      return;
    }

    const touch = event.touches[0];
    if (!swipeStart || touch.identifier !== swipeStart.inputId) return;

    moveSwipe(touch.clientX, touch.clientY);
    if (swipeStart.direction === 'horizontal' && event.cancelable) event.preventDefault();
  }, { passive: false });
  viewport.addEventListener('touchend', (event) => {
    if (!swipeStart) return;

    const touch = Array.from(event.changedTouches).find(touch => touch.identifier === swipeStart.inputId);
    if (touch) endSwipe(touch.clientX);
  });
  viewport.addEventListener('touchcancel', cancelSwipe);

  viewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch' || !event.isPrimary || event.button !== 0) return;
    if (startSwipe(event.clientX, event.clientY, event.pointerId)) viewport.setPointerCapture(event.pointerId);
  });
  viewport.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch' || !swipeStart || event.pointerId !== swipeStart.inputId) return;
    moveSwipe(event.clientX, event.clientY);
  });
  viewport.addEventListener('pointerup', (event) => {
    if (event.pointerType === 'touch' || !swipeStart || event.pointerId !== swipeStart.inputId) return;

    endSwipe(event.clientX);
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
  });

  function cancelPointerSwipe(event) {
    if (event.pointerType !== 'touch' && swipeStart && event.pointerId === swipeStart.inputId) cancelSwipe();
  }
  viewport.addEventListener('pointercancel', cancelPointerSwipe);
  viewport.addEventListener('lostpointercapture', cancelPointerSwipe);

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

function setupMenuControls() {
  const controls = $('.menu-controls');
  const banner = $('#banner-carousel');
  let previousY = Math.max(0, window.scrollY);
  let scrollDistance = 0;
  let stickyStart = 0;
  let framePending = false;

  function showControls() {
    controls.classList.remove('menu-controls--hidden');
    scrollDistance = 0;
  }

  function updatePosition() {
    // Usa a largura útil da tela para não criar rolagem horizontal junto à barra do navegador.
    controls.style.setProperty('--controls-width', `${document.documentElement.clientWidth}px`);
    const styles = window.getComputedStyle(controls);
    stickyStart = banner.getBoundingClientRect().bottom + window.scrollY
      + parseFloat(styles.marginTop) - parseFloat(styles.top);
    previousY = Math.max(0, window.scrollY);
    scrollDistance = 0;
    if (previousY <= stickyStart) showControls();
  }

  function updateVisibility() {
    framePending = false;
    // Limita os valores para o efeito elástico do Safari não inverter a direção.
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const currentY = Math.max(0, Math.min(window.scrollY, maxScroll));
    const difference = currentY - previousY;
    previousY = currentY;

    if (currentY <= stickyStart || document.activeElement === search) {
      showControls();
      return;
    }
    if (difference === 0) return;
    if (Math.sign(difference) !== Math.sign(scrollDistance)) scrollDistance = 0;
    scrollDistance += difference;
    if (Math.abs(scrollDistance) < 12) return;

    controls.classList.toggle('menu-controls--hidden', scrollDistance > 0);
    scrollDistance = 0;
  }

  window.addEventListener('scroll', () => {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(updateVisibility);
  }, { passive: true });
  // Revela os controles também quando a pessoa chega neles pelo teclado.
  controls.addEventListener('focusin', showControls);
  window.addEventListener('resize', updatePosition);
  window.addEventListener('load', updatePosition);
  updatePosition();
}

function renderCategories() {
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

function setupIOSProductCarousels() {
  if (!isIOS) return null;

  const mobile = window.matchMedia('(max-width: 620px)');
  let swipe = null;
  let viewportWidth = document.documentElement.clientWidth;

  function showCard(grid, index, animate = true) {
    const track = grid.querySelector('.ios-product-track');
    const cards = track.children;
    const step = cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
    index = Math.max(0, Math.min(index, cards.length - 1));
    grid.dataset.cardIndex = String(index);
    track.classList.toggle('ios-product-track--dragging', !animate);
    track.style.transform = `translate3d(${-index * step}px, 0, 0)`;
    if (!animate) {
      void track.offsetWidth;
      track.classList.remove('ios-product-track--dragging');
    }
  }

  function cancelSwipe() {
    if (!swipe) return;

    const currentSwipe = swipe;
    swipe = null;
    if (currentSwipe.horizontal) showCard(currentSwipe.grid, currentSwipe.index);
  }

  function updateZoom() {
    const zoomed = window.visualViewport && window.visualViewport.scale > 1.01;
    productsNode.classList.toggle('ios-carousels--zoomed', Boolean(zoomed));
    if (zoomed) cancelSwipe();
  }

  // Os eventos ficam no container para continuar funcionando após buscar ou filtrar.
  productsNode.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 1) {
      cancelSwipe();
      return;
    }
    if (!mobile.matches || productsNode.classList.contains('ios-carousels--zoomed')) return;

    const grid = event.target.closest('.product-grid--ios');
    if (!grid) return;

    cancelSwipe();
    const touch = event.touches[0];
    const track = grid.querySelector('.ios-product-track');
    const cards = track.children;
    const step = cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
    swipe = {
      grid, track, step, touchId: touch.identifier, x: touch.clientX, y: touch.clientY,
      index: Number(grid.dataset.cardIndex), trackX: 0, horizontal: false
    };
  }, { passive: true });

  productsNode.addEventListener('touchmove', (event) => {
    if (event.touches.length !== 1) {
      cancelSwipe();
      return;
    }
    const touch = event.touches[0];
    if (!swipe || touch.identifier !== swipe.touchId) return;

    const distanceX = touch.clientX - swipe.x;
    const distanceY = touch.clientY - swipe.y;
    if (!swipe.horizontal) {
      if (Math.max(Math.abs(distanceX), Math.abs(distanceY)) < 8) return;
      if (Math.abs(distanceX) <= Math.abs(distanceY) * 1.25) {
        cancelSwipe();
        return;
      }
      if (!event.cancelable) {
        cancelSwipe();
        return;
      }

      // Interrompe a transição na posição atual, sem pular para o destino.
      swipe.trackX = new DOMMatrixReadOnly(window.getComputedStyle(swipe.track).transform).m41;
      swipe.index = Math.max(0, Math.min(Math.round(-swipe.trackX / swipe.step), swipe.track.children.length - 1));
      swipe.horizontal = true;
      swipe.track.classList.add('ios-product-track--dragging');
    }
    if (!event.cancelable) {
      cancelSwipe();
      return;
    }
    event.preventDefault();

    // Reserva parte do percurso para a transição suave ao soltar o dedo.
    const preview = Math.max(-swipe.step * 0.6, Math.min(distanceX * 0.65, swipe.step * 0.6));
    const minX = -Math.min(swipe.index + 1, swipe.track.children.length - 1) * swipe.step;
    const maxX = -Math.max(0, swipe.index - 1) * swipe.step;
    const position = Math.max(minX, Math.min(swipe.trackX + preview, maxX));
    swipe.track.style.transform = `translate3d(${position}px, 0, 0)`;
  }, { passive: false });

  productsNode.addEventListener('touchend', (event) => {
    if (!swipe) return;
    const touch = Array.from(event.changedTouches).find(touch => touch.identifier === swipe.touchId);
    if (!touch) return;

    const currentSwipe = swipe;
    swipe = null;
    if (!currentSwipe.horizontal) return;

    const distanceX = touch.clientX - currentSwipe.x;
    const threshold = Math.min(50, currentSwipe.step * 0.12);
    let index = currentSwipe.index;
    if (Math.abs(distanceX) >= threshold) index += distanceX < 0 ? 1 : -1;
    showCard(currentSwipe.grid, index);
  }, { passive: true });
  productsNode.addEventListener('touchcancel', cancelSwipe, { passive: true });

  productsNode.addEventListener('keydown', (event) => {
    if (!mobile.matches || !event.target.matches('.product-grid--ios')) return;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

    event.preventDefault();
    cancelSwipe();
    const grid = event.target;
    let index = Number(grid.dataset.cardIndex);
    if (event.key === 'ArrowLeft') index--;
    if (event.key === 'ArrowRight') index++;
    if (event.key === 'Home') index = 0;
    if (event.key === 'End') index = grid.querySelector('.ios-product-track').children.length - 1;
    showCard(grid, index);
  });
  productsNode.addEventListener('focusin', (event) => {
    if (!mobile.matches) return;
    const card = event.target.closest('.product-card');
    const grid = event.target.closest('.product-grid--ios');
    if (!card || !grid) return;

    cancelSwipe();
    grid.scrollLeft = 0;
    const index = Array.from(grid.querySelector('.ios-product-track').children).indexOf(card);
    if (index !== Number(grid.dataset.cardIndex)) showCard(grid, index);
  });
  window.addEventListener('blur', cancelSwipe);
  window.addEventListener('resize', () => {
    if (document.documentElement.clientWidth === viewportWidth) return;
    viewportWidth = document.documentElement.clientWidth;
    cancelSwipe();
    if (!mobile.matches) return;
    productsNode.querySelectorAll('.product-grid--ios').forEach(grid => {
      showCard(grid, Number(grid.dataset.cardIndex), false);
    });
  });
  if (window.visualViewport) window.visualViewport.addEventListener('resize', updateZoom);
  updateZoom();
  return cancelSwipe;
}

function renderProducts() {
  cancelIOSProductSwipe?.();
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
    const useIOSCarousel = isIOS && hasMultipleProducts;

    sectionsHTML += `<section class="product-section" data-category="${escapeHTML(category.id)}" aria-labelledby="${titleId}">
      <div class="category-heading">
        <h2 id="${titleId}">${escapeHTML(category.nome)}</h2>
        <span class="results-count">${sectionProducts.length} ${sectionProducts.length === 1 ? 'item' : 'itens'}</span>
      </div>
      ${hasMultipleProducts ? `<p class="carousel-hint" id="${hintId}">Deslize para explorar os produtos</p>` : ''}
      <div class="product-grid${useIOSCarousel ? ' product-grid--ios' : ''}" role="region" aria-labelledby="${titleId}"
        ${useIOSCarousel ? 'data-card-index="0"' : ''}
        ${hasMultipleProducts ? `aria-describedby="${hintId}"` : ''} tabindex="0">
        ${useIOSCarousel ? '<div class="ios-product-track">' : ''}
        ${sectionProducts.map(renderProductCard).join('')}
        ${useIOSCarousel ? '</div>' : ''}
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
$('#reset-filters').addEventListener('click', () => { currentCategory = 'todos'; search.value = ''; renderCategories(); renderProducts(); search.focus(); });
const cancelIOSProductSwipe = setupIOSProductCarousels();
renderBanners(); renderCategories(); renderProducts();
setupMenuControls();
