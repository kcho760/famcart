class ListsController < ApplicationController
    before_action :set_list, only: [:show, :update, :destroy]
  
    def index
      lists = List.all
      render json: lists
    end
  
    def show
      render json: @list, include: { items: { methods: :added_by_name } }
    end
  
    def create
      list = List.new(list_params)
      list.user = current_user
  
      if list.save
        render json: list, status: :created
      else
        render json: list.errors, status: :unprocessable_entity
      end
    end
  
    def update
      if @list.update(list_params)
        render json: @list
      else
        render json: @list.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @list.destroy
    end
  
    private
  
    def set_list
      @list = List.find(params[:id])
    end
  
    def list_params
      params.require(:list).permit(:name, :date_created, :status, :notes)
    end
  end
  