
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
