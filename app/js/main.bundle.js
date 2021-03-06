/*!
 * AngularJSFundamentals
 * 0.1.0:1406725740868 [development build]
 */
webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// var angular = require('angular');
	__webpack_require__(1);
	
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
	    $routeProvider.when('/sampleDirective',
	      {
	        templateUrl: '/templates/SampleDirective.html',
	        controller: 'SampleDirectiveController'
	      }
	    );
	    $routeProvider.when('/directiveCompileSample',
	      {
	        templateUrl: '/templates/DirectiveCompileSample.html'
	        // controller: 'DirectiveCompileSampleController'
	      }
	    );
	    // $routeProvider.otherwise({redirectTo: '/events'});
	    // $locationProvider.html5Mode(true);
	  })
	  .factory('myCache', function ($cacheFactory) {
	    return $cacheFactory('myCache', {capacity: 3})
	  });
	
	// CONTROLLERS ----------------------------------------------------------------
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	
	
	// DIRECTIVES -----------------------------------------------------------------
	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(22);
	__webpack_require__(23);
	__webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(26);
	
	
	// FILTERS --------------------------------------------------------------------
	__webpack_require__(27);
	
	
	// SERVICES -------------------------------------------------------------------
	__webpack_require__(28);
	__webpack_require__(29);
	__webpack_require__(30);
	
	
	
	
	// var HelloController = function ($scope) {
	//   $scope.message = 'Hello World!';
	// };
	
	// app.controller('HelloController', ['$scope', HelloController]);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @license AngularJS v1.2.21
	 * (c) 2010-2014 Google, Inc. http://angularjs.org
	 * License: MIT
	 */
	(function(window, angular, undefined) {'use strict';
	
	/**
	 * @ngdoc module
	 * @name ngCookies
	 * @description
	 *
	 * # ngCookies
	 *
	 * The `ngCookies` module provides a convenient wrapper for reading and writing browser cookies.
	 *
	 *
	 * <div doc-module-components="ngCookies"></div>
	 *
	 * See {@link ngCookies.$cookies `$cookies`} and
	 * {@link ngCookies.$cookieStore `$cookieStore`} for usage.
	 */
	
	
	angular.module('ngCookies', ['ng']).
	  /**
	   * @ngdoc service
	   * @name $cookies
	   *
	   * @description
	   * Provides read/write access to browser's cookies.
	   *
	   * Only a simple Object is exposed and by adding or removing properties to/from this object, new
	   * cookies are created/deleted at the end of current $eval.
	   * The object's properties can only be strings.
	   *
	   * Requires the {@link ngCookies `ngCookies`} module to be installed.
	   *
	   * @example
	   *
	   * ```js
	   * angular.module('cookiesExample', ['ngCookies'])
	   *   .controller('ExampleController', ['$cookies', function($cookies) {
	   *     // Retrieving a cookie
	   *     var favoriteCookie = $cookies.myFavorite;
	   *     // Setting a cookie
	   *     $cookies.myFavorite = 'oatmeal';
	   *   }]);
	   * ```
	   */
	   factory('$cookies', ['$rootScope', '$browser', function ($rootScope, $browser) {
	      var cookies = {},
	          lastCookies = {},
	          lastBrowserCookies,
	          runEval = false,
	          copy = angular.copy,
	          isUndefined = angular.isUndefined;
	
	      //creates a poller fn that copies all cookies from the $browser to service & inits the service
	      $browser.addPollFn(function() {
	        var currentCookies = $browser.cookies();
	        if (lastBrowserCookies != currentCookies) { //relies on browser.cookies() impl
	          lastBrowserCookies = currentCookies;
	          copy(currentCookies, lastCookies);
	          copy(currentCookies, cookies);
	          if (runEval) $rootScope.$apply();
	        }
	      })();
	
	      runEval = true;
	
	      //at the end of each eval, push cookies
	      //TODO: this should happen before the "delayed" watches fire, because if some cookies are not
	      //      strings or browser refuses to store some cookies, we update the model in the push fn.
	      $rootScope.$watch(push);
	
	      return cookies;
	
	
	      /**
	       * Pushes all the cookies from the service to the browser and verifies if all cookies were
	       * stored.
	       */
	      function push() {
	        var name,
	            value,
	            browserCookies,
	            updated;
	
	        //delete any cookies deleted in $cookies
	        for (name in lastCookies) {
	          if (isUndefined(cookies[name])) {
	            $browser.cookies(name, undefined);
	          }
	        }
	
	        //update all cookies updated in $cookies
	        for(name in cookies) {
	          value = cookies[name];
	          if (!angular.isString(value)) {
	            value = '' + value;
	            cookies[name] = value;
	          }
	          if (value !== lastCookies[name]) {
	            $browser.cookies(name, value);
	            updated = true;
	          }
	        }
	
	        //verify what was actually stored
	        if (updated){
	          updated = false;
	          browserCookies = $browser.cookies();
	
	          for (name in cookies) {
	            if (cookies[name] !== browserCookies[name]) {
	              //delete or reset all cookies that the browser dropped from $cookies
	              if (isUndefined(browserCookies[name])) {
	                delete cookies[name];
	              } else {
	                cookies[name] = browserCookies[name];
	              }
	              updated = true;
	            }
	          }
	        }
	      }
	    }]).
	
	
	  /**
	   * @ngdoc service
	   * @name $cookieStore
	   * @requires $cookies
	   *
	   * @description
	   * Provides a key-value (string-object) storage, that is backed by session cookies.
	   * Objects put or retrieved from this storage are automatically serialized or
	   * deserialized by angular's toJson/fromJson.
	   *
	   * Requires the {@link ngCookies `ngCookies`} module to be installed.
	   *
	   * @example
	   *
	   * ```js
	   * angular.module('cookieStoreExample', ['ngCookies'])
	   *   .controller('ExampleController', ['$cookieStore', function($cookieStore) {
	   *     // Put cookie
	   *     $cookieStore.put('myFavorite','oatmeal');
	   *     // Get cookie
	   *     var favoriteCookie = $cookieStore.get('myFavorite');
	   *     // Removing a cookie
	   *     $cookieStore.remove('myFavorite');
	   *   }]);
	   * ```
	   */
	   factory('$cookieStore', ['$cookies', function($cookies) {
	
	      return {
	        /**
	         * @ngdoc method
	         * @name $cookieStore#get
	         *
	         * @description
	         * Returns the value of given cookie key
	         *
	         * @param {string} key Id to use for lookup.
	         * @returns {Object} Deserialized cookie value.
	         */
	        get: function(key) {
	          var value = $cookies[key];
	          return value ? angular.fromJson(value) : value;
	        },
	
	        /**
	         * @ngdoc method
	         * @name $cookieStore#put
	         *
	         * @description
	         * Sets a value for given cookie key
	         *
	         * @param {string} key Id for the `value`.
	         * @param {Object} value Value to be stored.
	         */
	        put: function(key, value) {
	          $cookies[key] = angular.toJson(value);
	        },
	
	        /**
	         * @ngdoc method
	         * @name $cookieStore#remove
	         *
	         * @description
	         * Remove given cookie
	         *
	         * @param {string} key Id of the key-value pair to delete.
	         */
	        remove: function(key) {
	          delete $cookies[key];
	        }
	      };
	
	    }]);
	
	
	})(window, window.angular);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.controller('EventController',
	  function EventController( $scope, eventData, $routeParams, $route ) {
	
	    $scope.sortorder = '-upVoteCount';
	    // $scope.event = eventData.getEvent( $routeParams.eventId );
	    $scope.event = $route.current.locals.event;
	    console.log($route.current.params.eventId);
	
	    $scope.upVoteSession = function (session) {
	      session.upVoteCount++;
	    };
	
	    $scope.downVoteSession = function (session) {
	      session.upVoteCount--;
	    };
	
	    $scope.reload = function () {
	      $route.reload();
	    };
	
	  }
	);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.controller('EditEventController',
	  function EditEventController( $scope, eventData ) {
	
	    $scope.saveEvent = function (event, newEventForm) {
	      if (newEventForm.$valid) {
	        eventData.save(event)
	          .$promise.then(
	            function (response) { console.log('success', response) },
	            function (response) { console.log('failure', response) }
	          )
	      }
	    }
	    $scope.cancelEdit = function () {
	      window.location = './EventDetails.html';
	    }
	  }
	);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.controller('EditProfileController',
	  function EditProfileController( $scope, gravatarUrlBuilder ) {
	
	    $scope.user = {};
	
	    $scope.getGravatarURL = function (email) {
	      return gravatarUrlBuilder.buildGravatarUrl(email);
	    }
	  }
	
	);


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.controller('EventListController',
	  function EventListController ($scope, $location, $route) {
	
	    $scope.events = $route.current.locals.events;
	    // $scope.events = eventData.getAllEvents();
	
	  }
	);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.controller('CacheSampleController',
	  function CacheSampleController ($scope, myCache) {
	    $scope.addToCache = function (key, value) {
	      myCache.put(key, value);
	    };
	
	    $scope.readFromCache = function (key) {
	      return myCache.get(key);
	    };
	
	    $scope.getCacheStats = function () {
	      return myCache.info();
	    };
	  }
	);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.controller('CompileSampleController',
	  function CompileSampleController ($scope, $compile, $parse) {
	
	    var fn = $parse('1 + 2');
	    console.log(fn());
	
	    var getter = $parse('event.name');
	
	    var context1 = {event: {name: 'AngularJS Boot Camp'}};
	    var context2 = {event: {name: 'Code Camp'}};
	
	    console.log(getter(context1));
	    console.log(getter(context2));
	
	    console.log(getter(context2, context1));
	
	    var setter = getter.assign;
	    setter(context2, 'Code Retreat');
	    console.log(context2.event.name);
	
	    $scope.appendDivToElement = function(markup) {
	      return $compile(markup)($scope).appendTo( angular.element('#appendHere') );
	    }
	
	  }
	);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var eventsApp = angular.module('eventsApp');
	
	__webpack_require__(9);
	
	eventsApp.controller('LocaleSampleController',
	  function LocaleSampleController ($scope, $locale) {
	
	    $scope.myDate = Date.now();
	    $scope.myFormat = $locale.DATETIME_FORMATS.fullDate;
	
	  }
	);


