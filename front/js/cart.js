// //fetch des données de l'api
// fetch("http://localhost:3000/api/products")
//   .then((response) => response.json())
//   .then((response) => {
//     showCartContent(response);
//   })
//   .catch((error) => alert("Erreur : " + error));

//récupération du panier dans le local storage
const cart = JSON.parse(window.localStorage.getItem("cart"));
async function getProductById(productId) {
  return fetch("http://localhost:3000/api/products/" + productId)
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => {
      alert("Une erreur est survenue : " + err);
    });
}
const mainContainer = document.querySelector("#cart__items");
async function showCart() {
  for (let i = 0; i < cart.length; i++) {
    let userProduct = await getProductById(cart[i].id);
    //creation du conteneur de chaque élément et ajout de sa class
    const productContainer = document.createElement("article");
    productContainer.classList.add("cart__item");
    //creation du conteneur de l'image et ajout de sa class
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("cart__item__img");
    //creation de l'image
    const productImg = document.createElement("img");
    productImg.src = userProduct.imageUrl;
    productImg.alt = userProduct.altTxt;
    //creation du bloc contenant les blocs description et setting
    const productContentContainer = document.createElement("div");
    productContentContainer.classList.add("cart__item__content");
    //creation du bloc description
    const productDescription = document.createElement("div");
    productDescription.classList.add("cart__item__content__description");
    //Nom du produit
    const productName = document.createElement("h2");
    productName.innerHTML = userProduct.name;
    //couleur du produit
    const productColor = document.createElement("p");
    productColor.innerHTML = cart[i].color;
    //prix du produit
    const productPrice = document.createElement("p");
    productPrice.innerHTML = userProduct.price + " €";
    //création du bloc settings
    const productSettings = document.createElement("div");
    productSettings.classList.add("cart__item__content__settings");
    //creation du bloc quantité
    const productQuantityContainer = document.createElement("div");
    productQuantityContainer.classList.add(
      "cart__item__content__settings__quantity"
    );
    //quantité du produit
    const productQuantity = document.createElement("p");
    productQuantity.innerHTML = "Qté : ";
    //selecteur quantité
    const productQuantitySelector = document.createElement("input");
    productQuantitySelector.type = "number";
    productQuantitySelector.classList.add("itemQuantity");
    productQuantitySelector.name = "itemQuantity";
    productQuantitySelector.min = "1";
    productQuantitySelector.max = "100";
    productQuantitySelector.value = cart[i].quantity;
    // Prix total du panier / Quantité totale de produits dans le panier

    let totalQuantity = 0;
    let totalPrice = 0;

    for (i = 0; i < cart.length; i++) {
      const product = await getProductById(cart[i].id);
      totalQuantity += parseInt(cart[i].quantity);
      totalPrice += parseInt(product.price * cart[i].quantity);
    }
    //quantité totale
    const totalQuantityDisplay = document.getElementById("totalQuantity");
    totalQuantityDisplay.innerHTML = totalQuantity;
    //prix total
    const totalPriceDisplay = document.getElementById("totalPrice");
    totalPriceDisplay.innerHTML = totalPrice;
    //Créaation du bloc supprimer
    const productDeleteContainer = document.createElement("div");
    productDeleteContainer.classList.add(
      "cart__item__content__settings__delete"
    );
    //bouton supprimer
    const productDelete = document.createElement("p");
    productDelete.classList.add("deleteItem");
    productDelete.innerHTML = "Supprimer";

    //ajout des élément les uns dans les autres dans le HTML
    mainContainer.appendChild(productContainer);
    productContainer.appendChild(imgContainer);
    imgContainer.appendChild(productImg);
    productContainer.appendChild(productContentContainer);
    productContentContainer.appendChild(productDescription);
    productDescription.appendChild(productName);
    productDescription.appendChild(productColor);
    productDescription.appendChild(productPrice);
    productContentContainer.appendChild(productSettings);
    productSettings.appendChild(productQuantityContainer);
    productQuantityContainer.appendChild(productQuantity);
    productQuantity.appendChild(productQuantitySelector);
    productSettings.appendChild(productDeleteContainer);
    productDeleteContainer.appendChild(productDelete);

    // mainContainer.innerHTML += `<article class="cart__item" data-id="${cart[i].id}" data-color="${cart[i].color}">
    //             <div class="cart__item__img">
    //                 <img src="${userProduct.imageUrl}" alt="${userProduct.altTxt}">
    //             </div>
    //             <div class="cart__item__content">
    //                 <div class="cart__item__content__description">
    //                     <h2>${userProduct.name}</h2>
    //                     <p>${cart[i].color}</p>
    //                     <p id="price">${userProduct.price} €</p>
    //                 </div>
    //                 <div class="cart__item__content__settings">
    //                      <div class="cart__item__content__settings__quantity">
    //                         <p>Qté : </p>
    //                         <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantity}">
    //                     </div>
    //                     <div class="cart__item__content__settings__delete">
    //                         <p class="deleteItem">Supprimer</p>
    //                     </div>
    //                 </div>
    //             </div>
    //         </article>`;
  }
}
showCart();
