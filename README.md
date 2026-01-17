# GPro-DivaTex Maintenance Interface

Application de synchronisation entre deux bases de données : SQL Server (SDT) et MySQL (DIVA).

## Contexte des systèmes (GPro & DivaTex)

-SDT (SQL Server) est la base de données du système GPro, utilisée pour la gestion de la production et la détection des pannes machines.

-DIVA (MySQL) est la base de données du système DivaTex, dédiée à la gestion de la maintenance (demandes d’intervention, interventions et mécaniciens).

L’application joue le rôle d’interface entre GPro et DivaTex, en assurant la synchronisation des pannes détectées dans GPro vers le système de maintenance DivaTex.

---

### Prérequis

- Node.js (>=18)
- npm
- Docker Desktop ou Docker Engine

---

## 1️⃣ Lancer les bases de données avec Docker
Ce projet utilise **deux conteneurs Docker uniquement pour les bases de données**.
L’application (back-end et front-end) **n’est pas dockerisée**.
### Conteneurs utilisés
- SQL Server (sqlserver) : port 1433
- MySQL (mysqlB) : port 3306
---
Exemples de commandes pour les lancer si les conteneurs existent déjà :
### ▶️ Démarrer les conteneurs existants
##### Lancer SQL Server
```bash
docker start sqlserver
```
##### Lancer MySQL
```bash
docker start mysqlB
```
#### 🆕 Ouvrir les conteneurs avec cmd
SQL Server
```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=motdepasse" -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2022-latest
```
MySQL
```bash
docker run -e MYSQL_ROOT_PASSWORD=motdepasse -p 3306:3306 --name mysqlB -d mysql:latest
```
### 🛠️ Initialisation manuelle des bases de données
#### SQL Server (SDT)
Connexion à SQL Server :
```bash
docker run -it --rm mcr.microsoft.com/mssql-tools:latest \
/opt/mssql-tools/bin/sqlcmd \
-S host.docker.internal,1433 \
-U sa -P <SA_PASSWORD>
```
#### MySQL (DIVA)
Connexion à MySQL :
```bash
docker exec -it mysqlB mysql -u root -p
```
Les bases de données et les tables doivent être créées manuellement après le démarrage des conteneurs Docker.
Un script SQL est fourni uniquement pour la base source SQL Server (SDT).
La base MySQL (DIVA) doit être créée manuellement en reproduisant la structure nécessaire.

---
## 2️⃣ Configurer les variables d’environnement
Le fichier .env.example est fourni comme modèle.
Il doit être renommé en .env puis modifié avec les vraies données (utilisateurs, mots de passe, hôtes, etc.) avant de lancer l’application.

---
## 3️⃣ Installer les dépendances
Back-end (Node.js)
```bash
cd back
npm install
```
Front-end (React)
```bash
cd front
npm install
```
---

## 4️⃣ Lancer l’application
Back-end
```bash
cd backend
node src/server.js
```
Front-end
```bash
cd frontend
npm start
```

