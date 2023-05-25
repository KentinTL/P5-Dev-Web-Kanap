// Ici on récupère les Items avec la clef "kanapInfos" dans notre localStorage
var getkanapInfos = JSON.parse(localStorage.getItem("kanapInfos"));
console.log(getkanapInfos);
function globalCart() {
  // On vient vérifier qu'il y a bien des données dans notre LocalStorage
  if(!getkanapInfos) {
    // Si pas de données éxistentes alors :
    console.log("Il n'y a rien dans le localStorage");
    alert('Votre panier est vide')
  } else {
    // Si données existentes alors :
    // On récupère le/les Item(s) qui est/sont dans le localStorage
    console.log("Il y a des item dans le localStorage");
    // Ici on vient gérer les totaux "Quantité" et "Prix"
    let totalPrice = 0;
    let totalKanap = 0;
    for (let c = 0; c < getkanapInfos.length; c++) {
      // On stock dans une variable les données item par item 
      const item = getkanapInfos[c];
      // On vient lier les "Objets" de Products.js pour pouvoir comparer avec notre localStorage
      fetch("http://localhost:3000/api/products/" + item.id)
        .then(function(response) {
        return response.json();
      })
      .then(function(products){
        // Grace à notre item.id concaténer dans le fetch on récupère uniquement le/les Objet(s)
        // du Product.js correspondant à/aux id de notre localStorage
        console.log(products);
        console.log(item.quantity);
        // Maintenant on créer nos éléments html

        // Notre article
        const articleItem = document.createElement("article");
        articleItem.classList.add("cart__item");
        articleItem.setAttribute("data-id", item.id);
        articleItem.setAttribute("data-color", item.color);

        // Notre div pour l'image
        const divImg = document.createElement("div");
        divImg.classList.add("cart__item__img");
        articleItem.appendChild(divImg);
        // Notre image de la div "cart__item__img"
        const kanapImg = document.createElement("img");
        kanapImg.src = products.imageUrl;
        kanapImg.alt = products.altTxt;
        divImg.appendChild(kanapImg)

        // Notre div container pour "Nom, Couleur, Prix" puis "Quantité" et "Bouton Supprimé"
        let contentItem = document.createElement("div");
        contentItem.classList.add("cart__item__content")
        articleItem.appendChild(contentItem);

        // Notre div pour "Nom, Couleur, Prix"
        let descriptionItem = document.createElement("div");
        descriptionItem.classList.add("cart__item__content__description");
        let nameItem = document.createElement("h2");
        nameItem.innerHTML = products.name;
        let colorItem = document.createElement("p");
        colorItem.innerHTML = item.color;
        let priceItem = document.createElement("p");
        priceItem.innerHTML = products.price + "€";
        descriptionItem.appendChild(nameItem);
        descriptionItem.appendChild(colorItem);
        descriptionItem.appendChild(priceItem);
        contentItem.appendChild(descriptionItem);
        articleItem.appendChild(contentItem);

        // Notre div pour "Quantité" et "Bouton Supprimer"
        let settingsItem = document.createElement("div");
        settingsItem.classList.add("cart__item__content__settings");
        // Notre div pour la "Quantité"
        let quantityItem = document.createElement("div");
        quantityItem.classList.add("cart__item__content__settings__quantity")
        let quantityItemTxt = document.createElement("p");
        quantityItemTxt.innerHTML = "Qté : ";
        quantityItem.appendChild(quantityItemTxt);
        let quantityItemInput = document.createElement("input");
        quantityItemInput.type = "number";
        quantityItemInput.classList.add("itemQuantity");
        quantityItemInput.name = "itemQuantity";
        quantityItemInput.min = "1";
        quantityItemInput.max = "100";
        quantityItemInput.value = item.quantity;

        quantityItem.appendChild(quantityItemTxt);
        quantityItem.appendChild(quantityItemInput)
        settingsItem.appendChild(quantityItem);

        quantityItemInput.addEventListener("change", function () {
          let itemQuantity = parseInt(item.quantity);
          console.log("je suis un test de " + itemQuantity);
          let getNewInputQuantity = quantityItemInput.value;
          console.log("Je suis un test de la valeur de l'input : " + getNewInputQuantity);
          if (getkanapInfos) {
            let searchQuantity = getkanapInfos.find(
              (e) => e.id === item.id && e.color === item.color, 
            ); 
            console.log("Je suis itemQuantity avant le calcul " + itemQuantity);
            if (searchQuantity) {
              console.log("Je suis searchQuantity avant le PARSEINT " + searchQuantity.quantity);
              let newSearchQuantity = parseInt(searchQuantity.quantity);
              console.log("Je suis newSearchQuantity " + newSearchQuantity);
              let newQuantity = getNewInputQuantity;
              console.log("Je suis newQuantity " + newQuantity);
              searchQuantity.quantity = newQuantity;
              localStorage.setItem("kanapInfos", JSON.stringify(getkanapInfos));
              // window.location.reload();
            }
            else{
              getkanapInfos.push(item);
              localStorage.setItem("kanapInfos", JSON.stringify(getkanapInfos));
            }
          }
        })

        // Notre div pour le "Bouton Supprimer"
        let settingsdeleteItem = document.createElement("div");
        settingsdeleteItem.classList.add("cart__item__content__settings__delete")
        let deleteItemP = document.createElement("p");
        deleteItemP.classList.add("deleteItem")
        deleteItemP.innerHTML = "Supprimer";
        settingsdeleteItem.appendChild(deleteItemP);
        settingsItem.appendChild(settingsdeleteItem);
        
        function deleteIfNone(id) {
          localStorage.setItem("kanapInfos", JSON.stringify(id));
          window.location.reload();
        }
        deleteItemP.addEventListener("click", function() {
          let deleteAnItem = getkanapInfos.filter(
            (e) => e.id != item.id || e.color != item.color,
            );
          deleteIfNone(deleteAnItem)
        });
          
        // On ajoute notre div "Quantité" et "Bouton Supprimer" notre div article
        articleItem.appendChild(settingsItem);

        // On sélectionne le parent html dans lequel nos éléments créés seront affichés
        const parentElement = document.querySelector("#cart__items");
        parentElement.appendChild(articleItem);
        
        // Ici on calcul notre prix total
        console.log(`totalPrice = ${totalPrice} + (${products.price} * ${item.quantity})`);
        totalPrice = totalPrice + (products.price * item.quantity);
        let totalPriceElement = document.getElementById("totalPrice");
        totalPriceElement.innerHTML = totalPrice;
        console.log(`totalPrice = ${totalPrice}`);
        // Ici on calcul notre quantité total
        console.log(`totalQuantity = ${totalKanap} + ${parseInt(item.quantity)}`)
        totalKanap = totalKanap + parseInt(item.quantity);
        let totalKanapElement = document.getElementById("totalQuantity");
        totalKanapElement.innerHTML = totalKanap;
        console.log(totalKanap);
      });
    }
  }
}

