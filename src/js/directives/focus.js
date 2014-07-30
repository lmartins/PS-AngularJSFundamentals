'use strict';

var eventsApp = angular.module('eventsApp');

eventsApp.directive('focus', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs, controller) {
      angular.element(element).focus();
    }
  }
});
