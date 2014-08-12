//notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"bm仝键蒋建群","phone":"18733171780"}]})
//notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"jj308","phone":"18733171780"}]})
var native_accessor = {
    send_sms: function (phone, message) {
//        native_access.send_sms({"receivers":[{"name":'name', "phone":phone}]}, {"message_content":message});
        console.log(phone, message);
    },

    receive_message: function (json_message) {
        if (typeof this.process_received_message === 'function') {
            this.process_received_message(json_message);
        }
    },

    process_received_message: function (json_message) {
        var message = Message.delete_blank_spaces(json_message);
        var person_name_or_price = Message.get_person_name_or_price(message);
        var person_phone = Message.get_person_phone(json_message);
        var signing_up_activity = Activity.get_signing_up_activity();
        var price_signing_up = Price.get_price_signing_up();
        var person_name = Message.find_person_name(person_phone);

        var is_sign_up_successful = {        //判断报名能否成功
            0: function () {
                native_accessor.send_sms(person_phone, "您已经报名过了");
            },
            1: function () {
                native_accessor.send_sms(person_phone, "恭喜！报名成功");
                var new_message = new Message(signing_up_activity, person_name_or_price, person_phone);
                new_message.save();
                var scope = angular.element('#register').scope();  //报名成功后刷新报名页面信息列表
                scope.$apply(function () {
                    scope.refresh_sign_up_info();
                });
            }
        }

        var is_sign_up_succeed = {           //判断竞价的人是否报名过
            true: function() {
                is_phone_repeat[PriceMessages.is_price_phone_repeat(person_phone,Price.get_price_signing_up())]();
            },
            false: function() {
                native_accessor.send_sms(person_phone, "对不起，您未报名，无法参与竞价");
            }
        }

        var is_phone_repeat = {        //判断竞价是否重复
            true: function() {
                native_accessor.send_sms(person_phone, "恭喜！竞价成功");
                var price_message = new PriceMessages(price_signing_up.activity_name,price_signing_up.price_name,person_name,person_phone,person_name_or_price);
                price_message.save();
                var scope = angular.element('#price').scope();  //报名成功后刷新报名页面信息列表
                scope.$apply(function () {
                    scope.refresh_price_sign_up_info();
                });
            },
            false:function() {
                native_accessor.send_sms(person_phone, "对不起,您已经竞价过了，请不要重复竞价");
            }
        }

        if(message.search(/bm/i) == 0){
            var i = Message.judge_phone_number(person_phone,signing_up_activity); //判断号码是否重复

            var is_activity_signing_up = {         //判断报名是否开始
                "start":function() {
                    native_accessor.send_sms(person_phone,"对不起,报名活动未开始或者活动已结束");
                },
                "end":function() {
                    is_sign_up_successful[i]();
                }
            }
            is_activity_signing_up[signing_up_activity.state]();
        }

        if(message.search(/jj/i) == 0) {
            var is_price_signing_up = {           //判断竞价是否开始
                true: function() {
                    is_sign_up_succeed[PriceMessages.is_someone_sign_up_succeed(person_phone)]();
                },
                false: function() {
                    native_accessor.send_sms(person_phone,"对不起,竞价活动未开始或者活动已结束");
                }
            }
            is_price_signing_up[Price.judge_is_price_signing_up()]();
        }
    }
};

function notify_message_received(message_json) {
    //console.log(JSON.stringify(message_json));(
    //JSON.stringify(message_json);
    //alert(JSON.stringify(message_json.messages));
    native_accessor.receive_message(message_json);
    //phone_number=message_json.messages[0].phone;
}
