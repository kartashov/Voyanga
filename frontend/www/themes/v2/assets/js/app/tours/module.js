/*
Tours module
Controller + panel
*/

var ToursModule;

ToursModule = (function() {

  function ToursModule() {
    var _this = this;
    this.controller = new ToursController();
    this.controller.on('results', function(results) {
      return _this.panel = results.panel;
    });
  }

  ToursModule.prototype.resize = function() {
    return ResizeAvia();
  };

  return ToursModule;

})();
