/**
 * Created by jjq on 14-7-21.
 */
angular.module('PartyBidApp')
    .controller('CreateActivityCtrl', function ($scope, $location) {
        $scope.is_there_any_activity=localStorage.length;


        $scope.confirm_create=function(){
            var present_name=$scope.activity_name;

            if(localStorage.length!=0)
            {
                var i=0;
                var activity=JSON.parse(localStorage.getItem("activity_names"));

                for(var n=0;n<activity.length;n++) {
                    if (activity[n] == present_name) {
                        $scope.tip = "*活动名称重复";
                        i=1;
                        break;
                    }
                }
                if(i==0){

                   activity.unshift(present_name);
                   localStorage.setItem("activity_names",JSON.stringify(activity));
                   $location.path('/sign_up');
                }

            }

            else{
                var name=Array();
                name.unshift(present_name);
                localStorage['activity_names']=JSON.stringify(name);
                $location.path('/sign_up');
            }


        }
    });
