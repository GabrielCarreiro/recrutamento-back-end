const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const connection = new Sequelize(dbConfig);

connection.authenticate().then(function(){
    const sequelize = require('sequelize');
    console.log('Foi')
}).catch(function(erro){
    console.log('Deu erro', erro)
})

