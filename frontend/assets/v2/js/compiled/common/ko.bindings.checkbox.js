// Generated by CoffeeScript 1.4.0
var checkVoybox, uncheckVoybox;

checkVoybox = function(el) {
  return el.find('.ui-control').addClass('on');
};

uncheckVoybox = function(el) {
  return el.find('.ui-control').removeClass('on');
};

ko.bindingHandlers.checkbox = {
  init: function(element, valueAccessor) {
    var checked, classCheck, el, htm, label, new_el;
    label = ko.utils.unwrapObservable(valueAccessor().label);
    checked = valueAccessor().checked;
    el = $(element);
    classCheck = 'checkbox';
    htm = '';
    htm += '<label class="ui-hover cF">';
    htm += '<div class="ui-control ' + classCheck + '"></div>';
    htm += '<div class="fl">';
    htm += '<div class="ui-label">' + label + '</div>';
    htm += '</div>';
    htm += '</label>';
    new_el = $(htm);
    new_el.click(function() {
      el = $(this);
      if (el.find('.ui-control').hasClass('on') !== true) {
        checkVoybox(el);
        if (_.isFunction(checked)) {
          return checked(true);
        } else {
          return $(element).attr('checked', 'checked');
        }
      } else {
        if (_.isFunction(checked)) {
          checked(false);
        } else {
          $(element).removeAttr('checked');
        }
        return uncheckVoybox(el);
      }
    });
    el.after(new_el);
    return el.hide();
  },
  update: function(element, valueAccessor) {
    var checked, el, label;
    label = ko.utils.unwrapObservable(valueAccessor().label);
    checked = ko.utils.unwrapObservable(valueAccessor().checked);
    el = $(element).next();
    el.find('.ui-label').html(label);
    if (checked) {
      checkVoybox(el);
      if (_.isFunction(valueAccessor().checked)) {
        return valueAccessor().checked(1);
      }
    } else {
      uncheckVoybox(el);
      if (_.isFunction(valueAccessor().checked)) {
        return valueAccessor().checked(0);
      }
    }
  }
};
