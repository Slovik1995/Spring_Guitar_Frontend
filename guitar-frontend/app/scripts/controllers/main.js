'use strict';

/**
 * @ngdoc function
 * @name guitarFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the guitarFrontendApp
 */
angular.module('guitarFrontendApp')
  .controller('MainCtrl',
    function ($scope, $http, $localStorage) {
      var self = this;
      self.logoutq = function () {
        alert('wywolana');
        //$scope.qqq = $localStorage.header.headers;
        $http.get("http://localhost:8080/logout", $localStorage.header)
          .then(function (response) {
            $scope.str = response.data;
            $scope.myurl1 = 'dziala';

            console.info(response.data);
          }, function () {
            $scope.myurl = 'nie dziala';

            // console.error(response.data.errDescr);
          });
      }
    }
  );
