angular.module('PartyBidApp')
    .controller('SignUpCtrl', function ($scope, $location) {
        Init.signing_up_activity_init();
        Init.messages_init();

        $scope.back_to_activity_list=function(){$location.path('/activity_list')};

        $scope.activity = Activity.get_current_activity();

        var is_start = Activity.judge_start_or_end_state();
        $scope.is_there_any_activity_signing_up = Activity.button_disabled(is_start,$scope.activity,Price.get_price_signing_up());

        $scope.start_sign_up = function() {
            var judge_state = {
                "start": function () {
                    $scope.activity.change_state("end");
                },
                "end": function () {
                    if (confirm("你确定结束报名吗？")) {
                        $scope.activity.change_state("start");
                        $location.path('/price_list');
                    }
                }
            };
            judge_state[$scope.activity.state]();
        };

        $scope.refresh_sign_up_info = function () {   //刷新报名页面的信息列表
            $scope.messages=Message.get_current_activity_messages($scope.activity);
            $scope.sign_up_quantity = $scope.messages.length;
        };

        $scope.refresh_sign_up_info();

    });









