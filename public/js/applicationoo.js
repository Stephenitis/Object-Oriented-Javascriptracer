function Player(name) {
  this.name = name;
}

Player.prototype = {
  position: 0, 
  moveForward: function() { this.position += 1; }
};

function Game(player1, player2) {
  this.player1 = player1;
  this.player2 = player2;
}

Game.prototype = {
  finishGame: function(){
    $(document).unbind('keyup');
    alert(this.winner.name + ' has won!');
  },
  send: function(game){
    $.ajax({
      method: 'post',
      url: '/results',
      data: { winner: game.winner.name, loser: game.loser.name }
    });
  },
  findWinner: function(){
    if (this.player1.position == 15){
      this.winner = this.player1;
      this.loser = this.player2;
      return this.player1;
      }
    else if (this.player2.position == 15){
      this.loser = this.player1;
      this.winner = this.player2;
      return this.player2;
      }
    else return null;
  },


  onKeyUp: function(keyCode){
    if (keyCode == 49) {
      this.player1.moveForward();
    }
    if (keyCode == 50) {
      this.player2.moveForward();
    }
  },
  render: function(){
    $('td').removeClass('active');
    $('#player1_strip').find('td').eq(this.player1.position).addClass('active');
    $('#player2_strip').find('td').eq(this.player2.position).addClass('active');
  }
};

function Board() {
  this.length = 15;
}

Board.prototype = { 
  createBoard: function() {
    for (var i = 0; i < this.length + 1; i ++) {
      $("tr").append('<td></td>'); 
    }
  }
};

$(document).ready(function() {
  player1 = new Player('Jim');
  player2 = new Player('Anne');

  game = new Game(player1, player2);

  board = new Board();
  board.createBoard();

  $(document).on('keyup', function(event) {
    game.onKeyUp(event.which);
    game.render();
    game.findWinner();
    if (game.winner){
      game.finishGame();
      game.send(game);
    }
  });  
});

