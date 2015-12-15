(function(){

var app = angular.module('what-does-fb-know', [
  'ngRoute',
  'what-does-fb-know.controllers'
]);

var cont = angular.module('what-does-fb-know.controllers', [ ]);

app.config(function ($routeProvider) {

  // configure view routing
  $routeProvider
    .when('/', {
      controller: 'surveyController',
      templateUrl: 'app/partials/survey.html'
    })
    .when('/info', {
      controller: 'infoController',
      templateUrl: 'app/partials/info.html'
    })
    .otherwise({
      redirectTo: '/'
    });

});

})();