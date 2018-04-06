

angular.module('guitarFrontendApp')
  .controller('LogoutCtrl',['$scope', '$http','$localStorage','$location',
    function ($scope, $http,$localStorage,$location) {
      var self=this;
      self.logout=function() {
      //  alert('elo');
        // $scope.qqq = $localStorage.header.headers;
        $http.get("http://localhost:8080/logout", $localStorage.header)
          .then(function (response) {
            $localStorage.header = {};
            $localStorage.$reset();
            $location.url('/login');
            console.info(response.data);
          }, function () {
            $scope.myurl = 'nie dziala';
            // $location.url('/login');
            // console.error(response.data.errDescr);
          });
      }
    }]);

