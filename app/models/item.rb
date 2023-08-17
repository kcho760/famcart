class Item < ApplicationRecord
  belongs_to :user
  has_many :list_items
  has_many :lists, through: :list_items

  validates :name, presence: true
  validates :unit, presence: true

  def added_by_name
    user.name
  end
end
