/**
 * Created by jjq on 14-7-22.
 */
angular.module('PartyBidApp')
    .controller('SignUpCtrl', function ($scope, $location) {
        $scope.back_to_activity_list=function(){$location.path('/activity_list')}

        var activity=JSON.parse(localStorage['current_activity']);
        start_or_end_judgment(activity);    //初始时判断按键是什么状态

        $scope.start_sign_up=function(){    //点击按键之后按键状态的改变
            if(activity.state==0||activity.state==2){
                $scope.start_or_end="结束";
                activity.state=1;
                fresh(activity);
            }
            else{
                if (confirm("你确定结束报名吗？"))
                {
                    alert("确定结束报名");
                    $scope.start_or_end="开始";
                    activity.state=2;
                    fresh(activity);
                }
                else
                {
                    alert("取消结束报名");
                }
            }
        }

        $scope.messages=JSON.parse(localStorage['message']);

        $scope.sign_up_quantity=$scope.messages.length;

        function start_or_end_judgment(activity){       //判断按键的初始状态
            var activities=JSON.parse(localStorage.getItem("activity"));
            var n=0
            for(var i=0;i<activities.length;i++){
               if(parseInt(activities[i].state%2)!=0){
                   n++;
               }
            }
            if(n==0){
                $scope.start_or_end="开始";
            }
            else if(n==1&&activity.state==1){
                $scope.start_or_end="结束";
            }
            else{
                $scope.start_or_end="开始";
                $scope.is_there_any_activity_signing_up=1;  //有一个活动正在报名时，其他活动的开始按键不能使用
            }
        }




    });
