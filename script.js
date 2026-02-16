// Here we will write the buttons and functions for the index website.
// We will also write the code for the music player and the AI
// not seen to the player but, running in hte background
console.log("Powler Player is running..");

// grab key elements for index.html
// Ones below are for the music player
const audioPlayer = document.getElementById("audio_player");
const nowPlaying = document.getElementById("now_playing");
const moodStatus = document.getElementById("mood_status");

// Controls for music player 
const playBtn = document.getElementById("play_btn");
const pauseBtn = document.getElementById("pause_btn");
const loopBtn = document.getElementById("loop_btn");
const shuffleBtn = document.getElementById("shuffle_btn");
// Next and previous buttons for song navigation
const nextBtn = document.getElementById("next_btn");
const prevBtn = document.getElementById("prev_btn");

// Recommended song buttons
const recButtons = [
    document.getElementById("rec-1"),
    document.getElementById("rec-2"),
    document.getElementById("rec-3")
];

// Here will be the song list for players
const songs = [
    "Error_ You.mp3",
    "Funk and Gone.mp3",
    "Final Fight.mp3",
    "Beneath the Falling Sky.mp3",
    "Falling Out of Frame.mp3",
    "Fire.mp3",
    "Keep It Down.mp3",
    "Let me forget.mp3",
    "Light Me Up.mp3",
    "My Hidden Plan.mp3",
    "Star in the Dark.mp3"
];

// This will help keep track for current song
let currentSongIndex = 0;

// Helper: load a song into the player and play it
function loadThenPlay(Error_You) {
    // Pull my song from file and play it
    audioPlayer.src = "audio/" + Error_You;
    audioPlayer.play();
    nowPlaying.textContent = "Now Playing: " + Error_You;
}

// Songs onto recommendation buttons & add click behavior
recButtons.forEach((btn, index) =>{
    // Checks if button does exist if not it will skip
    if (!btn) return;
    // Set to song name or default IF song couldn't be found
    btn.textContent = songs[index] || "Recommended Song";
    
    // Add event listener
    btn.addEventListener("click", () => {
        currentSongIndex = index; // Update current song index
        loadThenPlay(songs[currentSongIndex]);
    });
});

// Play and pause button controls to let users control the music
playBtn.addEventListener("click", () => {
    audioPlayer.play();
});
pauseBtn.addEventListener("click", () => {
    audioPlayer.pause();
});

// Next and previous button controls for song navigation
nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadThenPlay(songs[currentSongIndex]);
});

prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadThenPlay(songs[currentSongIndex]);
});

// Add the shuffle buttion so it can shuffle random songs for user
shuffleBtn.addEventListener("click", () => {
    // makes sure it doesn't shuffle to the same song it's currently on
    if (!songs.length) return;
    // Pick random song
    // math.random will give user a random number 
    // math.floor will make sure it rounds to the nearest whole number
    let newSongIndex = Math.floor(Math.random() * songs.length);

    if (songs.length > 1) {
        while (newSongIndex === currentSongIndex){
            newSongIndex = Math.floor(Math.random() * songs.length);
        }
    }

    // now update current song and play it
    currentSongIndex = newSongIndex;
    loadThenPlay(songs[currentSongIndex]);
});

// Create a loop button that will toggle on and off for user
// isLooping will boolean to be be sure if it's on or off
let isLooping = false;
// ONce the user clicks the loop button it will display if it's looping or not
loopBtn.addEventListener("click", () => {
    isLooping = !isLooping;
    audioPlayer.loop = isLooping;

    loopBtn.textContent = isLooping ? "Loop: ∞" : "Loop: off";
});

// Make sure it goes through a check to be sure the elements are being grabbed
// This will help from errors showing up often
// safety check for user 
if (!audioPlayer || !nowPlaying || !playBtn || !pauseBtn) {
    console.error("Element missing. Please check HTML IDS..");
}



// Debug check to see if controls are working
console.log("Audio element:", audioPlayer);
console.log("Play button:", playBtn);
console.log("Recommended buttons:", recButtons);
