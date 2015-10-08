var gcm = require('node-gcm');
var message = new gcm.Message();

var sender = new gcm.Sender('AIzaSyCYarSxVaF9a6D2qAc6yCGBADC7HuSuj-g');
var registrationIds = [];

message.addData('message', 'Hello guys!!');
message.addData('title', 'my notif coy!!');
message.addData('msgcnt', 3);
message.addData('soundname', 'beep.wav');

message.timeToLive = 3;

registrationIds.push('APA91bHjMczbrbFB1_xbEy-Bpzn9oRHeF6_dDt9mDdU4HGEo6FpIR_iCvciJf4kYMYEkYP89w7RT75n2E8KEZsQu7SPHXbvRWE1PcERiddt2DHbqszli6Mu144fBmtFmAjNfoRSHqmf3');

sender.send(message, registrationIds, 4, function (result) {
	console.log(result);
})
