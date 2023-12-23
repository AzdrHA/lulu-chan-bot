.PHONY: build install
start: build install
	@docker-compose -f docker-compose.yml -f docker-compose-dev.yml up

build:
	@docker-compose build

enter:
	@docker-compose run --rm node sh

install:
	@docker-compose run --rm node npm install

format:
	@docker compose run --rm node bunx @biomejs/biome format * --write

lint:
	@docker compose run --rm node bunx @biomejs/biome lint *