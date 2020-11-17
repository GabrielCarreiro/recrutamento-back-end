const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const connection = new Sequelize(dbConfig);

connection.authenticate().then(function(){
    const sequelize = require('sequelize');
}).catch(function(erro){
    console.log('Error', erro)
});

