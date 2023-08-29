Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  resources :lists, only: [:create, :update, :destroy, :index, :show]

  resources :items, only: [:create, :update, :destroy, :index, :show]
  resources :list_items, only: [:create] # Add the create action for list_items
end
