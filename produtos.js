// DEMONSTRAÇÃO: substitua nomes, descrições, preços e imagens pelos itens reais.
// Fotos ilustrativas hospedadas externamente; para produção, use fotos autorizadas do estabelecimento.
const categorias = [
  { id: 'todos', nome: 'Tudo', icone: '✳' },
  { id: 'destaques', nome: 'Destaques', icone: '★' },
  { id: 'pratos-feitos', nome: 'Pratos feitos', icone: '🍽️' },
  { id: 'porcoes', nome: 'Porções', icone: '🍟' },
  { id: 'burgers', nome: 'Hambúrgueres', icone: '🍔' },
  { id: 'espetinhos', nome: 'Espetinhos', icone: '🔥' },
  { id: 'cervejas', nome: 'Cervejas', icone: '🍺' },
  { id: 'drinks', nome: 'Drinks', icone: '🍹' },
  { id: 'bebidas', nome: 'Bebidas', icone: '🥤' }
];
const produtos = [
  {id:1, nome:'Batata Arena', descricao:'Batatas crocantes, cheddar cremoso e bacon em pedaços.', preco:34.90, categoria:'porcoes', destaque:true, selo:'MAIS PEDIDO', imagem:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=900&q=85'},
  {id:2, nome:'Arena Burger', descricao:'Pão macio, burger suculento, queijo, salada e molho especial.', preco:32.90, categoria:'burgers', destaque:true, selo:'FAVORITO', imagem:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&q=85'},
  {id:3, nome:'Caipirinha Clássica', descricao:'Limão fresco, gelo e aquele equilíbrio perfeito.', preco:22.00, categoria:'drinks', destaque:true, selo:'REFRESCANTE', imagem:'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&q=85'},
  {id:4, nome:'Frango Crocante', descricao:'Tirinhas de frango empanadas, douradas e cheias de sabor.', preco:42.00, categoria:'porcoes', destaque:true, imagem:'https://images.unsplash.com/photo-1562967914-608f82629710?w=900&q=85'},
  {id:5, nome:'Porção de Torresmo', descricao:'Torresmo dourado e crocante, servido com limão.', preco:34.90, categoria:'porcoes', destaque:false, selo:'PRA DIVIDIR', imagem:'https://static.itdg.com.br/images/640-auto/554ff987526b82a25098a9e2ceb0fd5d/torre-baixa.jpg'},
  {id:6, nome:'Burger Duplo', descricao:'Dois burgers, queijo derretido e molho da casa.', preco:39.90, categoria:'burgers', destaque:false, imagem:'https://images.unsplash.com/photo-1550547660-d9450f859349?w=900&q=85'},
  {id:7, nome:'Espetinho Bovino', descricao:'Carne selecionada na brasa, tempero especial.', preco:15.00, categoria:'espetinhos', destaque:false, imagem:'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=900&q=85'},
  {id:8, nome:'Espetinho de Frango', descricao:'Frango macio, douradinho e temperado na medida.', preco:13.00, categoria:'espetinhos', destaque:false, imagem:'https://thumb.tidesquare.com/tour/public/product/PRV3006455682/PRD3010379765/origin/2-145.jpg?type=wide'},
  {id:9, nome:'Gin Tropical', descricao:'Gin, frutas cítricas e um toque tropical.', preco:29.90, categoria:'drinks', destaque:false, imagem:'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=900&q=85'},
  {id:10, nome:'Mojito', descricao:'Hortelã, limão, gelo e muito frescor.', preco:26.00, categoria:'drinks', destaque:false, imagem:'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&q=85'},
  {id:11, nome:'Refrigerante Lata', descricao:'350 ml. Consulte os sabores disponíveis.', preco:7.00, categoria:'bebidas', destaque:false, imagem:'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=900&q=85'},
  {id:12, nome:'Água Mineral sem Gás', descricao:'Água mineral sem gás, servida gelada. Garrafa de 500 ml.', preco:5.00, categoria:'bebidas', destaque:false, imagem:'https://mambodelivery.vtexassets.com/arquivos/ids/248274-900-675/135217.jpg'},
  {id:13, nome:'PF de Picanha', descricao:'Picanha grelhada com arroz, feijão, farofa e salada fresca.', preco:49.90, categoria:'pratos-feitos', destaque:false, imagem:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5UpnYKdvEnH93D1dsTCETLJKLV22MZZVHhgJOW8FXhFal5SQGZj20Yf0&s=10'},
  {id:14, nome:'PF de Cupim', descricao:'Cupim assado com arroz, feijão, farofa e salada fresca.', preco:39.90, categoria:'pratos-feitos', destaque:false, imagem:'https://omatuto.com.br/img/pratos_executivos/Cupim.webp'},
  {id:15, nome:'PF de Frango', descricao:'Filé de frango grelhado com arroz, feijão, farofa e salada fresca.', preco:29.90, categoria:'pratos-feitos', destaque:false, imagem:'https://s3.static.brasilescola.uol.com.br/be/2020/11/almoco.jpg'},
  {id:16, nome:'Caipiroska de Maracujá', descricao:'Vodka, maracujá, açúcar e gelo, com aquele toque tropical.', preco:26.90, categoria:'drinks', destaque:false, imagem:'https://www.rbsdirect.com.br/imagesrc/25691214.jpg?w=700'},
  {id:17, nome:'Gin Tônica', descricao:'Gin, água tônica, gelo e limão. Leve e refrescante.', preco:29.90, categoria:'drinks', destaque:false, imagem:'https://solysombra-lounge.fr/assets/img/food/cocktail-gin-tonic.png'},
  {id:18, nome:'Aperol Spritz', descricao:'Aperol, espumante e água com gás, finalizados com laranja.', preco:32.90, categoria:'drinks', destaque:false, imagem:'https://coelmar.com.br/wp-content/uploads/2024/01/0uzNVM9.jpg'},
  {id:19, nome:'Tropical sem Álcool', descricao:'Sucos de abacaxi e laranja com xarope de romã e gelo.', preco:18.90, categoria:'drinks', destaque:false, selo:'SEM ÁLCOOL', imagem:'https://www.teisseire.fr/thumbnails/media100/rc/fT8bHYk6/uploads/63c14c7e97f89/cocktail-des-pirates-web-retina.jpg'},
  {id:20, nome:'Mandioca Frita', descricao:'Mandioca dourada por fora e macia por dentro, com uma pitada de sal.', preco:24.90, categoria:'porcoes', destaque:false, imagem:'https://panelinha-sitenovo.s3-sa-east-1.amazonaws.com/receita/964494000000-Mandioca-frita.jpg'},
  {id:21, nome:'Isca de Tilápia', descricao:'Tirinhas de tilápia empanadas e crocantes, acompanhadas de limão e molho.', preco:44.90, categoria:'porcoes', destaque:false, imagem:'https://pesqueirosantoignacio.com.br/imgs/tilapia.webp'},
  {id:22, nome:'Suco Natural de Laranja', descricao:'Suco de laranja preparado na hora. Copo de 300 ml.', preco:9.90, categoria:'bebidas', destaque:false, imagem:'https://www.frutarica.com.br/imagens/informacoes/polpa-fruta-laranja-02.jpg'},
  {id:23, nome:'Água Mineral com Gás', descricao:'Água mineral com gás, servida gelada. Garrafa de 500 ml.', preco:6.00, categoria:'bebidas', destaque:false, imagem:'https://bistek.vtexassets.com/arquivos/ids/159278-900-675/agua-mineral-crystal-500ml-com-gas.jpg'},
  {id:24, nome:'Heineken 600 ml', descricao:'Heineken Lager, servida gelada. Garrafa de 600 ml.', preco:18.90, categoria:'cervejas', destaque:false, imagem:'https://www.arenaatacado.com.br/on/demandware.static/-/Sites-storefront-catalog-sv/default/dwf0689e59/Produtos/279480-0000078905498-cerveja%20heineken%20garrafa%20600ml-heineken-1.jpg'},
  {id:25, nome:'Original 600 ml', descricao:'Original Pilsen, servida gelada. Garrafa de 600 ml.', preco:15.90, categoria:'cervejas', destaque:false, imagem:'https://shoppr.com.br/cdn/shop/products/5537170_4540840_Orig-660ml-01w_2048x.jpg?v=1449331230'},
  {id:26, nome:'Brahma 600 ml', descricao:'Brahma Chopp, servida gelada. Garrafa de 600 ml.', preco:12.90, categoria:'cervejas', destaque:false, imagem:'https://acdn-us.mitiendanube.com/stores/001/043/122/products/cerveja-brahma-600-ml1-b7ff237e7831df0cdf17686644305635-1024-1024.jpg'},
  {id:27, nome:'Skol 600 ml', descricao:'Skol Pilsen, servida gelada. Garrafa de 600 ml.', preco:11.90, categoria:'cervejas', destaque:false, imagem:'https://www.ab-inbev.com/img/brand-assets/Skol_Card.png'}
];
