# Crud avec mongoDb et nodejs - express   

## installation : 

créer un dossier mongo  

Monter une base de données dans un containeur docker  

```bash
docker-compose up -d --build 
```  

Installer les modules  

```bash
npm install  
```  

lancer le serveur et créer la base de données : 

```bash
nodemon index.js
```

La base de données est créée, commenter les lignes suivantes du fichier index.js
```javaScript
// const bdd = require('./bddMongo/requetes');
// const mg = new bdd();
// mg.insertInitialData();
``` 

## utilisation :  

aller à l'adresse suivante : 

> http://localhost:8080/


