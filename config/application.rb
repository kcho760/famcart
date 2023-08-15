require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Famcart
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0
    config.session_store :cookie_store, key: '_famcart_session'


    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:5000' # Replace with your React app's URL
        resource '*',
                 headers: :any,
                 methods: [:get, :post, :options, :delete],
                 expose: ['access-token', 'client', 'uid'],
                 max_age: 7200
      end
    end

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    # config.api_only = true
  end
end
