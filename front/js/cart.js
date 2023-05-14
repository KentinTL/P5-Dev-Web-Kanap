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
              // ICI on veut supprimer un article du panier si l'utilisateur déclare sa quantité a 0
              // if (newQuantity == 0) {
              //   console.log("YO c'est moi le new quantity qui est égale a 0");
                
              //   deleteIfNone(quantityItemInput)

              // }
              localStorage.setItem("kanapInfos", JSON.stringify(getkanapInfos));
              window.location.reload();
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
        
        // Ici j'ajoute mon envent suppression
        // deleteItemP.addEventListener("click", function() {
        //   let deleteAnItem = getKanapInfos.filter(
        //     (e) => e.id != item.id || e.color != item.color,
        //   );
            
        // });
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
const addressRules = /^\d{0,9}\s[\p{L}\s'-]{2,256}$/u;
const mailRules = /^(?!^\.)(?!.*\.{2})[\w.]{2,256}@([a-zA-Z]{2,256}\.)+[a-zA-Z]{2,4}$/;
const form = document.querySelector(".cart__order__form")


let firstNameUser = document.getElementById("firstName");
firstNameUser.addEventListener("change", () => 
{
  if (cityNamesRules.test(firstNameUser.value)) {
    console.log("Le nom est valide");
  } else {
    console.log("Le nom n'est pas valide");
  }
});

let lastNameUser = document.getElementById("lastName");
if (cityNamesRules.test(lastNameUser)) {
  console.log("Le nom est valide");
} else {
  console.log("Le nom n'est pas valide");
}

let addressUser = document.getElementById("address");
if (addressRules.test(addressUser)) {
  console.log("L'adresse est valide");
} else {
  console.log("L'adresse n'est pas valide");
}

let cityUser = document.getElementById("city");
if (cityNamesRules.test(cityUser)) {
  console.log("La ville est valide");
} else {
  console.log("La ville n'est pas valide");
}

let mailUser = document.getElementById("email");
if (mailRules.test(mailUser)) {
  console.log("L'adresse e-mail est valide");
} else {
  console.log("L'adresse e-mail n'est pas valide");
}

const userInfos = {
  prenom : firstNameUser,
  nom : lastNameUser,
  adrresse : addressUser,
  ville : cityUser,
  email : mailUser
}

function checkForm() {
  let sendButton = getElementById("order");
  sendButton.addEventListener("click", function() {
    var getUserInfos = JSON.parse(localStorage.getItem("userInfos"));
    if (getUserInfos) {
      console.log("Chelou y'a déjà tes infos !");
    } else {
      getUserInfos.push(userInfos);
      localStorage.setItem("userInfos", JSON.stringify(getUserInfos));
    }

  });
}
globalCart()