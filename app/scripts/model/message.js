function Message(activity,name,phone){     //定义一个Message对象，包含activity,name,phone三个属性
    this.activity=activity.name;
    this.name=name;
    this.phone=phone;
};

Message.set_messages = function(messages) {
    localStorage['messages'] = JSON.stringify(messages);
};

Message.get_messages = function() {
    return JSON.parse(localStorage.getItem("messages") || '[]');
};

Message.get_current_activity_messages = function(activity) {
    var current_message = [];
    var all_messages = Message.get_messages();
    for(var i = 0;i<all_messages.length;i++) {
       if (all_messages[i].activity == activity.name) {
          current_message.push(all_messages[i]);   //将当前活动的信息提取出来
       }
    }
    return current_message;
};

Message.delete_blank_spaces = function(json_message) {
    return json_message.messages[0].message.replace(/\s/g,"");
};

Message.get_person_name = function(message) {
    return message.substring(2);
};

Message.get_person_phone = function(json_message) {
    return json_message.messages[0].phone;
};

Message.judge_phone_number = function(phone,activity){
    if(localStorage.messages!=null) {
        var messages = Message.get_messages();
        for(var i = 0;i<messages.length;i++){
            var n = messages[i].phone == phone && messages[i].activity == activity.name;
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

