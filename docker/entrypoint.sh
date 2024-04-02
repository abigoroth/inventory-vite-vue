#!/bin/sh
rm tmp/pids/server.pid
yarn install
rails db:create
rails db:migrate
bundle exec foreman start -f Procfile.dev
