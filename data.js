let productsData = [
    {
        id: 1,
        name: 'Remera MC',
        category: 'REMERAS',
        price: 2.46,
        imagen: './img/07.jpg'
      }, 
      {
        id: 2,
        name: 'Pantalon Clasico',
        category: 'PANTALONES',
        price: 7.95,
        imagen: './img/09.jpg'
      }, 
      {
        id: 3,
        name: 'Campera Combinada',
        category: 'ABRIGOS',
        price: 7.55,
        imagen: './img/15.jpg'
      }, 
      {
        id: 4,
        name: 'Remera MC',
        category: 'REMERAS',
        price: 6.78,
        imagen: './img/04.jpg'
      }, 
      {
        id: 5,
        name: 'Campera de Pluma',
        category: 'ABRIGOS',
        price: 5.55,
        imagen: './img/14.jpg'
      }, 
      {
        id: 6,
        name: 'Remera MC',
        category: 'REMERAS',
        price: 3.67,
        imagen: './img/06.jpg'
      }, 
      {
        id: 7,
        name: 'Remera MC',
        category: 'REMERAS',
        price: 5.68,
        imagen: './img/01.jpg'
      }, 
      {
        id: 8,
        name: 'Remera MC',
        category: 'REMERAS',
        price: 4.67,
        imagen: './img/08.jpg'
      }, 
      {
        id: 9,
        name: 'Remera MC',
        category: 'REMERAS',
        price: 4.67,
        imagen: './img/02.jpg'
      }, 
      {
        id: 10,
        name: 'Pantalon Clasico',
        category: 'PANTALONES',
        price: 2.45,
        imagen: './img/10.jpg'
      }, 
      {
        id: 11,
        name: 'Pantalon Clasico',
        category: 'PANTALONES',
        price: 5.78,
        imagen: './img/11.jpg'
      },  {
        id: 12,
        name: 'Pantalon Clasico',
        category: 'PANTALONES',
        price: 4.89,
        imagen: './img/12.jpg'
      },  {
        id: 13,
        name: 'Pantalon Clasico',
        category: 'PANTALONES',
        price: 9.08,
        imagen: './img/13.jpg'
      },  {
        id: 14,
        name: 'Remera MC',
        category: 'REMERAS',
        price: 7.96,
        imagen: './img/05.jpg'
      },  {
        id: 15,
        name: 'Remera MC',
        category: 'REMERAS',
        price: 3.57,
        imagen: './img/03.jpg'
      },  {
        id: 16,
        name: 'Campera Combinada',
        category: 'ABRIGOS',
        price: 3.66,
        imagen: './img/16.jpg'
      },  
      {
        id: 17,
        name: 'Campera de Pluma',
        category: 'ABRIGOS',
        price: 8.99,
        imagen: './img/17.jpg'
      },  {
        id: 18,
        name: 'Campera Combinada',
        category: 'ABRIGOS',
        price: 4.67,
        imagen: './img/18.jpg'
      }, 
];

// Para hacer la paginacion de Ver Más
const splitProducts = (size) => {
  let dividedProducts = [];
  for (let i = 0; i < productsData.length; i += size) {
    dividedProducts.push(productsData.slice(i, i + size));
  }
  return dividedProducts;

};

// Funcion para dividir los productos en arrays de 4 y manejar la paginacion
const productsController = {
    dividedProducts: splitProducts(5),
    nextProductsIndex: 1,
    productsLimit: splitProducts(5).length,
  }; 
  
  // console.log(productsController); 