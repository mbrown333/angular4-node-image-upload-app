docker-compose up --build -d users-db
docker-compose up --build -d images-db

docker-compose up --build -d users-api
docker-compose up --build -d images-api

docker-compose up --build -d images-web