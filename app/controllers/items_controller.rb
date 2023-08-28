class ItemsController < ApplicationController
    before_action :set_item, only: [:update, :destroy]
    before_action :authenticate_user!
  
    def create
      item = Item.new(item_params)
      item.user = current_user
      if item.save
        render json: item, status: :created
      else
        render json: item.errors, status: :unprocessable_entity
      end
    end
  
    def update
      if @item.update(item_params)
        render json: @item
      else
        render json: @item.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @item.destroy
    end
  
    private
  
    def set_item
      @item = Item.find(params[:id])
    end
  
    def item_params
      params.require(:item).permit(:name, :unit, :user_id)  # Added :user_id
    end    
  end
  