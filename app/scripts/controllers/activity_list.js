angular.module('PartyBidApp')
    .controller('ActivityListCtrl', function ($scope, $location) {
        $scope.activities=Activity.get_activities();

        $scope.create_activity= function () {
            $location.path('/create_activity');
         };

        $scope.goto_sign_up= function (activity) {
            $location.path('/sign_up');
            Activity.set_current_activity(activity);
        };

        $scope.activity_yellow = function (activity) {
            if(!Price.get_price_signing_up()) {
                return Activity.judge_yellow(activity);
            }
            return Activity.judge_yellow_when_price_signing_up(activity,Price.get_price_signing_up());
        };

        $scope.is_there_any_price_competing = Price.judge_is_price_signing_up();
    });
