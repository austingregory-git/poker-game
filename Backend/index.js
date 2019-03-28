var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var myObj = {};

var cards = [];

for (i = 0; i < 4; i++) {
  var Card_Suit = " ";
  switch (i) {
    case 0:
      Card_Suit = "Spades"
      break;
    case 1:
      Card_Suit = "Clubs"
      break;
    case 2:
      Card_Suit = "Dimonds"
      break;
    case 3:
      Card_Suit = "Hearts"
      break;
  }


  for (j = 1; j <= 13; j++) {
    var num;
    switch (j) {
      case 1:
        num = "Ace"
        break;
      case 11:
        num = "Jack"
        break;
      case 12:
        num = "Queen"
        break;
      case 13:
        num = "King"
        break;
      default:
        num = j;
        break;
    }
    cards[(j + (i * 13)) - 1] = { suit: Card_Suit, number: num, taken: false };
  }

}

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

function cardTaken(c) {
  return !c.taken;
}

app.get('/cards', function (req, res) {
  var num = req.query.num;
  var s = "{\"ca\":[";
  var c = [];
  for (i = 0; i < num; i++) {
    var cs = cards.filter(cardTaken);
    var card = cs[Math.floor(Math.random() * cs.length)];
    c.push(card);
    s += JSON.stringify(card)
    s += ","
      card.taken = true;
  }

  s = s.substring(0, s.length - 1);
  s += "]}"
  res.send(s);
  for (i = 0; i < c.length; i++) {
    c[i].taken = false;
  }
});

io.on('connection', function (socket) {
  console.log('a user connected');
  console.log(socket.id);
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});