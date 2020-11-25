/** Add any JavaScript you need to this file. */
const figures = window.products;
var attributes = ['one', 'two', 'three'];

function getByCategory(category1 = 'All', category2 = undefined) {
  let figureByCategory;
  if (category1 === 'All') figureByCategory = figures;
  else {
    if (category2 === undefined)
      figureByCategory = figures.filter(figure => figure.category === category1);
    else
      figureByCategory = figures.filter(
        figure => figure.category === category1 || figure.category === category2
      );
  }
  return figureByCategory;
}

function getByPrice(figureArray, minPrice = 0, maxPrice = 100000000) {
  let figuresByPrice = figureArray;
  return figuresByPrice.filter(figure => figure.price >= minPrice && figure.price <= maxPrice);
}

function closePhotosPopUp() {
  clearSource();
  document.querySelector('.multi-photos').style.setProperty('visibility', 'hidden');
  document.querySelector('.close-photos').style.setProperty('visibility', 'hidden');
  document.querySelector('.photos').style.setProperty('visibility', 'hidden');
  document.querySelector('.large-photo').style.setProperty('visibility', 'hidden');
}

function openPhotosPopUp() {
  document.querySelector('.multi-photos').style.setProperty('visibility', 'visible');
  document.querySelector('.close-photos').style.setProperty('visibility', 'visible');
  document.querySelector('.photos').style.setProperty('visibility', 'visible');
  document.querySelector('.large-photo').style.setProperty('visibility', 'visible');
}

function zoomPhoto() {
  let name = this.parentElement.parentElement.firstElementChild.innerText;
  let zoomPhotos = ['photoOne', 'photoTwo', 'photoThree'];
  let object;
  figures.forEach(figure => {
    if (figure.name === name) object = figure;
  });
  document.getElementById('mainPhoto').src = 'images/' + object.code.one + '.jpg';
  for (let i = 0; i < attributes.length; i++)
    document.getElementById(zoomPhotos[i]).src = 'images/' + object.code[attributes[i]] + '.jpg';
  openPhotosPopUp();
}

function zoomOnPhoto() {
  let name = this.parentElement.nextSibling.firstElementChild.innerText;
  let zoomPhotos = ['photoOne', 'photoTwo', 'photoThree'];
  let object;
  figures.forEach(figure => {
    if (figure.name === name) object = figure;
  });
  document.getElementById('mainPhoto').src = 'images/' + object.code.one + '.jpg';
  for (let i = 0; i < attributes.length; i++)
    document.getElementById(zoomPhotos[i]).src = 'images/' + object.code[attributes[i]] + '.jpg';
  openPhotosPopUp();
}

function clearSource() {
  document.getElementById('mainPhoto').src = '';
  document.getElementById('photoOne').src = '';
  document.getElementById('photoTwo').src = '';
  document.getElementById('photoThree').src = '';
}

function openCart() {
  document.querySelector('.popups').style.setProperty('visibility', 'visible');
  document.querySelector('.close-cart').style.setProperty('visibility', 'visible');
  document.querySelector('#checkPopUp').style.setProperty('visibility', 'visible');
  document.querySelector('#checkout').style.setProperty('visibility', 'visible');
}

function closeCart() {
  document.querySelector('.popups').style.setProperty('visibility', 'hidden');
  document.querySelector('.close-cart').style.setProperty('visibility', 'hidden');
  document.querySelector('#checkPopUp').style.setProperty('visibility', 'hidden');
  document.querySelector('#checkout').style.setProperty('visibility', 'hidden');
}

function openInfo() {
  document.querySelector('#infoPopUp').style.setProperty('visibility', 'visible');
  document.querySelector('.close-info').style.setProperty('visibility', 'visible');
  document.querySelector('#infoText').style.setProperty('visibility', 'visible');
}

function closeInfo() {
  document.querySelector('#infoPopUp').style.setProperty('visibility', 'hidden');
  document.querySelector('.close-info').style.setProperty('visibility', 'hidden');
  document.querySelector('#infoText').style.setProperty('visibility', 'hidden');
}

function showMsg() {
  document.querySelector('#orderSubmit').style.setProperty('visibility', 'visible');
  setTimeout(function() {
    document.querySelector('#orderSubmit').style.setProperty('visibility', 'hidden');
  }, 2000);
}

