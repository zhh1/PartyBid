//notify_message_received({"messages":[{"create_date":"Tue Jan 15 15:28:44 格林尼治标准时间+0800 2013","message":"bm仝键","phone":"18733171780"}]})
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
        var current_activity=JSON.parse(localStorage['current_activity']);
        if(message.search(/bm|ｂｍ/i) == 0){
            if(current_activity.state==0){
                native_accessor.send_sms(json_message.messages[0].phone,"活动尚未开始，请稍后");
            }
            else if(current_activity.state==1){

                native_accessor.send_sms(json_message.messages[0].phone,"恭喜！报名成功");

            }
            else{
                native_accessor.send_sms(json_message.messages[0].phone,"Sorry,报名活动已结束");
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
