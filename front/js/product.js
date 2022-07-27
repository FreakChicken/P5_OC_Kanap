const productColors = document.getElementById("colors");
const productQty = document.getElementById("quantity");
//on récupère l'ID dans l'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

// On récupère un canapé
fetch("http://localhost:3000/api/products/" + productId)
  .then((response) => response.json())
  .then((response) => {
    showProduct(response);
  })
  .catch((error) => alert("Erreur " + error));

//On affiche les infos du produit
const showProduct = (product) => {
  //on pointe vers l'image du produit dans le HTML
  const productImageContainer = document.querySelector(".item__img");
  //creation de l'image
  const productImage = document.createElement("img");
  productImage.src = product.imageUrl;
  productImage.alt = product.altTxt;
  //ajout de l'image dans son conteneur
  productImageContainer.appendChild(productImage);

  //on renseigne le nom du produit
  const productName = document.getElementById("title");
  productName.innerHTML = product.name;
  //on renseigne le prix du produit
  const productPrice = document.getElementById("price");
  productPrice.innerHTML = product.price;
  //   on renseigne la déscription du produit
  const productDescription = document.getElementById("description");
  productDescription.innerHTML = product.description;
  //ajout du choix des couleurs

  for (const color of product.colors) {
    const productColor = document.createElement("option");
    productColor.innerHTML = color;
    productColor.value = color.toLowerCase();
    productColors.appendChild(productColor);
  }

  //modification du nom de la page
  const productPageName = document.querySelector("title");
  productPageName.innerHTML = product.name;
};

const addToCartButton = document.getElementById("addToCart");
addToCartButton.addEventListener("click", () => {
  if (productColors.value === "") {
    alert("Veuillez séléctionner une couleur svp");
  } else if (productQty.value < 1) {
    alert("Veuillez séléctionner une quantité svp");
  } else {
    addToCart();
  }
});
const addToCart = () => {
  //récuperer le panier (tableau cart) dans local storage
  //si cart existe en local storage alors parcourir le tableau pour verifier que le produit n'y est pas déjà (id + couleur)
  //si il y est on ajoute la quantité choisie au produit deja existant dans le panier
  //sinon j'ajoute le produit dans mon panier
  //si le panier n'existe pas on crée un tableau et on met le produit dedans
  //enfin, toujours remttre ça dans le local storage
};
