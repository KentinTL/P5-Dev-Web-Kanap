fetch("http://localhost:3000/api/products/")
  .then(function (response) {
    return response.json();
  })
  .then(function (products) {
    // Ici on récupère les canapé du localStorage
    let getkanapInfos = JSON.parse(localStorage.getItem("kanapInfos"));

    for (let i = 0; i < getkanapInfos.length; i++) {
      let myCart = getkanapInfos[i];
      // Création de mes balise img et option nécessaire
      let selectImgParent = document.querySelector(".cart__item__img");
      let imageItem = document.createElement("img");

      let selectTextParent = document.querySelector(
        ".cart__item__content__description",
      );
      let titleItem = document.createElement("h2");
      let descriptionItem = document.createElement("p");
      let priceItem = document.createElement("p");

      let quantityItem = document.getElementById("123");
      console.log(quantityItem.value);
      quantityItem.value = myCart.quantity;
      console.log(quantityItem.value);

      products.forEach((product) => {
        if (product._id === myCart.id) {
          imageItem.src = product.imageUrl;
          imageItem.alt = product.altTxt;
          selectImgParent.appendChild(imageItem);
          titleItem.innerHTML = product.name;
          selectTextParent.appendChild(titleItem);
          descriptionItem.innerHTML = product.description;
          selectTextParent.appendChild(descriptionItem);
          priceItem.innerHTML = product.price + " €";
          selectTextParent.appendChild(priceItem);
          quantityItem;
        }
      });
    }
  });
