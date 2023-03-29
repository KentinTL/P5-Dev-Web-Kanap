let parseUrl = new URL(window.location.href);//Récupération de l'URL

let id = parseUrl.searchParams.get('id');//attribution de la valeur id dans l'url à notre variable id


fetch("http://localhost:3000/api/products/")
.then(function(response) {
  
  return response.json();
  
}).then(function(products){
  products.forEach(product => {    
    if (id === product._id) {
      let kanapImg = product.imageUrl;
      let imgAlt = product.altTxt;
      let kanapName = product.name;
      let kanapPrice = product.price;
      let kanapDescription = product.description;
      let kanapColors = product.colors;

      for (let index = 0; index < kanapColors.length; index++) {//On boucle sur le tableau de couleurs
        let kanapColor = kanapColors[index];
        let optionColor = document.createElement('option');
        optionColor.value = kanapColor;
        optionColor.innerHTML = kanapColor;
        let selectParents = document.getElementById("colors");
        selectParents.appendChild(optionColor);
        // document.getElementById('colors').innerHTML = '<option value="'+kanapColor+'">'+kanapColor+'</option>;'
      }
      
      
      // Création de mes balise img et option nécessaire
      document.getElementsByClassName('item__img').innerHTML = '<img src="'+kanapImg+'"alt="'+imgAlt+'">';
  
      // Affichage des éléments qui ne sont pas à créer
      document.getElementById("price").innerHTML=kanapPrice;
      document.getElementById("title").innerHTML=kanapName;
      document.getElementById("description").innerHTML=kanapDescription;
    }
  });


});