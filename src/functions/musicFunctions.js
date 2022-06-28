const shell = require('shelljs');
var ffmpegPath = shell.which('ffmpeg');
const YoutubeMp3Downloader = require("youtube-mp3-downloader");

var Downloader = function() {

    var self = this;
    
    self.YD = new YoutubeMp3Downloader({
        "ffmpegPath": ffmpegPath,        
        "outputPath": "../music",    
        "youtubeVideoQuality": "highest",  
        "queueParallelism": 2,                  
        "progressTimeout": 2000,                
        "outputOptions" : ["-af", "silenceremove=1:0:-50dB"]
    });

    self.callbacks = {};

    self.YD.on("finished", function(error, data) {
		
        if (self.callbacks[data.videoId]) {
            self.callbacks[data.videoId] (error, data);
        } else {
            console.log("Error: No callback for videoId!");
        }
    
    });

    self.YD.on("error", function(error, data) {
	
        console.error(error + " on videoId " + data.videoId);
    
        if (self.callbacks[data.videoId]) {
            self.callbacks[data.videoId] (error, data);
        } else {
            console.log("Error: No callback for videoId!");
        }
     
    });

};

Downloader.prototype.getMP3 = function(track, callback) {

    var self = this;
	
    self.callbacks[track.videoId] = callback;

    self.YD.download(track.videoId, track.name);

};

module.exports = {
    Downloader 
};;