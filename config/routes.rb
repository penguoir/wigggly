Rails.application.routes.draw do
  root 'rooms#show'

  resources :rooms, only: [:show, :update]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
