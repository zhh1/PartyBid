function Activity(name) {
    this.activity_name = name;
    this.state = "start";
};

Activity.set_activities = function(activities) {
    localStorage['activities'] = JSON.stringify(activities);
};

Activity.get_activities = function() {
    return JSON.parse(localStorage.getItem("activities"));
};

Activity.set_current_activity = function(activity) {
    localStorage['current_activity'] = JSON.stringify(activity);
};

Activity.get_current_activity = function() {
    return JSON.parse(localStorage.getItem("current_activity"));
};

Activity.set_signing_up_activity = function(activity) {
    localStorage['signing_up'] = JSON.stringify(activity);
};

Activity.get_signing_up_activity = function() {
    return JSON.parse(localStorage.getItem("signing_up"));
};

Activity.judge_start_or_end_state = function() {
    var activities = Activity.get_activities();
    var n=0
    for(var i=0;i<activities.length;i++){
       if(activities[i].state == "end"){
           n++;
       }
    }
    return n;
};

Activity.judge_start_or_end = function(n,activity){
    if(n && activity.state == "end") {
        return "结束";
    }
    else {
        return "开始";
    }
};

Activity.button_disabled = function(n,activity,signing_up) {
    if(!signing_up) {
        return n==1 && activity.state=="start";
    }
    else {
        return (n==1 && activity.state=="start") || signing_up.price_state == "start";
    }
};

Activity.judge_yellow = function(activity) {
    if(activity.state == "end") {
        return "start";
    }
};

Activity.judge_yellow_when_price_signing_up = function(activity,price_signing_up) {
    if(activity.state == "end" || (price_signing_up.price_state == "start" && price_signing_up.activity_name == activity.activity_name)) {
        return "start";
    }
};

Activity.prototype.save = function() {
    var activities = Activity.get_activities();
    activities.unshift(this);
    Activity.set_activities(activities);
};

Activity.prototype.is_repeat = function() {
    var i=1;
    var activities = Activity.get_activities();
    for (var n = 0; n < activities.length; n++) {    //遍历localStorage里的活动，查看是否有重复的名称
        if (activities[n].activity_name == this.activity_name) {
            i = 0;
        }
    }
    return i;
};

Activity.prototype.fresh_activity_state = function() {
    var activities = Activity.get_activities();
    for(var i=0;i<activities.length;i++){
        if(activities[i].activity_name == this.activity_name){
            activities[i].state = this.state;
            Activity.set_activities(activities);
        }
        Activity.set_current_activity(this);
    }
};

Activity.prototype.change_state = function(new_state) {
    this.state = new_state;
};

