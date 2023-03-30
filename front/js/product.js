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
      let optionColor = document.createElement("option");
      optionColor.value = kanapColor;
      optionColor.innerHTML = kanapColor;
      let selectParents = document.getElementById("colors");
      selectParents.appendChild(optionColor);
      // document.getElementById('colors').innerHTML = '<option value="'+kanapColor+'">'+kanapColor+'</option>;'
    }
  });
