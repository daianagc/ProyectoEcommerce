// Contenedor de productos
const products = document.querySelector('.shop-content');
const productsCart = document.querySelector(".cart-container");
const categories = document.querySelector('.categories');
const total = document.querySelector(".total");
// un html collection de todas las categorias
const categoriesList = document.querySelectorAll(".category");
const btnLoad = document.querySelector(".btn-load");
const buyBtn = document.querySelector(".btn-buy");
const cartBtn = document.querySelector(".cart-label");
const barsBtn = document.querySelector(".menu-label");
const cartMenu = document.querySelector(".cart");
const barsMenu = document.querySelector(".navbar-list");
const overlay = document.querySelector(".overlay");
//para el carrito
const cartIcon = document.querySelector("#cart-icon");
const closeCart = document.querySelector("#close-cart");
const deleteBtn = document.querySelector(".btn-delete");
const successModal = document.querySelector(".add-modal");
const resultado = document.getElementById('contador-productos');
const tooltip = document.querySelector('.count-products');
// Setear el array para el carro
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// Contador de productos dentro del carrito
let countProducts = 0


// Funcion para guardar en el localStorage
const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};


/* --------Funcion para retornar el html a renderizar--------*/

const renderProduct = (product) => {
    const {id, name, price, imagen} =
    product;
    return `
    <div class="product">
    <img src=${imagen} alt="" class="product-img">
    <h2 class="product-title">${name}</h2>
    <span>$ ${price}</span>
    <div class = "product-offer">
    <button class = "btn-add"
                data-id='${id}'
                data-name='${name}'
                data-price='${price}'
                data-imagen='${imagen}'
    >Añadir al Carrito</button>
    </div>
    </div>

     
    
    `;
}

// Funcion para renderizar los productos divididos. 
const renderDividedProducts = (index = 0) => {
    products.innerHTML += productsController.dividedProducts[index]
    .map(renderProduct)
    .join("");
};

const renderFilteredProducts = (category) => {
    const productList = productsData.filter(
      (product) => product.category === category
    );
  
    products.innerHTML = productList.map(renderProduct).join('');
  };

// Funcion para renderizar los productos.
// Si hay categoria ejecuta renderFilteredProducts
const renderProducts = (index = 0, category = undefined) => {
    if(!category){
        renderDividedProducts(index);
      return;
    }
    renderFilteredProducts(category);
}

/* --------Logica de Filtros--------*/

const changeShowMoreBtnState = category => {
    if(!category){
        btnLoad.classList.remove('hidden')
        return;
    }
    btnLoad.classList.add('hidden');
};

const changeBtnActiveState = (selectedCategory) => {
   const categories = [...categoriesList];
   categories.forEach((categoryBtn) => {
   if(categoryBtn.dataset.category !== selectedCategory){
    categoryBtn.classList.remove('active');
    return;
   }
   categoryBtn.classList.add('active');
   }) 
}


const changeFilterState = (e) => {
    const selectedCategory = e.target.dataset.category;
    changeBtnActiveState(selectedCategory);
    changeShowMoreBtnState(selectedCategory);
};

//Funcion para aplicar filtro por categorias
const applyFilter = (e) => {
 if (!e.target.classList.contains('category')) return;
 changeFilterState(e);
 if (!e.target.dataset.category) {
     products.innerHTML = '';
    renderProducts();
  } else {
    renderProducts(0, e.target.dataset.category);
    productsController.nextProductsIndex = 1;
    }
};

// Funcion que checkee si estamos en el ultimo array del array de productos divididos
const isLastIndexOf = () =>
  productsController.nextProductsIndex === productsController.productsLimit;


// Funcion para cargar ( VER MAS ) productos
const showMoreProducts = () => {
  renderProducts(productsController.nextProductsIndex);
  productsController.nextProductsIndex++;
  if (isLastIndexOf()) {
    btnLoad.classList.add("hidden");
  }
};


