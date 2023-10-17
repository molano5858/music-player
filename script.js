const music = document.querySelector("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeIndicator = document.getElementById("current-time");
const durationIndicator = document.getElementById("duration");

// list Songs
const songs = [
  {
    name: "pipe-1",
    displayName: "Trailer Sport Stylish",
    artist: "Anton Vlasov",
  },
  {
    name: "pipe-2",
    displayName: "Cyber War",
    artist: "AlexiAction",
  },
  {
    name: "pipe-3",
    displayName: "Electro Summer Positive Party",
    artist: "Alex Kizenkov",
  },
  {
    name: "pipe-4",
    displayName: "Rock The Party",
    artist: "AlexiAction",
  },
];

// Check if playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  music.play();
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
}
// Pause
function pauseSong() {
  isPlaying = false;
  music.pause();
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}

// event listener to play or pause
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `./music/${song.name}.mp3`;
  image.src = `./img/${song.name}.jpg`;
}

// prev / next functions
let currentSong = 0;
function prevSong() {
  if (currentSong === 0) {
    currentSong = 3;
    loadSong(songs[currentSong]);
    playSong();
  } else {
    currentSong--;
    loadSong(songs[currentSong]);
    playSong();
  }
}

function nextSong() {
  if (currentSong < songs.length - 1) {
    currentSong++;
    loadSong(songs[currentSong]);
    playSong();
  } else {
    currentSong = 0;
    loadSong(songs[currentSong]);
    playSong();
  }
}

// onLoad - load the first song
loadSong(songs[currentSong]);

//
function updateProgressBar(event) {
  if (isPlaying) {
    const { currentTime, duration } = event.srcElement;
    // update progress bar
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // delay showing duration element to avoid NaN
    if (durationSeconds) {
      durationIndicator.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Calculate current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    // delay showing duration element to avoid NaN
    if (currentSeconds) {
      currentTimeIndicator.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
}

// click progress bar functionality
function setProgressBar(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// next / prev buttons event linsteners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
// click progress bar listener
progressContainer.addEventListener("click", setProgressBar);
