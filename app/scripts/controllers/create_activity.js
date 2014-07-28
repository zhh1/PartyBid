/**
 * Created by jjq on 14-7-21.
 */
angular.module('PartyBidApp')
    .controller('CreateActivityCtrl', function ($scope, $location) {
        $scope.is_there_any_activity=localStorage.length;


        $scope.confirm_create=function(){

            var present_name=$scope.activity_name;

            if(localStorage.length!=0)   //判断localStorage里有没有存储活动
            {
                var activity=JSON.parse(localStorage.getItem("activity_names"));
                i=judgment(activity,present_name);

                if(i==0){              //i==0说明localStorage里有活动，但与新创建的活动名称不重复
                   activity.unshift(present_name);  //unshift将新创建的活动存在数组的最开头部分，方便活动列表里的活动排序
                   localStorage.setItem("activity_names",JSON.stringify(activity));
                   $location.path('/sign_up');
                }
                else{
                    $scope.tip="*活动名称重复";
                }

            }

            else{                    //localStorage里没有存储活动，创建新数组并存储活动
                var name=Array();
                name.unshift(present_name);
                localStorage['activity_names']=JSON.stringify(name);
                $location.path('/sign_up');
            }


        }

        function judgment(array,name) {

            var i=0;
            for (var n = 0; n < array.length; n++) {    //遍历localStorage里的活动，查看是否有重复的名称
                if (array[n] ==name) {

                    i = 1;

                }
            }
            return i;
        }
    });
