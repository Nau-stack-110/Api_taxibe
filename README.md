# Lien du projet en production
- (https://api-taxibe-mada.up.railway.app/)

# API REST Réservation TaxiBe Coopérative à Madagascar

Une API REST permettant la gestion de réservations de taxibe pour plusieurs coopératives de taxibe à Madagascar. Ce projet utilise Node.js, Express, Sequelize-CLI, MySQL et d'autres technologies pour la gestion des réservations et la génération de tickets PDF.

## 🚀 Table des matières

1. [Technologies utilisées](#technologies-utilisées)
2. [Routes et méthodes](#routes-et-méthodes)
3. [Dépendances](#dépendances)
4. [Scripts](#scripts)

## 🚀 Technologies utilisées

- **Node.js** : Serveur backend pour exécuter le JavaScript côté serveur.
- **Express** : Framework minimaliste pour créer l'API.
- **Sequelize** : ORM pour interagir avec MySQL.
- **MySQL** : Base de données relationnelle.
- **Postman** : Outil pour tester les API.
- **XAMPP** : Environnement local pour la gestion des bases de données.
- **Bash** : Pour l'exécution des scripts et commandes.

![Node.js](https://img.shields.io/badge/Node.js-v16.13.0-green)
![Express](https://img.shields.io/badge/Express-v4.17.1-blue)
![MySQL](https://img.shields.io/badge/MySQL-v8.0.26-red)

## Routes et méthodes
## Authentification et méthodes
| Route                     | Méthode | Description                                      | Utilisateur  | Admin  |
|---------------------------|---------|--------------------------------------------------|--------------|--------|  
| `/auth/signup`                  | POST     | Créer un nouveau compte utilisateur                      | ✅            | ✅      |
| `/auth/login`              | POST     | Connexion de l'utilisateur                    | ✅            | ✅      |
| `/auth/forgot/password`                 | POST    | Changer le mot de passe oublié                           | ✅            | ✅      |
| `/auth/reset/password`              | POST  | Réinitialiser le mot de passe utilisateur               | ✅            | ✅      |



## table Taxibes
| Route                     | Méthode | Description                                      | Utilisateur  | Admin  |
|---------------------------|---------|--------------------------------------------------|--------------|--------|  
| `/taxibe`                  | GET     | Liste des taxis disponibles                      | ✅            | ✅      |
| `/taxibe/:id`              | GET     | Détails d'un taxi spécifique                     | ✅            | ✅      |
| `/taxibe/`                 | POST    | Créer un nouvel taxibe                           | ❌            | ✅      |
| `/taxibe/:id`              | DELETE  | Supprimer un taxibe spécifique               | ❌            | ✅      |
| `/taxibe/:id`              | PUT     | Mettre à jour les taxibes                     | ❌            | ✅      |


## table Routes et méthodes
| Route                     | Méthode | Description                                      | Utilisateur  | Admin  |
|---------------------------|---------|--------------------------------------------------|--------------|--------|  
| `/route`                  | GET     | Liste des routes disponibles                      | ✅            | ✅      |
| `/route/:id`              | GET     | Détails d'un route spécifique                     | ✅            | ✅      |
| `/route/`                 | POST    | Créer un nouvel route                           | ❌            | ✅      |
| `/route/:id`              | DELETE  | Supprimer un route spécifiques                | ❌            | ✅      |
| `/route/:id`              | PUT     | Mettre à jour un routes                             | ❌            | ✅      |


## table Trajets et méthodes
| Route                     | Méthode | Description                                      | Utilisateur  | Admin  |
|---------------------------|---------|--------------------------------------------------|--------------|--------|  
| `/trajet`                  | GET     | Liste des trajets disponibles                      | ✅            | ✅      |
| `/trajet/:id`              | GET     | Détails d'un trajet spécifique                     | ✅            | ✅      |
| `/trajet/`                 | POST    | Créer un nouvel trjajet                           | ❌            | ✅      |
| `/trajet/:id`              | DELETE  | Supprimer un trajet spéchifique               | ❌            | ✅      |
| `/trajet/:id`              | PUT     | Mettre à jour un trajet                      | ❌            | ✅      |


## table Cooperative et méthodes
| Route                     | Méthode | Description                                      | Utilisateur  | Admin  |
|---------------------------|---------|--------------------------------------------------|--------------|--------|  
| `/cooperative`                  | GET     | Liste des cooperative disponibles                      | ✅            | ✅      |
| `/cooperative/:id`              | GET     | Détails d'un cooperative spécifique                     | ❌            | ✅      |
| `/cooperative/`                 | POST    | Créer un nouvel cooperative                           | ❌            | ✅      |
| `/cooperative/:id`              | DELETE  | Supprimer un cooperative spéchifique               | ❌            | ✅      |
| `/cooperative/:id`              | PUT     | Mettre à jour un cooperative                      | ❌            | ✅      |


## table Utilisateur et bookings and ticket
| Route                     | Méthode | Description                                      | Utilisateur  | Admin  |
|---------------------------|---------|--------------------------------------------------|--------------|--------|  
| `/users/me`                  | GET     | Récuperer le profil de l'utilisateur connecté                      | ✅            | ❌      |
| `/users/me`              | PUT     | Mettre à jour le profile de l'utilisateur connecté                     | ✅            | ❌      |
| `/users/password/change`                 | PUT    | Modifier le mot de passe de l'utilisateur connecté                           | ✅            | ❌      |
| `/users/me/delete`              | DELETE  | Supprimer un compte de l'utilisateur connecté               | ✅            | ❌      |
| `/users/generate-ticket/:id`              | POST     | Generer un ticket pour la réservation de l'utilisateur connecté                      | ✅            | ❌      |
| `/users/verify-ticket/:id`              | POST     | Verifier un code ticket pour la réservation de l'utilisateur connecté                      | ✅            | ❌      |
| `/users/booking/create`              | POST    | Créer une réservation du taxibe pour l'utilisateur connecté                    | ✅            | ❌      |
| `/users/booking/me`              | GET     | Lister la réservation de l'utilisateur connecté                      | ✅            | ❌      |
| `/users/booking/me`              | DELETE     | Supprimer ou annuler la réservation de l'utilisateur connecté                      | ✅            | ❌      |



## statistiques et administration
| Route                     | Méthode | Description                                      | Utilisateur  | Admin  |
|---------------------------|---------|--------------------------------------------------|--------------|--------|  
| `/admin/stats`                  | GET     | Liste des statistiques disponibles                      | ❌            | ✅      |
| `/admin/booking`                  | GET     | Liste des réservations                     | ❌            | ✅      |
| `/admin/booking/:id`                  | GET     | Details d'une réservation spécifique                     | ❌            | ✅      |
| `/admin/users`              | GET     | Listes des utilisateurs                      |❌            | ✅      |
| `/admin/users/:id`                 | GET    | Details d'un utilisateur spécifique                           | ❌            | ✅      |
| `/admin/users/:id`              | DELETE  | Supprimer un utilisateur spéchifique             | ❌            | ✅      |
| `/admin/me`              | GET     | Detais du profile de l'admin                    | ❌            | ✅      |
| `/admin/me`              | PUT     | Mettre à jour le profile de l'admin                    | ❌            | ✅      |
| `/admin/password/change`              | PUT     | Changer le mot de passe de l'admin                    | ❌            | ✅      |
| `/admin/cooperative/:cooperativeId/admin`              | POST     | Creer un admin pour un cooperative spécifique                 | ❌            | ✅      |




## Dépendances

Voici les principales dépendances utilisées dans ce projet, avec des badges pour chaque technologie.

- **nodemon** ![nodemon](https://img.shields.io/badge/nodemon-v2.0.15-blue)
- **bcryptjs** ![bcryptjs](https://img.shields.io/badge/bcryptjs-v2.4.3-green)
- **cors** ![cors](https://img.shields.io/badge/cors-v2.8.5-yellow)
- **multer** ![multer](https://img.shields.io/badge/multer-v1.4.5-yellowgreen)
- **mysql2** ![mysql2](https://img.shields.io/badge/mysql2-v2.3.3-red)
- **morgan** ![morgan](https://img.shields.io/badge/morgan-v1.10.0-orange)
- **sequelize** ![sequelize](https://img.shields.io/badge/sequelize-v6.30.0-blueviolet)
- **sequelize-cli** ![sequelize-cli](https://img.shields.io/badge/sequelize-cli-v6.3.0-lightblue)
- **dotenv** ![dotenv](https://img.shields.io/badge/dotenv-v16.0.0-green)
- **cookie-parser** ![cookie-parser](https://img.shields.io/badge/cookie-parser-v1.4.6-ff69b4)
- **html-pdf** ![html-pdf](https://img.shields.io/badge/html-pdf-v3.0.1-lightgreen)
- **jsonwebtoken** ![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-v8.5.1-orange)
- **nodemailer** ![nodemailer](https://img.shields.io/badge/nodemailer-v6.7.2-darkblue)
- **body-parser** ![body-parser](https://img.shields.io/badge/body--parser-v1.19.0-blue)
- **express** ![express](https://img.shields.io/badge/express-v4.17.1-blue)

## Scripts

### Installation des dépendances

```bash
npm install
```
### Next Start your mysql, Apache server connection (XAMPP or WAMPP)
Créer un fichier .env in the racine directory
Add script below to the .env file
```m
DB_USERNAME = **your database username (eg:root)**
DB_PASSWORD = 
DB_DATABASE = **your database**
DB_HOST = 127.0.0.1
SECRET_KEY = **your secret**
ADMIN_EMAIL = **your admin email**
ADMIN_NAME = **your admin name**
ADMIN_PASSWORD = **your admin password**
ADMIN_TEL = **your admin tel**
ADMIN_IMAGE = **your admin image**
```

### Commandes Pour creer un database

```bash
npx sequelize-cli db:create
```

### Commandes pour migrer les données

```bash
npx sequelize-cli db:migrate
```
### Commande pour demarrer le serveur backend

```bash
npm run dev
```
### Test API via POSTMAN with the endpoint above
Server is running at :

```bash
http://0.0.0.0/4000
```
