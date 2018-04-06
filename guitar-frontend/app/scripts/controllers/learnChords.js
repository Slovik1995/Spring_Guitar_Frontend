angular.module('guitarFrontendApp')
  .controller('LearnChordsCtrl',['$scope', '$http','$localStorage','$routeParams','$location',
    function ($scope, $http,$localStorage,$routeParams,$location) {

      var getChords = function(){
        $http.get("http://localhost:8080/loggedUser", $localStorage.header)
          .then(function (response) {
            $scope.level = angular.fromJson(response.data).level;

            $http.get("http://localhost:8080/learnChords/"+$scope.level,$localStorage.header)
              .then(function (response) {
                $scope.thisLevelChords=response.data.data.valueOf().split(',')[1].split(':')[1].replace(/[!|]|[!|]]/g,',').split(',');
                $scope.previousLevelChords=response.data.data.valueOf().split(',')[2].split(':')[1].split('}')[0].replace(/[!|]|[!|]]/g,',').split(',');
                console.info(response.data);
              }, function () {
                alert('nie dziala');
              });
          }, function () {
            alert('nie dziala');
          });

        };

      if($scope.authenticated!=true) {
        $location.url('/login');
      }else {
        getChords();
      }

    }]);
