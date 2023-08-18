class ListItemsController < ApplicationController
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
    params.require(:list_item).permit(:checked, :name, :other_attributes)
  end
end
