//fetch des données de l'api
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((response) => {
    showCartContent(response);
  })
  .catch((error) => alert("Erreur : " + error));

// //affichage des données du panier
// const showCartContent = () => {
//   //récupération du panier dans le local storage
//   const cart = JSON.parse(window.localStorage.getItem("cart"));
//   //séléction du conteneur des produits dans le HTML
//   const productContainer = document.querySelector(".cart__items");
//   //séléction du conteneur de l'image dans le HTML
//   const productImageContainer = document.querySelector(".item__img");
//   //creation de l'image
//   const productImage = document.createElement("img");
//   productImage.src = product.imageUrl;
//   productImage.alt = product.altTxt;
//   //ajout de l'image dans son conteneur
//   productContainer.appendChild(productImageContainer);
// };

//récupération du panier dans le local storage
const cart = JSON.parse(window.localStorage.getItem("cart"));
//parcours et affichage de info de l'api
const showCartContent = (products) => {
  //on parcours le tableau
  for (let product of products) {
    //selection du conteneur des produits dans le HTML
    const productContainer = document.getElementById("cart__item");
    //on pointe vers l'image du produit dans le HTML
    const productImageContainer = document.getElementById("cart__item__img");
    //creation de l'image
    const productImage = document.createElement("img");
    productImage.src = product.imageUrl;
    productImage.alt = product.altTxt;
    productContainer.appendChild(productImg);
  }
};
