
angular.module('PartyBidApp')
    .controller('SignUpCtrl', function ($scope, $location) {
        $scope.back_to_activity_list=function(){$location.path('/activity_list')};
        signing_up_activity_init();
        var current_activity = Activity.get_current_activity();
        var activity = new Activity(current_activity.name);
        activity.state = current_activity.state;
        var n = Activity.judge_start_or_end_state();

        $scope.start_or_end=Activity.judge_start_or_end(n,activity);

        $scope.is_there_any_activity_signing_up = Activity.button_disabled(n,activity);

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



//if(!Activity.judge_start_or_end()) {
//    $scope.start_or_end = "开始";
//}
//else if(current_activity.state == 1) {
//    $scope.start_or_end="结束";
//}
//else {
//    $scope.start_or_end = "开始";
//    $scope.is_there_any_activity_signing_up = 1;
//}

//        var activity=JSON.parse(localStorage.getItem('current_activity') || '[]');
//        start_or_end_judgment(activity);    //初始时判断按键是什么状态
//
//        $scope.start_sign_up=function(){    //点击按键之后按键状态的改变
//            if(activity.state==1){
//                if (confirm("你确定结束报名吗？"))
//                {
//                    $scope.start_or_end="开始";
//                    activity.state=2;
//                    fresh(activity);
//                    var signing_up=JSON.parse(localStorage.getItem('current_activity'));
//                    localStorage['signing_up']=JSON.stringify(signing_up);
//                }
//            }
//            else{
//                $scope.start_or_end="结束";
//                activity.state=1;
//                fresh(activity);
//                var signing_up=JSON.parse(localStorage.getItem('current_activity'));
//                localStorage['signing_up']=JSON.stringify(signing_up);
//            }
//
//        }
//
//        $scope.refresh_sign_up_info = function () {   //刷新报名页面的信息列表
//            var current_message=[];
//            var all_messages=JSON.parse(localStorage.getItem('message') || '[]');
//            for(var i=0;i<all_messages.length;i++) {
//                if (all_messages[i].activity == activity.name) {
//                    current_message.push(all_messages[i]);   //将当前活动的信息提取出来
//                }
//            }
//            $scope.messages=current_message;
//            $scope.sign_up_quantity=$scope.messages.length;
//        };
//
//        $scope.refresh_sign_up_info();
//
//        function start_or_end_judgment(activity){       //判断按键的初始状态
//            var activities=JSON.parse(localStorage.getItem("activities"));
//            var n=0
//            for(var i=0;i<activities.length;i++){
//               if(parseInt(activities[i].state%2)!=0){
//                   n++;
//               }
//            }
//            if(n==0){
//                $scope.start_or_end="开始";
//            }
//            else if(n==1&&activity.state==1){
//                $scope.start_or_end="结束";
//            }
//            else{
//                $scope.start_or_end="开始";
//                $scope.is_there_any_activity_signing_up=1;  //有一个活动正在报名时，其他活动的开始按键不能使用
//            }
//        }





