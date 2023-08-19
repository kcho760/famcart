#!/bin/bash
set -o errexit
set -o nounset

# npm run build
bundle install
rails db:drop
rails db:create
rails db:migrate
rails db:seed