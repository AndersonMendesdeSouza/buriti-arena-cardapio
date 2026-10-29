const categorias = [
  { id: 'todos', nome: 'Tudo', icone: '🍽️' },
  { id: 'destaques', nome: 'Destaques', icone: '⭐' },
  { id: 'cervejas-garrafa', nome: 'Cervejas Garrafa', icone: '🍾' },
  { id: 'cervejas-lata', nome: 'Cervejas Lata', icone: '🥫' },
  { id: 'cervejas-long-neck', nome: 'Cervejas Long Neck', icone: '🍺' },
  { id: 'chopp', nome: 'Chopp', icone: '🍻' },
  { id: 'petiscos', nome: 'Petiscos', icone: '🍟' },
  { id: 'chapa', nome: 'Chapa Quente', icone: '🥩' },
  { id: 'guarnicoes', nome: 'Guarnições', icone: '🥘' },
  { id: 'janta', nome: 'Jantinhas', icone: '🍛' },
  { id: 'drinks', nome: 'Drinks', icone: '🍹' },
  { id: 'shot', nome: 'Shots', icone: '🥃' },
  { id: 'dose', nome: 'Doses', icone: '🍶' },
  { id: 'bebidas', nome: 'Bebidas', icone: '🥤' },
  { id: 'sucos', nome: 'Sucos', icone: '🧃' },
  { id: 'baladeiros', nome: 'Baladeiros', icone: '🍫' },
];

