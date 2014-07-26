
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
