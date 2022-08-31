// Recupération de l'ID de commande depuis l'URL

const paramsOrderId = new URLSearchParams(document.location.search);
const orderId = paramsOrderId.get("orderId");

// Affichage de la commande
orderIdTxt = document.getElementById("orderId");
orderIdTxt.innerHTML = orderId;
