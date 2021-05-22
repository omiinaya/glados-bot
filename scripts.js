const axios = require('axios')
const { config, numbers, bars, embed } = require('./config')
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
    return axios
        .put(BASEURL + "/api/streamers/update/" + status, {
            name: name
        })
        .then(res => {
            console.log(res + " has been updated.")
        })
}

function getNumbers() {
    var x = []
    for (const key in numbers) {
        x.push(key)
    }
    return x
}

function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    return hrs + ':' + mins + ':' + secs;
}

function getTimeLeft(timer, embedMessage, msg, pollEmbed, timer, removeReactions) {
    var tick = timer
    var tock = setInterval(() => {
        tick = tick - 1200
        embedMessage.edit(pollEmbed.setFooter(embed.footer + '  •  ' + msToTime(tick), embed.thumbnail))
        if (tick < 1) {
            clearInterval(tock);
            removeReactions(embedMessage, msg, timer)
        }
        console.log(msToTime(tick))
        return msToTime(tick)
    }, 1200);
    //not exactly 1 second because discord api is shit
}

function progressBar(value, total) {
   var x = ((value/total) * 100) / 2.8
   var y = bars['1']
   var z = y.repeat(x)
   return z
}

module.exports = {
    leadingZero,
    print,
    getList,
    addStreamer,
    removeStreamer,
    updateStreamer,
    canModifyQueue,
    getNumbers,
    msToTime,
    getTimeLeft,
    progressBar
}