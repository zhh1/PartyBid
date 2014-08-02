/**
 * Created by jjq on 14-7-21.
 */
angular.module('PartyBidApp')
    .controller('ActivityListCtrl', function ($scope, $location) {

        $scope.activities=JSON.parse(localStorage['activity']);

        $scope.create_activity= function () {
                $location.path('/create_activity');
         }

        $scope.goto_sign_up= function (activity) {
            $location.path('/sign_up');
            localStorage['current_activity']=JSON.stringify(activity);
        }

        $scope.activity_yellow = function (activity) {
            if (activity.state == 1) {
                    return "start";
                }
            }


    });
