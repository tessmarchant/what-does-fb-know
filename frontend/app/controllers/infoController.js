(function(){

var cont = angular.module('what-does-fb-know.controllers');

cont.controller('infoController', function ($scope, $filter, $http, $location) {

  /* Handle older browsers without good window.location support */
  if (window.location.hostname == null) {
    $scope.hostname = 'whatdoesfbknow.com';
    $scope.rootUrl = 'http://whatdoesfbknow.com/'
  }
  else {
    $scope.hostname = window.location.hostname;
    $scope.rootUrl = 'http://' + window.location.hostname + window.location.pathname;
  }

  $(document).ready(function (){
    var request = $http({
        method: "get",
        url: "api/statistics"
    }).then(function successCallback(response) {
        $scope.stats = response.data;
    }, function errorCallback(response) {
        alert('Server not available');
    });
  });

  $scope.clearHistory = function() {
    localStorage.removeItem('done');
    window.location = $scope.rootUrl;
  };

});

})();