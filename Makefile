.PHONY: build install
start: build install
	@docker-compose -f docker-compose.yml -f docker-compose-dev.yml up

build:
	@docker-compose build

enter:
	@docker-compose run --rm node sh

install:
	@docker-compose run --rm node npm install