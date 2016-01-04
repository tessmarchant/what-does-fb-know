(function(){

var cont = angular.module('what-does-fb-know.controllers');

cont.controller('surveyController', function ($scope, $filter, $http, $location) {

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

    if (localStorage.getItem('empinfo') != null) {
      if (confirm("The survey has already been filled out on this browser. If you have not filled it out yet, click OK and go ahead! If you have already filled out the survey, please click Cancel.") == true) {
        $('.navbar-nav').hide();
        $('#survey-page').css("visibility", "visible");
      } else {
        window.location = $scope.rootUrl + '#/info';
      }
    }


  });

  $scope.submit = function () {
    // Send HTTP POST request containing $scope.responses to 'api/submitsurvey'
    var request = $http({
        method: "post",
        url: "api/submitsurvey",
        data: $scope.responses
    }).then(function successCallback(response) {
      localStorage.setItem('empinfo',$scope.responses.empinfo);
      localStorage.setItem('finbeh',$scope.responses.finbeh);
      localStorage.setItem('chardon',$scope.responses.chardon);
      localStorage.setItem('expinfo',$scope.responses.expinfo);
      localStorage.setItem('resprof',$scope.responses.resprof);
      localStorage.setItem('travbeh',$scope.responses.travbeh);
      localStorage.setItem('purchbeh',$scope.responses.purchbeh);
      localStorage.setItem('medcon',$scope.responses.medcon);
      window.location = $scope.rootUrl + '#/info';
    }, function errorCallback(response) {
      alert('Server not available');
    });
    console.log($scope.responses);
  };

  $scope.privacyMeterLabel = function (privacyLevel) {
    //console.log(privacyLevel);
    //console.log($scope.enableSubmit);
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

  $scope.selectGender = function () {
    $scope.selectedGender = true;
  };

  $scope.enableSubmit = function () {
    return $scope.responses.age != '' && $scope.selectedGender;
  };

  $scope.selectedGender = false;

});

})();