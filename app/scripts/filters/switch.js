'use strict';

/**
 * @ngdoc filter
 * @name tectApp.filter:switch
 * @function
 * @description
 * # switch
 * Filter in the tectApp.
 */
angular.module('PartyBidApp')
  .filter('switch', function () {
    return function (input) {
      return input == 'start'? '开始': '结束';
    };
  });
