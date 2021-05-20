var config = {
    channel: '839716692501594152',
    message: '839717153141030932',
    prefix: '.',
    locale: "en",
    baseURL: 'localhost:'+process.env.PORT
}

var emojis = {
    warzone:   '839727811974922251',
    valorant:  '839738631798390795',
    wow:       '839743323883307028',
    overwatch: '840016565478359090',
    csgo:      '840017630348967976',
    minecraft: '840020529984307200',
    league:    '840021351272153159',
    apex:      '840022093231292466',
    rust:      '840024076559056946',
    squad:     '840053337701220362',
    warframe:  '841543950652276736',
    destiny:   '841545703255965706',
    //
    twitch:    '840024315545911316',
    youtube:   '840621841169383494',
    //
    ayaya:     '844651079828373574'
}

var roles = {
    warzone:   '838106791664418878',
    valorant:  '838331897125011488',
    wow:       '838222334187405312',
    overwatch: '839541602161524746',
    csgo:      '838222579646595116',
    minecraft: '840021019040153620',
    league:    '838222200129585172',
    apex:      '838801424368402482',
    rust:      '840031611286192139',
    squad:     '840052815862956032',
    warframe:  '841544519328727040',
    destiny:   '841545904658186240',
    //
    twitch:    '838033694337662986',
    youtube:   '841544614170722334',
    //
    ayaya:     '841754940959621180'
}

var twitch = {
    interval: 5,
    apiUrl: "https://api.twitch.tv/kraken",
    timeout: 2*60*1000,
    channel: '839566399097667594'
}

var music = {
    max_playlist_size: '10',
    pruning: false,
    locale: "en",
    stay_time: "15",
    default_volume: "30"
}

function canModifyQueue(member) {
    const { channelID } = member.voice;
    const botChannel = member.guild.voice.channelID;

    if (channelID !== botChannel) {
        return;
    }
    return true;
}

module.exports = { config, emojis, roles, music, twitch, canModifyQueue }