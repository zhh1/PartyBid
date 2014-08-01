/**
 * Created by jjq on 14-7-22.
 */
angular.module('PartyBidApp')
    .controller('SignUpCtrl', function ($scope, $location) {
        $scope.back_to_activity_list=function(){$location.path('/activity_list')}

        $scope.start_or_end="开始";

        $scope.start_sign_up=function(){

            if($scope.start_or_end=="开始"){
                $scope.start_or_end="结束";



            }
            else{
                $scope.start_or_end="开始";
            }


        }


    });
