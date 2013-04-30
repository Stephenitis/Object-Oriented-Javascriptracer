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
  Game.last.update_attributes({'winner_id' => params[:id]})
end

get '/finished' do
  puts "These are the params for /finished #{params}"
  @game = Game.last
  @game.create_url
  @winner = Player.find(@game.winner_id)
  erb :finished
end

get '/game/:url' do
  @game = Game.find_by_url(params[:url])
  @winner = Player.find(@game.winner_id)
  erb :finished
end
