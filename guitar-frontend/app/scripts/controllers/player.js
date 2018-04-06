'use strict';


angular.module('guitarFrontendApp')
  .controller('PlayerCtrl',['$scope', '$http','$localStorage',
    function ($scope, $http,$localStorage) {
g
      $http.get("http://localhost:8080/player",$localStorage.header)
        .then(function (response) {
          $scope.song = response.data;

          console.info(response.data);
        }, function () {
          $scope.song = 'doesnt work';

          //console.error(response.data.errDescr);
        });
    }]);

