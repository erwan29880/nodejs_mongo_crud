const express = require('express'); 
const app = express();
const path = require('path');
const router = require('./router/routes')

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('static'));
app.use('/', router);
 
// créer une base de données, commenter par la suite
// const bdd = require('./bddMongo/requetes');
// const mg = new bdd();
// mg.insertInitialData();

 
app.listen(8080, () => {
    console.log("app listening on port 8080 !")
})