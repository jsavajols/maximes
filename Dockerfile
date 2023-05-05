FROM node

WORKDIR /app
COPY . .
RUN mkdir -p /app/build
RUN npm install
RUN npm run build
EXPOSE 3000
ENTRYPOINT [ "node", "build/index.js"]