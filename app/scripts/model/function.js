function judgment(array,name) {
            var i=0;
            for (var n = 0; n < array.length; n++) {    //遍历localStorage里的活动，查看是否有重复的名称
                if (array[n].name ==name) {
                i = 1;
                }
            }
            return i;
        }
        
function activity(name){      //定义一个对象，包括name和state两个属性
            this.name=name;
            this.state=0;
        }

        
function storage(activity_array,object){                   //存储活动名称
            activity_array.unshift(object);
            localStorage['activity']=JSON.stringify(activity_array);
        }

function fresh(activity){            //将被改变的状态值存入localStorage['activity']和localStorage['current_activity']里面
    var activities=JSON.parse(localStorage['activity']);
    for(var i=0;i<activities.length;i++){
        if(activities[i].name==activity.name){
            activities[i].state=activity.state;
            localStorage['activity']=JSON.stringify(activities);
        }
    var current_activity=JSON.parse(localStorage['current_activity']);
        current_activity.state=activity.state;
        localStorage['current_activity']=JSON.stringify(current_activity);
    }
}


