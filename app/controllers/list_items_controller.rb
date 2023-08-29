class ListItemsController < ApplicationController

  def create
    list = List.find(list_item_params[:list_id])
    mapped_params = list_item_params.merge({ added_by_id: list_item_params[:user_id] })
    list_item = list.list_items.new(mapped_params.except(:user_id))
  
    if list_item.save
      render json: list_item, status: :created
    else
      render json: list_item.errors, status: :unprocessable_entity
    end
  end
  

  def update
    list_item = ListItem.find(params[:id])
    
    if list_item.update(list_item_params)
      render json: list_item
    else
      render json: list_item.errors, status: :unprocessable_entity
    end
  end

  private

  def list_item_params
    params.require(:list_item).permit(:quantity, :user_id, :item_id, :list_id, :checked)
  end
  
end
