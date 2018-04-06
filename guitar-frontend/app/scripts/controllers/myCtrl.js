'use strict';


angular.module('guitarFrontendApp')
  .controller('myCtrl',['$scope', '$timeout','$attrs', function($scope,$timeout,$attrs) {
    $scope.count = 0;
    $scope.t2="empty";
    $scope.t4=" ";
    $scope.myFunction = function() {
      $scope.count=$scope.count+30;
      var e = document.getElementById("player");
      $scope.playerTime= e.currentTime.valueOf();

      e.currentTime= e.currentTime+10;

    };

    $scope.manageChords = function(){
      //  alert('jestem w managechords');
      var player = document.getElementById("player");
      player.currentTime=0;
      $scope.currentPlayerSecond = player.currentTime.valueOf();
      $scope.currentPlayerSecond=0;
      $scope.cop = $attrs.qwe;
      $scope.rem = $attrs.qwe;



      $scope.xx=$scope.rem;
      $scope.yy = $scope.xx.split('|')[0];
      $scope.t1 = $scope.yy.split('*')[0];
      $scope.t2 = $scope.yy.split('*')[1];

      $scope.zz = $scope.xx.split('|')[1];
      $scope.zz = $scope.zz.split('|')[0];

      $scope.t3 = $scope.zz.split('*')[0];
      $scope.t4 = $scope.zz.split('*')[1];
      $scope.czas = $scope.t3 - $scope.t1;
      $scope.czas = $scope.czas * 1000;
      var ind = $scope.xx.indexOf("|");
      var str = $scope.xx.substring(ind + 1);
      $scope.rem = str;




      var funk = function(){
        if(player.paused)
          return;
        $scope.xx=$scope.rem;

        $scope.yy=$scope.xx.split('|')[0];
        $scope.t1=$scope.yy.split('*')[0];
        $scope.t2=$scope.yy.split('*')[1];

        $scope.zz=$scope.xx.split('|')[1];
        $scope.zz=$scope.zz.split('|')[0];
        $scope.t3=$scope.zz.split('*')[0];
        $scope.t4=$scope.zz.split('*')[1];
        $scope.czas=$scope.t3-$scope.t1;
        $scope.czas=$scope.czas*1000;
        var ind = $scope.xx.indexOf("|");
        var str = $scope.xx.substring(ind+1);
        $scope.rem =str;

        $timeout(funk,$scope.czas);

      };

      $timeout(funk,$scope.czas);

    };
  }]);
