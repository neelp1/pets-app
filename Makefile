
network:
	docker network create -d bridge pets

down_network:
	docker network rm pets

build:
	docker compose build --no-cache

start:
	docker compose up -d

down:
	docker compose down

mongo_exec:
	docker exec -it pets-app-db bash
# mongosh -u mongouser -p mypassword