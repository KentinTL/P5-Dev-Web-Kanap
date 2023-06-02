// On récupere nos information depuis le fichier Product.js situé dans dossier back/models/
let url = "http://localhost:3000/api/products/";
const kanapData = fetch(url)
.then(function(response) {

  return response.json();

}).then(function(products){
  
  console.log(products);
  
  // ICI on boucle sur notre tableau products afin de récupérer chaque product 
  for(let i = 0; i < products.length; i++) {
    const product = products[i];
    // On créer une balise a qui sera parente de nos élément et sera
    // elle meme enfant de notre section dans le html existant
    const linkItem = document.createElement("a")
    linkItem.href = "./product.html" + "?id=" + product._id;
    
    // On creer un article dans le quel seront nos éléments lui meme
    // enfant de notre balise a
    const articleItem = document.createElement("article");
    
    // Création d'un élément image
    const imageItem = document.createElement("img");
    imageItem.src = product.imageUrl;
    
    // Création d'un élément h3
    const nameItem = document.createElement("h3");
    nameItem.classList.add("productName");
    nameItem.innerText = product.name;
    
    // Création d'une description via l'élément p
    const descriptionItem = document.createElement(
      "p",({class: "productDescription"}),
      );
      descriptionItem.innerText = product.description;
      
      // Ici on choisit l'élément qui sera le parent de nos éléments créer ci-dessus
      const itemsParent = document.querySelector("#items");

      // La on creer notre ordre d'apparition
      articleItem.appendChild(imageItem);//on pousse notre image dans notre article
      articleItem.appendChild(nameItem);//On pousse notre nom dans notre article
      articleItem.appendChild(descriptionItem);//On pousse notre description dans notre article
      
      linkItem.appendChild(articleItem);//On pousse notre article et ses détails dans notre lien
      
      itemsParent.appendChild(linkItem);//Enfin on pousse notre lien dans la balise section qui le parent global
    }
      
    }).catch(function(error){

  console.log(error);

})