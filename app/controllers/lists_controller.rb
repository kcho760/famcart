class ListsController < ApplicationController
  include DeviseTokenAuth::Concerns::SetUserByToken

    before_action :set_list, only: [:show, :update, :destroy]
  
    def index
      lists = List.all
      render json: lists
    end
  
    def show
      list_with_items = @list.as_json(include: {
        list_items: { include: { item: { methods: :added_by_name } } }
      })
      render json: list_with_items
    end
    
    def create
      list = List.new(list_params)

      puts "Received parameters: #{list_params.inspect}" # Log the received parameters
    
      if list.save
        render json: list, status: :created
      else
        puts "List errors: #{list.errors.full_messages}" # Log any model validation errors
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
      params.require(:list).permit(:name, :date_created, :status, :notes, :user_id)
    end

  end
  