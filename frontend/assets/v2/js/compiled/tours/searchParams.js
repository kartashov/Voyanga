// Generated by CoffeeScript 1.4.0
var DestinationSearchParams, RoomsSearchParams, TourSearchParams,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DestinationSearchParams = (function() {

  function DestinationSearchParams() {
    this.city = ko.observable('');
    this.dateFrom = ko.observable('');
    this.dateTo = ko.observable('');
  }

  return DestinationSearchParams;

})();

RoomsSearchParams = (function() {

  function RoomsSearchParams() {
    this.adt = ko.observable(2);
    this.chd = ko.observable(0);
    this.chdAge = ko.observable(false);
    this.cots = ko.observable(false);
  }

  return RoomsSearchParams;

})();

TourSearchParams = (function(_super) {

  __extends(TourSearchParams, _super);

  function TourSearchParams() {
    this.GAData = __bind(this.GAData, this);

    this.GAKey = __bind(this.GAKey, this);

    this.removeItem = __bind(this.removeItem, this);

    this.addSpRoom = __bind(this.addSpRoom, this);

    var _this = this;
    TourSearchParams.__super__.constructor.call(this);
    voyanga_debug('CREATING TOURS SEARCH PARAMS!!!!!!!!!!');
    if (window.currentCityCode) {
      this.startCity = ko.observable(window.currentCityCode);
    } else {
      this.startCity = ko.observable('LED');
    }
    this.returnBack = ko.observable(1);
    this.destinations = ko.observableArray([]);
    this.rooms = ko.observableArray([new SpRoom(this)]);
    this.hotelId = ko.observable(false);
    this.urlChanged = ko.observable(false);
    this.hotelChanged = ko.observable(false);
    this.overall = ko.computed(function() {
      var result, room, _i, _len, _ref;
      result = 0;
      _ref = _this.rooms();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        room = _ref[_i];
        result += room.adults();
        result += room.children();
      }
      return result;
    });
    this.adults = ko.computed(function() {
      var result, room, _i, _len, _ref;
      result = 0;
      _ref = _this.rooms();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        room = _ref[_i];
        result += room.adults();
      }
      return result;
    });
    this.children = ko.computed(function() {
      var result, room, _i, _len, _ref;
      result = 0;
      _ref = _this.rooms();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        room = _ref[_i];
        result += room.children();
      }
      return result;
    });
  }

  TourSearchParams.prototype.addSpRoom = function() {
    return this.rooms.push(new SpRoom(this));
  };

  TourSearchParams.prototype.url = function() {
    var params, result,
      _this = this;
    result = 'tour/search?';
    params = [];
    params.push('start=' + this.startCity());
    params.push('return=' + this.returnBack());
    _.each(this.destinations(), function(destination, ind) {
      var dateFrom, dateTo;
      if (moment(destination.dateFrom())) {
        dateFrom = moment(destination.dateFrom()).format('D.M.YYYY');
      } else {
        dateFrom = '1.1.1970';
      }
      if (moment(destination.dateTo())) {
        dateTo = moment(destination.dateTo()).format('D.M.YYYY');
      } else {
        dateTo = '1.1.1970';
      }
      params.push('destinations[' + ind + '][city]=' + destination.city());
      params.push('destinations[' + ind + '][dateFrom]=' + dateFrom);
      return params.push('destinations[' + ind + '][dateTo]=' + dateTo);
    });
    _.each(this.rooms(), function(room, ind) {
      return params.push(room.getUrl(ind));
    });
    if (this.eventId) {
      params.push('eventId=' + this.eventId);
    }
    if (this.orderId) {
      params.push('orderId=' + this.orderId);
    }
    result += params.join("&");
    window.voyanga_debug("Generated search url for tours", result);
    return result;
  };

  TourSearchParams.prototype.key = function() {
    var key;
    key = this.startCity();
    _.each(this.destinations(), function(destination) {
      return key += destination.city() + destination.dateFrom() + destination.dateTo();
    });
    _.each(this.rooms(), function(room) {
      return key += room.getHash();
    });
    return key;
  };

  TourSearchParams.prototype.getHash = function() {
    var hash, parts;
    parts = [this.startCity(), this.returnBack()];
    _.each(this.destinations(), function(destination) {
      parts.push(destination.city());
      parts.push(moment(destination.dateFrom()).format('D.M.YYYY'));
      return parts.push(moment(destination.dateTo()).format('D.M.YYYY'));
    });
    parts.push('rooms');
    _.each(this.rooms(), function(room) {
      return parts.push(room.getHash());
    });
    hash = 'tours/search/' + parts.join('/') + '/';
    $.cookie('currentTourHash', hash);
    return hash;
  };

  TourSearchParams.prototype.fromString = function(data) {
    var beforeUrl, dest, destination, hotelIdBefore, pair, room, wantedKeys, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
    data = PEGHashParser.parse(data, 'tour');
    beforeUrl = this.url();
    hotelIdBefore = this.hotelId();
    this.startCity(data.start.from);
    this.returnBack(data.start["return"]);
    this.destinations([]);
    this.rooms([]);
    _ref = data.destinations;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      dest = _ref[_i];
      destination = new DestinationSearchParams();
      destination.city(dest.to);
      destination.dateFrom(dest.dateFrom);
      destination.dateTo(dest.dateTo);
      this.destinations.push(destination);
    }
    _ref1 = data.rooms;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      room = _ref1[_j];
      room = new SpRoom(this);
      room.fromPEGObject(room);
      this.rooms.push(room);
    }
    wantedKeys = {
      eventId: 1,
      orderId: 1,
      flightHash: 1
    };
    this.hotelId(false);
    _ref2 = data.extra;
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      pair = _ref2[_k];
      if (wantedKeys[pair.key]) {
        this[pair.key] = pair.value;
      }
      if (pair.key === 'hotelId') {
        this.hotelId(pair.value);
      }
    }
    if (beforeUrl === this.url()) {
      this.urlChanged(false);
      if (hotelIdBefore === this.hotelId()) {
        return this.hotelChanged(false);
      } else {
        return this.hotelChanged(true);
      }
    } else {
      this.urlChanged(true);
      return this.hotelChanged(false);
    }
  };

  TourSearchParams.prototype.fromObject = function(data) {
    window.voyanga_debug("Restoring TourSearchParams from object");
    _.each(data.destinations, function(destination) {
      destination = new DestinationSearchParams();
      destination.city(destination.city);
      destination.dateFrom(moment(destination.dateFrom, 'D.M.YYYY').toDate());
      destination.dateTo(moment(destination.dateTo, 'D.M.YYYY').toDate());
      return this.destinations.push(destination);
    });
    _.each(data.rooms, function(room) {
      room = new SpRoom(this);
      return this.rooms.push(this.room.fromObject(room));
    });
    if (data.eventId) {
      this.eventId = data.eventId;
    }
    return window.voyanga_debug('Result', this);
  };

  TourSearchParams.prototype.removeItem = function(item, event) {
    var idx;
    event.stopPropagation();
    if (this.data().length < 2) {
      return;
    }
    idx = this.data.indexOf(item);
    if (idx === -1) {
      return;
    }
    this.data.splice(idx, 1);
    if (item === this.selection()) {
      return this.setActive(this.data()[0]);
    }
  };

  TourSearchParams.prototype.GAKey = function() {
    var destination, result, _i, _len, _ref;
    result = [];
    _ref = this.destinations();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      destination = _ref[_i];
      result.push(destination.city());
    }
    return result.join('//');
  };

  TourSearchParams.prototype.GAData = function() {
    var destination, passangers, passangersData, result, room, stayData, _i, _j, _len, _len1, _ref, _ref1;
    passangersData = "1";
    passangers = [0, 0, 0];
    _ref = this.rooms();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      room = _ref[_i];
      passangers[0] += room.adults();
      passangers[1] += room.children();
      passangers[2] += room.infants();
    }
    passangersData += ", " + passangers.join(" - ");
    result = [];
    _ref1 = this.destinations();
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      destination = _ref1[_j];
      stayData = passangersData + ", " + moment(destination.dateFrom()).format('D.M.YYYY') + ' - ' + moment(destination.dateTo()).format('D.M.YYYY');
      stayData += ", " + moment(destination.dateFrom()).diff(moment(), 'days') + " - " + moment(destination.dateTo()).diff(moment(destination.dateFrom()), 'days');
      result.push(stayData);
    }
    return result.join("//");
  };

  return TourSearchParams;

})(SearchParams);
