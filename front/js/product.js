let parseUrl = new URL(window.location.href); //Récupération de l'URL

let id = parseUrl.searchParams.get("id"); //attribution de la valeur id dans l'url à notre variable id

fetch("http://localhost:3000/api/products/" + id)
  .then(function (response) {
    return response.json();
  })
  .then(function (product) {
    // Création de mes balise img et option nécessaire
    let selectImgParent = document.querySelector(".item__img");
    let imageItem = document.createElement("img");
    imageItem.src = product.imageUrl;
    imageItem.alt = product.altTxt;
    selectImgParent.appendChild(imageItem);

    // Récupération de la donnée name dans notre modeles/Product.js
    let kanapName = document.getElementById("title");
    kanapName.innerHTML = product.name;

    // Récupération de la donnée price dans notre modeles/Product.js
    let kanapPrice = document.getElementById("price");
    kanapPrice.innerHTML = product.price;

    // Récupération de la donnée description dans notre modeles/Product.js
    let kanapDescription = document.getElementById("description");
    kanapDescription.innerHTML = product.description;
    let kanapColors = product.colors;

    for (let index = 0; index < kanapColors.length; index++) {
      //On boucle sur le tableau de couleurs
      let kanapColor = kanapColors[index];
      var selectParents = document.getElementById("colors");
      var optionColor = document.createElement("option");
      optionColor.value = kanapColor;
      optionColor.innerHTML = kanapColor;
      selectParents.appendChild(optionColor);
    }

    // Développement de l'envois des données en appuyant sur le bouton addToCart
    let addButton = document.getElementById("addToCart");
    addButton.addEventListener("click", function () {
      let globalAdd = {
        id: id,
        color: ("color", selectParents.value),
        quantity: ("quantity", document.getElementById("quantity").value),
      };

      let getkanapInfos = JSON.parse(localStorage.getItem("kanapInfos"));
      // NE PAS OUBLIER de mettre des alertes en cas de non sélections d'une couleur et/ou d'un quantité
      if (globalAdd.color === "") {
        alert("Veuillez sélectionner une couleur");
      } else if (globalAdd.quantity === "0" || globalAdd.quantity === "") {
        alert("Veuillez sélectionner une quantité");
      } else {
        // besoin d'une conditions pour vérifier si la variable getkanapInfos existe
        if (getkanapInfos) {
          let searchDetails = getkanapInfos.find(
            (e) => e.id === globalAdd.id && e.color === globalAdd.color,
          );
          if (searchDetails) {
            let newQuantity =
              parseInt(globalAdd.quantity) + parseInt(searchDetails.quantity);//ici on change le type "string" en int afin de pouvoir les additionner
            searchDetails.quantity = newQuantity;
            localStorage.setItem("kanapInfos", JSON.stringify(getkanapInfos));
          } else {
            getkanapInfos.push(globalAdd);
            localStorage.setItem("kanapInfos", JSON.stringify(getkanapInfos));
          }
        } else {
          getkanapInfos = [];
          getkanapInfos.push(globalAdd);
          localStorage.setItem("kanapInfos", JSON.stringify(getkanapInfos));
        }
        alert("Félicitations vous avez envoyé un canapé dans votre panier");
      }

      // Condition pour vérifier si dans notre localstorage il existe déjà un id de même couleurs
      // Si id avec même couleur existe déjà incrémenter la quantité

      // Créer une variable qui sera = a getkanapInfos.find()
    });
  });
// Infos Local Storage
// Il faut une déclaration et un appel
// La déclaration c'est localstorage.setItem("kanapInfos", informations ou variable qui sera déclaré au préalable avec un getItem()) cela permet de créer notre "objet"
