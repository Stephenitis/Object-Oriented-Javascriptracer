function Player(name) {
  this.name = name;
}

Player.prototype = {
  position: 0, 
  moveForward: function() { 
    console.log(this);
    this.position += 1;

  }
};

function Game(player1, player2) {
  this.player1 = player1;
  this.player2 = player2;
}

Game.prototype = {
  finishGame: function(){
    $(document).unbind('keyup');
    var z = new Date();
    this.timeElapsed = z.getTime() - startTime;
  },
  send: function(game){
    $.ajax({
      method: 'post',
      url: '/results',
      data: { winner: game.winner.name, loser: game.loser.name, time_elapsed: game.timeElapsed }
    }).done(function(response){
      console.log(response);
      console.log(response.game.id);
      window.location.assign('/game/' + response.game.id);
      // take game_id from json obj (response) redirect to /game/game_id
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

  // var player1 = new Player("Jim");
  // var player2 = new Player("Anne");

  $("form").on("submit", function(e){
    e.preventDefault(); 
    var player1 = new Player($("input[name='player1']").val());
    var player2 = new Player($("input[name='player2']").val());
    game = new Game(player1, player2);
    $.ajax({
      type: "post",
      url: "/play",
      data: $(this).serialize()
    }).done(function(response){
      console.log(response);
      $("#racer-div").html(response);
      var board = new Board();
      board.createBoard();
      alert('Click Ok to start the game!');
      var d = new Date();
      startTime = d.getTime();
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
  });
  

  
});





