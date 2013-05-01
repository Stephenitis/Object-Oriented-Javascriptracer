class AddTimeElapsedToGames < ActiveRecord::Migration
  def change
    add_column :games, :time_elapsed, :integer
  end
end
