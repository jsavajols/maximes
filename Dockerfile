FROM alpine:latest
FROM node

WORKDIR /app
COPY . .
RUN mkdir -p /app/build
RUN npm install
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
ENTRYPOINT [ "node", "build/index.js"]