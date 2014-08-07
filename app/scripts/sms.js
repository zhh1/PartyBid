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
        var person_name = Message.get_person_name(message);
        var person_phone = Message.get_person_phone(json_message);
        var signing_up_activity = Activity.get_signing_up_activity();
        var is_sign_up_successful = {        //判断报名是否成功
            0: function () {
                native_accessor.send_sms(person_phone, "您已经报名过了");
            },
            1: function () {
                native_accessor.send_sms(person_phone, "恭喜！报名成功");
                var new_message = new Message(signing_up_activity, person_name, person_phone);
                new_message.save();
                var scope = angular.element('#register').scope();  //报名成功后刷新报名页面信息列表
                scope.$apply(function () {
                    scope.refresh_sign_up_info();
                });
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
    }
};
//            if(signing_up_activity.state==1){ //报名活动正在进行
//               var i=Message.judge_phone_number(person_phone,signing_up_activity); //判断电话号码是否重复

//                if(i==1){
//                    native_accessor.send_sms(person_phone,"恭喜！报名成功");
//                    var messages=[];
//                    messages.unshift(message);
//                    localStorage['message']=JSON.stringify(messages);
//
//                    var scope = angular.element('#register').scope(); //报名信息存储之后触发报名页面的刷新功能
//                    scope.$apply(function () {
//                    scope.refresh_sign_up_info();
//                    });
//                }
//                else if(i==0){
//                    native_accessor.send_sms(person_phone,"您已经报名过了");
//                }
//                else{
//                    native_accessor.send_sms(person_phone,"恭喜！报名成功");
//                    var messages=JSON.parse(localStorage['message']);
//                    var message=new Message(signing_up_activity,person_name,person_phone);
//                    messages.unshift(message);
//                    localStorage['message']=JSON.stringify(messages);
//
//                    var scope = angular.element('#register').scope();
//                    scope.$apply(function () {
//                    scope.refresh_sign_up_info();
//                    });
//                }
//            }
//            else{
//                native_accessor.send_sms(person_phone,"对不起,报名活动未开始或者活动已结束");
//            }




function notify_message_received(message_json) {
    //console.log(JSON.stringify(message_json));(
    //JSON.stringify(message_json);
    //alert(JSON.stringify(message_json.messages));
    native_accessor.receive_message(message_json);
    //phone_number=message_json.messages[0].phone;
}
