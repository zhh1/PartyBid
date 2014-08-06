function Activity(name) {
    this.name = name;
    this.state = 0;
};

Activity.set_activities = function(activities) {
    localStorage['activities'] = JSON.stringify(activities);
};

Activity.get_activities = function() {
    return JSON.parse(localStorage.getItem("activities") || '[]');
};

Activity.set_current_activity = function(activity) {
    localStorage['current_activity'] = JSON.stringify(activity);
};

Activity.get_current_activity = function() {
    return JSON.parse(localStorage.getItem("current_activity") || '[]');
};

Activity.set_signing_up_activity = function(activity) {
    localStorage['signing_up'] = JSON.stringify(activity);
};

Activity.judge_start_or_end = function() {
    var activities = Activity.get_activities();
    var n=0
    for(var i=0;i<activities.length;i++){
       if(parseInt(activities[i].state%2)!=0){
           n++;
       }
    }
    return n;
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
        if (activities[n].name == this.name) {
            i = 0;
        }
    }
    return i;
};

Activity.prototype.fresh_activity_state = function() {
    var activities = Activity.get_activities();
    for(var i=0;i<activities.length;i++){
        if(activities[i].name == this.name){
            activities[i].state = this.state;
            Activity.set_activities(activities);
        }
        Activity.set_current_activity(this);
    }
};

Activity.prototype.change_state = function(new_state) {
    this.state = new_state;
};

