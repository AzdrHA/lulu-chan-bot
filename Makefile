.PHONY: build install
start: build install
	@docker compose -f docker-compose.yml -f docker-compose-dev.yml up

build:
	@docker compose build

enter:
	@docker compose run --rm node sh

install:
	@docker compose run --rm node npm install

format:
	@docker compose run --rm node npx @biomejs/biome format * --write

lint:
	@docker compose run --rm node npx @biomejs/biome lint *

prod:
	docker compose down
	git pull
	#docker pull azdracito/lulu-chan-bot
	docker compose -f docker-compose-prod.yml up -d --build