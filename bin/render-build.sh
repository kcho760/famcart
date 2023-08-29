#!/bin/bash
set -o errexit
set -o nounset

# render-deploy.sh
rails db:drop

# Perform any necessary build steps (e.g., npm run build)
bundle install

# Run database migrations as part of the deployment process
rails db:migrate

rails db:seed