/* --------Logica para abrir y cerrar el carrito/menu y mostrar el overlay--------*/

const toggleMenu = () => {
  barsMenu.classList.toggle("open-menu");
  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");
  if (barsMenu.classList.contains("open-menu")) {
    barsMenu.classList.remove("open-menu");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

//Funcion para cerrar menu y carrito si scrolleamos

const closeOnScroll = () => {
  if(
    !barsMenu.classList.contains('open-menu') &&
    !cartMenu.classList.contains('open-cart') 
  )
  return;
  barsMenu.classList.remove('open-menu')
  cartMenu.classList.remove('open-cart')
  overlay.classList.remove('show-overlay')
}

//Funcion para cerrar menu cuando clickeamos los list

const closeOnClick = (e) => {
  if (!e.target.classList.contains('navbar-list')) return;
  barsMenu.classList.remove('open-menu');
  overlay.classList.remove('show-overlay');
};

const closeOnOverlayClick = () => {
  barsMenu.classList.remove('open-menu');
  cartMenu.classList.remove('open-cart');
  overlay.classList.remove('show-overlay');
}

/* --------LOGICA DEL CARRITO--------*/


// Funcion para retornar el html a renderizar en el carrito.

const renderCartProduct = (cartProduct) => {
  const { id, name, price, imagen, quantity } = cartProduct;
  return `
  <div class="cart-item">
    <img src=${imagen} alt="Productos" />
    <div class="item-info">
      <h3 class="item-title">${name}</h3>
      <span class="item-bid">$${price}</span>
    </div>
    <div class="item-handler">
      <span class="quantity-handler down" data-id=${id}>-</span>
      <span class="item-quantity">${quantity}</span>
      <span class="quantity-handler up" data-id=${id}>+</span>
    </div>
  </div>
  `;
};



//Funcion para que aparezca un mensaje cuando el carrito esta vacio
const renderCart = () => {
  if (!cart.length) {
    productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito</p>`;
    return;
  }
  productsCart.innerHTML = cart.map(renderCartProduct).join("");
};


//Con esta funcion nos retorna un numero osea el total del carrito
const getCartTotal = () => {
  return cart.reduce((acc, cur) => acc + Number(cur.price) + cur.quantity, 0);
  
};

//Funcion para setear el numero y darle un limite de decimales en este caso de 2.
const showTotal = () => {
  total.innerHTML = `$ ${getCartTotal().toFixed(2)}`;
  
};

//Funcion para deshabilitar los botones comprar y vaciar del carrito cuando no haya nada.
const disableBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("disabled");
  } else {
    btn.classList.remove("disabled");
  }
};

//Funcion para la logica del boton de agregar productos al carrito */

const createProductData = (id, name, price, imagen) => {
  return {id, name, price, imagen };
};

const isExistingCartProduct = (product) => {
  return cart.find((item) => item.id === product.id);
  
};



//Funcion que recorre el carrito y añade una unidad mas a un producto existente
const addUnitToProduct = (product) => {
  cart = cart.map((cartProduct) => {
    return cartProduct.id === product.id
      ? {...cartProduct, quantity: cartProduct.quantity + 1}
      : cartProduct;
  });
  countProducts++;
  updateTooltip();
};



//Funcion de crear el producto si no tenemos nada en el carrito
const createCartProduct = (product) => {
  cart = [...cart, { ...product,quantity: 1 }];
  countProducts++;
  updateTooltip();
};



//Funcion para mostrar el modal 
const showSuccessModal = (msg) => {
  successModal.classList.add("active-modal");
  successModal.textContent = msg
  setTimeout(() => {
    successModal.classList.remove("active-modal");

  }, 1500);
};

const checkCartState = () => {
  saveLocalStorage(cart);
  renderCart(cart);
  showTotal(cart);
  disableBtn(buyBtn);
  disableBtn(deleteBtn);
};

const addProduct = (e) => {
  if (!e.target.classList.contains("btn-add")) return;

  const { id, name, price, imagen} = e.target.dataset;
  const product = createProductData(id, name, price, imagen);
  
   


  if (isExistingCartProduct(product)){
    
    //añadir una unidad
    addUnitToProduct(product)
    //mostrar el modal que se agrega una unidad
    showSuccessModal("Se agrego una unidad del producto al carrito");
    
    } else {
      //crear el producto
      createCartProduct(product)
      
      //mostrar el modal de que se agrego el producto
      showSuccessModal("El producto se ha agregado al carrito");
      
    }
    
    checkCartState();
    
    
};



const removeProductFromCart = (existingProduct) => {
  cart = cart.filter((product) => product.id !== existingProduct.id);
  checkCartState();

};

//contador
const checkProducts = () => {
  if(!cart.length) {
    countProducts = 0
    updateTooltip();
    return; 

  };
  
  cart.forEach(product => {
    countProducts = countProducts + (1 * product.quantity);
  });
  updateTooltip(); 
};

//Funcion que recorre el carrito y resta una unidad
const substractProductUnit = (existingProduct) => {
  cart = cart.map((product) => {
    return product.id === existingProduct.id
      ? { ...product, quantity: Number(product.quantity) - 1 }
      : product;
  });
  countProducts--;
  updateTooltip();
};

//Funcion para la logica del boton - y +

const handleMinusBtnEvent = (id) => {
 const existingCartProduct = cart.find((item) => item.id === id);
 if (existingCartProduct.quantity === 1 ) {
  if(window.confirm("Desea eliminar el producto del carrito")){
 //borrar producto
  removeProductFromCart(existingCartProduct)
  countProducts--;
  updateTooltip();
  }
  return; // evita que siga restando un producto cuando aprete el boton de cancelar
  
}
 //Restar uno al producto existente
  substractProductUnit(existingCartProduct);
};

const handlePlusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  addUnitToProduct(existingCartProduct); // reutilizo el addUnitToProduct para sumarle 1 +
  
}


const handleQuantity = (e) => {
  if(e.target.classList.contains("down")) {
    handleMinusBtnEvent(e.target.dataset.id);
  } else if (e.target.classList.contains("up")) {
    handlePlusBtnEvent(e.target.dataset.id);
  }
 checkCartState();
}

//Funcion para la logica de los botones COMPRAR y VACIAR CARRITO

const resetCartItems = () => {
  cart = []
  checkCartState()
  countProducts = 0;
  updateTooltip();
}

const completeCartAction = (confirmMsg,successMsg) => {
  if(!cart.length) return
  if(window.confirm(confirmMsg)) {
    resetCartItems();
    alert(successMsg);
  }
}

const completeBuy = () => {
  completeCartAction("¿Desea completar su compra?" , "¡Gracias por su compra!");
};

const deleteCart = () => {
  completeCartAction("¿Desea vaciar el carrito?" , "No hay productos en el carrito");
  
}

//Funcion que actualiza el tooltip del contador
const updateTooltip = () => {
  resultado.textContent = countProducts;
  if (!countProducts){
    tooltip.classList.add('remove');
  
  
  } else {
    tooltip.classList.remove("remove");
  }
  
}


//funcion inicializadora
const init = () => {
    renderProducts();
    checkProducts();
    categories.addEventListener('click', applyFilter);
    btnLoad.addEventListener('click', showMoreProducts);
    cartBtn.addEventListener("click", toggleCart);
    barsBtn.addEventListener("click", toggleMenu);
    window.addEventListener('scroll', closeOnScroll);
    barsMenu.addEventListener('click', closeOnClick);
    overlay.addEventListener('click', closeOnOverlayClick);
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", showTotal);
    products.addEventListener("click", addProduct);
    productsCart.addEventListener('click', handleQuantity);
    disableBtn(deleteBtn);
    disableBtn(buyBtn);
    buyBtn.addEventListener('click', completeBuy);
    deleteBtn.addEventListener('click', deleteCart);
    
  }

init();