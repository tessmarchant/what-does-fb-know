(function(){

var cont = angular.module('what-does-fb-know.controllers');

cont.controller('toolsController', function ($scope, $filter, $http, $location) {

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
    $('.navbar-nav').show();
    $('#page-link-tools').addClass('page-selected active');
    $('#page-link-info').removeClass('page-selected active');
    window.scrollTo(0,0);

    


  });

});

})();