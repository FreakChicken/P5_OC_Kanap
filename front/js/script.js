//Récupération des données sur les canap
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((response) => {
    showProducts(response);
  })
  .catch((error) => alert("Erreur : " + error));

//Parcour et affichage des canapés
const showProducts = (products) => {
  //séléction du conteneur des produits dans le HTML
  const productContainer = document.getElementById("items");
  //parcour du  tableau des produits
  for (product of products) {
    //création du lien englobant la vignette produit
    const productLink = document.createElement("a");
    productLink.href = "./product.html?id=" + product._id;
    //création de la vignette produit en balise article
    const productArticle = document.createElement("article");
    //creation de l'image
    const productImg = document.createElement("img");
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;
    //creation de la description
    const productDescription = document.createElement("p");
    productDescription.innerHTML = product.description;
    //création du H3, ajout de la valeur et de la classe
    const productName = document.createElement("h3");
    productName.innerHTML = product.name;
    productName.classList.add("productName");

    //Ajout des éléments les uns dans les autres
    productArticle.appendChild(productImg);
    productArticle.appendChild(productName);
    productArticle.appendChild(productDescription);
    productLink.appendChild(productArticle);
    productContainer.appendChild(productLink);
  }
};
