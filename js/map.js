'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'washer', 'elevator', 'conditioner'];

var mapPinsElement = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var map = document.querySelector('.map');
var itemTemplate = document.querySelector('#card').content.querySelector('article');
var mapList = document.querySelector('.map');

mapList.classList.remove('map--faded');

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

var adsArray = getData(8);
var createPinElement = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 8; i++) {
    var pin = pinTemplate.cloneNode(true);
    var picture = pin.querySelector('img');
    pin.classList.add('map__pin--main');
    pin.style.left = adsArray[i].location.x + 'px';
    pin.style.top = adsArray[i].location.y + 'px';
    picture.src = adsArray[i].author.avatar;
    fragment.appendChild(pin);
  }
  return fragment;
};

var adsItem = function () {
  var fragment = document.createDocumentFragment();

  var item = itemTemplate.cloneNode(true);

  var avatarPic = item.querySelector('img');
  avatarPic.src = adsArray[0].author.avatar;

  var title = item.querySelector('h3');
  title.textContent = adsArray[0].offer.title;

  var address = item.querySelector('.popup__text--address');
  address.textContent = adsArray[0].offer.address;

  var price = item.querySelector('.popup__text--price');
  price.textContent = adsArray[0].offer.price + ' \u20BD/ночь';

  var type = item.querySelector('h4');
  type.textContent = adsArray[0].offer.type;

  var capacity = item.querySelector('.popup__text--capacity');
  capacity.textContent = adsArray[0].offer.rooms + ' комнаты для ' + adsArray[0].offer.guests + ' гостей';

  var time = item.querySelector('.popup__text--time');
  time.textContent = 'Заезд после ' + adsArray[0].offer.checkin + ', выезд до ' + adsArray[0].offer.checkout;

  var description = item.querySelector('.popup__description');
  description.textContent = adsArray[0].offer.description;

  var photoList = item.querySelector('.popup__photos');
  var photo = photoList.querySelector('img');
  for (var i = 0; i < adsArray[0].offer.photos.length; i++) {
    photo.remove('img');
    var photoItem = photo.cloneNode(true);
    photoItem.src = adsArray[0].offer.photos[i];
    photoList.appendChild(photoItem);
  }
  item.appendChild(createPinElement());
  fragment.appendChild(item);
  return fragment;
};
map.insertBefore(adsItem(), map.children[1]);


