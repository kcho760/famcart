class User < ApplicationRecord
        # Include default devise modules.
        devise :database_authenticatable, :registerable,
               :recoverable, :rememberable, :trackable, :validatable,
               :omniauthable, :trackable
        include DeviseTokenAuth::Concerns::User
      
        has_many :lists
      end
      