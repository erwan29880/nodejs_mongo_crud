const express = require('express');
const mongoModule = require('../bddMongo/requetes');


exports.mongo = (req, res) => {
    res.render("mongo");
};


exports.mongoGet = (req, res) => {
    const bdd = new mongoModule();
    bdd.findAll()
    .then((rows) => res.status(200).json(rows));
};

exports.mongoPost = async (req, res, next) => {
    const bdd = new mongoModule();
    bdd.insertOne(req.body);
};

exports.mongoPut = async (req, res) => {
    const bdd = new mongoModule();
    bdd.update(req.body.find, req.body.replace)
    .then(res.status(200).json({message: "ok"}));
};

exports.mongoDel = async (req, res) => {
    const bdd = new mongoModule();
    bdd.dropOne(req.body)
    .then(res.status(200).json({message: req.body}));
};

