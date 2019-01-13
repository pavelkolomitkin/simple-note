#!/usr/bin/env bash

# get flag --jenkins
isJenkins=0
while [ -n "$1" ]
do
    case "$1" in
    --jenkins) isJenkins=1
        break
     ;;
    esac
shift
done

set -e
set -o pipefail

# Stop previous containers
echo -n "Stop previous containers..."
echo -en '\n'
docker-compose down
docker-compose --rm --force -v
docker volume rm test_postgres_data_volume_test -f


if [[ $isJenkins = 1 ]]
    then
        echo -n "Rebuild images..."
        echo -en '\n'
        docker-compose build --no-cache --force-rm
fi


# Up docker compose
echo -n "Up docker compose..."
echo -en '\n'
docker-compose up -d


# Install composer dependencies
echo -en '\n'
echo -n "Install compose dependencies..."
echo -en '\n'
docker exec php-fpm-container-test composer install

# Run database migrations
echo -en '\n'
echo -n "Run database migrations..."
echo -en '\n'
until docker exec php-fpm-container-test php bin/console doctrine:migrations:migrate --env=test --no-interaction
do
    echo -en '\n'
    echo -n "Waiting postgres..."
    echo -en '\n'

    sleep 10

    echo -en '\n'
    echo -n "And try again to run migrations..."
    echo -en '\n'
done


# Run behat tests
echo -en '\n'
echo -n "Run behat tests..."
echo -en '\n'
docker exec php-fpm-container-test vendor/bin/behat --colors

# Stop previous containers
echo -n "Stop containers..."
echo -en '\n'
docker-compose down
docker-compose --rm --force -v
docker volume rm test_postgres_data_volume_test -f

exit 0