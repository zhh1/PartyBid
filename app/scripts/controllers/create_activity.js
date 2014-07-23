/**
 * Created by jjq on 14-7-21.
 */
angular.module('PartyBidApp')
    .controller('CreateActivityCtrl', function ($scope, $location) {



        $scope.confirm_create=function(){
            var present_name=$scope.activity_name;
            if(localStorage.length!=0)
            {
                var i=0
                 var activity=JSON.parse(localStorage['create_activity_name']);
                for(var n=0;n<activity.length;n++) {
                    if (activity[n] == present_name) {
                        $scope.tip = "*活动名称重复";
                        i=1;
                        break;
                    }
                }
            if(i==0){

                activity.push(present_name);
                localStorage['create_activity_name']=JSON.stringify(activity);
                $location.path('/sign_up');
            }

                }

            else{
                var name=[];
                name.push(present_name);
                localStorage['create_activity_name']=JSON.stringify(name);
                $location.path('/sign_up');
            }


        }
    });
