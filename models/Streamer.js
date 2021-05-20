const Sequelize = require("sequelize")
const db = require("../database/db")

var Streamers = db.sequelize.define(
    'streamer',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN
        },
    },
    {
        timestamps: false
    }
)

Streamers.sync(/*{force:true}*/)

module.exports = Streamers