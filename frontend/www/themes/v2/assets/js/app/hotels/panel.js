var HotelsPanel, PanelRoom,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PanelRoom = (function() {

  function PanelRoom() {
    this.adults = ko.observable(1);
    this.children = ko.observable(0);
  }

  return PanelRoom;

})();

HotelsPanel = (function(_super) {

  __extends(HotelsPanel, _super);

  function HotelsPanel() {
    var _this = this;
    HotelsPanel.__super__.constructor.call(this);
    this.template = 'hotels-panel-template';
    this.rooms = ko.observableArray([[new PanelRoom]]);
    this.calendarText = "Выберите уже чтонибдь";
    this.rt = ko.observable(false);
    this.departureDate = ko.observable(new Date());
    this.arrivalDate = ko.observable(new Date());
    this.calendarValue = ko.computed(function() {
      return {
        twoSelect: true,
        from: _this.departureDate(),
        to: _this.arrivalDate()
      };
    });
  }

  HotelsPanel.prototype.setDate = function() {
    return console.log('setting Date');
  };

  return HotelsPanel;

})(SearchPanel);
