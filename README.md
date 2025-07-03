# Messenger

Application de messagerie en temps réel développée avec **NestJS**, **GraphQL**, **RabbitMQ**, **Prisma**, et un **frontend React**. Les utilisateurs peuvent s'inscrire, se connecter, créer des conversations et envoyer des messages en temps réel.

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Structure des dossiers](#structure-des-dossiers)
- [Tests](#tests)
- [Améliorations possibles](#améliorations-possibles)
- [Auteurs](#auteurs)

## Fonctionnalités

* Authentification JWT (inscription / connexion)
* Liste des utilisateurs disponibles
* Création de conversations à 2 participants
* Affichage des conversations avec les derniers messages
* Envoi et réception de messages avec:

  * Stockage via Prisma
  * Publication via RabbitMQ
  * Réception temps réel via Subscriptions GraphQL
* Interface frontend réactive

## Stack technique

### Backend

* **NestJS**
* **GraphQL (Apollo Server)**
* **RabbitMQ** (pour le traitement asynchrone des messages)
* **Prisma** (ORM avec SQLite)
* **JWT** (authentification)
* **PubSub** (Subscriptions)

### Frontend

* **React + TypeScript**
* **Apollo Client** (query/mutation/subscription)
* **WebSocket** pour GraphQL Subscriptions

## Installation

### Prérequis

* Node.js >= `20.11`
* Docker

### Lancer RabbitMQ

```bash
docker compose up -d rabbitmq
```

### Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Utilisation

### 1. Authentification

* Inscription (mutation `createUser`)
* Connexion (mutation `login`) → retour du token JWT à stocker dans `localStorage`

### 2. Créer une conversation

* Choisir un utilisateur via une liste déroulante
* Le bouton "Nouvelle conversation" crée la conversation

### 3. Envoyer un message

* Cliquer sur une conversation
* Envoyer un message dans l'input texte
* Le message est :

  * envoyé via `mutation sendMessage`
  * traité par RabbitMQ
  * enregistré en base (Prisma)
  * publié en temps réel via `PubSub`

### 4. Réception en temps réel

* Les nouveaux messages sont automatiquement reçus via `subscription messageSent`
* Le scroll se fait automatiquement en bas

## Structure des dossiers

```
backend/
├── message/
├── conversation/
├── user/
├── rabbitmq/
├── pubsub/
├── auth/
├── prisma/
frontend/
├── components/
│   ├── button-add-conversation/
│   ├── chat/
│   ├── conversation-item/
│   ├── list-conversation/
│   ├── login-form/
│   ├── register-form/
│   ├── search-input/
│   ├── vetical-task-bar/
│   
├── graphql/
│   ├── queries.ts
├── types.ts
├── ApolloClient.ts
```

## Tests

### Backend

```bash
cd backend
npm install
npm run test
```

### Frontend

```bash
cd frontend
npm install
npx cypress open
```

## Améliorations possibles

* Liste des utilisateurs connectés en temps réel
* Conversations à plusieurs participants
* Notion de "lu / non lu"
* Upload de fichiers (images, etc.)

## Auteurs
[Arthur Manceau](https://github.com/armanceau) | [Guillaume Le Formal](https://github.com/gyom2003) | [Noémie Ktourza](https://github.com/Noemiektz) | [Rayane Besrour](https://github.com/Rayane-94)

