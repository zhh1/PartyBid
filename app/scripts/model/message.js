function Message(activity,name,phone){     //定义一个Message对象，包含activity,name,phone三个属性
    this.activity_name=activity.activity_name;
    this.person_name=name;
    this.phone=phone;
};

Message.set_messages = function(messages) {
    localStorage['messages'] = JSON.stringify(messages);
};

Message.get_messages = function() {
    return JSON.parse(localStorage.getItem("messages"));
};


Message.get_current_activity_messages = function(activity) {
    var current_message = [];
    var all_messages = Message.get_messages();
    for(var i = 0;i<all_messages.length;i++) {
       if (all_messages[i].activity_name == activity.activity_name) {
          current_message.push(all_messages[i]);   //将当前活动的信息提取出来
       }
    }
    return current_message;
};

Message.delete_blank_spaces = function(json_message) {
    return json_message.messages[0].message.replace(/\s/g,"");
};

Message.get_person_name_or_price = function(message) {
    return message.substring(2);
};


Message.get_person_phone = function(json_message) {
    return json_message.messages[0].phone;
};

Message.find_person_name = function(person_phone) {
    var current_activity_messages = Message.get_current_activity_messages(Activity.get_signing_up_activity());
    for(var i = 0;i<current_activity_messages.length;i++) {
        if(current_activity_messages[i].phone == person_phone){
            return current_activity_messages[i].person_name;
        }
    }
};

Message.judge_phone_number = function(phone,activity){
    if(Message.get_messages().length != 0) {
        var messages = Message.get_messages();
        for(var i = 0;i<messages.length;i++){
            var n = messages[i].phone == phone && messages[i].activity_name == activity.activity_name;
            var is_phone_number_repeat = {
                true:function(){
                    return 0;   //当前报名的活动里，号码重复，返回0
                },
                false:function(){
                    return 1;   //号码未重复，返回1
                }
            }
            return is_phone_number_repeat[n]();
        }
    }
    else {
        return 1;
    }
};

Message.prototype.save = function() {
    var messages = Message.get_messages();
    messages.unshift(this);
    Message.set_messages(messages);
};

