//récupération du panier dans le local storage
const cart = JSON.parse(window.localStorage.getItem("cart"));
let totalProducts = 0;
let totalPrice = 0;

//reccuperation des données de l'api
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
  mainContainer.innerHTML = "";
  totalPrice = 0;
  totalProducts = 0;
  for (let i = 0; i < cart.length; i++) {
    let userProduct = await getProductById(cart[i].id);

    //creation du conteneur de chaque élément et ajout de sa class, de l'id et le couleur
    const productContainer = document.createElement("article");
    productContainer.classList.add("cart__item");
    productContainer.dataset.id = cart[i].id;
    productContainer.dataset.color = cart[i].color;
    productContainer.dataset.price = userProduct.price;

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
    productColor.innerHTML = "Couleur : " + cart[i].color;

    //prix du produit
    let productPrice = userProduct.price;
    const productPricedisplay = document.createElement("p");
    productPricedisplay.innerHTML = Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(productPrice);

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

    //modification quantité
    productQuantitySelector.addEventListener("change", (event) => {
      const value = event.target.value;
      const cartProduct = cart.find(
        (element) =>
          element.id === userProduct._id &&
          element.color === productContainer.dataset.color
      );
      cartProduct.quantity = value;
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log(cartProduct);
      showCart();
    });

    //calcul du prix et de la quantité totale
    totalProducts += parseInt(cart[i].quantity, 10);
    totalPrice += userProduct.price * cart[i].quantity;

    //quantité totale
    const totalQuantityDisplay = document.getElementById("totalQuantity");
    totalQuantityDisplay.innerHTML = totalProducts;

    //prix total
    const totalPriceDisplay = document.getElementById("totalPrice");
    totalPriceDisplay.innerHTML = Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(totalPrice);

    //Créaation du bloc supprimer
    const productDeleteContainer = document.createElement("div");
    productDeleteContainer.classList.add(
      "cart__item__content__settings__delete"
    );

    //bouton supprimer
    const productDelete = document.createElement("p");
    productDelete.classList.add("deleteItem");
    productDelete.innerHTML = "Supprimer";
    productDelete.addEventListener("click", () => {
      deleteProduct(userProduct);
      alert(userProduct.name + " supprimé du panier.");
    });

    //ajout des élément les uns dans les autres dans le HTML
    mainContainer.appendChild(productContainer);
    productContainer.appendChild(imgContainer);
    imgContainer.appendChild(productImg);
    productContainer.appendChild(productContentContainer);
    productContentContainer.appendChild(productDescription);
    productDescription.appendChild(productName);
    productDescription.appendChild(productColor);
    productDescription.appendChild(productPricedisplay);
    productContentContainer.appendChild(productSettings);
    productSettings.appendChild(productQuantityContainer);
    productQuantityContainer.appendChild(productQuantity);
    productQuantity.appendChild(productQuantitySelector);
    productSettings.appendChild(productDeleteContainer);
    productDeleteContainer.appendChild(productDelete);
  }
}
showCart();

//suppression d'un produit
function deleteProduct(product) {
  cart.splice(
    cart.findIndex((v) => v.id === product._id),
    1
  );
  console.log({ product, cart });
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}
