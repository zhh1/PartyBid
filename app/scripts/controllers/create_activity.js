/**
 * Created by jjq on 14-7-21.
 */
angular.module('PartyBidApp')
    .controller('CreateActivityCtrl', function ($scope, $location) {
        $scope.back_to_activity_list=function(){$location.path('/')}
        $scope.init_data=function(){
            $scope.activity_name = Activity.get_activity_name();
        }
        $scope.confirm_creat=function(activity_name){
            var present_name=activity_name;
            if(localStorage.length!=0)
            {
                 var activity=Array[JSON.parse(localStorage['activity_name'])];
                for(var n=0;n<activity.length;n++){
                    if(activity[n]==present_name){
                        $scope.tip="*活动名称重复";
                        break;
                    }
                    else{
                        activity.push(present_name);
                       localStorage['activity_name']=JSON.stringify(activity);
                        $location.path('/sign_up');
                    }

                }

            }
            else{
                var name=[];
                name.push(present_name);
                localStorage['activity_name']=JSON.stringify(activity);
                $location.path('/sign_up');
            }


        }
    });
