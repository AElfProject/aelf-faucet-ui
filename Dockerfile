FROM cgr.dev/chainguard/node:latest
WORKDIR /app
COPY --chown=node:node ./public ./public
COPY --chown=node:node ./.next/standalone ./
COPY --chown=node:node ./.next/static ./.next/static
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
CMD [ "server.js" ]