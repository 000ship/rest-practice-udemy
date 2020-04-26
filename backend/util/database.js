const Sequelize = require('sequelize');

const sequelize = new Sequelize('rest-practice', 'postgres', '7731228', {
    dialect: 'postgres',
    host: 'localhost'
});

module.exports = sequelize;