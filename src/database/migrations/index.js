const sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
        id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });
    
    await queryInterface.createTable('servers', {
        id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        instance: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        instance_code: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        instance_memory: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        instance_processor: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        public_ip_address: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        instance_state: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};