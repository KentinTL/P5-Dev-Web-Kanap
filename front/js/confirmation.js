// recuperation Order Id avec searchParams 
let parseUrl = new URL(window.location.href);
let id = parseUrl.searchParams.get("orderId")
// Afficher l'id dans ma page confirmation
function displayId() {  
  let commandConfirm = document.getElementById("orderId")
  commandConfirm.innerHTML = id
  // Clear localstorage qui effacera panier actuel
  let getkanapInfos = JSON.parse(localStorage.getItem("kanapInfos"));
  if (getkanapInfos) {
    localStorage.clear();
  }
}
displayId()
