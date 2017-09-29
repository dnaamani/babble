var MessageUtils = function () {
};
var messages = [];
var clients = [];
var id = 0;

var users = 0;

function Message(id, text, email,name, time, pic) {
    this.id = id;
    this.text = text;
    this.email = email;
    this.name = name;
    this.time = time;
    this.pic = pic;
}

MessageUtils.prototype.subscribe = function (req, res) {
    users++;

    while (clients.length > 0) {
        var client = clients.pop();

        client.end(JSON.stringify({
            users: users,
            count: messages.length,
            messages: messages,
        }));
    }
    res.end();
    // res.end(JSON.stringify(
    //     {
    //         users: users
    //     }
    // ));
};

MessageUtils.prototype.addMessage = function (req, res) {
    id++;
    var clientMessage = req.body.msg;
    var text = clientMessage.text;
    var email = clientMessage.email;
    var name = clientMessage.name;
    var d = new Date();
		
    var minuets = d.getMinutes();
    var hours = d.getHours();
    if (minuets < 10) {
        minuets = '0' + minuets;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    var time = hours + ':' + minuets;
    var m = new Message(id, text, email,name, time, clientMessage.pic);
    
    messages.push(m);
    while (clients.length > 0) {
        var client = clients.pop();
        
        client.end(JSON.stringify({
            count: messages.length,
            messages: messages,
            users: users
        }));
    }
    res.end();
};

MessageUtils.prototype.getMessages = function (req, res) {


    var count = req.query.count;
    if (messages.length > count) {
        res.end(JSON.stringify(
            {
                count: messages.length,
                messages: messages,
                users: users
            }
        ));
    } else {
        clients.push(res);
    }
};

MessageUtils.prototype.deleteMessage = function (req, res) {
    var index = -1;
    var id = req.params.id;

    messages.forEach(function (m) {
        if (m.id.toString() == id.toString()) {
            index = messages.indexOf(m);
        }
    })
    if (index > -1) {
        messages.splice(index, 1);
    }

    while (clients.length > 0) {
        var client = clients.pop();
        client.end(JSON.stringify({
            count: messages.length,
            messages: messages,
            users:users
        }));
    }
    res.end();
    // res.end(JSON.stringify(
    //     {
    //         count: messages.length,
    //         messages: messages
    //     }
    // ));
};

module.exports = new MessageUtils();