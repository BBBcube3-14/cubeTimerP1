/*async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    
/*    const uri = "mongodb+srv://benbatie:SecurePassword1@cluster0.s6ogiex.mongodb.net/";

const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
/*
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);
*/

function _timer(callback) {
    var time = 0;     //  The default time of the timer
    var mode = 1;     //    Mode: count up or count down
    var status = 0;    //    Status: timer is running or stoped
    var timer_id;    //    This is used by setInterval function
    
    this.start = function(interval){
        interval = (typeof(interval) !== 'undefined') ? interval : 250;
 
        if(status == 0){
            status = 1;
            timer_id = setInterval(function(){
                switch(mode){
                    default:
                        if(time){
                            time -= interval;
                            generateTime();
                            if(typeof(callback) === 'function') callback(time);
                        }
                        break;
                    case 1:
                        if(time < 8640000){
                            time += interval
                            generateTime();
                            if(typeof(callback) === 'function') callback(time);
                        }
                        break;
                }
            }, interval);
        }
    }
    
    this.stop =  function(){
        if(status == 1){
            status = 0;
            clearInterval(timer_id);
        }
    }
    
    this.reset =  function(mill){
        mill = (typeof(mill) !== 'undefined') ? mill : 0;
        time = mill;
        generateTime(time);
    }
    
    this.mode = function(tmode){
        mode = tmode;
    }
    
    this.getTime = function()
    {
        return time;
    }
    
    this.getMode = function()
    {
        return mode;
    }
    
    this.getStatus 
    {
        return status;
    }
    
    function generateTime()
    {
        var mill = time % 1000;
        var second = Math.floor(time / 1000) % 60;
        var minute = Math.floor(time / 60000) % 60;
        
        if(mill < 100){
            $('div.timer span.millisecond').html('0' + mill/10);
        }else{
            $('div.timer span.millisecond').html(mill/10);
        }
        second = (second < 10) ? '0'+second : second;
        minute = (minute < 10) ? '0'+minute : minute;
        
        
        $('div.timer span.second').html(second);
        $('div.timer span.minute').html(minute);
    }
}
 
// example use
var timer;
 
$(document).ready(function(e) {
    timer = new _timer (
        function(time) {
            if(time == 0) {
                timer.stop();
                alert('time out');
            }
        }
    );
    timer.reset(0);
    timer.mode(0);
});


//Boolean to add start/stop logic to the spacebar
document.addEventListener('keypress', (event) => {
    var name = event.key;
    var code = event.code;
    // Alert the key name and key code on keydown
    if (name === ' ') {
        //0 - Count down
        //1 - Count up
        //2 - Stop
        if(timer.getMode() === 0){
            timer.stop();
            timer.reset(0);
            timer.mode(1);
            timer.start(50);    
        }else if(timer.getMode() === 1){
            timer.mode(2);
            timer.stop();
        }else{
            timer.mode(1);
            timer.start(50); 
        }
    }else if(name === 'r' || name === 'R'){
        timer.reset(0);
    }else if(name === 'i' || name === 'I'){
        //timer.inspection();
        timer.mode(0);
        timer.reset(15000);
        timer.start(1000);
    }
  }, false);
