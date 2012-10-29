// Generated by CoffeeScript 1.3.3
var Voyasha, VoyashaCheapest, VoyashaOptima, VoyashaRich,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Voyasha = (function() {

  function Voyasha(toursResultSet) {
    var _this = this;
    this.toursResultSet = toursResultSet;
    this.choose = __bind(this.choose, this);

    this.handleHotels = __bind(this.handleHotels, this);

    this.handleAvia = __bind(this.handleAvia, this);

    this.selected = ko.computed(function() {
      var item, result, _i, _len, _ref;
      result = [];
      _ref = _this.toursResultSet.data();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (item.isAvia()) {
          result.push(_this.handleAvia(item));
        } else {
          result.push(_this.handleHotels(item));
        }
      }
      return result;
    });
    this.price = ko.computed(function() {
      var item, result, _i, _len, _ref;
      result = 0;
      _ref = _this.selected();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        result += item.price;
      }
      return result;
    });
    this.title = this.getTitle();
  }

  Voyasha.prototype.handleAvia = function() {
    throw "Implement me";
  };

  Voyasha.prototype.handleHotels = function() {
    throw "Implement me";
  };

  Voyasha.prototype.choose = function() {
    var item, _i, _len, _ref;
    _ref = this.toursResultSet.data();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      if (item.isAvia()) {
        item.select(this.handleAvia(item));
      } else {
        item.select(this.handleHotels(item));
      }
    }
    return this.toursResultSet.showOverview();
  };

  return Voyasha;

})();

VoyashaCheapest = (function(_super) {

  __extends(VoyashaCheapest, _super);

  function VoyashaCheapest() {
    this.handleHotels = __bind(this.handleHotels, this);

    this.handleAvia = __bind(this.handleAvia, this);

    this.getTitle = __bind(this.getTitle, this);
    return VoyashaCheapest.__super__.constructor.apply(this, arguments);
  }

  VoyashaCheapest.prototype.getTitle = function() {
    return 'Самый дешевый';
  };

  VoyashaCheapest.prototype.handleAvia = function(item) {
    return item.results().cheapest();
  };

  VoyashaCheapest.prototype.handleHotels = function(item) {
    var data, hotel, result, roomSet, _i, _j, _len, _len1, _ref, _ref1;
    data = item.results().data();
    result = {
      roomSet: data[0].roomSets()[0],
      hotel: data[0],
      price: data[0].roomSets()[0].price
    };
    _ref = item.results().data();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      hotel = _ref[_i];
      _ref1 = hotel.roomSets();
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        roomSet = _ref1[_j];
        if (roomSet.price < result.roomSet.price) {
          result.roomSet = roomSet;
          result.hotel = hotel;
          result.price = result.roomSet.price;
        }
      }
    }
    return result;
  };

  return VoyashaCheapest;

})(Voyasha);

VoyashaOptima = (function(_super) {

  __extends(VoyashaOptima, _super);

  function VoyashaOptima() {
    this.handleHotels = __bind(this.handleHotels, this);

    this.handleAvia = __bind(this.handleAvia, this);

    this.getTitle = __bind(this.getTitle, this);
    return VoyashaOptima.__super__.constructor.apply(this, arguments);
  }

  VoyashaOptima.prototype.getTitle = function() {
    return 'Оптимальный вариант';
  };

  VoyashaOptima.prototype.handleAvia = function(item) {
    return item.results().best();
  };

  VoyashaOptima.prototype.handleHotels = function(item) {
    var data, result, results;
    data = item.results().data();
    result = {
      roomSet: data[0].roomSets()[0],
      hotel: data[0],
      price: data[0].roomSets()[0].price
    };
    results = _.filter(data, function(x) {
      return x.distanceToCenter <= 6;
    });
    results = _.filter(results, function(x) {
      return (x.starsNumeric === 3) || (x.starsNumeric === 4);
    });
    results.sort(function(a, b) {
      return a.roomSets()[0].price - b.roomSets()[0].price;
    });
    if (results.length) {
      data = results[0];
      result = {
        roomSet: data.roomSets()[0],
        hotel: data,
        price: data.roomSets()[0].price
      };
    }
    results = _.filter(results, function(x) {
      return x.rating > 2;
    });
    if (results.length) {
      data = results[0];
      result = {
        roomSet: data.roomSets()[0],
        hotel: data,
        price: data.roomSets()[0].price
      };
    }
    return result;
  };

  return VoyashaOptima;

})(Voyasha);

VoyashaRich = (function(_super) {

  __extends(VoyashaRich, _super);

  function VoyashaRich() {
    this.handleHotels = __bind(this.handleHotels, this);

    this.handleAvia = __bind(this.handleAvia, this);

    this.getTitle = __bind(this.getTitle, this);
    return VoyashaRich.__super__.constructor.apply(this, arguments);
  }

  VoyashaRich.prototype.getTitle = function() {
    return 'Роскошный вариант';
  };

  VoyashaRich.prototype.handleAvia = function(item) {
    var data, result, _i, _len;
    data = item.results().data;
    result = {
      'direct': data[0].directRating(),
      'price': data[0].price,
      'result': data[0]
    };
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      item = data[_i];
      if (item.directRating() < result.direct) {
        result.direct = item.directRating();
        result.price = item.price;
        result.result = item;
      } else if (item.directRating() === result.direct) {
        if (item.price < result.price) {
          result.price = item.price;
          result.result = item;
        }
      }
    }
    return result.result;
  };

  VoyashaRich.prototype.getRating = function(x) {
    var hotelRating;
    hotelRating = Math.abs(4.5 - x.starsNumeric);
    if (x.rating === '-') {
      hotelRating += 4;
    } else {
      hotelRating = hotelRating + Math.abs(4 - x.rating);
    }
    if (x.distanceToCenter > 3) {
      hotelRating = hotelRating * 4;
    }
    return hotelRating;
  };

  VoyashaRich.prototype.handleHotels = function(item) {
    var data, result, results,
      _this = this;
    data = item.results().data();
    result = {
      roomSet: data[0].roomSets()[0],
      hotel: data[0],
      price: data[0].roomSets()[0].price
    };
    results = data;
    results.sort(function(a, b) {
      var aHotelRating, bHotelRating;
      aHotelRating = _this.getRating(a);
      bHotelRating = _this.getRating(b);
      return a.roomSets()[0].price * aHotelRating - b.roomSets()[0].price * bHotelRating;
    });
    data = results[0];
    result = {
      roomSet: data.roomSets()[0],
      hotel: data,
      price: data.roomSets()[0].price
    };
    return result;
  };

  return VoyashaRich;

})(Voyasha);