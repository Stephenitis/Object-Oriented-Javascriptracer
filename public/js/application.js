function playerForward(player) {
  var current_active = $('#' + player + '_strip').find($('.active'))
  current_active.next().addClass('active')
  current_active.removeClass('active')
};

function playerWin(player) {
  if ($('#' + player + '_strip').children().last().attr('class') == 'active') {
    player_winner = $('#' + player + '_strip').children().first().text();
    player_id = $('#' + player).attr('data-player-id');
    alert(player_winner + ' has won!');
    $.ajax({
      type: "POST",
      url: "/record_winner/" + player_id
    });

    window.location.assign('/finished');
  }
};

function createBoard(num_of_players, track_length) {
  table = $('table');
  for (var i = 1; i < num_of_players + 1; i ++) {
    player_name = $('#player' + i).attr('value');
    table.append('<tr></tr>');

    row = table.find('tr').last() 
    row.attr('id', 'player' + i + '_strip');
    for (var j = 0; j < track_length + 1; j ++) {
      row.append('<td></td>');
      cell = row.find('td').last() 
      cell.text((j)) // this line and the previous add the numbers
    };
    first_cell = row.find('td').first()
    first_cell.next().addClass('active');
    first_cell.addClass('name').text(player_name);
  };
};

$(document).ready(function() {
  num_of_players = 2
  createBoard(num_of_players, 15);
  $(this).keyup(function(event){ 
    for (var k = 1; k < (num_of_players + 1); k ++) {
      if (event.which == (k + 48)) {
        playerForward('player' + k);
        playerWin('player' + k);
      }      
    };
  });

});