function addToCart() {
  let qty = document.querySelector('#cartCount');
  qty = parseInt(qty.textContent) + 1;
  document.querySelector('#cartCount').innerText = qty;
  this.nextSibling.style.setProperty('visibility', 'visible');
  this.style.setProperty('visibility', 'hidden');
}

function removeFromCart() {
  let qty = document.querySelector('#cartCount');
  qty = parseInt(qty.textContent) - 1;
  document.querySelector('#cartCount').innerText = qty;
  this.style.setProperty('visibility', 'hidden');
  this.previousSibling.style.setProperty('visibility', 'visible');
}

function zoomIn(clickedId) {
  let zoom = document.getElementById(clickedId).firstElementChild;
  let newPhoto = document.querySelector('#mainPhoto');
  newPhoto.src = zoom.src;
}

function clearContent() {
  let contentSection = document.querySelector('.content');
  while (contentSection.hasChildNodes()) contentSection.removeChild(contentSection.firstChild);
}

function createCard(figuresArr) {
  let placeCard = document.querySelector('.content');
  let photoCard;
  for (let i = 0; i < figuresArr.length; i++) {
    photoCard = document.createElement('div');
    photoCard.className = 'card-wrapper';
    photoCard.appendChild(addPhoto(figuresArr[i].code.one));
    photoCard.appendChild(addInfo(figuresArr[i]));
    placeCard.appendChild(photoCard);
  }
}

function addPhoto(photoCode) {
  let imgDiv = document.createElement('div');
  imgDiv.className = 'card-image';
  let link = document.createElement('a');
  link.href = '#';
  link.onclick = zoomOnPhoto;
  let mainPhoto = document.createElement('img');
  mainPhoto.src = 'images/' + photoCode + '.jpg';
  mainPhoto.alt = '';
  link.appendChild(mainPhoto);
  imgDiv.appendChild(link);
  return imgDiv;
}

function addInfo(figure) {
  let photoInfo = document.createElement('div');
  photoInfo.className = 'card-info';
  let photoTitle = document.createElement('h2');
  let titleContent = document.createTextNode(figure.name);
  photoTitle.appendChild(titleContent);
  photoInfo.appendChild(photoTitle);
  let photoDesc = document.createElement('h3');
  let descContent = document.createTextNode(figure.description);
  photoDesc.appendChild(descContent);
  photoInfo.appendChild(photoDesc);
  let details = document.createElement('div');
  details.className = 'details';
  let morePhotos = document.createElement('a');
  morePhotos.className = 'photolink';
  morePhotos.href = '#';
  morePhotos.onclick = zoomPhoto;
  let morePhotosCont = document.createTextNode('+More photos');
  morePhotos.appendChild(morePhotosCont);
  details.appendChild(morePhotos);
  let photoPrice = document.createElement('p');
  let priceContent = document.createTextNode('$' + figure.price);
  photoPrice.appendChild(priceContent);
  details.appendChild(photoPrice);
  photoInfo.appendChild(details);
  let cartTag = document.createElement('div');
  cartTag.className = 'cartTag';
  let cartButton = document.createElement('div');
  cartButton.className = 'cartButton';
  let addCart = document.createElement('a');
  addCart.className = 'addCart';
  addCart.href = '#';
  addCart.onclick = addToCart;
  let iconAdd = document.createElement('i');
  iconAdd.className = 'material-icons md-32';
  let iconContent = document.createTextNode('add_shopping_cart');
  iconAdd.appendChild(iconContent);
  addCart.appendChild(iconAdd);
  cartButton.appendChild(addCart);
  let removeCart = document.createElement('a');
  removeCart.className = 'removeCart';
  removeCart.href = '#';
  removeCart.onclick = removeFromCart;
  let iconRemove = document.createElement('i');
  iconRemove.className = 'material-icons md-32';
  iconContent = document.createTextNode('remove_shopping_cart');
  iconRemove.appendChild(iconContent);
  removeCart.appendChild(iconRemove);
  cartButton.appendChild(removeCart);
  cartTag.appendChild(cartButton);
  let photoTags = document.createElement('div');
  photoTags.className = 'tag';
  let tags;
  let tagText;
  for (let i = 0; i < attributes.length; i++) {
    tags = document.createElement('p');
    tagText = document.createTextNode('#' + figure.tag[attributes[i]]);
    tags.appendChild(tagText);
    photoTags.appendChild(tags);
  }
  cartTag.appendChild(photoTags);
  photoInfo.appendChild(cartTag);

  return photoInfo;
}

