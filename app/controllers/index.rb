get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/play' do
  @game = Game.create
  @player1 =  Player.find_or_create_by_name(params[:player1])
  @player2 =  Player.find_or_create_by_name(params[:player2])
  @game.players << [@player1, @player2]
  erb :play
end

post '/record_winner/:id' do

  puts "These are the params for /record_winner #{params}"
  @winner = Player.find(params[:id])
  @game = @winner.games.last
  @game.update_attributes({'winner_id' => params[:id]})
  
  erb :finished, :layout => false
  # {
  #   :game => game,
  #   :player1 => game.players[0].name,
  #   :player2 => game.players[1].name,
  #   :winner => Player.find(game.winner_id).name,
  #   }.to_json
end

# get '/finished' do
#   puts "These are the params for /finished #{params}"
#   @game = Game.last
#   @game.create_url
#   @winner = Player.find(@game.winner_id)
#   erb :finished
# end

get '/game/:id' do
  @game = Game.find(params[:id])
  @winner = Player.find(@game.winner_id)
  erb :finished
end
