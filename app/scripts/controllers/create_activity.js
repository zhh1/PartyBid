/**
 * Created by jjq on 14-7-21.
 */
angular.module('PartyBidApp')
    .controller('CreateActivityCtrl', function ($scope, $location) {
//        $scope.is_there_any_activity = localStorage.length;
        $scope.is_there_any_activity = Activity.get_activities().length;

        $scope.confirm_create = function () {
            var activity = new Activity($scope.activity_name);
            if (activity.is_repeat()) {
                activity.save();
                activity.set_current_activity();
                return  $location.path('/sign_up');
            }
            else {
                $scope.tip = "*活动名称重复";
            }
        };

            //            var present_name = $scope.activity_name;
//
//            if (localStorage.activity != null)                //判断localStorage里有没有存储活动
//            {
//                var activities = JSON.parse(localStorage.getItem("activity"));
//                var i = judgment(activities, present_name);
//
//                if (i == 0) {                             //i==0说明localStorage里有活动，但与新创建的活动名称不重复
//                    var activity_object = new Activity(present_name);
//                    activity_object.save();
//                    storage(activities, activity_object);
//                    $location.path('/sign_up');
//                    localStorage['current_activity'] = JSON.stringify(activity_object);
//                }
//                else {
//                    $scope.tip = "*活动名称重复";
//                }
//
//            }
//            else {                                     //localStorage里没有存储活动，创建新数组并存储活动
//                var activities = new activity(present_name);
//                var activity_array = [];
//                storage(activity_array, activities);
//                $location.path('/sign_up');
//                localStorage['current_activity'] = JSON.stringify(activities);
//            }




        function init() {
            if (!localStorage['current_activity']) {
                localStorage['current_activity'] = JSON.stringify([]);
            }
        }

    });
