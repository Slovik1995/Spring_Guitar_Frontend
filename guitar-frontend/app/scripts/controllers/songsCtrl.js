angular.module('guitarFrontendApp')
  .controller('SongsCtrl',['$scope', '$http','$localStorage',
    function ($scope, $http,$localStorage) {

      $http.get("http://localhost:8080/songslist",$localStorage.header)
        .then(function (response) {
          $scope.songs = response.data;

          console.info(response.data);
        }, function () {
          $scope.songs = 'does not work';

          //console.error(response.data.errDescr);
        });
    }]);
