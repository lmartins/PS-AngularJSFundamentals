'use strict';

// var angular = require('angular');
require('angular-cookies');

var eventsApp = angular.module('eventsApp', ['ngSanitize', 'ngResource', 'ngCookies', 'ngRoute'])
  .config(function ($routeProvider) {

    $routeProvider.when('/about',
      {
        template: 'Hello World'
      }
    );
    $routeProvider.when('/newEvent',
      {
        templateUrl: '/templates/NewEvent.html',
        controller: 'EditEventController'
      }
    );
    $routeProvider.when('/events',
      {
        templateUrl: 'templates/EventList.html',
        controller: 'EventListController',
        resolve: {
          events: function ($route, eventData) {
            return eventData.getAllEvents().$promise;
          }
        }
      }
    );
    $routeProvider.when('/editProfile',
      {
        templateUrl: 'templates/EditProfile.html',
        controller: 'EditProfileController'
      }
    );
    $routeProvider.when('/event/:eventId',
      {
        templateUrl: '/templates/EventDetails.html',
        controller: 'EventController',
        resolve: {
          event: function ($route, eventData) {
            return eventData.getEvent($route.current.pathParams.eventId).$promise;
          }
        }
      }
    );
    $routeProvider.otherwise({redirectTo: '/events'});
    // $locationProvider.html5Mode(true);
  })
  .factory('myCache', function ($cacheFactory) {
    return $cacheFactory('myCache', {capacity: 3})
  });

require('./controllers/EventController');
require('./controllers/EditEventController');
require('./controllers/EditProfileController');
require('./controllers/EventListController');
require('./controllers/CacheSampleController');
require('./controllers/CompileSampleController');
require('./controllers/LocaleSampleController');
require('./controllers/MainMenuController.js');
require('./controllers/TimeoutSampleController');
require('./controllers/FilterSampleController');
require('./controllers/CookieStoreSampleController');
require('./filters');

require('./services/EventData');
require('./services/GravatarUrlBuilder');
// require('./services/ExceptionHandler');




// var HelloController = function ($scope) {
//   $scope.message = 'Hello World!';
// };

// app.controller('HelloController', ['$scope', HelloController]);
