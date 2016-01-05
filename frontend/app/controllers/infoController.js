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
    $('.navbar-nav').show();
    $('button.navbar-toggle').show();
    $('#page-link-info').addClass('page-selected active');
    $('#page-link-tools').removeClass('page-selected active');
    window.scrollTo(0,0);
    var request = $http({
        method: "get",
        url: "api/statistics"
    }).then(function successCallback(response) {
        $scope.stats = response.data;

        window.setTimeout(function () {
          var allStatsData = $scope.stats.allStats;

          var allStats_empinfo_sum = sum(allStatsData.empinfo);
          var allStatsPc_empinfo = [];
          var allStats_finbeh_sum = sum(allStatsData.finbeh);
          var allStatsPc_finbeh = [];
          var allStats_chardon_sum = sum(allStatsData.chardon);
          var allStatsPc_chardon = [];
          var allStats_expinfo_sum = sum(allStatsData.expinfo);
          var allStatsPc_expinfo = [];
          var allStats_resprof_sum = sum(allStatsData.resprof);
          var allStatsPc_resprof = [];
          var allStats_travbeh_sum = sum(allStatsData.travbeh);
          var allStatsPc_travbeh = [];
          var allStats_purchbeh_sum = sum(allStatsData.purchbeh);
          var allStatsPc_purchbeh = [];
          var allStats_medcon_sum = sum(allStatsData.medcon);
          var allStatsPc_medcon = [];
          for (var i = 1; i < allStatsData.empinfo.length; i++) {
            allStatsPc_empinfo.push((allStatsData.empinfo[i]/allStats_empinfo_sum)*100);
            $('#layer-allstats-empinfo-' + i).width(allStatsPc_empinfo[i-1] + '%');

            allStatsPc_finbeh.push((allStatsData.finbeh[i]/allStats_finbeh_sum)*100);
            $('#layer-allstats-finbeh-' + i).width(allStatsPc_finbeh[i-1] + '%');

            allStatsPc_chardon.push((allStatsData.chardon[i]/allStats_chardon_sum)*100);
            $('#layer-allstats-chardon-' + i).width(allStatsPc_chardon[i-1] + '%');

            allStatsPc_expinfo.push((allStatsData.expinfo[i]/allStats_expinfo_sum)*100);
            $('#layer-allstats-expinfo-' + i).width(allStatsPc_expinfo[i-1] + '%');

            allStatsPc_resprof.push((allStatsData.resprof[i]/allStats_resprof_sum)*100);
            $('#layer-allstats-resprof-' + i).width(allStatsPc_resprof[i-1] + '%');

            allStatsPc_travbeh.push((allStatsData.travbeh[i]/allStats_travbeh_sum)*100);
            $('#layer-allstats-travbeh-' + i).width(allStatsPc_travbeh[i-1] + '%');

            allStatsPc_purchbeh.push((allStatsData.purchbeh[i]/allStats_purchbeh_sum)*100);
            $('#layer-allstats-purchbeh-' + i).width(allStatsPc_purchbeh[i-1] + '%');

            allStatsPc_medcon.push((allStatsData.medcon[i]/allStats_medcon_sum)*100);
            $('#layer-allstats-medcon-' + i).width(allStatsPc_medcon[i-1] + '%');
          }

          $('.bargraph').css('visibility', 'visible');
          $('.bargraph').css('padding-bottom', '0');
          $('.bargraph').animate({
            width: '+100%'
          }, 500, function() {
            $('.bargraph').css('padding-bottom', '5em');
          });

          $('.accordion').accordion({
            collapsible: true,
            active: false
          });
          $('.accordion').css({
            visibility: 'visible'
          });
        }, 100);

    }, function errorCallback(response) {
        alert('Server not available');
    });
  });

  $scope.clearHistory = function() {
    localStorage.removeItem('empinfo');
    localStorage.removeItem('finbeh');
    localStorage.removeItem('chardon');
    localStorage.removeItem('expinfo');
    localStorage.removeItem('resprof');
    localStorage.removeItem('travbeh');
    localStorage.removeItem('purchbeh');
    localStorage.removeItem('medcon');
    window.location = $scope.rootUrl;
  };

  $scope.privacyMeterLabel = function (privacyLevel) {
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

  $scope.empInfoLabel = function () {
    var text = 'Employment Information: ';
    if (localStorage.getItem('empinfo') == '1') {
      text = text + 'Very Private';
    }
    else if (localStorage.getItem('empinfo') == '2') {
      text = text + 'Fairly Private';
    }
    else if (localStorage.getItem('empinfo') == '3') {
      text = text + 'Somewhat Private';
    }
    else if (localStorage.getItem('empinfo') == '4') {
      text = text + 'Neither Private nor Public';
    }
    else if (localStorage.getItem('empinfo') == '5') {
      text = text + 'Somewhat Public';
    }
    else if (localStorage.getItem('empinfo') == '6') {
      text = text + 'Fairly Public';
    }
    else if (localStorage.getItem('empinfo') == '7') {
      text = text + 'Very Public';
    }
    else {
      text = text + 'error';
    }
    return text;
  }

  $scope.finBehLabel = function () {
    var text = 'Financial Behaviors: ';
    if (localStorage.getItem('finbeh') == '1') {
      text = text + 'Very Private';
    }
    else if (localStorage.getItem('finbeh') == '2') {
      text = text + 'Fairly Private';
    }
    else if (localStorage.getItem('finbeh') == '3') {
      text = text + 'Somewhat Private';
    }
    else if (localStorage.getItem('finbeh') == '4') {
      text = text + 'Neither Private nor Public';
    }
    else if (localStorage.getItem('finbeh') == '5') {
      text = text + 'Somewhat Public';
    }
    else if (localStorage.getItem('finbeh') == '6') {
      text = text + 'Fairly Public';
    }
    else if (localStorage.getItem('finbeh') == '7') {
      text = text + 'Very Public';
    }
    else {
      text = text + 'error';
    }
    return text;
  }

  $scope.charDonLabel = function () {
    var text = 'Charitable Donations: ';
    if (localStorage.getItem('chardon') == '1') {
      text = text + 'Very Private';
    }
    else if (localStorage.getItem('chardon') == '2') {
      text = text + 'Fairly Private';
    }
    else if (localStorage.getItem('chardon') == '3') {
      text = text + 'Somewhat Private';
    }
    else if (localStorage.getItem('chardon') == '4') {
      text = text + 'Neither Private nor Public';
    }
    else if (localStorage.getItem('chardon') == '5') {
      text = text + 'Somewhat Public';
    }
    else if (localStorage.getItem('chardon') == '6') {
      text = text + 'Fairly Public';
    }
    else if (localStorage.getItem('chardon') == '7') {
      text = text + 'Very Public';
    }
    else {
      text = text + 'error';
    }
    return text;
  }

  $scope.expInfoLabel = function () {
    var text = 'Expat Information: ';
    if (localStorage.getItem('expinfo') == '1') {
      text = text + 'Very Private';
    }
    else if (localStorage.getItem('expinfo') == '2') {
      text = text + 'Fairly Private';
    }
    else if (localStorage.getItem('expinfo') == '3') {
      text = text + 'Somewhat Private';
    }
    else if (localStorage.getItem('expinfo') == '4') {
      text = text + 'Neither Private nor Public';
    }
    else if (localStorage.getItem('expinfo') == '5') {
      text = text + 'Somewhat Public';
    }
    else if (localStorage.getItem('expinfo') == '6') {
      text = text + 'Fairly Public';
    }
    else if (localStorage.getItem('expinfo') == '7') {
      text = text + 'Very Public';
    }
    else {
      text = text + 'error';
    }
    return text;
  }

  $scope.resProfLabel = function () {
    var text = 'Residential Profile: ';
    if (localStorage.getItem('resprof') == '1') {
      text = text + 'Very Private';
    }
    else if (localStorage.getItem('resprof') == '2') {
      text = text + 'Fairly Private';
    }
    else if (localStorage.getItem('resprof') == '3') {
      text = text + 'Somewhat Private';
    }
    else if (localStorage.getItem('resprof') == '4') {
      text = text + 'Neither Private nor Public';
    }
    else if (localStorage.getItem('resprof') == '5') {
      text = text + 'Somewhat Public';
    }
    else if (localStorage.getItem('resprof') == '6') {
      text = text + 'Fairly Public';
    }
    else if (localStorage.getItem('resprof') == '7') {
      text = text + 'Very Public';
    }
    else {
      text = text + 'error';
    }
    return text;
  }

  $scope.travBehLabel = function () {
    var text = 'Travel Behaviors: ';
    if (localStorage.getItem('travbeh') == '1') {
      text = text + 'Very Private';
    }
    else if (localStorage.getItem('travbeh') == '2') {
      text = text + 'Fairly Private';
    }
    else if (localStorage.getItem('travbeh') == '3') {
      text = text + 'Somewhat Private';
    }
    else if (localStorage.getItem('travbeh') == '4') {
      text = text + 'Neither Private nor Public';
    }
    else if (localStorage.getItem('travbeh') == '5') {
      text = text + 'Somewhat Public';
    }
    else if (localStorage.getItem('travbeh') == '6') {
      text = text + 'Fairly Public';
    }
    else if (localStorage.getItem('travbeh') == '7') {
      text = text + 'Very Public';
    }
    else {
      text = text + 'error';
    }
    return text;
  }

  $scope.purchBehLabel = function () {
    var text = 'Purchase Behaviors: ';
    if (localStorage.getItem('purchbeh') == '1') {
      text = text + 'Very Private';
    }
    else if (localStorage.getItem('purchbeh') == '2') {
      text = text + 'Fairly Private';
    }
    else if (localStorage.getItem('purchbeh') == '3') {
      text = text + 'Somewhat Private';
    }
    else if (localStorage.getItem('purchbeh') == '4') {
      text = text + 'Neither Private nor Public';
    }
    else if (localStorage.getItem('purchbeh') == '5') {
      text = text + 'Somewhat Public';
    }
    else if (localStorage.getItem('purchbeh') == '6') {
      text = text + 'Fairly Public';
    }
    else if (localStorage.getItem('purchbeh') == '7') {
      text = text + 'Very Public';
    }
    else {
      text = text + 'error';
    }
    return text;
  }

  $scope.medConLabel = function () {
    var text = 'Media Consumption: ';
    if (localStorage.getItem('medcon') == '1') {
      text = text + 'Very Private';
    }
    else if (localStorage.getItem('medcon') == '2') {
      text = text + 'Fairly Private';
    }
    else if (localStorage.getItem('medcon') == '3') {
      text = text + 'Somewhat Private';
    }
    else if (localStorage.getItem('medcon') == '4') {
      text = text + 'Neither Private nor Public';
    }
    else if (localStorage.getItem('medcon') == '5') {
      text = text + 'Somewhat Public';
    }
    else if (localStorage.getItem('medcon') == '6') {
      text = text + 'Fairly Public';
    }
    else if (localStorage.getItem('medcon') == '7') {
      text = text + 'Very Public';
    }
    else {
      text = text + 'error';
    }
    return text;
  }

  function sum(array) {
    var sum = 0;
    for (var i = 1; i < array.length; i++) {
          sum += array[i];
    }
    return sum;
  };

});

})();