const cityNamesRules = new RegExp (/^[\p{L}\s'-]{2,256}$/u);
const addressRules = /^(?:(?=\d{1,9}\b)\d{1,9}\s[\p{L}\s',-]{2,256}|\b[\p{L}\s',-]{2,256}\d{1,9}(?<=\b\d{1,9}))$/u;
const mailRules = /^(?!^\.)(?!.*\.{2})[\w.]{2,256}@([a-zA-Z]{2,256}\.)+[a-zA-Z]{2,4}$/;
const form = document.querySelector(".cart__order__form")

let firstNameUser = document.getElementById("firstName");
firstNameUser.addEventListener("change", () => 
{
  let errorMsg = document.getElementById("firstNameErrorMsg");
  if (cityNamesRules.test(firstNameUser.value)) {
    console.log("Le nom est valide");
    errorMsg.textContent = "";
  } else {
    console.log("Le nom n'est pas valide");
    errorMsg.textContent = "Votre prénom : " + firstNameUser.value + " n'est pas reconnu !";
  }
});

let lastNameUser = document.getElementById("lastName");
lastNameUser.addEventListener("change", () =>
{
  let errorMsg = document.getElementById("lastNameErrorMsg");
  if (cityNamesRules.test(lastNameUser.value)) {
    console.log("Le nom est valide");
    errorMsg.textContent = "";
  } else {
    console.log("Le nom n'est pas valide");
    errorMsg.textContent = "Votre nom : " + lastNameUser.value + " n'est pas reconnu !";
  }
});

let addressUser = document.getElementById("address");
addressUser.addEventListener("change", () =>
{
  let errorMsg = document.getElementById("addressErrorMsg");
  if (addressRules.test(addressUser.value)) {
    console.log("L'adresse est valide");
    errorMsg.textContent = "";
  } else {
    console.log("L'adresse n'est pas valide");
    errorMsg.textContent = "Votre adresse : " + addressUser.value + " n'est pas reconnu !";
  }
});

let cityUser = document.getElementById("city");
cityUser.addEventListener("change", () =>
{
  let errorMsg = document.getElementById("cityErrorMsg");
  if (cityNamesRules.test(cityUser.value)) {
    console.log("La ville est valide");
    errorMsg.textContent = "";
  } else {
    console.log("La ville n'est pas valide");
    errorMsg.textContent = "Votre ville : " + cityUser.value + " n'est pas reconnu !";                        
  }
});

let mailUser = document.getElementById("email");
mailUser.addEventListener("change", () =>
{
  let errorMsg = document.getElementById("emailErrorMsg");
  if (mailRules.test(mailUser.value)) {
    console.log("L'adresse e-mail est valide");
    errorMsg.textContent = "";
  } else {
    console.log("L'adresse e-mail n'est pas valide");
    errorMsg.textContent = "Votre adresse mail : " + mailUser.value + " n'est pas reconnu !"; 
  }
});


function checkForm() {
  // envoyer les infos plus les id de produits vers fetch order en method post
  // Gerer la method post le body et le header
  let sendButton = document.getElementById("order");
  sendButton.addEventListener("click", function() {
    let getKanapInfos = JSON.parse(localStorage.getItem("kanapInfos"));
    if (getKanapInfos) {
      // let searchId = getKanapInfos.find(
      //   (element) => element.id 
      //   ) 
      const kanaps = [];
       for (let e = 0; e < getKanapInfos.length; e++) {
         var kanap = getKanapInfos[e];
         console.log(kanap.id);
          kanaps.push(kanap.id);
       }
      // console.log(kanap.id);
      const order = {
        contact:{
          firstName : firstNameUser.value,
          lastName : lastNameUser.value,
          address : addressUser.value,
          city : cityUser.value,
          email : mailUser.value
        },
        products: kanaps
      } 
      console.log(order);
      
      if (order.contact.firstName === ""
      || order.contact.lastName === "" 
      || order.contact.address === "" 
      || order.contact.city === "" 
      || order.contact.email === "") {
        alert("Veuillez remplir tout les champs si vous voulez valider votre commande")
      }
      else {
        alert("Votre commande a été validé redirection...");

        let url = "http://localhost:3000/api/products/order/";
        fetch(url, {
          method: 'POST',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(order)
        }).then(function(response) { 
          console.error(response);
          return response.json() 
        }).then(function(data) {
          console.log("FUCK YOU", data);
        }).catch(function(error){
          console.error(error)
        });
      }
    }
  });
};


checkForm();
globalCart();