Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  resources :lists do
    resources :list_items, only: [:create, :update]
  end

  resources :items, only: [:create, :update, :destroy, :index, :show] # Add other actions as needed
end
