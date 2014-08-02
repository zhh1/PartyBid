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
        var current_activity=JSON.parse(localStorage['current_activity']);

        if(message.search(/bm/i) == 0){
            if(current_activity.state==0){    //报名活动没开始
                native_accessor.send_sms(json_message.messages[0].phone,"活动尚未开始，请稍后");
            }
            else if(current_activity.state==1){ //报名活动正在进行
               var i=judge_phone_number(json_message.messages[0].phone,current_activity); //判断电话号码是否重复

                if(i==1){
                    native_accessor.send_sms(json_message.messages[0].phone,"恭喜！报名成功");
                    var messages=[];
                    var message=new Message(current_activity,person_name,person_phone);
                    messages.unshift(message);
                    localStorage['message']=JSON.stringify(messages);
                }
                else if(i==0){
                    native_accessor.send_sms(json_message.messages[0].phone,"您已经报名过了");
                }
                else{
                    native_accessor.send_sms(json_message.messages[0].phone,"恭喜！报名成功");
                    var messages=JSON.parse(localStorage['message']);
                    var message=new Message(current_activity,person_name,person_phone);
                    messages.unshift(message);
                    localStorage['message']=JSON.stringify(messages);
                }


            }
            else{
                native_accessor.send_sms(json_message.messages[0].phone,"Sorry,报名活动已结束");
            }
        }

        function judge_phone_number(phone,activity){
            if(localStorage.message==null){
                return 1;       //localStorage.message里没有存号码，返回1
            }
            else{
                var messages=JSON.parse(localStorage['message']);
                for(var i=0;i<messages.length;i++){
                    if(messages[i].phone==phone&&messages[i].activity==activity.name){
                        return 0;   //当前报名的活动里，号码重复，返回0
                    }
                    else{
                        return 2;  //号码未重复，返回2
                    }
                }
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
