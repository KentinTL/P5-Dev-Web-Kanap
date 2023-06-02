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
        // import des éléments entre eux dans le HTMl
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
        // import des éléments entre eux dans le HTMl
        quantityItem.appendChild(quantityItemTxt);
        quantityItem.appendChild(quantityItemInput)
        settingsItem.appendChild(quantityItem);

        // Fonction gérant la quantité dans le localStorage en fonction de celle changé dans l'input
        quantityItemInput.addEventListener("change", function () {
          // récupération de la quantité dans le localStorage via l'élément item
          let itemQuantity = parseInt(item.quantity);
          // Nouvelle quantité mise a jour
          let getNewInputQuantity = quantityItemInput.value;
          // Vérification du match entre les éléments du panier et du localStorage via id et color
          if (getkanapInfos) {
            let searchQuantity = getkanapInfos.find(
              (e) => e.id === item.id && e.color === item.color
            ); 
            // On vient vérifier la quantité de Base
            if (searchQuantity) {
              // Ici on parse la quantité récupérer pour qu'elle passe de String a Int
              let newSearchQuantity = parseInt(searchQuantity.quantity);
              console.log("Je suis newSearchQuantity " + newSearchQuantity);
              let newQuantity = getNewInputQuantity;
              console.log("Je suis newQuantity " + newQuantity);
              searchQuantity.quantity = newQuantity;
              localStorage.setItem("kanapInfos", JSON.stringify(getkanapInfos));
              // A chaque changement de quantité dans le html on reload la page pour le calcul quantité et total prix soit mis à jour
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

// Ici on créer nos regex pour les nom prenom et villes qui sont relativement les mêmes
const cityNamesRules = new RegExp (/^[\p{L}\s'-]{2,256}$/u);
// Regex pour les Adresses
const addressRules = /^(?:(?=\d{1,9}\b)\d{1,9}\s[\p{L}\s',-]{2,256}|\b[\p{L}\s',-]{2,256}\d{1,9}(?<=\b\d{1,9}))$/u;
// Regex pour les mails 
const mailRules = /^(?!^\.)(?!.*\.{2})[\w.]{2,256}@([a-zA-Z]{2,256}\.)+[a-zA-Z]{2,4}$/;

// On créer la constante form qui récupère notre parent : formulaire html
const form = document.querySelector(".cart__order__form")

// On sélectionne notre input FirstName et on vérifie le matching entre ce qui est écrit dedans et notre regex
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

// On sélectionne notre input lastName et on vérifie le matching entre ce qui est écrit dedans et notre regex
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

// On sélectionne notre input address et on vérifie le matching entre ce qui est écrit dedans et notre regex
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

// On sélectionne notre input city et on vérifie le matching entre ce qui est écrit dedans et notre regex
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

// On sélectionne notre input email et on vérifie le matching entre ce qui est écrit dedans et notre regex
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

// Création d'une fonctions checkForm qui va envoyer le formulaire au backend
// Ainsi que vérifier si les champs d'input sont correctements remplis 
function checkForm() {
  // Déclaration d'une variable qui récupère l'id du button order
  let sendButton = document.getElementById("order");
  // Création d'un évennement click sur le button orde
  sendButton.addEventListener("click", function() {
    let getKanapInfos = JSON.parse(localStorage.getItem("kanapInfos"));
    // On boucle sur les éléments dans le localStorage pour récupérer les id de ces mêmes éléments
    if (getKanapInfos) {
      const kanaps = [];
       for (let kanap of getKanapInfos) {
         console.log(kanap.id);
          kanaps.push(kanap.id);
       }
      //  On créer notre constante order contenant l'objet contact et les paramètre qui seront envoyé au backend
      // Et l'obejt products qui sera égale aà notre tableau d'id kanap déclaré ci-dessus
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
      
      // ICI on vérifie que les champs de formulaire ne soit pas vide
      // On déclenche une alerte si l'un d'entre eux l'est
      if (order.contact.firstName === ""
      || order.contact.lastName === "" 
      || order.contact.address === "" 
      || order.contact.city === "" 
      || order.contact.email === "") {
        alert("Veuillez remplir tout les champs si vous voulez valider votre commande")
      }
      else {
        alert("Votre commande a été validé redirection...");
        // On déclare notre options de fecth avec la method le header et le body
        const options = {
          method: 'POST',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(order)
        }
        // Ici on fetch notre api avec nos options déclaré au préalable
        fetch("http://localhost:3000/api/products/order", options)
          .then((response)=>response.json())
          .then((data)=>{
            console.log(data);
            // Enfin on se déplace vers la page de confirmation
            document.location.href = "confirmation.html?orderId=" + data.orderId;
          });
      }
    }
  });
};
// On fait appel à nos fonctions pour le bon fonctionnement du code
checkForm();
globalCart();