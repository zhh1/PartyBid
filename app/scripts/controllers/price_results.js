angular.module('PartyBidApp')
    .controller('PriceResultsCtrl', function ($scope,$timeout, $routeParams) {
        $scope.current_price_results = Price.get_price_signing_up().price_name;
        $scope.sign_up_quantity = PriceMessages.get_current_price_messages(Price.get_price_signing_up()).length;
        $scope.price_messages = PriceMessages.sort_price() || [];
        $scope.price_results = PriceMessages.result_display();
        $scope.price_result = PriceMessages.result();
        $scope.message = PriceMessages.get_result();
        $scope.is_there_right_result = PriceMessages.get_current_price_messages(Price.get_price_signing_up()).length !=0;

        if($routeParams.flag == "sign_up") {
            $timeout(function () {
                $("#mymodal").modal('show');
                $timeout(function () {
                    $("#mymodal").modal('hide');
                    $scope.after_popup = true;
                }, 300000);
            }, 0);
        }
        else {
            $scope.not_from_sign_up = true;
            $scope.after_popup = true;
        }

    });
