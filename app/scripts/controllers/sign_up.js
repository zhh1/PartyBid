
angular.module('PartyBidApp')
    .controller('SignUpCtrl', function ($scope, $location) {
        $scope.back_to_activity_list=function(){$location.path('/activity_list')};
        signing_up_activity_init();
        messages_init();
        var current_activity = Activity.get_current_activity();
        var activity = new Activity(current_activity.activity_name);
        activity.state = current_activity.state;
        var n = Activity.judge_start_or_end_state();

        $scope.start_or_end=Activity.judge_start_or_end(n,activity);

        $scope.is_there_any_activity_signing_up = Activity.button_disabled(n,activity,Price.get_price_signing_up());

        $scope.start_sign_up = function(start_or_end_state) {
            var judge_state = {
                "开始": function () {
                    $scope.start_or_end = "结束";
                    activity.change_state("end");
                    activity.fresh_activity_state();
                    var signing_up = Activity.get_current_activity();
                    Activity.set_signing_up_activity(signing_up);
                },
                "结束": function () {
                    if (confirm("你确定结束报名吗？")) {
                        $scope.start_or_end = "开始";
                        activity.change_state("start");
                        activity.fresh_activity_state();
                        var signing_up = Activity.get_current_activity();
                        Activity.set_signing_up_activity(signing_up);
                        $location.path('/price_list');
                    }
                }
            };
            judge_state[start_or_end_state]();
        }

        $scope.refresh_sign_up_info = function () {   //刷新报名页面的信息列表
            $scope.messages=Message.get_current_activity_messages(current_activity);
            $scope.sign_up_quantity = $scope.messages.length;
        };

        $scope.refresh_sign_up_info();

    });









