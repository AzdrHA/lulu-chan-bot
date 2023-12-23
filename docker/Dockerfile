# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun as base
WORKDIR /srv/app

# run the app
USER bun
EXPOSE 3000/tcp
#ENTRYPOINT [ "bun", "run", "src/main.ts" ]
#CMD bun run src/main.ts