#!/usr/bin/env bash

php bin/console doctrine:database:drop --env=test --if-exists --force

php bin/console doctrine:database:create --env=test
php bin/console doctrine:migrations:migrate --env=test --no-interaction

vendor/bin/behat --stop-on-failure

#php bin/console doctrine:database:drop --env=test --if-exists --force