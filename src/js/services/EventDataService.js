
var eventsApp = angular.module('eventsApp');

eventsApp.factory('eventData', function() {
  return {
    event: {
      name: 'Angular Boot Camp',
      date: '2014-07-20',
      time: '10:30am',
      location: {
        address: 'Google Headquarters',
        city: 'Mountain VIew',
        province: 'CA'
      },
      imageUrl: 'img/angularjs-logo.png',
      sessions: [
        {
          name: 'Scopes for fun and profit',
          creatorName: 'John Doe',
          duration: 1,
          level: 'Introductory',
          abstract: 'In this session you will leanr the ins and outs of directives!',
          upVoteCount: 0
        },
        {
          name: 'Directives Masterclass',
          creatorName: 'Bob Smith',
          duration: 2,
          level: 'Advanced',
          abstract: 'In this session you will leanr the ins and outs of directives!',
          upVoteCount: 2
        },
        {
          name: 'Well behaved controllers',
          creatorName: 'Jane Doe',
          duration: 4,
          level: 'Intermediate',
          abstract: 'In this session you will leanr the ins and outs of directives!',
          upVoteCount: 2
        }
      ]
    }

  };
});
