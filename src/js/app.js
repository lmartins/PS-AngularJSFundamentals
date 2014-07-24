'use strict';

// var angular = require('angular');
// require('angular-route');

var eventsApp = angular.module('eventsApp', ['ngSanitize', 'ngResource'])
  .factory('myCache', function ($cacheFactory) {
    return $cacheFactory('myCache', {capacity: 3})
  });

require('./controllers/EventController');
require('./controllers/EditEventController');
require('./controllers/EditProfileController');
require('./controllers/CacheSampleController');
require('./controllers/CompileSampleController');
require('./filters');

require('./services/EventData');
require('./services/GravatarUrlBuilder');


// var HelloController = function ($scope) {
//   $scope.message = 'Hello World!';
// };

// app.controller('HelloController', ['$scope', HelloController]);
