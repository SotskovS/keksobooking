'use strict';

var randomNum = function (min, max) {
  var rand = Math.round(min + Math.random() * (max - min + 1));
  return rand;
};

var generateData = function (num) {
  var ads = [];
  for (var i = 0; i < num; i++) {

    var randomAvatar = randomNum(1, 7);
    var randomY = randomNum(130, 630);
    var randomX = randomNum(300, 900);
    var randomPrice = randomNum(1000, 1000000);
    var randomRooms = randomNum(1, 5);

    var adsItem = {
      'author': {
        'avatar': '../img/avatars/user0' + randomAvatar + '.png'
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
  return ads;
};

var adsArray = generateData(8);

var mapList = document.querySelector('.map');
mapList.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('button');

var createPinElement = function (data) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 8; i++) {
    var pin = pinTemplate.cloneNode(true);
    var picture = pin.querySelector('img');
    pin.classList.add('map__pin--main');
    pin.style.left = adsArray[0].location.x + 'px';
    pin.style.top = adsArray[0].location.y + 'px';
    picture.src = adsArray[0].author.avatar;
    fragment.appendChild(pin);
  }
  return fragment;
};

var map = document.querySelector('.map');
var itemTemplate = document.querySelector('#card').content.querySelector('article');

var adsItem = function () {
  var fragment = document.createDocumentFragment();

  var item = itemTemplate.cloneNode(true);

  var avatarPic = item.querySelector('img') ;
  avatarPic.src = adsArray[0].author.avatar;

  var title = item.querySelector('h3');
  title.textContent = adsArray[0].offer.title;

  var address = item.querySelector('.popup__text--address');
  address.textContent = adsArray[0].offer.address;

  var price = item.querySelector('.popup__text--price');
  price.textContent = adsArray[0].offer.price + ' Р/ночь';

  var type = item.querySelector('h4');
  type.textContent = adsArray[0].offer.type;

  var capacity = item.querySelector('.popup__text--capacity');
  capacity.textContent = adsArray[0].offer.rooms  + ' комнаты для ' + adsArray[0].offer.guests + ' гостей';

  var time = item.querySelector('.popup__text--time');
  time.textContent = 'Заезд после ' + adsArray[0].offer.checkin  + ', выезд до ' + adsArray[0].offer.checkout;

  var description = item.querySelector('.popup__description');
  description.textContent = adsArray[0].offer.description;

  var photoList = item.querySelector('.popup__photos');
  var photo = photoList.querySelector('img');
  for (var i = 0; i < adsArray[0].offer.photos.length; i++) {
    var photoItem = photo.cloneNode(true);
    photoItem.src = adsArray[0].offer.photos[i];
    photoList.appendChild(photoItem);
  }
  item.appendChild(createPinElement());
  fragment.appendChild(item);
  return fragment;
};
map.insertBefore(adsItem(), map.children[1]);


