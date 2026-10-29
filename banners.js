// false mostra apenas o primeiro banner habilitado; true ativa o carrossel.
const carrosselAtivo = true;

// A ordem da lista define a ordem dos banners.
// Use exibir: false para ocultar um banner.
const banners = [
  {
    exibir: false,
    imagem: 'assets/banners/choopduplo.png',
    imagemDesktop: 'assets/banners/choopduploweb.png',
    alt: 'Hoje é dia de chopp duplo. Mais sabor, mais momentos.',
    // Deixe os textos vazios para exibir somente a imagem.
    chamada: '',
    titulo: '',
    destaque: '',
    descricao: '',
    exibirContagem: false,
  },
  {
    exibir: true,
    imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRgEjBEJANA2Y8s8YfGbxJFy9jjoYvZtd2Ggctog2sNgidNPDX4BrHQN4&s=10',
    alt: 'Hambúrguer com queijo, salada e molho especial',
    chamada: 'Fique à vontade',
    titulo: 'Boa comida.',
    destaque: 'Bons momentos',
    descricao: 'Uma pausa para comer bem e aproveitar.',
    exibirContagem: true,
  },
{
  exibir: true,
  imagem: 'assets/banners/picanha.png',
  imagemDesktop: 'assets/banners/picanhaweb.png',
  alt: 'Picanha na chapa, suculenta e preparada na hora.',
  chamada: '🔥 O SABOR QUE CONQUISTA',
  titulo: 'Picanha na Chapa',
  destaque: '',
  descricao: 'Suculenta, macia e servida na chapa quentinha.',
  exibirContagem: false,
},
{
  exibir: true,
  imagem: 'assets/banners/bebidas.png',
  imagemDesktop: 'assets/banners/bebidasweb.png',
  alt: 'Bebidas geladas, cervejas, drinks e refrigerantes do Buriti Arena.',
  chamada: '🍻 REFRESQUE SEUS MOMENTOS',
  titulo: 'Bebidas Geladas',
  destaque: '',
  descricao: 'Cervejas, drinks e muito mais para deixar seu momento ainda melhor.',
  exibirContagem: false,
},
];
