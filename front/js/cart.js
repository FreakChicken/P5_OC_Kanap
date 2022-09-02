//récupération du panier dans le local storage
const cart = JSON.parse(window.localStorage.getItem("cart"));

//déclaration des variables prix total et quantité totale
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

    //creation du conteneur de chaque élément et ajout de sa class, de l'id et la couleur
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
    productQuantitySelector.min = 1;
    productQuantitySelector.max = 100;
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

    //Création du bloc supprimer
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
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

//Formulaire de commande

//regex
let nameRegex = /^[a-zA-Z\-ñàéèêëïîôüù ]{2,}$/;
let addressRegex = /^[0-9a-zA-Z\s,.'-ñàéèêëïîôüù]{3,}$/;
let emailRegex = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,}$/;

// Récuperation  des champs du formulaire
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");

// Validation prénom
firstName.addEventListener("input", () => {
  if (!nameRegex.test(firstName.value) || firstName.value == "") {
    document.querySelector("#firstNameErrorMsg").innerHTML =
      "Prénom non valide";
  } else {
    document.querySelector("#firstNameErrorMsg").innerHTML = "";
  }
});

//validation nom de famille
lastName.addEventListener("input", () => {
  if (!nameRegex.test(lastName.value) || lastName.value == "") {
    document.querySelector("#lastNameErrorMsg").innerHTML = "Nom non valide";
  } else {
    document.querySelector("#lastNameErrorMsg").innerHTML = "";
  }
});

// Validation adresse postale
address.addEventListener("input", () => {
  if (!addressRegex.test(address.value) || address.value == "") {
    document.querySelector("#addressErrorMsg").innerHTML = "Adresse non valide";
  } else {
    document.querySelector("#addressErrorMsg").innerHTML = "";
  }
});

// Validation ville

city.addEventListener("input", () => {
  if (!nameRegex.test(city.value) || city.value == "") {
    document.querySelector("#cityErrorMsg").innerHTML = "Ville non valide";
  } else {
    document.querySelector("#cityErrorMsg").innerHTML = "";
  }
});

// Validation adresse mail

email.addEventListener("input", () => {
  if (!emailRegex.test(email.value) || email.value == "") {
    document.querySelector("#emailErrorMsg").innerHTML = "Email non valide";
    document.getElementById("order").disabled = true;
  } else {
    document.querySelector("#emailErrorMsg").innerHTML = "";
    document.getElementById("order").disabled = false;
  }
});

// Passer commande
let orderForm = document.querySelector(".cart__order__form");
orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Objet avec données utilisateur
  let contact = {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    address: address.value.trim(),
    city: city.value.trim(),
    email: email.value.trim(),
  };
  console.log(contact);

  // Si données non remplies
  if (
    firstName.value === "" ||
    lastName.value === "" ||
    address.value === "" ||
    city.value === "" ||
    email.value === ""
  ) {
    alert("Merci de renseigner vos coordonnées pour passer la commande.");
  }

  // Si données mal remplies
  else if (
    !nameRegex.test(firstName.value) ||
    !nameRegex.test(lastName.value) ||
    !addressRegex.test(address.value) ||
    !nameRegex.test(city.value) ||
    !emailRegex.test(email.value)
  ) {
    alert("Merci de renseigner correctement vos coordonnées.");
  }

  //si pret à passer la commande on récupère les id des produits du cart
  else {
    let products = [];
    cart.forEach((element) => {
      products.push(element.id);
    });
    //objet contenant les info contact et products
    const order = {
      contact,
      products,
    };

    // Appel à l'api order pour envoyer les tableaux

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => {
        return res.json();
      })
      .then((confirm) => {
        window.location.href = "./confirmation.html?orderId=" + confirm.orderId;
        localStorage.clear();
      })
      .catch((err) => {
        alert("une erreur est survenue" + err);
      });
  }
});
