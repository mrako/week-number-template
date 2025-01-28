FROM node:lts-alpine

WORKDIR /app

# Install app dependencies
COPY package*.json .
RUN npm ci

# Copy assets
COPY . .

CMD ["npm", "start"]
