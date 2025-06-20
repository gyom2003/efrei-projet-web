# efrei-projet-web

## Lancement du projet 

```cmd
cd chat-app
```

Lancer rabbitmq : 

```cmd
docker-compose up -d rabbitmq
```

Lancer chaque service : 
```cmd
cd api
npm i
npm run start:dev
```

```cmd
cd worker
npm i
npm run start:dev
```

```cmd
cd frontend
npm i
npm run start:dev
```
