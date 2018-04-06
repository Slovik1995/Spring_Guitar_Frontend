'use strict';

angular.module('guitarFrontendApp')
  .controller('LearnCtrl',['$scope', '$http','$routeParams','$localStorage','$timeout','$location','$sce','$window',
    function ($scope, $http,$routeParams,$localStorage,$timeout,$location,$sce,$window) {


      $scope.touched=false;

      $scope.updateSelect = function(metronome){
        var e = document.getElementById("metronome");
        $scope.pace = e.options[e.selectedIndex].value;
        $scope.touched=true;
      };

      $scope.audio=new Audio('images/pace30.mp3');
      $scope.previousPace=0;
      $scope.playAudio = function() {
       if(!$scope.audio.paused && $scope.previousPace==$scope.pace){
         $scope.audio.pause();
       }else {
         $scope.previousPace = $scope.pace;
         $scope.audio.pause();
         $scope.audio = new Audio('images/pace' + $scope.pace + '.mp3');
         $scope.audio.play();
       }
      };


      var getLearnedSongs = function(callback){
        var xsrf = {"user":$scope.loggedUser, "song":$routeParams.id};
        $http({
          method: 'POST',
          url: "http://localhost:8080/getLearnedSongs",
          data: xsrf,
          headers: $localStorage.header.headers
        })
          .then(function (response) {
            $scope.idarray=response.data.data.substr(1,response.data.data.length-2).split(',');
            callback();

          }, function () {
            alert('niee dziala');

            //console.error(response.data.errDescr);
          });
      };

      var updateButton = function(){
        if(($scope.idarray.indexOf(""+$routeParams.id) !== -1)||($scope.idarray.indexOf(" "+$routeParams.id) !== -1)) {
          $scope.alreadyLearned = true;
        }
        else{
          $scope.alreadyLearned = false;
        }
      };

      var validateButtonVisibility = function(){
        getLearnedSongs(updateButton);
        //$timeout(updateButton,1000);
// UZYC JAKIEGOS CALLBACKU ZEBY POCZEKAC NA WYKONANIE FUNKCJI A NIE ZEBY BYLY WYKONYWANE ASYNCHRONICZNIE
      };

      $scope.checkThatSong = function(){
        var xsrf = {"user":$scope.loggedUser, "song":$routeParams.id};
        $http({
          method: 'POST',
          url: "http://localhost:8080/checkSong",
          data: xsrf,
          headers: $localStorage.header.headers
        })
        .then(function (response) {
          validateButtonVisibility();
         // var array = response.data.data.split(',');
         // $scope.aaaw= array[nb];
          //alert('udalo sie');
          // $scope.aaaw=$scope.tekst.indexOf("1");



        }, function () {
          alert('nie dziala');
          //console.error(response.data.errDescr);
        });

      //console.error(response.data.errDescr);


    };

      var getSong = function(callback) {
        $scope.songToPlay = "";
        $http.get("http://localhost:8080/song/" + $routeParams.id, $localStorage.header)
          .then(function (response) {
            $scope.temp = angular.fromJson(response.data);
            $scope.song = response.data;
            $scope.song.strimming=$sce.trustAsHtml($scope.song.strimming.valueOf().replace(/U/g,' &#8593; ').replace(/D/g,'&#8595;'));
           // $scope.songLyrics = $scope.temp.chords;
            //    alert($scope.songLyrics);
            // $scope.str=response.data.valueOf();
            //alert($scope.str);
            $scope.songToPlay = $scope.temp.songNameInTheDatabase;
            //     alert($scope.songToPlay);
            //playSong();
            console.info(response.data);
            callback();
          }, function () {
      //      alert("here");
            $scope.song = 'doesnt work';
            $scope.link = '/home';
            $location.url($scope.link);

            //console.error(response.data.errDescr);
          });
      };

      var setTitle = function() {
            $scope.songUrlName = $scope.songToPlay;
      };

      if($scope.authenticated!=true) {
        $location.url('/login');
      }else {
       // buttonVisible();
        $scope.loggedUser=$window.localStorage.getItem("loggedUser");
        validateButtonVisibility();
        getSong(setTitle);
        //$timeout(setTitle, 400);
      }
      /*
       $http.get("http://localhost:8080/player",$localStorage.header)
       .then(function (response) {
       $scope.songLyrics = response.data;
       console.info(response.data);
       }, function () {
       $scope.songsongUrlName = 'doesnt work';

       //console.error(response.data.errDescr);
       });
       */
    }]);







/*
 'use strict';

 angular.module('guitarFrontendApp')
 .controller('TryCtrl',['$scope', '$http','$routeParams','$localStorage',
 function ($scope, $http,$routeParams,$localStorage) {



 $http.get("http://localhost:8080/song/"+$routeParams.id,$localStorage.header)
 .then(function (response) {
 $scope.temp = angular.fromJson(response.data);
 $scope.song = response.data;

 // $scope.str=response.data.valueOf();
 //alert($scope.str);
 $scope.songToPlay=$scope.temp.songNameInTheDatabase;
 alert($scope.songToPlay);
 playSong();
 console.info(response.data);
 }, function () {
 $scope.song = 'doesnt work';

 //console.error(response.data.errDescr);
 });


 var playSong = function() {
 $http.get("http://localhost:8080/play/soshy",$localStorage.header)// + $scope.songToPlay, $localStorage.header)
 .then(function (response) {
 $scope.songLyrics = response.data;
 $scope.songsongUrlName="soshy";//$scope.songToPlay;
 console.info(response.data);

 }, function () {
 $scope.songsongUrlName = 'doesnt work';

 // console.error(response.data.errDescr);
 });
 };

 $http.get("http://localhost:8080/player",$localStorage.header)
 .then(function (response) {
 $scope.songLyrics = response.data;
 console.info(response.data);
 }, function () {
 $scope.songsongUrlName = 'doesnt work';

 //console.error(response.data.errDescr);
 });

 }]);
 */
