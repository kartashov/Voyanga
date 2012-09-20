/*
SEARCH controller, should be splitted once we will get more actions here
*/

var AviaController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __slice = [].slice;

AviaController = (function() {

  function AviaController(searchParams) {
    this.searchParams = searchParams;
    this.indexAction = __bind(this.indexAction, this);

    this.handleResults = __bind(this.handleResults, this);

    this.searchAction = __bind(this.searchAction, this);

    this.routes = {
      '/search/:from/:to/:when/:adults/:children/:infants/:rtwhen/': this.searchAction,
      '/search/:from/:to/:when/:adults/:children/:infants/': this.searchAction,
      '': this.indexAction
    };
    _.extend(this, Backbone.Events);
  }

  AviaController.prototype.searchAction = function() {
    var args, key;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    window.voyanga_debug("AVIA: Invoking searchAction", args);
    this.searchParams.fromList(args);
    key = "search_" + this.searchParams.key();
    if (sessionStorage.getItem(key) && (window.location.host !== 'test.voyanga.com')) {
      window.voyanga_debug("AVIA: Getting result from cache");
      return this.handleResults(JSON.parse(sessionStorage.getItem(key)));
    } else {
      window.voyanga_debug("AVIA: Getting results via JSONP");
      return $.ajax({
        url: this.searchParams.url(),
        dataType: 'jsonp',
        success: this.handleResults
      });
    }
  };

  AviaController.prototype.handleResults = function(data) {
    var key, stacked;
    window.voyanga_debug("searchAction: handling results", data);
    key = "search_" + this.searchParams.key();
    sessionStorage.setItem(key, JSON.stringify(data));
    stacked = new AviaResultSet(data.flights.flightVoyages);
    stacked.injectSearchParams(data.searchParams);
    stacked.postInit();
    this.render('results', {
      results: stacked
    });
    return ko.processAllDeferredBindingUpdates();
  };

  AviaController.prototype.indexAction = function() {
    window.voyanga_debug("AVIA: invoking indexAction");
    return this.render('index', {});
  };

  AviaController.prototype.render = function(view, data) {
    return this.trigger("viewChanged", view, data);
  };

  return AviaController;

})();
