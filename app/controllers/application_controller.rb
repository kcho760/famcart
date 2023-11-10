class ApplicationController < ActionController::API
        include DeviseTokenAuth::Concerns::SetUserByToken
      
        before_action :log_request_data
      
        private
      
        def log_request_data
          Rails.logger.info "Headers: #{request.headers.inspect}"
          Rails.logger.info "Body: #{request.body.read}"
        end
      end