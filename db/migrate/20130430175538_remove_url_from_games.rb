class RemoveUrlFromGames < ActiveRecord::Migration
  def change
    remove_column :games, :url
  end
end
