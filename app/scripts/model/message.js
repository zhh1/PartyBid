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
    var all_messages = Message.get_messages();
    return _.where(all_messages,{activity_name:activity.activity_name});
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
    return _.where(current_activity_messages,{phone:person_phone})[0].person_name;
};

Message.judge_phone_number = function(phone,activity){
    var messages = Message.get_messages();
    return !_.some(messages,function(item) {
        return item.phone == phone && item.activity_name == activity.activity_name;
    });
};

Message.prototype.save = function() {
    var messages = Message.get_messages();
    messages.unshift(this);
    Message.set_messages(messages);
};

