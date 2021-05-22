const Sequelize    = require("sequelize")
const { database } = require('../config')
const DB_HOST      = process.env.DB_HOST
const DB_DATABASE  = process.env.DB_DATABASE
const DB_USERNAME  = process.env.DB_USERNAME
const DB_PASSWORD  = process.env.DB_PASSWORD
const db = {}

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST ,
    dialect: database.dialect,
    operatorAliases: database.operatorAliases,

    pool: {
        max: database.max,   
        min: database.min,
        acquire: database.aqcuire,
        idle: database.idle
    }
}) 

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db