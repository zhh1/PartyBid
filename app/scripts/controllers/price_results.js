angular.module('PartyBidApp')
    .controller('PriceResultsCtrl', function ($scope,$timeout, $routeParams) {
        $scope.current_price_results = Price.get_price_signing_up().price_name;
        $scope.sign_up_quantity = PriceMessages.sort_price().length;
        $scope.price_messages = PriceMessages.sort_price();
        $scope.price_results = PriceMessages.get_result().person_name + ' ￥' +PriceMessages.get_result().price + ' ' + PriceMessages.get_result().phone;
        $scope.message = PriceMessages.get_result();

        if($routeParams.flag == "sign_up") {
            $timeout(function () {
                $("#mymodal").modal('show');
                $timeout(function () {
                    $("#mymodal").modal('hide');
                    $scope.after_popup = true;
                }, 3000);
            }, 0);
        }
        else {
            $scope.not_from_sign_up = true;
            $scope.after_popup = true;
        }

    });
