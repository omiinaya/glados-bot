const Sequelize = require("sequelize")
const host      = process.env.DB_HOST
const database  = process.env.DB_DATABASE
const username  = process.env.DB_USERNAME
const password  = process.env.DB_PASSWORD
const db = {}

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'mysql',
    operatorAliases: false,

    pool: {
        max: 1,   
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}) 

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db