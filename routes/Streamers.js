//dependencies
const express = require("express")
const cors = require("cors")
const Streamer = require("../models/Streamer")

//vars
const streamers = express.Router()
streamers.use(cors())

//token encryption key
SECRET_KEY = process.env.SECRET_KEY


//find all users
streamers.get("/all", function (req, res) {
    Streamer.findAll().then(user => {
        res.json(user);
    });
});

module.exports = streamers