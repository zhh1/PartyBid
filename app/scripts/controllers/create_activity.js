angular.module('PartyBidApp')
    .controller('CreateActivityCtrl', function ($scope, $location) {
        Init.current_activity_init();
        Init.activities_init();
        Init.price_signing_up_init();

        $scope.is_there_any_activity = Activity.get_activities().length;

        $scope.confirm_create = function () {
            var activity = new Activity($scope.activity_name);
            if (!activity.is_repeat()) {
                activity.save();
                Activity.set_current_activity(activity);
                return  $location.path('/sign_up');
            }
            $scope.tip = "*活动名称重复";
        };
    });
