// false mostra apenas o primeiro banner; true ativa o carrossel.
const carrosselAtivo = true;

// A ordem da lista define a ordem dos banners.
const banners = [
  {
    imagem: 'assets/choopduplo/choopduplo.png',
    imagemDesktop: 'assets/choopduplo/choopduploweb.png',
    alt: 'Hoje é dia de chopp duplo. Mais sabor, mais momentos.',
    // Deixe os textos vazios para exibir somente a imagem.
    chamada: '',
    titulo: '',
    destaque: '',
    descricao: '',
    exibirContagem: false,
  },
  {
    imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRgEjBEJANA2Y8s8YfGbxJFy9jjoYvZtd2Ggctog2sNgidNPDX4BrHQN4&s=10',
    alt: 'Hambúrguer com queijo, salada e molho especial',
    chamada: 'Fique à vontade',
    titulo: 'Boa comida.',
    destaque: 'Bons momentos',
    descricao: 'Uma pausa para comer bem e aproveitar.',
    exibirContagem: true,
  }
];
