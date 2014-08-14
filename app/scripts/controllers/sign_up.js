
angular.module('PartyBidApp')
    .controller('SignUpCtrl', function ($scope, $location) {
        $scope.back_to_activity_list=function(){$location.path('/activity_list')};
        signing_up_activity_init();
        messages_init();
        $scope.activity = Activity.get_current_activity();

        var n = Activity.judge_start_or_end_state();
        $scope.is_there_any_activity_signing_up = Activity.button_disabled(n,$scope.activity,Price.get_price_signing_up());

        $scope.start_sign_up = function() {
            var judge_state = {
                "start": function () {
                    $scope.activity.change_state("end");
                    $scope.activity.fresh_activity_state();
                    var signing_up = Activity.get_current_activity();
                    Activity.set_signing_up_activity(signing_up);
                },
                "end": function () {
                    if (confirm("你确定结束报名吗？")) {
                        $scope.activity.change_state("start");
                        $scope.activity.fresh_activity_state();
                        var signing_up = Activity.get_current_activity();
                        Activity.set_signing_up_activity(signing_up);
                        $location.path('/price_list');
                    }
                }
            };
            judge_state[$scope.activity.state]();
        }

        $scope.refresh_sign_up_info = function () {   //刷新报名页面的信息列表
            $scope.messages=Message.get_current_activity_messages($scope.activity);
            $scope.sign_up_quantity = $scope.messages.length;
        };

        $scope.refresh_sign_up_info();

    });









