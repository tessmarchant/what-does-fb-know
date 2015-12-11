(function(){

var cont = angular.module('what-does-fb-know.controllers');

cont.controller('surveyController', function ($scope, $filter, $http, $location) {

  $(document).ready(function (){
    $scope.responses = {};
    $scope.responses.age = "";
    $scope.responses.sex = "";
    $scope.responses.empinfo = "4";
    $scope.responses.finbeh = "4";
    $scope.responses.chardon = "4";
    $scope.responses.expinfo = "4";
    $scope.responses.resprof = "4";
    $scope.responses.travbeh = "4";
    $scope.responses.purchbeh = "4";
    $scope.responses.medcon = "4";
  });

  $scope.submit = function () {
    // Send HTTP POST request containing $scope.responses to 'api/submitsurvey'
    var request = $http({
        method: "post",
        url: "api/submitsurvey",
        data: $scope.responses
    });
    console.log($scope.responses);
  };

  $scope.privacyMeterLabel = function (privacyLevel) {
    console.log(privacyLevel);
    var text = '';
    if (privacyLevel == 1) {
      text = 'Very Private';
    }
    else if (privacyLevel == 2) {
      text = 'Fairly Private';
    }
    else if (privacyLevel == 3) {
      text = 'Somewhat Private';
    }
    else if (privacyLevel == 4) {
      text = 'Neither Private nor Public';
    }
    else if (privacyLevel == 5) {
      text = 'Somewhat Public';
    }
    else if (privacyLevel == 6) {
      text = 'Fairly Public';
    }
    else if (privacyLevel == 7) {
      text = 'Very Public';
    }
    else {
      text = 'error';
    }
    return text;
  };
});

})();