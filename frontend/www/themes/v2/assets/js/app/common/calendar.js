var Calendar,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Calendar = (function(_super) {

  __extends(Calendar, _super);

  function Calendar(panel) {
    VoyangaCalendarStandart.init(panel);
  }

  Calendar.prototype.minimize = function() {};

  Calendar.prototype.maximize = function() {};

  return Calendar;

})(Backbone.Events);
