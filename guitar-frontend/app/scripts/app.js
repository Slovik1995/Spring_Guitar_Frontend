'use strict';

/**
 * @ngdoc overview
 * @name guitarFrontendApp
 * @description
 * # guitarFrontendApp
 *
 * Main module of the application.
 */
var app = angular
  .module('guitarFrontendApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngStorage'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/player',{
        templateUrl: 'views/player.html',
        controller: 'PlayerCtrl',
        controllerAs: 'player'
      })
      .when('/learn/:id',{
        templateUrl: 'views/learn.html',
        controller: 'LearnCtrl',
        controllerAs: 'learn'
      })
      .when('/songslist',{
        templateUrl: 'views/songslist.html',
        controller: 'SongsCtrl',
        controllerAs: 'songs'
      })
      .when('/login',{
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/logout',{
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
        controllerAs: 'logout'
      })
      .when('/learnChords',{
        templateUrl: 'views/learnChords.html',
        controller: 'LearnChordsCtrl',
        controllerAs: 'learnChords'
      })
      .when('/home',{
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .otherwise({
        redirectTo: '/'
      });
  });



app.run(function ($rootScope, $localStorage, $http) {
  $rootScope.authenticated = $localStorage.authenticated;

  $rootScope.logout = function() {
    $http.get('http://localhost:8080/logout', {}).finally(function() {
      $localStorage.$reset();
      $rootScope.authenticated = false;
      $localStorage.authenticated=false;
      $location.path("/");
    });
  };

  $rootScope.home = function() {
      if($rootScope.authenticated == true) {
        $location.path("/home");
      }
    else{
        $location.path("/login");
      }
    };

  $rootScope.chords = function() {
    if($rootScope.authenticated == true) {
          $location.path("/learnChords");
    }
    else{
      $location.path("/login");
    }
  }

});

