/**
 * Created by jjq on 14-7-21.
 */
angular.module('PartyBidApp')
    .controller('ActivityListCtrl', function ($scope, $location) {

        $scope.activities=Activity.get_activities();

        $scope.create_activity= function () {
                $location.path('/create_activity');
         }

        $scope.goto_sign_up= function (activity) {
            $location.path('/sign_up');
            Activity.set_current_activity(activity);
        }

        $scope.activity_yellow = function (activity) {
            if (activity.state == 1) {
                    return "start";
                }
            }
    });
