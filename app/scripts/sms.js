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
        var message=json_message.messages[0].message.replace(/\s/g,"");
        var person_name=message.substring(2);
        var person_phone=json_message.messages[0].phone;
        var current_activity=JSON.parse(localStorage.getItem('current_activity'));
        var signing_up=JSON.parse(localStorage.getItem('signing_up'));


        if(message.search(/bm/i) == 0){

            if(signing_up.state==1){ //报名活动正在进行
               var i=judge_phone_number(person_phone,signing_up); //判断电话号码是否重复

                if(i==1){
                    native_accessor.send_sms(person_phone,"恭喜！报名成功");
                    var messages=[];
                    var message=new Message(signing_up,person_name,person_phone);
                    messages.unshift(message);
                    localStorage['message']=JSON.stringify(messages);

                    var scope = angular.element('#register').scope(); //报名信息存储之后触发报名页面的刷新功能
                    scope.$apply(function () {
                    scope.refresh_sign_up_info();
                    });
                }
                else if(i==0){
                    native_accessor.send_sms(person_phone,"您已经报名过了");
                }
                else{
                    native_accessor.send_sms(person_phone,"恭喜！报名成功");
                    var messages=JSON.parse(localStorage['message']);
                    var message=new Message(signing_up,person_name,person_phone);
                    messages.unshift(message);
                    localStorage['message']=JSON.stringify(messages);

                    var scope = angular.element('#register').scope();
                    scope.$apply(function () {
                    scope.refresh_sign_up_info();
                    });
                }
            }
            else{
                native_accessor.send_sms(person_phone,"对不起,报名活动未开始或者活动已结束");
            }
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
