/**
 * Created by jjq on 14-7-21.
 */
angular.module('PartyBidApp')
    .controller('ActivityListCtrl', function ($scope, $location) {

        $scope.activities= JSON.parse(localStorage['activity_names']);

        $scope.create_activity= function () {
                $location.path('/create_activity');
         }

    });
