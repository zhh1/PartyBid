angular.module('PartyBidApp')
    .controller('MainCtrl', function ($scope, $location) {
        if (localStorage.activity != null) {
            $location.path('/activity_list');
            return;
        }
        $location.path('/create_activity');
    });