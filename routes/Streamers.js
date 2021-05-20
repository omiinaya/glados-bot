//dependencies
const express = require("express")
const cors = require("cors")
const Streamer = require("../models/Streamer")
const { config } = require('../config')

//vars
const streamers = express.Router()
streamers.use(cors())

//token encryption key
SECRET_KEY = process.env.SECRET_KEY


//find all users
streamers.get("/all", function (req, res) {
    Streamer.findAll().then(streamer => {
        res.json(streamer);
    });
});

streamers.post("/add", (req, res) => {
    Streamer.create({
        name: req.body.name,
        status: req.body.status
    }).then(streamer => {
        console.log(streamer + ' has been added.')
    })
})

streamers.put("/update/:status", function (req, res) {
    Streamer.update(
        {
            status: req.params.status
        },
        {
            where: {
                name: req.body.name,
            }
        }
    )
        .then(function (response) {
            res.json(response)
        })
})

streamers.delete("/remove/:name", function (req, res) {
    Streamer.destroy({
        where: {
            name: req.params.name
        }
    })
})

module.exports = streamers