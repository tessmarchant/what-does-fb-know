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
    $('button.navbar-toggle').css('display', '');
    $('#page-link-tools').addClass('page-selected active');
    $('#page-link-info').removeClass('page-selected active');
    window.scrollTo(0,0);

    $('.accordion').accordion({
      heightStyle: 'content'
    });
    $('.accordion').css({
      visibility: 'visible'
    });

  });

  $scope.submit2 = function () {
    // Send HTTP POST request containing $scope.responses2 to 'api/submitsurvey2'
    var request = $http({
        method: "post",
        url: "api/submitsurvey2",
        data: $scope.responses2
    }).then(function successCallback(response) {
      $scope.alreadySubmitted = true;
      alert('Thank you!');
    }, function errorCallback(response) {
      alert('Server not available');
    });
    console.log($scope.responses2);
  };

  $scope.selectAnswer = function () {
    $scope.selectedAnswer = true;
  };

  $scope.enableSubmit2 = function () {
    return $scope.selectedAnswer && !$scope.alreadySubmitted;
  };

  $scope.selectedAnswer = false;
  $scope.alreadySubmitted = false;
});

})();