class Game < ActiveRecord::Base
  has_and_belongs_to_many :players

  def time_elapsed
    self.updated_at - self.created_at
  end

  def create_url
    self.url = SecureRandom.hex(3)
    self.save
  end
end
