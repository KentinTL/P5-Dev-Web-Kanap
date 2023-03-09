// On récupere nos information depuis le fichier Product.js situé dans dossier back/models/
// const kanapData = fetch("./back/models/Product.js");

// const resultKanap = kanapData.json();

// const nosKanap = kanapData.products[0];

// Ici on choisit l'élément qui sera le parent de nos éléments créer ci-dessus
const itemsParent = document.querySelector("#items");

// On créer une balise a qui sera parente de nos élément et sera
// elle meme enfant de notre section dans le html existant
const linkItem = document.createElement("a");

// On creer un article dans le quel seront nos éléments lui meme
// enfant de notre balise a
const articleItem = document.createElement("article");

// Création d'un élément image
const imageElement = document.createElement("img");
// imageElement.src = products.imageUrl;

// Création d'un élément h3
const nameElement = document.createElement("h3");
// nameElement.innerText = products.name;

// Création d'une description via l'élément p
const descriptionElement = document.createElement("p");
// nameElement.innerText = products.name;

// La on creer notre ordre d'apparition

itemsParent.appendChild(linkItem);
linkItem.appendChild(articleItem);

articleItem.appendChild(imageElement);
articleItem.appendChild(nameElement);
articleItem.appendChild(descriptionElement);
