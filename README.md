# url api
https://api-taxibe.onrender.com

# https://api-taxibe-mada.up.railway.app/

** Project taxibe cooperative api à Madagascar!
# API REST Réservation TaxiBe Coopérative à Madagascar

Une API REST permettant la gestion de réservations de taxi pour plusieurs coopératives de taxis à Madagascar. Ce projet utilise Node.js, Express, Sequelize-CLI, MySQL et d'autres technologies pour la gestion des réservations et la génération de PDF.

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

| Route                     | Méthode | Description                                      | Utilisateur  | Admin  |
|---------------------------|---------|--------------------------------------------------|--------------|--------|
| `/taxibe`                  | GET     | Liste des taxis disponibles                      | ✅            | ✅      |
| `/taxibe/:id`              | GET     | Détails d'un taxi spécifique                     | ✅            | ✅      |
| `/booking`                 | POST    | Créer une réservation                            | ✅            | ✅      |
| `/user/register`           | POST    | Inscription d'un nouvel utilisateur              | ✅            | ❌      |
| `/user/login`              | POST    | Connexion de l'utilisateur                       | ✅            | ❌      |
| `/user/logout`             | POST    | Déconnexion de l'utilisateur                     | ✅            | ❌      |
| `/admin/stats`             | GET     | Statistiques pour l'admin                        | ❌            | ✅      |
| `/admin/taxibe`            | POST    | Ajouter un nouveau taxi                          | ❌            | ✅      |
| `/admin/booking/:id`       | DELETE  | Supprimer une réservation                        | ❌            | ✅      |

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
### Test API via POSTMAN or Curl with the link above

