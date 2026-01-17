# DB Sync App

Application de synchronisation entre deux bases de données : SQL Server et MySQL.

---

## Prérequis

- Node.js (>=18)
- npm
- Docker Desktop ou Docker Engine

---

## 1️⃣ Lancer les bases de données avec Docker

Mon projet utilise deux conteneurs Docker :  

- SQL Server (sqlserver) : port 1433
- MySQL (mysqlB) : port 3306

Exemples de commandes pour les lancer si les conteneurs existent déjà :

```bash
# Lancer SQL Server
docker start sqlserver
```

# Lancer MySQL
```bash
docker start mysqlB
```
💡 Si tu n’as pas encore les conteneurs, tu peux les créer avec :
# SQL Server
```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=motdepasse" -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2022-latest
```
# MySQL
```bash
docker run -e MYSQL_ROOT_PASSWORD=motdepasse -p 3306:3306 --name mysqlB -d mysql:latest
```
2️⃣ Configurer les variables d’environnement
Le fichier .env.example est fourni comme modèle.
Il doit être renommé en .env puis modifié avec les vraies données (utilisateurs, mots de passe, hôtes, etc.) avant de lancer l’application.
3️⃣ Installer les dépendances
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
4️⃣ Lancer l’application
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

