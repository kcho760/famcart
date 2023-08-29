Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  resources :lists do
    resources :list_items, only: [:create, :update]
  end

  delete 'items/bulk_delete', to: 'items#bulk_destroy'
  resources :items, only: [:create, :update, :destroy, :index, :show]
  resources :list_items, only: [:create] # Add the create action for list_items
end