const produtos = [
  // CERVEJAS GARRAFA
  {
    id: 1,
    nome: 'Heineken',
    descricao: 'Cerveja puro malte, refrescante e de sabor marcante.',
    preco: 14.90,
    categoria: 'cervejas-garrafa',
    destaque: false,
    imagem: './assets/cervejas/cervejas-garrafa/heineken.png'
  },
  {
    id: 2,
    nome: 'Amstel',
    descricao: 'Cerveja puro malte, equilibrada e de sabor suave.',
    preco: 11.90,
    categoria: 'cervejas-garrafa',
    destaque: false,
    imagem: './assets/cervejas/cervejas-garrafa/amstel.png'
  },
  {
    id: 3,
    nome: 'Corona Extra',
    descricao: 'Cerveja leve, suave e refrescante, com sabor delicado.',
    preco: 15.90,
    categoria: 'cervejas-garrafa',
    destaque: false,
    imagem: './assets/cervejas/cervejas-garrafa/corona.png'
  },
  {
    id: 4,
    nome: 'Antarctica',
    descricao: 'Cerveja clássica, leve e refrescante, ideal para bons momentos.',
    preco: 11.90,
    categoria: 'cervejas-garrafa',
    destaque: false,
    imagem: './assets/cervejas/cervejas-garrafa/antarctica.png'
  },
  {
    id: 5,
    nome: 'Antarctica Original',
    descricao: 'Cerveja tradicional, de sabor encorpado e amargor equilibrado.',
    preco: 13.90,
    categoria: 'cervejas-garrafa',
    destaque: false,
    imagem: './assets/cervejas/cervejas-garrafa/original.png'
  },
  {
    id: 6,
    nome: 'Skol',
    descricao: 'Cerveja leve, suave e refrescante, perfeita para compartilhar.',
    preco: 11.90,
    categoria: 'cervejas-garrafa',
    destaque: false,
    imagem: './assets/cervejas/cervejas-garrafa/skol.png'
  },

  // CERVEJAS LATA
  {
    id: 7,
    nome: 'Heineken',
    descricao: 'Cerveja puro malte, refrescante e de sabor marcante.',
    preco: 7.00,
    categoria: 'cervejas-lata',
    destaque: false,
    imagem: './assets/cervejas/cervejas-lata/heineken.png'
  },
  {
    id: 8,
    nome: 'Heineken 0.0',
    descricao: 'Todo o sabor de Heineken, sem álcool.',
    preco: 7.00,
    categoria: 'cervejas-lata',
    destaque: false,
    imagem: './assets/cervejas/cervejas-lata/heineken-zero.png'
  },
  {
    id: 9,
    nome: 'Amstel',
    descricao: 'Cerveja puro malte, equilibrada e de sabor suave.',
    preco: 5.00,
    categoria: 'cervejas-lata',
    destaque: false,
    imagem: './assets/cervejas/cervejas-lata/amstel.png'
  },
  {
    id: 10,
    nome: 'Antarctica',
    descricao: 'Cerveja clássica, leve e refrescante, ideal para bons momentos.',
    preco: 5.00,
    categoria: 'cervejas-lata',
    destaque: false,
    imagem: './assets/cervejas/cervejas-lata/antartica.png'
  },
  {
    id: 11,
    nome: 'Antarctica Original',
    descricao: 'Cerveja tradicional, de sabor encorpado e amargor equilibrado.',
    preco: 6.00,
    categoria: 'cervejas-lata',
    destaque: false,
    imagem: './assets/cervejas/cervejas-lata/original.png'
  },
  {
    id: 12,
    nome: 'Skol',
    descricao: 'Cerveja leve, suave e refrescante, perfeita para compartilhar.',
    preco: 5.00,
    categoria: 'cervejas-lata',
    destaque: false,
    imagem: './assets/cervejas/cervejas-lata/skol.png'
  },

  // CERVEJAS LONG NECK
  {
    id: 13,
    nome: 'Heineken',
    descricao: 'Cerveja puro malte, refrescante e de sabor marcante.',
    preco: 10.00,
    categoria: 'cervejas-long-neck',
    destaque: false,
    imagem: './assets/cervejas/cervejas-long-neck/heineken.png'
  },
  {
    id: 14,
    nome: 'Heineken 0.0',
    descricao: 'Todo o sabor de Heineken, sem álcool.',
    preco: 10.00,
    categoria: 'cervejas-long-neck',
    destaque: false,
    imagem: './assets/cervejas/cervejas-long-neck/heineken-zero.png'
  },
  {
    id: 15,
    nome: 'Corona Extra',
    descricao: 'Cerveja leve, suave e refrescante.',
    preco: 10.00,
    categoria: 'cervejas-long-neck',
    destaque: false,
    imagem: './assets/cervejas/cervejas-long-neck/corona-extra.png'
  },
  {
    id: 16,
    nome: 'Ice',
    descricao: 'Bebida leve e refrescante, perfeita para qualquer ocasião.',
    preco: 13.00,
    categoria: 'cervejas-long-neck',
    destaque: false,
    imagem: './assets/cervejas/cervejas-long-neck/ICE.png'
  },
  {
    id: 17,
    nome: 'Império Ultra',
    descricao: 'Cerveja leve, refrescante e com baixo teor de carboidratos.',
    preco: 10.00,
    categoria: 'cervejas-long-neck',
    destaque: false,
    imagem: './assets/cervejas/cervejas-long-neck/imperio.png'
  },
  {
    id: 18,
    nome: 'Michelob Ultra',
    descricao: 'Cerveja premium, leve e de sabor suave.',
    preco: 10.00,
    categoria: 'cervejas-long-neck',
    destaque: false,
    imagem: './assets/cervejas/cervejas-long-neck/michelob.png'
  },

  // CHOPP
  {
    id: 19,
    nome: 'Chopp Brahma',
    descricao: 'Cerveja leve, suave e refrescante, perfeita para compartilhar.',
    preco: 9.90,
    categoria: 'chopp',
    destaque: false,
    imagem: './assets/cervejas/cervejas-lata/chopp.png'
  },

  // PETISCOS
  {
    id: 20,
    nome: 'Almôndegas com mandioca',
    descricao: 'Almôndegas suculentas acompanhadas de mandioca macia e saborosa.',
    preco: 35.00,
    categoria: 'petiscos',
    destaque: false,
    selo: 'MAIS PEDIDO',
    imagem: './assets/petiscos/almondegasmandioca.jpg'
  },
  {
    id: 21,
    nome: 'Abacaxi com pinga e limão',
    descricao: 'Abacaxi refrescante com o toque marcante da pinga e do limão.',
    preco: 18.00,
    categoria: 'petiscos',
    destaque: false,
    selo: 'FAVORITO',
    imagem: './assets/petiscos/abacaxipinga.jpg'
  },
  {
    id: 22,
    nome: 'Batata frita tradicional',
    descricao: 'Batatas douradinhas, crocantes por fora e macias por dentro.',
    preco: 33.00,
    adicional: { nome: 'Maionese', preco: 3.00 },
    categoria: 'petiscos',
    destaque: true,
    selo: 'CROCANTE',
    imagem: './assets/petiscos/batatatradicional.jpg'
  },
  {
    id: 23,
    nome: 'Batata frita arena',
    descricao: 'Nossa batata frita especial, preparada com muito sabor para compartilhar.',
    preco: 38.00,
    categoria: 'petiscos',
    adicional: { nome: 'Maionese', preco: 3.00 },
    destaque: false,
    selo: 'CROCANTE',
    imagem: './assets/petiscos/batataarena.jpg'
  },
  {
    id: 24,
    nome: 'Bolinho de carne seca',
    descricao: 'Bolinhos dourados e crocantes com recheio saboroso de carne seca.',
    preco: 35.00,
    categoria: 'petiscos',
    adicional: { nome: 'Maionese', preco: 3.00 },
    destaque: false,
    selo: 'CROCANTE',
    imagem: './assets/petiscos/bolinhocarneseca.jpg'
  },
  {
    id: 25,
    nome: 'Frango a passarinho',
    descricao: 'Pedaços de frango bem temperados, fritinhos e irresistivelmente crocantes.',
    preco: 39.00,
    categoria: 'petiscos',
    destaque: true,
    selo: 'CROCANTE',
    imagem: './assets/petiscos/frangopassarinho.png'
  },
  {
    id: 26,
    nome: 'Fígado acebolado',
    descricao: 'Fígado macio e bem temperado, acompanhado de cebolas refogadas.',
    preco: 28.00,
    categoria: 'petiscos',
    destaque: false,
    selo: 'SABOROSO',
    imagem: './assets/petiscos/figadoacebolado.jpg'
  },
  {
    id: 27,
    nome: 'Fígado acebolado com jiló',
    descricao: 'Fígado suculento com cebolas refogadas e o sabor especial do jiló.',
    preco: 35.00,
    categoria: 'petiscos',
    destaque: false,
    selo: 'ESPECIAL',
    imagem: './assets/petiscos/figadoaceboladojilo.jpg'
  },
  {
    id: 28,
    nome: 'Filé tilápia',
    descricao: 'Filés de tilápia douradinhos, macios por dentro e crocantes por fora.',
    preco: 49.90,
    categoria: 'petiscos',
    destaque: true,
    selo: 'CROCANTE',
    imagem: './assets/petiscos/filetilapia.jpg'
  },
  {
    id: 29,
    nome: 'Pastelzinho carne e queijo',
    descricao: 'Pastéis crocantes com recheio delicioso de carne e queijo derretido.',
    preco: 40.00,
    adicional: { nome: 'Maionese', preco: 3.00 },
    categoria: 'petiscos',
    destaque: false,
    selo: 'CROCANTE',
    imagem: './assets/petiscos/pastelzinhocarnequeijo.jpg'
  },
  {
    id: 30,
    nome: 'Salada de jiló',
    descricao: 'Jiló temperadinho, combinado com ingredientes frescos e muito sabor.',
    preco: 23.00,
    categoria: 'petiscos',
    destaque: false,
    selo: 'REFRESCANTE',
    imagem: './assets/petiscos/saladadejilo.jpg'
  },
  {
    id: 31,
    nome: 'Tábua de frios',
    descricao: 'Uma seleção especial de frios e queijos, perfeita para compartilhar.',
    preco: 68.00,
    categoria: 'petiscos',
    destaque: true,
    selo: 'PARA COMPARTILHAR',
    imagem: './assets/petiscos/tabuadefrios.jpg'
  },
  {
    id: 32,
    nome: 'Tomate tira gosto',
    descricao: 'Tomates fresquinhos e bem temperados, um tira-gosto leve e saboroso.',
    preco: 18.00,
    categoria: 'petiscos',
    destaque: false,
    selo: 'REFRESCANTE',
    imagem: './assets/petiscos/tomatetiragosto.jpg'
  },

  // CHAPA QUENTE
  {
    id: 33,
    nome: 'Chapa quente picanha',
    descricao: 'Picanha suculenta e bem temperada, servida na chapa quente, com sabor irresistível.',
    preco: 95.00,
    categoria: 'chapa',
    destaque: true,
    imagem: 'assets/chapa/picanhachapa.jpg'
  },
  {
    id: 34,
    nome: 'Chapa quente contra filé',
    descricao: 'Contra filé macio e suculento, preparado na chapa quente e servido no ponto certo.',
    preco: 78.00,
    categoria: 'chapa',
    destaque: false,
    imagem: 'assets/chapa/contrafilechapa.jpg'
  },

  // GUARNIÇÕES
  {
    id: 35,
    nome: 'Arroz branco',
    descricao: 'Arroz branquinho, soltinho e fresquinho, perfeito para acompanhar sua refeição.',
    preco: 12.00,
    categoria: 'guarnicoes',
    destaque: false,
    imagem: 'assets/chapa/arroz.jpg'
  },
  {
    id: 36,
    nome: 'Feijão tropeiro',
    descricao: 'Feijão tropeiro bem temperado, com farofa e aquele sabor especial da comida caseira.',
    preco: 23.00,
    categoria: 'guarnicoes',
    destaque: false,
    imagem: 'assets/chapa/feijao.jpg'
  },
  {
    id: 37,
    nome: 'Mandioca cozida',
    descricao: 'Mandioca cozida no ponto certo, macia e saborosa, ideal para acompanhar qualquer prato.',
    preco: 10.00,
    categoria: 'guarnicoes',
    destaque: false,
    imagem: 'assets/chapa/mandioca.jpg'
  },
  {
    id: 38,
    nome: 'Vinagrete',
    descricao: 'Combinação refrescante de tomate, cebola e temperos frescos.',
    preco: 12.00,
    categoria: 'guarnicoes',
    destaque: false,
    imagem: 'assets/chapa/vinagrete.jpg'
  },

  // JANTINHAS
  {
    id: 39,
    nome: 'Jantinha completa',
    descricao: 'Uma refeição caprichada com arroz, feijão, espetinho suculento e salada fresquinha.',
    preco: 28.00,
    categoria: 'janta',
    destaque: true,
    imagem: 'assets/chapa/jantinha.jpg'
  },
  {
    id: 40,
    nome: 'Espeto simples',
    descricao: 'Espetinho bem temperado, assado na brasa e cheio de sabor.',
    preco: 10.00,
    categoria: 'janta',
    destaque: false,
    imagem: 'assets/chapa/espetosimples.jpg'
  },
  {
    id: 41,
    nome: 'Espeto com mandioca',
    descricao: 'Espetinho de carne suculento acompanhado de mandioca macia e saborosa.',
    preco: 13.00,
    categoria: 'janta',
    destaque: false,
    imagem: 'assets/chapa/espetomandioca.png'
  },

  // DRINKS
  {
    id: 42,
    nome: 'Arena 43',
    descricao: 'Drink especial com Licor 43, sabor suave, adocicado e refrescante.',
    preco: 39.00,
    categoria: 'drinks',
    destaque: false,
    imagem: './assets/drinks/arena.jpg'
  },
  {
    id: 43,
    nome: 'Aperol Spritz',
    descricao: 'Combinação refrescante de Aperol, espumante e água com gás, finalizada com laranja.',
    preco: 25.00,
    categoria: 'drinks',
    destaque: false,
    imagem: './assets/drinks/aperolspritz.jpg'
  },
  {
    id: 44,
    nome: 'Caipifruta Limão Taiti',
    descricao: 'Drink refrescante com limão-taiti, gelo e um toque cítrico irresistível.',
    preco: 21.90,
    categoria: 'drinks',
    destaque: false,
    imagem: './assets/drinks/caipilimao.png'
  },
  {
    id: 45,
    nome: 'Caipifruta Morango e Maracujá',
    descricao: 'Combinação tropical de morango e maracujá, com sabor frutado e refrescante.',
    preco: 21.90,
    categoria: 'drinks',
    destaque: false,
    imagem: './assets/drinks/caipifrutamorangomaracuja.jpg'
  },
  {
    id: 46,
    nome: 'Cozumel',
    descricao: 'Drink refrescante com cerveja, limão e borda de sal, perfeito para quem gosta de sabores cítricos.',
    preco: 15.00,
    categoria: 'drinks',
    destaque: false,
    imagem: './assets/drinks/cozumel.jpg'
  },
  {
    id: 47,
    nome: 'Moscow Mule',
    descricao: 'Drink clássico com vodka, limão e gengibre, servido bem gelado.',
    preco: 25.00,
    categoria: 'drinks',
    destaque: false,
    imagem: './assets/drinks/moscow.jpg'
  },
  {
    id: 48,
    nome: 'Preparo de Cozumel',
    descricao: 'Preparo especial com limão e sal, ideal para transformar sua cerveja em um delicioso Cozumel.',
    preco: 6.00,
    categoria: 'drinks',
    destaque: false,
    imagem: './assets/drinks/preparo.png'
  },
  {
    id: 49,
    nome: 'Tropical Gin',
    descricao: 'Gin combinado com notas cítricas e ingredientes refrescantes, perfeito para qualquer ocasião.',
    preco: 28.00,
    categoria: 'drinks',
    destaque: false,
    imagem: './assets/drinks/tropicalgin.jpg'
  },

  // SHOTS
  {
    id: 50,
    nome: 'Shot Arena',
    descricao: 'Dose especial da casa, com sabor marcante e um toque exclusivo do Arena.',
    preco: 15.00,
    categoria: 'shot',
    destaque: false,
    imagem: './assets/drinks/shotarena.jpg'
  },

  // DOSES
  {
    id: 51,
    nome: 'Ballena',
    descricao: 'Vodka de sabor suave e marcante, ideal para apreciar bem gelada.',
    preco: 15.00,
    categoria: 'dose',
    destaque: false,
    imagem: './assets/doses/ballena.jpg'
  },
  {
    id: 52,
    nome: 'Campari',
    descricao: 'Aperitivo italiano de sabor intenso e levemente amargo, com notas de ervas e frutas.',
    preco: 13.00,
    categoria: 'dose',
    destaque: false,
    imagem: './assets/doses/campari.jpg'
  },
  {
    id: 53,
    nome: 'Cabaré',
    descricao: 'Cachaça de sabor marcante e aroma especial, perfeita para apreciar em uma boa dose.',
    preco: 10.00,
    categoria: 'dose',
    destaque: false,
    imagem: './assets/doses/cabare.jpg'
  },
  {
    id: 54,
    nome: 'Chivas',
    descricao: 'Whisky escocês de 12 anos, com sabor suave, encorpado e notas de mel e frutas.',
    preco: 18.00,
    categoria: 'dose',
    destaque: false,
    imagem: './assets/doses/chivas.jpg'
  },
  {
    id: 55,
    nome: 'Jose Cuervo',
    descricao: 'Tequila mexicana de sabor marcante, com notas suaves de agave.',
    preco: 16.00,
    categoria: 'dose',
    destaque: false,
    imagem: './assets/doses/josecuervo.jpg'
  },
  {
    id: 56,
    nome: 'Licor 43',
    descricao: 'Licor espanhol de sabor doce e suave, com notas de baunilha e especiarias.',
    preco: 16.00,
    categoria: 'dose',
    destaque: false,
    imagem: './assets/doses/licor43.jpg'
  },
  {
    id: 57,
    nome: 'Old Parr',
    descricao: 'Whisky escocês de 12 anos, encorpado e equilibrado, com notas amadeiradas.',
    preco: 18.00,
    categoria: 'dose',
    destaque: false,
    imagem: './assets/doses/oldparr.jpg'
  },
  {
    id: 58,
    nome: 'Smirnoff',
    descricao: 'Vodka clássica de sabor suave e equilibrado, perfeita para apreciar gelada.',
    preco: 12.00,
    categoria: 'dose',
    destaque: false,
    imagem: './assets/doses/smirnoff.jpg'
  },


  // BEBIDAS SEM ÁLCOOL
  {
    id: 59,
    nome: 'Água Mineral com Gás',
    descricao: 'Água mineral gaseificada, leve e refrescante. Servida gelada.',
    preco: 5.00,
    categoria: 'bebidas',
    destaque: false,
    imagem: './assets/bebidas/agua-com-gas.png'
  },
  {
    id: 60,
    nome: 'Água Mineral sem Gás',
    descricao: 'Água mineral natural, ideal para hidratar e refrescar.',
    preco: 4.00,
    categoria: 'bebidas',
    destaque: false,
    imagem: './assets/bebidas/agua-sem-gas.png'
  },
  {
    id: 61,
    nome: 'Água Tônica',
    descricao: 'Bebida gaseificada com sabor levemente amargo e refrescante.',
    preco: 8.00,
    categoria: 'bebidas',
    destaque: false,
    imagem: './assets/bebidas/agua-tonica.png'
  },
  {
    id: 62,
    nome: 'Coca-Cola',
    descricao: 'Refrigerante Coca-Cola original, servido bem gelado em lata.',
    preco: 6.00,
    categoria: 'bebidas',
    destaque: false,
    imagem: './assets/bebidas/coca-cola.png'
  },
  {
    id: 63,
    nome: 'Coca-Cola Zero',
    descricao: 'Todo o sabor de Coca-Cola, sem açúcar. Servida gelada em lata.',
    preco: 6.00,
    categoria: 'bebidas',
    destaque: false,
    imagem: './assets/bebidas/coca-cola-zero.png'
  },
  {
    id: 64,
    nome: 'Energético Red Bull',
    descricao: 'Energético Red Bull tradicional, servido gelado em lata.',
    preco: 15.00,
    categoria: 'bebidas',
    destaque: false,
    imagem: './assets/bebidas/red-bull.png'
  },
  {
    id: 65,
    nome: 'Extra Power',
    descricao: 'Bebida energética de sabor marcante, ideal para dar mais disposição.',
    preco: 10.00,
    categoria: 'bebidas',
    destaque: false,
    imagem: './assets/bebidas/extra-power.png'
  },
  {
    id: 66,
    nome: 'Fanta Laranja',
    descricao: 'Refrigerante sabor laranja, doce, gaseificado e refrescante.',
    preco: 6.00,
    categoria: 'bebidas',
    destaque: false,
    imagem: './assets/bebidas/fanta-laranja.png'
  },
  {
    id: 67,
    nome: 'Gatorade',
    descricao: 'Bebida isotônica que ajuda na reposição de líquidos e eletrólitos.',
    preco: 10.00,
    categoria: 'bebidas',
    destaque: false,
    imagem: './assets/bebidas/gatorade.png'
  },
  {
    id: 68,
    nome: 'Guaraná Antarctica',
    descricao: 'Refrigerante brasileiro com o sabor tradicional do guaraná.',
    preco: 6.00,
    categoria: 'bebidas',
    destaque: false,
    imagem: './assets/bebidas/guarana-antartica.png'
  },
  {
    id: 69,
    nome: 'H2O Tradicional',
    descricao: 'Bebida gaseificada com sabor suave de limão, leve e refrescante.',
    preco: 7.00,
    categoria: 'bebidas',
    destaque: false,
    imagem: './assets/bebidas/h2o-tradicional.png'
  },
  {
    id: 70,
    nome: 'H2O Limoneto',
    descricao: 'Bebida gaseificada com sabor cítrico de limão, ideal para refrescar.',
    preco: 7.00,
    categoria: 'bebidas',
    destaque: false,
    imagem: './assets/bebidas/h2o-limoneto.png'
  },

  // SUCOS NATURAIS
  {
    id: 71,
    nome: 'Suco de Laranja',
    descricao: 'Suco natural de laranja, preparado com frutas frescas. Sabor cítrico, doce e refrescante.',
    preco: 12.00,
    categoria: 'sucos',
    destaque: false,
    imagem: './assets/sucos/suco-laranja.png'
  },
  {
    id: 72,
    nome: 'Suco de Limão',
    descricao: 'Suco natural de limão, preparado na hora. Leve, cítrico e muito refrescante.',
    preco: 12.00,
    categoria: 'sucos',
    destaque: false,
    imagem: './assets/sucos/suco-limao.png'
  },
  {
    id: 73,
    nome: 'Suco de Maracujá',
    descricao: 'Suco de maracujá com sabor tropical, equilibrando a doçura e a acidez da fruta.',
    preco: 12.00,
    categoria: 'sucos',
    destaque: false,
    imagem: './assets/sucos/suco-maracuja.png'
  },
  {
    id: 74,
    nome: 'Suco de Morango',
    descricao: 'Suco de morango com sabor frutado, levemente adocicado e refrescante.',
    preco: 12.00,
    categoria: 'sucos',
    destaque: false,
    imagem: './assets/sucos/suco-morango.png'
  },
  {
    id: 75,
    nome: 'Suco Dois Sabores',
    descricao: 'Combine dois sabores de sua preferência em um único suco. Uma mistura deliciosa e refrescante.',
    preco: 15.00,
    categoria: 'sucos',
    destaque: false,
    imagem: './assets/sucos/doissabor.png'
  },

  // SUCOS DE LATA
  {
    id: 76,
    nome: 'Suco Del Valle Pêssego',
    descricao: 'Bebida de fruta Del Valle sabor pêssego, com sabor suave e adocicado. Servida gelada em lata.',
    preco: 6.00,
    categoria: 'sucos',
    destaque: false,
    imagem: './assets/sucos/del-valle-pessego.png'
  },
  {
    id: 77,
    nome: 'Suco Del Valle Uva',
    descricao: 'Bebida de fruta Del Valle sabor uva, com sabor marcante e adocicado. Servida gelada em lata.',
    preco: 6.00,
    categoria: 'sucos',
    destaque: false,
    imagem: './assets/sucos/del-valle-uva.png'
  },

  //Baladeiro
  {
    id: 78,
    nome: 'Bubbaloo',
    descricao: 'Bebida de fruta Del Valle sabor uva, com sabor marcante e adocicado. Servida gelada em lata.',
    preco: 1.00,
    categoria: 'baladeiros',
    destaque: false,
    imagem: './assets/baladeiro/bubbaloo.png'
  },
  {
    id: 79,
    nome: 'FINI',
    descricao: 'Bebida de fruta Del Valle sabor uva, com sabor marcante e adocicado. Servida gelada em lata.',
    preco: 10.00,
    categoria: 'baladeiros',
    destaque: false,
    imagem: './assets/baladeiro/fini.png'
  },
  {
    id: 80,
    nome: 'HALLS',
    descricao: 'Bebida de fruta Del Valle sabor uva, com sabor marcante e adocicado. Servida gelada em lata.',
    preco: 4.00,
    categoria: 'baladeiros',
    destaque: false,
    imagem: './assets/baladeiro/halls.png'
  },
  {
    id: 82,
    nome: 'Sonho De Valsa',
    descricao: 'Bebida de fruta Del Valle sabor uva, com sabor marcante e adocicado. Servida gelada em lata.',
    preco: 3.00,
    categoria: 'baladeiros',
    destaque: false,
    imagem: './assets/baladeiro/sonho-de-valsa.png'
  },
  {
    id: 83,
    nome: 'Trident',
    descricao: 'Bebida de fruta Del Valle sabor uva, com sabor marcante e adocicado. Servida gelada em lata.',
    preco: 5.00,
    categoria: 'baladeiros',
    destaque: false,
    imagem: './assets/baladeiro/trident.png'
  },
  {
    id: 84,
    nome: 'Snikes',
    descricao: 'Bebida de fruta Del Valle sabor uva, com sabor marcante e adocicado. Servida gelada em lata.',
    preco: 7.00,
    categoria: 'baladeiros',
    destaque: false,
    imagem: './assets/baladeiro/snickers.png'
  },

  //Sobremesa
  {
    id: 85,
    nome: 'Creme Maracujá',
    descricao: 'Bebida de fruta Del Valle sabor uva, com sabor marcante e adocicado. Servida gelada em lata.',
    preco: 18.00,
    categoria: 'sobremesas',
    destaque: false,
    imagem: './assets/baladeiro/creme-maracuja.png'
  },
  {
    id: 86,
    nome: 'Creme Morango',
    descricao: 'Bebida de fruta Del Valle sabor uva, com sabor marcante e adocicado. Servida gelada em lata.',
    preco: 18.00,
    categoria: 'sobremesas',
    destaque: false,
    imagem: './assets/baladeiro/creme-morango.png'
  }
];