function getCards() {
  clearContent();
  uncheckAll();
  let min = 0;
  let max = 100000;

  if (document.querySelector('#priceAll').checked) {
    min = 0;
  } else if (
    document.querySelector('#minusfifty').checked &&
    !document.querySelector('#plusfifty').checked
  )
    max = 50;
  else if (
    !document.querySelector('#minusfifty').checked &&
    document.querySelector('#plusfifty').checked
  )
    min = 50;

  let categ1 = 'All';
  let categ2 = undefined;

  if (document.querySelector('#catAll').checked) {
    categ1 = 'All';
  } else if (
    document.querySelector('#catAnimes').checked &&
    !document.querySelector('#catGames').checked &&
    !document.querySelector('#catMovies').checked
  )
    categ1 = document.querySelector('#catAnimes').value;
  else if (
    !document.querySelector('#catAnimes').checked &&
    document.querySelector('#catGames').checked &&
    !document.querySelector('#catMovies').checked
  )
    categ1 = document.querySelector('#catGames').value;
  else if (
    !document.querySelector('#catAnimes').checked &&
    !document.querySelector('#catGames').checked &&
    document.querySelector('#catMovies').checked
  )
    categ1 = document.querySelector('#catMovies').value;
  else if (
    document.querySelector('#catAnimes').checked &&
    document.querySelector('#catGames').checked &&
    !document.querySelector('#catMovies').checked
  ) {
    categ1 = document.querySelector('#catAnimes').value;
    categ2 = document.querySelector('#catGames').value;
  } else if (
    document.querySelector('#catAnimes').checked &&
    !document.querySelector('#catGames').checked &&
    document.querySelector('#catMovies').checked
  ) {
    categ1 = document.querySelector('#catAnimes').value;
    categ2 = document.querySelector('#catMovies').value;
  } else if (
    !document.querySelector('#catAnimes').checked &&
    document.querySelector('#catGames').checked &&
    document.querySelector('#catMovies').checked
  ) {
    categ1 = document.querySelector('#catGames').value;
    categ2 = document.querySelector('#catMovies').value;
  }

  let filteredFigures = getByCategory(categ1, categ2);
  filteredFigures = getByPrice(filteredFigures, min, max);
  createCard(filteredFigures);
}

function uncheckAll() {
  if (
    document.querySelector('#minusfifty').checked &&
    document.querySelector('#plusfifty').checked
  ) {
    document.querySelector('#priceAll').checked = true;
    document.querySelector('#minusfifty').checked = false;
    document.querySelector('#plusfifty').checked = false;
  } else if (
    document.querySelector('#minusfifty').checked ||
    document.querySelector('#plusfifty').checked
  )
    document.querySelector('#priceAll').checked = false;

  if (
    document.querySelector('#catAnimes').checked &&
    document.querySelector('#catGames').checked &&
    document.querySelector('#catMovies').checked
  ) {
    document.querySelector('#catAll').checked = true;
    document.querySelector('#catAnimes').checked = false;
    document.querySelector('#catGames').checked = false;
    document.querySelector('#catMovies').checked = false;
  } else if (
    document.querySelector('#catAnimes').checked ||
    document.querySelector('#catGames').checked ||
    document.querySelector('#catMovies').checked
  )
    document.querySelector('#catAll').checked = false;
}

window.onload = function() {
  getCards();
  document.querySelector('#priceAll').addEventListener('click', function() {
    document.querySelector('#minusfifty').checked = false;
    document.querySelector('#plusfifty').checked = false;
  });
  document.querySelector('#priceAll').addEventListener('change', function() {
    if (
      !document.querySelector('#minusfifty').checked ||
      !document.querySelector('#plusfifty').checked
    )
      document.querySelector('#priceAll').checked = true;
  });
  document.querySelector('#catAll').addEventListener('click', function() {
    document.querySelector('#catAnimes').checked = false;
    document.querySelector('#catGames').checked = false;
    document.querySelector('#catMovies').checked = false;
  });
  document.querySelector('#catAll').addEventListener('change', function() {
    if (
      !document.querySelector('#catAnimes').checked ||
      !document.querySelector('#catGames').checked ||
      !document.querySelector('#catMovies').checked
    )
      document.querySelector('#catAll').checked = true;
  });
};
