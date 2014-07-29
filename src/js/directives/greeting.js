'use strict';

var eventsApp = angular.module('eventsApp');

eventsApp
  .directive('greeting', function (gravatarUrlBuilder) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: "<div><button class='btn' ng-click='sayHello()'>Say Hello</button><div ng-transclude></div></div>",
      controller: function ($scope) {
        var greetings = ['Hello']
        $scope.sayHello = function () {
          console.log( greetings.join() );
        }
        this.addGreeting = function (greeting) {
          greetings.push(greeting);
        }
      }

    }
  })
  .directive('finnish', function () {
    return {
      restrict: 'A',
      require: '^greeting',
      link: function (scope, element, attrs, controller) {
        controller.addGreeting('hei');
      }
    }
  })
  .directive('hindi', function () {
    return {
      restrict: 'A',
      require: '^greeting',
      link: function (scope, element, attrs, controller) {
        controller.addGreeting('sdsdsdd');
      }
    }
  });
