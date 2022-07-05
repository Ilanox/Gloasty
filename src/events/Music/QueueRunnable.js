const Gloasty = require('../../../gloasty.js');
const { exec } = require('youtube-dl-exec')
const Voice = require('@discordjs/voice')

module.exports = {
    name: 'ready',
    async execute(client, Music1, Music2) {

        const player = Voice.createAudioPlayer();

        while(true) {

            const allGuildsArray = Gloasty.music.getGuildsInQueue();
    
            allGuildsArray.forEach((guildID) => {
    
                const guildQueue = Gloasty.music.getQueueByGuild(guildID)
    
                const item = guildQueue[0]
    
                var playerClient;

                var voiceID;

                if(Music1.user.id = item.PlayerID) playerClient = Music1
                if(Music2.user.id = item.PlayerID) playerClient = Music2

                const guild = playerClient.guilds.cache.get(guildID);

                const user = guild.members.cache.get(item.UserID);                                                                                                                   

                const playerMember = guild.members.cache.get(item.PlayerID);

                if(playerMember.voice.channelId != null) voiceID = playerMember.voice.channelId
                else if(user.voice.channelId != null) voiceID = user.voice.channelId    

                if(voiceID == null) return;

                if(player.state.status == "playing" || player.state.status == "buffering") return;

                const connection = Voice.joinVoiceChannel({
                    channelId: voiceID,
                    guildId: guild.id,
                    adapterCreator: guild.voiceAdapterCreator,
                })


                connection.subscribe(player)

                Gloasty.music.removeItemFromQueue(item)             

                console.log(Gloasty.music.getQueueByGuild(guildID))

                const stream = exec(item.SongURL, {o: "-", q: "", format: "bestaudio[ext=webm+acodec=opus+asr=48000]/bestaudio", r: "100K"})
                const resource = Voice.createAudioResource(stream.stdout)
                player.play(resource)

            });

            await Gloasty.utilities.sleep(1000);
        }
    }
}