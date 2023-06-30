const escape = require('escape-html');
const MongoClient = require('mongodb').MongoClient;
const express = require('express');

/*
const bdd = require('./bddMongo/requetes');
const mg = new bdd();
mg.insertInitialData();
mg.findAll().then(console.log)
mg.insertOne({prenom: "jacques", nom: "dupre", montant: 200});
mg.update({prenom: "jacques", nom: "dupre"}, {montant: 300});
mg.dropOne({prenom: "jacques", nom: "dupre"});
*/

class Requetes {
    constructor() {
        this.user = 'root';
        this.password = 'root';
        this.host = '127.0.0.1';
        this.port = '27018';
        this.dbName = 'bdd';
        this.colName = 'data';
        this.client = undefined;
        this.db = undefined;
        this.collection = undefined;
    }

    /**
     * créer une collection et insérer des données
     */
    async insertInitialData() {
        const url = `mongodb://${this.user}:${this.password}@${this.host}:${this.port}`
        this.client = new MongoClient(url);
        this.db = this.client.db(this.dbName);
        await this.db.createCollection('data');
        this.collection = this.db.collection('data');

        const data = [
            {prenom: 'martin', nom: 'dupont', montant: 100},
            {prenom: 'jean', nom: 'dubois', montant: 120},
            {prenom: 'edmond', nom: 'duval', montant: 110}
        ];

        await this.collection.insertMany(data);
        this.client.close();
    }

    /**
     * connection to mongo
     */
    async connect() {
        const url = `mongodb://${this.user}:${this.password}@${this.host}:${this.port}`
        this.client = new MongoClient(url);
        this.db = this.client.db(this.dbName);
        this.collection = this.db.collection(this.colName);
    }


    /**
     * select 
     * @param {object} filter 
     * @returns {promise}
     */
    async findAll(filter = {}, id = false) {
        let findResult = undefined;
        await this.connect();
        if (id === false) {
            findResult = await this.collection.find(filter, {projection:{_id: 0}}).toArray();
        } else {
            findResult = await this.collection.find(filter).toArray();
        }
            this.close();
        return findResult;
    }


    /**
     * escape html
     * @param {array} obj array of object 
     * @returns object
     */
    escapeData(obj) {
        const dict = {};
        for (let row of obj) {
            for (const [key, value] of Object.entries(row)) {
                dict[key] = escape(value);
            }
        }
        return dict;
    }

    /**
     * insert one document
     * @param {object} obj
     */
    async insertOne(obj) {
        this.connect();
        const data = this.escapeData([obj]);
        await this.collection.insertOne(data);
        this.close();
    }    

    /**
     * update montant
     * @param {object} objfind recherche  
     * @param {object} objUpdate remplacement
     */
    async update(objfind, objUpdate) {
        this.connect();
        const findDoc = this.escapeData([objfind]);
        const replaceDoc = this.escapeData([objUpdate]);
        await this.collection.updateOne(findDoc, {$set: replaceDoc});
        this.close();
    }

    /**
     * delete document
     * @param {object} obj 
     */
    async dropOne(obj) {
        this.connect();
        const data = this.escapeData([obj]);
        await this.collection.deleteOne(data);
        this.close();
    }

    /**
     * close connection
     */
    close() {
        this.client.close();
        this.db = undefined;
        this.collection = undefined;
    }
}

module.exports = Requetes;