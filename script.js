const music = document.querySelector("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

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
}
