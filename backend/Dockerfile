FROM node:18-slim

# Installe OpenSSL requis par Prisma
RUN apt-get update && apt-get install -y openssl

WORKDIR /app

# Copie les fichiers essentiels d’abord
COPY package*.json ./
COPY prisma ./prisma

RUN npm install
RUN npx prisma generate

# Copie le reste du code source
COPY . .

RUN npm run build

CMD ["npm", "run", "start:dev"]