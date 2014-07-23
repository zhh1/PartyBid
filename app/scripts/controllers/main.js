/**
 * Created by jjq on 14-7-23.
 */
angular.module('PartyBidApp')
    .controller('MainCtrl', function ($scope, $location) {
        if (localStorage.length != 0) {

            $location.path('/activity_list');

        }
        else {
            $location.path('/create_activity');
        }
    });