// Generated by CoffeeScript 1.3.3
/*
SEARCH controller, should be splitted once we will get more actions here
*/

var ToursController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __slice = [].slice;

ToursController = (function() {

  function ToursController(searchParams) {
    this.searchParams = searchParams;
    this.checkTicketAction = __bind(this.checkTicketAction, this);

    this.handleResults = __bind(this.handleResults, this);

    this.searchAction = __bind(this.searchAction, this);

    this.indexAction = __bind(this.indexAction, this);

    this.api = new ToursAPI;
    this.routes = {
      '/search/*rest': this.searchAction,
      '': this.indexAction
    };
    this.key = "tours_10";
    _.extend(this, Backbone.Events);
  }

  ToursController.prototype.indexAction = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    window.voyanga_debug("TOURS: Invoking indexAction", args);
    this.trigger("index", {});
    this.render('index');
    return ResizeAvia();
  };

  ToursController.prototype.searchAction = function() {
    var args,
      _this = this;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    args[0] = exTrim(args[0], '/');
    args = args[0].split('/');
    window.voyanga_debug("TOURS: Invoking searchAction", args);
    this.searchParams.fromList(args);
    return this.api.search(this.searchParams.url(), function(data) {
      if (!data || data.error) {
        console.error('sup');
        alert('HANDLE ME');
      }
      _this.stacked = _this.handleResults(data);
      _this.stacked.on('inner-template', function(data) {
        return _this.trigger('inner-template', data);
      });
      _this.trigger("results", _this.stacked);
      _this.render('results', _this.stacked);
      return ko.processAllDeferredBindingUpdates();
    });
  };

  ToursController.prototype.handleResults = function(data) {
    var stacked;
    console.log("Handling results", data);
    stacked = new ToursResultSet(data, this.searchParams);
    stacked.checkTicket = this.checkTicketAction;
    return stacked;
  };

  ToursController.prototype.checkTicketAction = function(toursData, resultDeferred) {
    var diff, now,
      _this = this;
    now = moment();
    diff = now.diff(this.stacked.creationMoment, 'seconds');
    if (diff < TOURS_TICKET_TIMELIMIT) {
      resultDeferred.resolve(this.stacked);
      return;
    }
    return this.api.search(this.searchParams.url(), function(data) {
      var result, stacked;
      try {
        stacked = _this.handleResults(data);
      } catch (err) {
        new ErrorPopup('avia500');
        return;
      }
      result = stacked.findAndSelect(toursData);
      if (result) {
        return resultDeferred.resolve(stacked);
      } else {
        new ErrorPopup('toursNoTicketOnValidation', false, function() {});
        return _this.results(stacked);
      }
    });
  };

  ToursController.prototype.render = function(view, data) {
    return this.trigger("viewChanged", view, data);
  };

  return ToursController;

})();
