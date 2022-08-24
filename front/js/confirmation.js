// Recupération de l'ID de commande depuis l'URL

let paramsOrderId = new URLSearchParams(document.location.search);
let orderId = paramsOrderId.get("orderId");

// Affichage de la commande
orderIdTxt = document.getElementById("orderId");
orderIdTxt.innerHTML = orderId;