/***/ },
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.controller('MainMenuController',
	  function MainMenuController( $scope, $location ) {
	    // console.log("absUrl" + $location.absUrl());
	    // console.log("Protocol: " + $location.protocol());
	    // console.log("Port: " + $location.port());
	    // console.log("Host: " + $location.host());
	    // console.log("Path: " + $location.path());
	    // console.log("Search: " + $location.search());
	    // console.log("Hash: " + $location.hash());
	    // console.log("URL: " + $location.url());
	
	    $scope.createEvent = function () {
	      $location.replace();
	      // $location.url('/#/newEvent')
	    }
	
	  }
	);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.controller('TimeoutSampleController',
	  function TimeoutSampleController ($scope, $timeout) {
	
	    var promise = $timeout(function () {
	      $scope.name = "John Doe";
	    }, 3000);
	
	    $scope.cancel= function () {
	      console.log("Promise canceled");
	      $timeout.cancel(promise);
	    };
	
	  }
	);


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.controller('FilterSampleController',
	  function FilterSampleController ($scope, durationsFilter) {
	
	    $scope.data = {};
	
	    $scope.data.duration1 = durationsFilter(1);
	    $scope.data.duration2 = durationsFilter(2);
	    $scope.data.duration3 = durationsFilter(3);
	    $scope.data.duration4 = durationsFilter(4);
	
	  }
	);


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.controller('CookieStoreSampleController',
	  function CookieStoreSampleController ($scope, $cookieStore) {
	
	    $scope.event = {id: 1, name: "My Event"};
	
	    $scope.saveEventToCookie = function (event) {
	      $cookieStore.put('event', event);
	    };
	
	    $scope.getEventFromCookie = function () {
	      console.log($cookieStore.get('event'));
	    };
	
	    $scope.removeEventCookie = function () {
	      $cookieStore.remove('event');
	    };
	
	  }
	);


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.controller('SampleDirectiveController',
	  function SampleDirectiveController ($scope) {
	
	    console.log("Directive Controller");
	
	  }
	);


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.directive('collapsible', function () {
	  return {
	    restrict: 'E',
	    replace: true,
	    transclude: true,
	    template: '<div><h4 class="well-title" ng-click="toggleVisibility()">{{title}}</h4><div ng-show="visible" ng-transclude></div></div>',
	    controller: function ($scope) {
	      $scope.visible = true;
	
	      $scope.toggleVisibility = function toggleVisibility () {
	        $scope.visible = !$scope.visible
	      }
	
	    },
	    scope: {
	      title: '@'
	    }
	  }
	});


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.directive('dateKeys', function () {
	
	  return {
	    restrict: 'A',
	    link: function (scope, element, attrs, controller) {
	      element.on('keydown', function (event) {
	        if (isNumericKeyCode(event.keyCode) || isForwardSlashKeyCode(event.keyCode) || isNavigationKeycode(event.keyCode)) {
	          return true;
	        }
	        return false
	      });
	    }
	  }
	
	  function isNumericKeyCode(keyCode) {
	    return (event.keyCode >= 48 && event.keyCode <= 57)
	        || (event.keyCode >= 96 && event.keyCode <= 105);
	  }
	
	  function isForwardSlashKeyCode(keyCode) {
	    return event.keyCode === 191;
	  }
	
	  function isNavigationKeycode(keyCode) {
	    switch (keyCode) {
	      case 8: //backspace
	      case 35: //end
	      case 36: //home
	      case 37: //left
	      case 38: //up
	      case 39: //right
	      case 40: //down
	      case 45: //ins
	      case 46: //del
	        return true;
	      default:
	        return false;
	    }
	  }
	
	});


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.directive('datePicker', function () {
	
	  return {
	    restrict: 'E',
	    templateUrl: '/templates/directives/datepicker.html',
	    controller: function ($scope, calendarHelper) {
	      $scope.showDatePicker = false;
	
	      $scope.calendar = {
	        year: new Date().getFullYear(),
	        month: new Date().getMonth(),
	        monthName: calendarHelper.getMonthName(new Date().getMonth())
	      };
	
	      $scope.days = calendarHelper.getCalendarDays(new Date().getFullYear(), new Date().getMonth());
	
	      $scope.nextMonth = function() {
	        calendarHelper.incrementCalendarMonth($scope.calendar);
	        $scope.calendar.monthName = calendarHelper.getMonthName($scope.calendar.month);
	        $scope.days = calendarHelper.getCalendarDays($scope.calendar.year, $scope.calendar.month);
	      }
	
	      $scope.previousMonth = function() {
	        calendarHelper.decrementCalendarMonth($scope.calendar);
	        $scope.calendar.monthName = calendarHelper.getMonthName($scope.calendar.month);
	        $scope.days = calendarHelper.getCalendarDays($scope.calendar.year, $scope.calendar.month);
	      }
	
	      $scope.nextYear = function() {
	        $scope.calendar.year++;
	        $scope.days = calendarHelper.getCalendarDays($scope.calendar.year, $scope.calendar.month);
	      }
	
	      $scope.previousYear = function() {
	        $scope.calendar.year--;
	        $scope.days = calendarHelper.getCalendarDays($scope.calendar.year, $scope.calendar.month);
	      }
	
	      $scope.selectDate = function(day) {
	        $scope.element.val(($scope.calendar.month + 1) + "/" + day + "/" + +$scope.calendar.year);
	        $scope.showDatePicker = false;
	      }
	
	    },
	
	    link: function (scope, element, attrs, controller) {
	      var forElement = angular.element("#" + attrs.for);
	      scope.element = forElement;
	
	      forElement.on('focus', function () {
	        scope.$apply(function () {
	          scope.showDatePicker = true;
	        })
	      });
	
	      angular.element('body').on('click', function () {
	        scope.$apply( function () {
	          scope.showDatePicker = false;
	        })
	      });
	
	      forElement.on('click', function (event) {
	        event.stopPropagation();
	      });
	
	      angular.element('.calendar-nav').on('click', function (event) {
	        event.stopPropagation(); // keep the datepicker open
	      });
	    }
	
	  }
	
	});


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.directive('eventDetails', function () {
	  return {
	    restrict: 'E',
	    replace: true,
	    templateUrl: "/templates/directives/eventDetails.html",
	    scope: {
	      event: '=',
	      editable: '=',
	      edit: '&'
	    }
	  }
	});


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.directive('eventThumbnail', function () {
	  return {
	    restrict: 'E',
	    replace: true,
	    templateUrl: "/templates/directives/eventThumbnail.html",
	    scope: {
	      event: '=event'
	    }
	  }
	});


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.directive('gravatar', function (gravatarUrlBuilder) {
	  return {
	    restrict: 'E',
	    template: '<img />',
	    replace: true,
	    link: function (scope, element, attrs, controller) {
	      attrs.$observe('email', function (newValue, oldValue) {
	        if (newValue !== oldValue){
	          attrs.$set('src', gravatarUrlBuilder.buildGravatarUrl(newValue));
	        }
	      })
	    }
	  }
	});


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.directive('repeatX', function () {
	  return {
	    compile: function (element, attributes) {
	
	      for (var i = 0; i < Number(attributes.repeatX) - 1; i++) {
	        element.after(element.clone().attr('repeat-x', 0));
	      }
	      return function (scope, element, attributes, controller) {
	        attributes.$observe('text', function (newValue) {
	          if (newValue === 'Hello World') {
	            element.css('color', 'red');
	          }
	        })
	      }
	
	
	    }
	  };
	});


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.directive('sessionThumbnail', function () {
	  return {
	    restrict: 'E',
	    templateUrl: "/templates/directives/sessionDetails.html",
	    scope: {
	      session: '=',
	      editable: '=',
	      edit: '&'
	    }
	  }
	});


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.directive('mySample', function ( $compile ) {
	  return {
	    restrict: 'C',
	    template: "<input type='text' ng-model='sampleData' /> {{sampleData}}<br/>",
	    scope: {
	      
	    }
	  }
	});


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.directive('upvote', function () {
	  return {
	    restrict: 'E',
	    templateUrl: '/templates/directives/upvote.html',
	    scope: {
	      upvote: "&",
	      downvote: "&",
	      count: "="
	    }
	  }
	});


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.filter('durations', function () {
	  return function (duration) {
	    switch (duration) {
	    case 1:
	      return 'Half Hour'
	    case 2:
	      return '1 Hour'
	    case 3:
	      return 'Half Day'
	    case 4:
	      return 'Full Day'
	    }
	  }
	})


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.factory('calendarHelper', function () {
	    var monthNames = [ "January", "February", "March", "April", "May", "June",
	        "July", "August", "September", "October", "November", "December" ];
	
	    return {
	        incrementCalendarMonth: function(calendar) {
	            if (calendar.month === 11) {
	                calendar.month = 0;
	                calendar.year++;
	            } else {
	                calendar.month++;
	            }
	        },
	        decrementCalendarMonth: function(calendar) {
	            if (calendar.month === 0) {
	                calendar.month = 11;
	                calendar.year--;
	            } else {
	                calendar.month--;
	            }
	        },
	        getCalendarDays: function (year, month) {
	            var monthStartDate = new Date(year, month, 1);
	            var days = [];
	            for (var idx = 0; idx < monthStartDate.getDay(); idx++) {
	                days.push('');
	            }
	            for (var idx = 1; idx <= new Date(year, month+1, 0).getDate(); idx++) {
	                days.push(idx);
	            }
	            return days;
	        },
	        getMonthName: function(monthNumber) {
	            return monthNames[monthNumber];
	        }
	    }
	});


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.factory('eventData', function( $resource ) {
	
	  var resource = $resource('data/event/:id.json', {id: '@id'}, {"getAll": {method: "GET", isArray:true, params: {something: "foo"}}});
	  // var resource = $resource('/app/data/event/:id.json', {id:'@id'});
	
	  return {
	    getEvent: function (eventId) {
	      return resource.get({id:eventId});
	    },
	    save: function (event) {
	      event.id = 999;
	      return resource.save(event);
	    },
	    getAllEvents: function () {
	      return resource.query();
	    }
	
	  };
	});


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.factory('gravatarUrlBuilder', function () {
	  return {
	    buildGravatarUrl: function (email) {
	      var defaultGravatarUrl = "http://www.gravatar.com/avatar/000?s=200";
	
	      var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	      if (!regex.test(email))
	
	        return defaultGravatarUrl;
	
	      var MD5=function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]|(G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};
	
	      return 'http://www.gravatar.com/avatar/' + MD5(email) + ".jpg?s=200&r=g";
	    }
	  }
	})


/***/ }
]);
//# sourceMappingURL=main.bundle.js.map