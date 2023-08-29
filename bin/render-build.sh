#!/bin/bash
set -o errexit
set -o nounset

# render-deploy.sh

# Perform any necessary build steps (e.g., npm run build)
bundle install

rails db:drop
# Run database migrations as part of the deployment process
rails db:migrate

rails db:seed