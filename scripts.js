const axios = require('axios')
const { config } = require('./config')
const BASEURL = config.baseURL

function canModifyQueue(member) {
    const { channelID } = member.voice;
    const botChannel = member.guild.voice.channelID;

    if (channelID !== botChannel) {
        return;
    }
    return true;
}

function leadingZero(d) {
    if (d < 10) {
        return "0" + d;
    } else {
        return d;
    }
}

function print(msg, err) {
    var date = new Date();
    var h = leadingZero(date.getHours());
    var m = leadingZero(date.getMinutes());
    var s = leadingZero(date.getSeconds());

    console.log("[" + h + ":" + m + ":" + s + "]", msg);
    if (err) {
        console.log(err);
    }
}

function getList() {
    return axios
        .get(BASEURL + "/api/streamers/all")
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));
}

function addStreamer(name, status) {
    return axios
        .post(BASEURL + "/api/streamers/add", {
            name: name,
            status: status
        }).then(res => {
            console.log(res + " has been added.")
        })
}

function removeStreamer(name) {
    return axios
        .delete(BASEURL + "/api/streamers/remove/" + name)
        .then(res => {
            console.log(res + " has been removed.")
        })
}

function updateStreamer(name, status) {
    console.log('test')
    return axios
        .put(BASEURL + "/api/streamers/update/" + status, {
            name: name
        })
        .then(res => {
            console.log(res + " has been updated.")
        })
}

module.exports = {
    leadingZero,
    print,
    getList,
    addStreamer,
    removeStreamer,
    updateStreamer,
    canModifyQueue
}