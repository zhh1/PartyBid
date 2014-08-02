/**
 * Created by jjq on 14-7-23.
 */
angular.module('PartyBidApp')
    .controller('MainCtrl', function ($scope, $location) {
        if (localStorage.activity!=null) {

            $location.path('/activity_list');

        }
        else {
            $location.path('/create_activity');
        }
    });