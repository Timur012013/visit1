duration = document.querySelector("#duration");
current = document.querySelector("#current");
playPause = document.querySelector("#playPause");

var timeCalculator = function (value) {
    second = Math.floor(value % 60);
    minute = Math.floor((value / 60) % 60);
    
    if (second < 10) {
        second = "0" + second;
    }

    return minute + ":" + second;
};

//start wavesurfer object
 wavesurfer = WaveSurfer.create({
    container: "#wave",
    waveColor: "#1a1a1a", // тут можно поменять фоновый цвет плеера
    progressColor: "#8c8c8c", // тут можно поменять цвет заполнения
    height: 48, // высота плеера
    scrollParent: false
});

//загружаем нужную песню
wavesurfer.load("sound.mp3");

//play and pause a player
playPause.addEventListener("click", function (e) {
    wavesurfer.playPause();
});

//load audio duration on load
wavesurfer.on("ready", function (e) {
    duration.textContent = timeCalculator(wavesurfer.getDuration());
});

//get updated current time on play
wavesurfer.on("audioprocess", function (e) {
    current.textContent = timeCalculator(wavesurfer.getCurrentTime());
});

//change play button to pause on plying
wavesurfer.on("play", function (e) {
    playPause.classList.remove("fi-rr-play");
    playPause.classList.add("fi-rr-pause");
});

//change pause button to play on pause
wavesurfer.on("pause", function (e) {
    playPause.classList.add("fi-rr-play");
    playPause.classList.remove("fi-rr-pause");
});

//update current time on seek
wavesurfer.on("seek", function (e) {
    current.textContent = timeCalculator(wavesurfer.getCurrentTime());
});