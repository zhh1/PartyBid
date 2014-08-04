/**
 * Created by jjq on 14-7-21.
 */
angular.module('PartyBidApp')
    .controller('CreateActivityCtrl', function ($scope, $location) {
        $scope.is_there_any_activity=localStorage.length;

        $scope.confirm_create=function(){

            var present_name=$scope.activity_name;

            if(localStorage.activity!=null)                //判断localStorage里有没有存储活动
            {
                var activities=JSON.parse(localStorage.getItem("activity"));
                var i=judgment(activities,present_name);

                if(i==0){                             //i==0说明localStorage里有活动，但与新创建的活动名称不重复
                    var activity_object=new activity(present_name);
                    storage(activities,activity_object);
                    $location.path('/sign_up');
                    localStorage['current_activity']=JSON.stringify(activity_object);

                    localStorage['signing_up']=JSON.stringify(activity_object);
                }
                else{
                    $scope.tip="*活动名称重复";
                }

            }
            else{                                     //localStorage里没有存储活动，创建新数组并存储活动
                var activityname=new activity(present_name);
                var activity_array=[];
                storage(activity_array,activityname);
                $location.path('/sign_up');
                localStorage['current_activity']=JSON.stringify(activityname);
                localStorage['singing_up']=JSON.stringify(activityname);
            }


        }


    });
