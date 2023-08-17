class ListItem < ApplicationRecord
    belongs_to :list
    belongs_to :item
    belongs_to :added_by, class_name: 'User', optional: true
  
    validates :quantity, presence: true
    validates :checked, inclusion: { in: [true, false] }
    # additional validations and logic as needed
  end
  