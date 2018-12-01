'use strict';

var ads = [];

var generateData = function (num) {
  for (var i = 0; i < num; i++) {

    var randomNum = function (min, max) {
      var rand = Math.round(min + Math.random() * (max - min + 1));
      return rand;
    };

    var randomAvatar = randomNum(1, 7);
    var randomY = randomNum(130, 630);
    var randomX = randomNum(300, 900);
    var randomPrice = randomNum(1000, 1000000);
    var randomRooms = randomNum(1, 5);

    var adsItem = {
      'author': {
        'avatar': 'img/avatars/user0' + randomAvatar + '.png'
      },
      'offer': {
        'title': 'Большая уютная квартира',
        'address': '600, 350',
        'price': randomPrice,
        'type': 'palace',
        'rooms': randomRooms,
        'guests': 12,
        'checkin': '12:00',
        'checkout': '13:00',
        'features': ['wifi', 'dishwasher', 'washer', 'elevator', 'conditioner'],
        'description': 'Отличное жильё',
        'photos': [
          'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
          'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
        ],
      },
      'location': {
        'x': randomX,
        'y': randomY
      }
    };
    ads.push(adsItem);
  }
};

generateData(8);

var mapList = document.querySelector('.map');
mapList.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin');

var createPinElement = function (data) {
  var pin = document.createElement('button');
  pin.classList.add('map__pin');
  picture.style.width = '45px';
  picture.style.height = '45px';
  picture.src = ads[0].author.avatar;
  pin.appendChild(picture);
  return pin;
}

var makeElement = function (tag, className, text) {
  var element = document.createElement(tag);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

var map = document.querySelector('.map');

var adsItem = function () {
  var cardItem = makeElement('article', 'map__card');

  var avatarPic = makeElement('img', 'popup__avatar');
  avatarPic.src = ads[0].author.avatar;
  avatarPic.style.width = '70px';
  avatarPic.style.height = '70px';
  avatarPic.alt = 'Аватар пользователя';
  cardItem.appendChild(avatarPic);

  var buttonClose = makeElement('button', 'popup__close');
  cardItem.appendChild(buttonClose);

  var titleCard = makeElement('h3', 'popup__title', ads[0].offer.title);
  cardItem.appendChild(titleCard);

  var textAdress = makeElement('p', 'popup__text-address', ads[0].offer.address);
  cardItem.appendChild(textAdress);

  var priceCard = makeElement('p', 'popup__text-price', ads[0].offer.price + 'Р/ночь');
  priceCard.classList.add('popup__text');
  cardItem.appendChild(priceCard);

  var typeRoom = makeElement('h4', 'popup__type', ads[0].offer.type);
  cardItem.appendChild(typeRoom);

  var capacityCard = makeElement('p', 'popup__text-capasity', ads[0].offer.rooms + ' комнаты для ' + ads[0].offer.guests + ' гостей');
  cardItem.appendChild(capacityCard);

  var checkinTime = makeElement('p', 'popup__text-time', 'Заезд после ' + ads[0].offer.checkin + ', выезд до ' + ads[0].offer.checkout);
  cardItem.appendChild(checkinTime);

  var arrFeature = [
    'popup__feature--wifi',
    'popup__feature--dishwasher',
    'popup__feature--parking',
    'popup__feature--washer',
    'popup__feature--elevator',
    'popup__feature--conditioner'
  ];
  var featureAdsList = makeElement('ul', 'popup__features');

  for (var i = 0; i < arrFeature.length; i++) {
    var featureItem = makeElement('li', 'popup__feature');
    featureItem.classList.add(arrFeature[i]);
    featureAdsList.appendChild(featureItem);
    cardItem.appendChild(featureAdsList);
  }

  var descriptionAds = makeElement('p', 'popup__description', ads[0].offer.description);
  cardItem.appendChild(descriptionAds);

  var photoList = makeElement('div', 'popup__photos');
  for (i = 0; i < ads[0].offer.photos.length; i++) {
    var photoAds = makeElement('img', 'popup__photo');
    photoAds.style.width = '45px';
    photoAds.style.height = '40px';
    photoAds.src = ads[0].offer.photos[i];
    photoAds.alt = 'Фотография жилья';
    photoList.appendChild(photoAds);
  }
  cardItem.appendChild(photoList);

  return cardItem;
};
map.insertBefore(adsItem(), map.children[1]);
