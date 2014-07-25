/*!
 * AngularJSFundamentals
 * 0.1.0:1406311935526 [development build]
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/app/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// var angular = require('angular');
	__webpack_require__(1);
	
	var eventsApp = angular.module('eventsApp', ['ngSanitize', 'ngResource', 'ngCookies'])
	  .factory('myCache', function ($cacheFactory) {
	    return $cacheFactory('myCache', {capacity: 3})
	  });
	
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	
	__webpack_require__(13);
	__webpack_require__(14);
	// require('./services/ExceptionHandler');
	
	
	
	
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
	  function EventController( $scope, eventData, $anchorScroll ) {
	
	    $scope.sortorder = '-upVoteCount';
	
	    eventData.getEvent()
	      .$promise.then(
	        function (event) {
	          $scope.event = event;
	          console.log(event);
	        },
	        function (response) {
	          console.log(response);
	        }
	      )
	
	    $scope.upVoteSession = function (session) {
	      session.upVoteCount++;
	    };
	
	    $scope.downVoteSession = function (session) {
	      session.upVoteCount--;
	    };
	
	    $scope.scrollToSession = function () {
	      $anchorScroll();
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
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var eventsApp = angular.module('eventsApp');
	
	__webpack_require__(8);
	
	eventsApp.controller('LocaleSampleController',
	  function LocaleSampleController ($scope, $locale) {
	
	    $scope.myDate = Date.now();
	    $scope.myFormat = $locale.DATETIME_FORMATS.fullDate;
	
	  }
	);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	angular.module("ngLocale", [], ["$provide", function($provide) {
	var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
	$provide.value("$locale", {
	  "DATETIME_FORMATS": {
	    "AMPMS": [
	      "a.m.",
	      "p.m."
	    ],
	    "DAY": [
	      "Domingo",
	      "Segunda-feira",
	      "Ter\u00e7a-feira",
	      "Quarta-feira",
	      "Quinta-feira",
	      "Sexta-feira",
	      "S\u00e1bado"
	    ],
	    "MONTH": [
	      "Janeiro",
	      "Fevereiro",
	      "Mar\u00e7o",
	      "Abril",
	      "Maio",
	      "Junho",
	      "Julho",
	      "Agosto",
	      "Setembro",
	      "Outubro",
	      "Novembro",
	      "Dezembro"
	    ],
	    "SHORTDAY": [
	      "dom",
	      "seg",
	      "ter",
	      "qua",
	      "qui",
	      "sex",
	      "s\u00e1b"
	    ],
	    "SHORTMONTH": [
	      "Jan",
	      "Fev",
	      "Mar",
	      "Abr",
	      "Mai",
	      "Jun",
	      "Jul",
	      "Ago",
	      "Set",
	      "Out",
	      "Nov",
	      "Dez"
	    ],
	    "fullDate": "EEEE, d 'de' MMMM 'de' y",
	    "longDate": "d 'de' MMMM 'de' y",
	    "medium": "dd/MM/yyyy HH:mm:ss",
	    "mediumDate": "dd/MM/yyyy",
	    "mediumTime": "HH:mm:ss",
	    "short": "dd/MM/yy HH:mm",
	    "shortDate": "dd/MM/yy",
	    "shortTime": "HH:mm"
	  },
	  "NUMBER_FORMATS": {
	    "CURRENCY_SYM": "\u20ac",
	    "DECIMAL_SEP": ",",
	    "GROUP_SEP": "\u00a0",
	    "PATTERNS": [
	      {
	        "gSize": 3,
	        "lgSize": 3,
	        "macFrac": 0,
	        "maxFrac": 3,
	        "minFrac": 0,
	        "minInt": 1,
	        "negPre": "-",
	        "negSuf": "",
	        "posPre": "",
	        "posSuf": ""
	      },
	      {
	        "gSize": 3,
	        "lgSize": 3,
	        "macFrac": 0,
	        "maxFrac": 2,
	        "minFrac": 2,
	        "minInt": 1,
	        "negPre": "-",
	        "negSuf": "\u00a0\u00a4",
	        "posPre": "",
	        "posSuf": "\u00a0\u00a4"
	      }
	    ]
	  },
	  "id": "pt-pt",
	  "pluralCat": function (n) {  if (n == 1) {   return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;}
	});
	}]);

/***/ },
/* 9 */
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
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	
	var eventsApp = angular.module('eventsApp');
	
	eventsApp.factory('eventData', function( $resource ) {
	
	  var resource = $resource('/app/data/event/:id.json', {id:'@id'});
	
	  return {
	    getEvent: function () {
	      return resource.get({id:1});
	    },
	    save: function (event) {
	      event.id = 999;
	      return resource.save(event);
	    },
	
	  };
	});


/***/ },
/* 14 */
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
/******/ ])
//# sourceMappingURL=main.bundle.js.map