// Generated by CoffeeScript 1.4.0
/*
SEARCH controller, should be splitted once we will get more actions here
*/

var HotelsController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __slice = [].slice;

HotelsController = (function() {

  function HotelsController(searchParams) {
    this.searchParams = searchParams;
    this.timelineAction = __bind(this.timelineAction, this);

    this.indexAction = __bind(this.indexAction, this);

    this.checkTicketAction = __bind(this.checkTicketAction, this);

    this.handleResults = __bind(this.handleResults, this);

    this.searchAction = __bind(this.searchAction, this);

    this.api = new HotelsAPI;
    this.routes = {
      '/search/:from/:in/:out/*rest': this.searchAction,
      '/timeline/': this.timelineAction,
      '': this.indexAction
    };
    this.results = ko.observable();
    _.extend(this, Backbone.Events);
  }

  HotelsController.prototype.searchAction = function() {
    var args,
      _this = this;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    window.voyanga_debug("HOTELS: Invoking searchAction", args);
    this.searchParams.fromList(args);
    return this.api.search(this.searchParams.url(), function(data) {
      var stacked;
      try {
        stacked = _this.handleResults(data);
      } catch (err) {
        if (err === 'e404') {
          new ErrorPopup('hotels404');
          return;
        }
        throw new Error("Unable to build HotelResultSet from search response");
      }
      _this.results(stacked);
      return _this.render('results', {
        results: _this.results,
        notours: true
      });
    });
  };

  HotelsController.prototype.handleResults = function(data) {
    var stacked;
    window.voyanga_debug("HOTELS: searchAction: handling results", data);
    stacked = new HotelsResultSet(data, data.searchParams);
    stacked.postInit();
    stacked.checkTicket = this.checkTicketAction;
    return stacked;
  };

  HotelsController.prototype.checkTicketAction = function(roomSet, resultDeferred) {
    var diff, now,
      _this = this;
    now = moment();
    diff = now.diff(this.results().creationMoment, 'seconds');
    if (diff < HOTEL_TICKET_TIMELIMIT) {
      resultDeferred.resolve(roomSet);
      return;
    }
    return this.api.search(this.searchParams.url(), function(data) {
      var result, stacked;
      try {
        stacked = _this.handleResults(data);
      } catch (err) {
        throw new Error("Unable to bould HotelResultSet from api response. Check ticket.");
      }
      result = stacked.findAndSelect(roomSet);
      if (result) {
        return resultDeferred.resolve(result);
      } else {
        new ErrorPopup('hotelsNoTicketOnValidation', false, function() {});
        return _this.results(stacked);
      }
    });
  };

  HotelsController.prototype.indexAction = function() {
    window.voyanga_debug("HOTELS: indexAction");
    return this.render('index', {});
  };

  HotelsController.prototype.timelineAction = function() {
    var _this = this;
    this.render('timeline-template');
    return window.setTimeout(function() {
      VoyangaCalendarTimeline.calendarEvents = [
        {
          dayStart: Date.fromIso('2012-10-23'),
          dayEnd: Date.fromIso('2012-10-23'),
          type: 'flight',
          color: 'red',
          description: 'Москва || Санкт-Петербург',
          cityFrom: 'MOW',
          cityTo: 'LED'
        }, {
          dayStart: Date.fromIso('2012-10-23'),
          dayEnd: Date.fromIso('2012-10-28'),
          type: 'hotel',
          color: 'red',
          description: 'Californication Hotel2',
          city: 'LED'
        }, {
          dayStart: Date.fromIso('2012-10-28'),
          dayEnd: Date.fromIso('2012-10-28'),
          type: 'flight',
          color: 'red',
          description: 'Санкт-Петербург || Москва',
          cityFrom: 'LED',
          cityTo: 'MOW'
        }, {
          dayStart: Date.fromIso('2012-10-28'),
          dayEnd: Date.fromIso('2012-10-28'),
          type: 'flight',
          color: 'red',
          description: 'Москва || Санкт-Петербург',
          cityFrom: 'MOW',
          cityTo: 'LED'
        }, {
          dayStart: Date.fromIso('2012-11-21'),
          dayEnd: Date.fromIso('2012-11-22'),
          type: 'flight',
          color: 'red',
          description: 'Санкт-Петербург || Москва',
          cityFrom: 'LED',
          cityTo: 'MOW'
        }, {
          dayStart: Date.fromIso('2012-11-21'),
          dayEnd: Date.fromIso('2012-11-28'),
          type: 'hotel',
          color: 'red',
          description: 'Californication Hotel',
          city: 'MOW'
        }, {
          dayStart: Date.fromIso('2012-11-28'),
          dayEnd: Date.fromIso('2012-11-28'),
          type: 'flight',
          color: 'red',
          description: 'Москва || Санкт-Петербург',
          cityFrom: 'MOW',
          cityTo: 'LED'
        }, {
          dayStart: Date.fromIso('2012-11-28'),
          dayEnd: Date.fromIso('2012-11-28'),
          type: 'flight',
          color: 'red',
          description: 'Санкт-Петербург || Амстердам',
          cityFrom: 'LED',
          cityTo: 'AMS'
        }, {
          dayStart: Date.fromIso('2012-11-28'),
          dayEnd: Date.fromIso('2012-11-28'),
          type: 'flight',
          color: 'red',
          description: 'Амстердам || Санкт-Петербург',
          cityFrom: 'AMS',
          cityTo: 'LED'
        }, {
          dayStart: Date.fromIso('2012-11-28'),
          dayEnd: Date.fromIso('2012-11-28'),
          type: 'flight',
          color: 'red',
          description: 'Санкт-Петербург || Москва',
          cityFrom: 'LED',
          cityTo: 'MOW'
        }
      ];
      VoyangaCalendarTimeline.calendarEvents = [
        {
          dayStart: Date.fromIso('2012-11-29'),
          dayEnd: Date.fromIso('2012-11-29'),
          type: 'flight',
          color: 'red',
          description: 'Москва || Санкт-Петербург',
          cityFrom: 'MOW',
          cityTo: 'LED'
        }, {
          dayStart: Date.fromIso('2012-11-29'),
          dayEnd: Date.fromIso('2012-12-01'),
          type: 'hotel',
          color: 'red',
          description: 'Californication Hotel2',
          city: 'LED'
        }
      ];
      return VoyangaCalendarTimeline.init();
    }, 1000);
  };

  HotelsController.prototype.render = function(view, data) {
    window.voyanga_debug("HOTELS: rendering", view, data);
    return this.trigger("viewChanged", view, data);
  };

  return HotelsController;

})();
