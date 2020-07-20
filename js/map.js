'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'washer', 'elevator', 'conditioner'];

var mapPinsElement = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var mapElement = document.querySelector('.map');
var cardTemplate = document.querySelector('#card').content.querySelector('article');
var mapList = document.querySelector('.map');

var getRandomItem = function (array) {
  var index = randomNum(0, array.length - 1);
  return array[index];
};

var getRandomSlice = function (array) {
  var begin = randomNum(0, array.length - 1);
  return array.slice(begin);
};

var randomNum = function (min, max) {
  var rand = Math.round(min + Math.random() * (max - min));
  return rand;
};

var generateAd = function (index) {

  var randomX = randomNum(0, mapPinsElement.offsetWidth);
  var randomY = randomNum(130, 630);
  var randomPrice = randomNum(1000, 1000000);
  var randomRooms = randomNum(1, 5);
  var randomGuests = randomNum(1, 15);

  var adsItem = {
    'author': {
      'avatar': 'img/avatars/user0' + (index + 1) + '.png'
    },
    'offer': {
      'title': TITLES[index],
      'address': randomX + ',' + randomY,
      'price': randomPrice,
      'type': getRandomItem(TYPES),
      'rooms': randomRooms,
      'guests': randomGuests,
      'checkin': getRandomItem(CHECK_TIME),
      'checkout': getRandomItem(CHECK_TIME),
      'features': getRandomSlice(FEATURES),
      'description': '',
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
  return adsItem;
};

var getData = function (num) {
  var data = [];
  for (var i = 0; i < num; i++) {
    data.push(generateAd(i));
  }
  return data;
};

var createPinElement = function (obj) {
  var pin = pinTemplate.cloneNode(true);
  var picture = pin.querySelector('img');
  pin.style.left = obj.location.x + 'px';
  pin.style.top = obj.location.y + 'px';
  picture.src = obj.author.avatar;

  return pin;
};

var renderPins = function (data) {
  var fragment = document.createDocumentFragment();
  data.forEach(function (item) {
    fragment.appendChild(createPinElement(item));
  });
  mapPinsElement.appendChild(fragment);
};

var createAdCardElement = function (obj) {
  var item = cardTemplate.cloneNode(true);

  item.querySelector('h3').textContent = obj.offer.title;
  item.querySelector('.popup__text--address').textContent = obj.offer.address;
  item.querySelector('.popup__text--price').textContent = obj.offer.price + ' \u20BD/ночь';
  item.querySelector('h4').textContent = obj.offer.type;
  item.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  item.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  item.querySelector('.popup__description').textContent = obj.offer.description;

  var photoList = item.querySelector('.popup__photos');
  var photo = photoList.querySelector('img');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adsArray[0].offer.photos.length; i++) {
    var photoItem = photo.cloneNode(true);
    photoItem.src = adsArray[0].offer.photos[i];
    fragment.appendChild(photoItem);
  }
  photoList.innerHTML = ' ';
  photoList.appendChild(fragment);

  var featuresStr = obj.offer.features.map(function (itemFeature) {
    return '<li class="popup__feature popup__feature--' + itemFeature + ' "></li>';
  }).join(' ');
  item.querySelector('.popup__features').innerHTML = featuresStr;

  return item;
};

var showAdCard = function (obj) {
  var cardElement = createAdCardElement(obj);
  mapElement.insertBefore(cardElement, mapElement.querySelector('.map__filters-container'));
};

var adsArray = getData(8);
mapList.classList.remove('map--faded');
renderPins(adsArray);
showAdCard(adsArray[0]);
