
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
            if (activity.state == "end") {
                    return "start";
            }
        }

        $scope.is_there_any_price_competing = Price.get_price_signing_up().price_state == "start";
    });
