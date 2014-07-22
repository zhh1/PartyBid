/**
 * Created by jjq on 14-7-21.
 */
angular.module('PartyBidApp')
    .controller('CreateActivityCtrl', function ($scope, $location) {
        $scope.back_to_activity_list=function(){$location.path('/activity_list')}
        $scope.no_activity_name=!Activity.get_create_activity_name();
        $scope.init_data=function(){
            $scope.activity_name = Activity.get_activity_name();
        }
        $scope.confirm_creat=function(){

            var creat = new Creat();
            if(activity_name==creat.get_activity_name())
            {
                $scope.tip="*活动名称重复";
            }
            else {
                creat.process_creat();
                $scope.init_data();
                $location.path('/sign_up')
            }


        }
    });
