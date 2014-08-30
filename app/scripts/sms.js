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
        var message_process = new MessageProcessUtil(json_message);
        var signing_up_activity = Activity.get_signing_up_activity();

        if(message_process.message.search(/bm/i) == 0){
            var is_activity_signing_up = {         //判断报名是否开始
                "start":function() {
                    native_accessor.send_sms(message_process.phone,"对不起,报名活动未开始或者活动已结束");
                },
                "end":function() {

                    native_accessor.send_sms(message_process.phone,message_process.process_sign_up_message());
                }
            };
            is_activity_signing_up[signing_up_activity.state]();
        }

        if(message_process.message.search(/jj/i) == 0) {
            var is_price_signing_up = {           //判断竞价是否开始
                true: function() {
                    var price_message_process = new MessageProcessUtil(json_message);
                    native_accessor.send_sms(message_process.phone,price_message_process.process_price_message());
                },
                false: function() {
                    native_accessor.send_sms(message_process.phone,"对不起,竞价活动未开始或者活动已结束");
                }
            };
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