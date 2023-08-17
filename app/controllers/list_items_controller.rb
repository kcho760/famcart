class ListItemsController < ApplicationController

    def update
        puts "Update method called with ID: #{params[:id]}"
        list_item = ListItem.find(params[:id])
        if list_item.update(list_item_params)
          render json: list_item, status: :ok
        else
          render json: { errors: list_item.errors.full_messages }, status: :unprocessable_entity
        end
      end      
    
    private
    
    def list_item_params
      params.require(:list_item).permit(:checked)
    end
    
  end
  