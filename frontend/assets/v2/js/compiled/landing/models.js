// Generated by CoffeeScript 1.4.0
var landBestPrice, landBestPriceBack, landBestPriceSet,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

landBestPriceBack = (function() {

  function landBestPriceBack(data, parent) {
    var _this = this;
    this.parent = parent;
    this.price = data.price;
    this.showPrice = ko.computed(function() {
      return _this.price - _this.parent.showPrice;
    });
    this.backDate = moment(data.backDate);
    this.selected = ko.observable(false);
  }

  return landBestPriceBack;

})();

landBestPrice = (function() {

  function landBestPrice(data, parent) {
    var _this = this;
    this.parent = parent;
    this.setActiveBack = __bind(this.setActiveBack, this);

    this.addBack = __bind(this.addBack, this);

    this.minPrice = ko.observable(data.price);
    this.date = moment(data.date);
    this._results = {};
    this.showPrice = ko.computed(function() {
      return Math.ceil(_this.minPrice() / 2);
    });
    this.showPriceText = ko.computed(function() {
      return Utils.formatPrice(_this.showPrice());
    });
    this.showWidth = ko.computed(function() {
      if (_this.parent.minBestPrice) {
        return Math.ceil((_this.showPrice / _this.parent.minBestPrice.showPrice()) * 100);
      }
    });
    this.selected = ko.observable(false);
    this.selBack = ko.observable(null);
    this.active = ko.observable(null);
    this.addBack(data);
  }

  landBestPrice.prototype.addBack = function(data) {
    var back;
    back = new landBestPriceBack(data, this);
    if (back.price < this.minPrice()) {
      this.minPrice(back.price);
      if (this.selBack()) {
        this.selBack().selected(false);
      }
      back.selected(true);
      this.selBack(back);
      this.active(back);
    }
    return this._results[data.backDate] = back;
  };

  landBestPrice.prototype.setActiveBack = function(date) {
    this.active().selected(false);
    this.active(this._results[date]);
    return this.active().selected(true);
  };

  return landBestPrice;

})();

landBestPriceSet = (function() {

  function landBestPriceSet(allData) {
    this.setActive = __bind(this.setActive, this);

    var data, dataKey, empty, key, _ref;
    this._results = {};
    this.dates = {};
    this.minBestPrice = false;
    this.active = ko.observable(null);
    for (key in allData) {
      data = allData[key];
      if (!this.dates[data.date]) {
        this.dates[data.date] = true;
      }
      if (!this.dates[data.dateBack]) {
        this.dates[data.dateBack] = true;
      }
      if (this._results[data.date]) {
        this._results[data.date].addBack(data);
      } else {
        this._results[data.date] = new landBestPrice(data, this);
      }
      if (!this.minBestPrice || this._results[data.date].minPrice() < this.minBestPrice.minPrice()) {
        this.minBestPrice = this._results[data.date];
      }
    }
    this.datesArr = [];
    _ref = this.dates;
    for (dataKey in _ref) {
      empty = _ref[dataKey];
      this.datesArr.push({
        date: dataKey,
        landBP: this._results[dataKey]
      });
    }
    this.datesArr = _.sortBy(this.datesArr, function(objDate) {
      return moment(objDate.date).unix();
    });
    console.log('dates', this.datesArr);
    this.active(this.minBestPrice);
    this.active().selected(true);
  }

  landBestPriceSet.prototype.setActive = function(date) {
    this.active().selected(false);
    this.active(this._results[date]);
    return this.active().selected(true);
  };

  return landBestPriceSet;

})();
