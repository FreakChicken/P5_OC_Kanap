//déclaration des variables
const productColors = document.getElementById("colors");
const productQty = document.getElementById("quantity");

//récuperation de l'ID dans l'URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// On récupère un canapé
fetch("http://localhost:3000/api/products/" + productId)
  .then((response) => response.json())
  .then((response) => {
    showProduct(response);
    displayAndAddCartAction(response);
  })
  .catch((error) => alert("Erreur " + error));

//Affichage des infos du produit
const showProduct = (product) => {
  //on pointe vers l'image du produit dans le HTML
  const productImageContainer = document.querySelector(".item__img");
  //creation de l'image
  const productImage = document.createElement("img");
  productImage.src = product.imageUrl;
  productImage.alt = product.altTxt;
  //ajout de l'image dans son conteneur
  productImageContainer.appendChild(productImage);
  //ajout du nom du produit
  const productName = document.getElementById("title");
  productName.innerHTML = product.name;
  //ajout du prix du produit
  const productPrice = document.getElementById("price");
  productPrice.innerHTML = product.price;
  //ajout de la la déscription du produit
  const productDescription = document.getElementById("description");
  productDescription.innerHTML = product.description;

  //ajout du choix des couleurs
  for (const color of product.colors) {
    const productColor = document.createElement("option");
    productColor.innerHTML = color;
    productColor.value = color.toLowerCase();
    productColors.appendChild(productColor);
  }

  //modification du nom de la page (titre onglet)
  const productPageName = document.querySelector("title");
  productPageName.innerHTML = product.name;
};

//vérification des choix de couleurs et quantitées
function displayAndAddCartAction(product) {
  const addToCartButton = document.getElementById("addToCart");
  addToCartButton.addEventListener("click", () => {
    if (productColors.value === "") {
      alert("Veuillez séléctionner une couleur svp");
    } else if (productQty.value < 1) {
      alert("Veuillez séléctionner une quantité svp");
    } else if (productQty.value > 100) {
      alert("Veuillez séléctionner une quantité comprise entre 1 et 100 svp");
    } else {
      addToCart(product, productQty.value, productColors.value);
    }
  });
}

//ajout au panier
const addToCart = (product, quantity, color) => {
  //si il n'y a pas de cart dans le local storage
  if (!window.localStorage.getItem("cart")) {
    //on initie le cart sous forme de tableau dans le local storage
    window.localStorage.setItem("cart", JSON.stringify([]));
  }

  //on déclare un objet contenant les valeur nescessaires à la validation
  const payload = {
    id: product._id,
    color,
    quantity: parseInt(quantity, 10),
  };
  const cart = JSON.parse(window.localStorage.getItem("cart"));
  //si il n'y à pas délément ayant le meme ID que le payload dans le panier, on l'y ajoute
  if (!cart.some((element) => element.id === payload.id)) {
    cart.push(payload);
  } else {
    //on déclare une variable pour stocker les élément du cart ayant le meme ID que celui du payload
    let similarProducts = cart.filter((element) => element.id === payload.id);
    //si il n'y a pas d'élément de la meme couleur, on ajoute celui ci au panier
    if (similarProducts.every((element) => element.color !== payload.color)) {
      cart.push(payload);
      //si un élément du cart à la meme couleur et le meme ID que celui du payload, on modifie sa quantité dans le cart
    } else {
      //on stocke dans une variable l'index de l'élément déjà present dans le cart de meme couleur et de meme ID que celui du payload
      let productSameColorIndex = cart.findIndex(
        (element) =>
          element.id === payload.id && element.color === payload.color
      );
      //On ajoute la quantité du payload à la quantité du produit à l'index donné dans le cart
      cart[productSameColorIndex].quantity += payload.quantity;
    }
  }
  //enfin, on remet le cart dans le local storage
  window.localStorage.setItem("cart", JSON.stringify(cart));
  if (
    window.confirm("Le produit à été ajouté, voulez vous voir votre panier ?")
  ) {
    window.location.href = "cart.html";
  }
};
