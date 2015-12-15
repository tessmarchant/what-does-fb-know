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
        }, 100);
        



    }, function errorCallback(response) {
        alert('Server not available');
    });
  });

  $scope.clearHistory = function() {
    localStorage.removeItem('done');
    window.location = $scope.rootUrl;
  };

  function sum(array) {
    var sum = 0;
    for (var i = 1; i < array.length; i++) {
          sum += array[i];
    }
    return sum;
  };

});

})();