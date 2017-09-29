var messages=[
    {text:'aaaa',email:'e@e.com',id:1},
    {text:'bbb',email:'q@q.com',id:2},
    {text:'ccc',email:'a@a.com',id:3}
];
function Babble() {
}


Babble.prototype.getMessages = function() {
  return messages;
};

Babble.prototype.postMessage = function() {
  messages.push({text:'postTest',email:'s@s.com',id:4})
};

Babble.prototype.deleteMessage = function(id) {
    var index = -1;

    console.log('delete id - ' +id);
    messages.forEach(function (m) {
        if (m.id.toString() == id.toString()) {
            index = messages.indexOf(m);
        }
    })
    if (index > -1) {
        messages.splice(index, 1);
    }

    return messages;
};

// Player.prototype.makeFavorite = function() {
//   this.currentlyPlayingSong.persistFavoriteStatus(true);
// };

module.exports = Babble;
