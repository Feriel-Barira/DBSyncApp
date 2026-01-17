# DB Sync App

Application de synchronisation entre deux bases de données : SQL Server (SDT) et MySQL (DIVA).
## Fonctionnement de la synchronisation et gestion des interventions

L’application assure la synchronisation des pannes depuis la base de données source
SQL Server (SDT) vers la base cible MySQL (DIVA).

Chaque panne est détectée à partir de la table `LostTimeTransaction` de la base SDT.
Lorsqu’une nouvelle panne est synchronisée :

- Une **demande d’intervention** est automatiquement créée dans la base DIVA.
- Chaque **intervention** est obligatoirement associée à une seule demande d’intervention.

La gestion des interventions se fait entièrement dans la base DIVA et via l’interface front-end.

### Gestion des mécaniciens et des interventions

- La base DIVA contient une **liste de mécaniciens disponibles**.
- Lorsqu’une intervention est créée, son état initial est **"En attente"**.
- Lors de l’affectation d’un mécanicien :
  - Un seul mécanicien peut être affecté à une intervention.
  - L’état de l’intervention passe à **"En cours"**.
  - Le mécanicien devient indisponible pendant l’intervention.
- Une fois l’intervention terminée :
  - L’état passe à **"Terminée"**.
  - Le mécanicien est libéré et redevient disponible.

Toutes les interventions créées et mises à jour sont visibles dans l’interface front-end,
qui est connectée exclusivement à la base de données DIVA.

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

```bash
# Lancer SQL Server
docker start sqlserver
```
### ▶️ Démarrer les conteneurs existants
Lancer SQL Server
```bash
docker start sqlserver
```
Lancer MySQL
```bash
docker start mysqlB
```
#### 🆕 Créer les conteneurs (si non existants)
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

## 2️⃣ Configurer les variables d’environnement
Le fichier .env.example est fourni comme modèle.
Il doit être renommé en .env puis modifié avec les vraies données (utilisateurs, mots de passe, hôtes, etc.) avant de lancer l’application.
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

