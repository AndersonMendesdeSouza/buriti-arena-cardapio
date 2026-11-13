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

// Executa ao carregar a página.
registrarAcesso();
