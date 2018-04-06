angular.module('guitarFrontendApp')
  .controller('HomeCtrl',['$scope', '$http','$localStorage','$window','$location','$timeout',
    function ($scope, $http,$localStorage,$window,$location,$timeout) {
      //$scope.loggedUser=$window.localStorage.getItem("loggedUser");

      $scope.getRandomSong = function(){
        if($scope.songs.length==0)
          return;
        $scope.randomArrayIndex=Math.floor(Math.random()*1000)%($scope.songs.length);
        $scope.randomSongId=$scope.songs[$scope.randomArrayIndex].id;
        $scope.link = '/learn/'+$scope.randomSongId;
        $location.url($scope.link);
      };



/*
      var getAvatar = function () {
        $http.get("http://localhost:8080/photo1/1", $localStorage.header)
          .then(function (response) {
            //$scope.str=response.data.valueOf();
            // alert($scope.str);
            //  $scope.picture=response.data;
            $scope.image = response.data;
            //  $scope.loggedUser="AAS";
          }, function () {
            $scope.picture = 'doesnt work';
          });
      };
*/


      var getLoggedUser = function() {
        var getUser = function (callback) {
          $http.get("http://localhost:8080/loggedUser", $localStorage.header)
            .then(function (response) {

              $scope.tempUser = angular.fromJson(response.data);
              $scope.userName = $scope.tempUser.name;
              $scope.userSurname = $scope.tempUser.surname;
              $scope.userNick = $scope.tempUser.nick;
              $scope.userEmail = $scope.tempUser.email;
              $scope.userLevel = $scope.tempUser.level;
              $window.localStorage.setItem("learnedSongs",$scope.tempUser.learnedSongs);
              //$scope.loggedUser=response.data;
              callback();
            }, function () {
              $scope.loggedUser = 'does not work';
            });
        };



        var getSongs = function () {

          $http.get("http://localhost:8080/songslist/" + $scope.userLevel, $localStorage.header)
            .then(function (response) {

              //  $scope.tempSongs = angular.fromJson(response.data);
              //$scope.first = $scope.tempSongs[1];
              // $scope.tempor = angular.fromJson($scope.first);
              // $scope.qaqa=$scope.tempor.author;
              // alert($scope.qaqa);

              $scope.songs = response.data;
              if($window.localStorage.getItem("learnedSongs").length==0) {
                $scope.progressValue = 0;

              }
              else {
                $scope.progressValue = Math.floor(($window.localStorage.getItem("learnedSongs").split(',').length * 100) / $scope.songs.length);
                $scope.alreadyLearnedInArray=$window.localStorage.getItem("learnedSongs").split(',');

//alert($scope.alreadyLearnedInArray);
                var strings = $scope.alreadyLearnedInArray;
                function tick(v)
                {
                  return parseInt(v,10);
                }
                var uppers = strings.map(tick);
                $scope.alreadyLearnedInArray=uppers;
                //$scope.alreadyLearnedInArray2=angular.forEach($scope.alreadyLearnedInArray,function(value){value=parseInt(value,10)});
              //alert("xxxxxddddd");
              }
              }, function () {
              $scope.songs = 'does not work';
            });
        };
        getUser(getSongs);
        //$timeout(getSongs, 400);
      };

      if ($scope.authenticated != true) {
        $location.url('/login');
      } else {
       // getAvatar();
        getLoggedUser();
      }

    }]);

