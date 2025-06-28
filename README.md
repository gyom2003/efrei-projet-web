# efrei-projet-web

## Lancement du projet 

### 🐳 Via docker 

```cmd
docker-compose up -d
```

### 📍 En local 

1. Lancer rabbitmq

```cmd
docker-compose up -d rabbitmq
npm i 
```
2. Lancer le backend

```cmd
cd backend
npm i 
npx prisma generate
npm run start
```

3. Lancer le frontend

```cmd
cd frontend
npm i 
npm run dev
```