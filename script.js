/* =========================================
   🎵 NASHEED PLAYER
   API + PLAYLIST + ANIMATION
========================================= */


/* =========================================
   01. ELEMENTS
========================================= */

const nasheedPlayer =
    document.getElementById("nasheed-player");

const nasheedAudio =
    document.getElementById("nasheed-audio");

const playButton =
    document.getElementById("play-btn");

const previousButton =
    document.getElementById("prev-btn");

const nextButton =
    document.getElementById("next-btn");

const titleElement =
    document.getElementById("nasheed-title");

const artistElement =
    document.getElementById("nasheed-artist");

const currentTimeElement =
    document.getElementById("current-time");

const durationElement =
    document.getElementById("duration");

const progress =
    document.getElementById("progress");


/* =========================================
   02. API
========================================= */

/*
   Nasheed Collection API
*/

const API_URL =
    "https://iamaanahmad.github.io/NasheedCollection/audio_catalog.json";


/*
   Maximum number of songs
   shown in playlist
*/

const MAX_SONGS = 30;


/* =========================================
   03. PLAYER STATE
========================================= */

let playlist = [];

let currentSongIndex = 0;


/* =========================================
   04. PLAYLIST CONTAINER
========================================= */

let playlistContainer =
    document.querySelector(".nasheed-playlist");


/*
   যদি HTML-এ playlist না থাকে,
   তাহলে JavaScript নিজেই তৈরি করবে।
*/

function createPlaylist() {

    if (playlistContainer) {
        return playlistContainer;
    }

    if (!nasheedPlayer) {
        return null;
    }

    playlistContainer =
        document.createElement("div");

    playlistContainer.className =
        "nasheed-playlist";


    playlistContainer.innerHTML = `

        <div class="playlist-header">

            <span>🎵</span>

            <h4>
                Nasheed Playlist
            </h4>

        </div>

    `;


    nasheedPlayer.appendChild(
        playlistContainer
    );


    return playlistContainer;
}


/* =========================================
   05. FORMAT TIME
========================================= */

function formatTime(seconds) {

    if (
        !Number.isFinite(seconds) ||
        seconds < 0
    ) {
        return "0:00";
    }


    const minutes =
        Math.floor(seconds / 60);


    const remainingSeconds =
        Math.floor(seconds % 60);


    return (
        minutes +
        ":" +
        String(remainingSeconds)
            .padStart(2, "0")
    );
}


/* =========================================
   06. PLAYING STATE
========================================= */

function setPlayingState(isPlaying) {

    if (!nasheedPlayer) {
        return;
    }


    nasheedPlayer.classList.toggle(
        "playing",
        isPlaying
    );
}


/* =========================================
   07. PLAY BUTTON UI
========================================= */

function updatePlayButton(isPlaying) {

    if (!playButton) {
        return;
    }


    if (isPlaying) {

        playButton.textContent =
            "⏸";

        playButton.setAttribute(
            "aria-label",
            "Pause Nasheed"
        );

    }

    else {

        playButton.textContent =
            "▶";

        playButton.setAttribute(
            "aria-label",
            "Play Nasheed"
        );

    }
}


/* =========================================
   08. UPDATE ACTIVE PLAYLIST
========================================= */

function updateActivePlaylist() {

    if (!playlistContainer) {
        return;
    }


    const items =
        playlistContainer.querySelectorAll(
            ".playlist-item"
        );


    items.forEach(
        (item, index) => {

            item.classList.toggle(
                "active",
                index === currentSongIndex
            );

        }
    );
}


/* =========================================
   09. LOAD SONG
========================================= */

function loadSong(index) {

    if (
        !nasheedAudio ||
        !playlist.length
    ) {
        return;
    }


    if (index < 0) {

        index =
            playlist.length - 1;

    }


    if (
        index >=
        playlist.length
    ) {

        index = 0;

    }


    currentSongIndex =
        index;


    const song =
        playlist[currentSongIndex];


    /*
       Stop current audio
    */

    nasheedAudio.pause();


    /*
       Set new audio
    */

    nasheedAudio.src =
        song.src;


    nasheedAudio.load();


    /*
       Update title
    */

    if (titleElement) {

        titleElement.textContent =
            song.title;

    }


    /*
       Update artist
    */

    if (artistElement) {

        artistElement.textContent =
            song.artist;

    }


    /*
       Reset time
    */

    if (currentTimeElement) {

        currentTimeElement.textContent =
            "0:00";

    }


    if (durationElement) {

        durationElement.textContent =
            "0:00";

    }


    /*
       Reset progress
    */

    if (progress) {

        progress.value = 0;

        progress.style.setProperty(
            "--progress-value",
            "0%"
        );

    }


    updatePlayButton(false);

    setPlayingState(false);

    updateActivePlaylist();
}


/* =========================================
   10. PLAY SONG
========================================= */

async function playSong() {

    if (
        !nasheedAudio ||
        !playlist.length
    ) {
        return;
    }


    try {

        await nasheedAudio.play();

    }

    catch (error) {

        console.error(
            "Unable to play Nasheed:",
            error
        );

    }
}


/* =========================================
   11. PAUSE SONG
========================================= */

function pauseSong() {

    if (!nasheedAudio) {
        return;
    }


    nasheedAudio.pause();
}


/* =========================================
   12. PLAY / PAUSE
========================================= */

function togglePlay() {

    if (!nasheedAudio) {
        return;
    }


    if (nasheedAudio.paused) {

        playSong();

    }

    else {

        pauseSong();

    }
}


/* =========================================
   13. NEXT SONG
========================================= */

function nextSong() {

    if (!playlist.length) {
        return;
    }


    currentSongIndex++;


    if (
        currentSongIndex >=
        playlist.length
    ) {

        currentSongIndex = 0;

    }


    loadSong(
        currentSongIndex
    );


    playSong();
}


/* =========================================
   14. PREVIOUS SONG
========================================= */

function previousSong() {

    if (!playlist.length) {
        return;
    }


    currentSongIndex--;


    if (currentSongIndex < 0) {

        currentSongIndex =
            playlist.length - 1;

    }


    loadSong(
        currentSongIndex
    );


    playSong();
}


/* =========================================
   15. UPDATE TIME
========================================= */

function updateTime() {

    if (!nasheedAudio) {
        return;
    }


    if (currentTimeElement) {

        currentTimeElement.textContent =
            formatTime(
                nasheedAudio.currentTime
            );

    }


    if (durationElement) {

        durationElement.textContent =
            formatTime(
                nasheedAudio.duration
            );

    }
}


/* =========================================
   16. UPDATE PROGRESS
========================================= */

function updateProgress() {

    if (
        !nasheedAudio ||
        !progress
    ) {
        return;
    }


    const duration =
        nasheedAudio.duration;


    if (
        !Number.isFinite(duration) ||
        duration <= 0
    ) {
        return;
    }


    const percentage =
        (
            nasheedAudio.currentTime /
            duration
        ) * 100;


    progress.value =
        percentage;


    progress.style.setProperty(
        "--progress-value",
        percentage + "%"
    );
}


/* =========================================
   17. SEEK SONG
========================================= */

function seekSong() {

    if (
        !nasheedAudio ||
        !progress
    ) {
        return;
    }


    const duration =
        nasheedAudio.duration;


    if (
        !Number.isFinite(duration) ||
        duration <= 0
    ) {
        return;
    }


    nasheedAudio.currentTime =
        (
            Number(progress.value) /
            100
        ) * duration;


    progress.style.setProperty(
        "--progress-value",
        progress.value + "%"
    );
}


/* =========================================
   18. CONVERT API SONG
========================================= */

function convertSong(song) {

    if (!song) {
        return null;
    }


    let source = "";


    /*
       API CDN URL
    */

    if (
        song.urls &&
        song.urls.cdn
    ) {

        source =
            song.urls.cdn;

    }


    /*
       GitHub Pages URL
    */

    else if (
        song.urls &&
        song.urls.github_pages
    ) {

        source =
            song.urls.github_pages;

    }


    /*
       Other possible fields
    */

    else if (song.audio) {

        source =
            song.audio;

    }

    else if (song.audioUrl) {

        source =
            song.audioUrl;

    }

    else if (song.url) {

        source =
            song.url;

    }


    if (!source) {
        return null;
    }


    return {

        title:
            song.title ||
            "Unknown Nasheed",

        artist:
            song.artist ||
            "Unknown Artist",

        language:
            String(
                song.language || ""
            ).toLowerCase(),

        category:
            String(
                song.category || ""
            ).toLowerCase(),

        src:
            source

    };
}


/* =========================================
   19. RENDER PLAYLIST
========================================= */

function renderPlaylist() {

    const container =
        createPlaylist();


    if (!container) {
        return;
    }


    /*
       Remove old playlist items
    */

    container
        .querySelectorAll(
            ".playlist-item"
        )
        .forEach(
            item => item.remove()
        );


    /*
       No songs
    */

    if (!playlist.length) {

        const empty =
            document.createElement(
                "p"
            );

        empty.className =
            "playlist-empty";

        empty.textContent =
            "No Nasheeds available.";

        container.appendChild(
            empty
        );

        return;
    }


    /*
       Create each song
    */

    playlist.forEach(
        (song, index) => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "playlist-item";


            item.setAttribute(
                "role",
                "button"
            );


            item.setAttribute(
                "tabindex",
                "0"
            );


            /*
               Number
            */

            const number =
                document.createElement(
                    "div"
                );


            number.className =
                "playlist-number";


            number.textContent =
                index + 1;


            /*
               Details
            */

            const details =
                document.createElement(
                    "div"
                );


            details.className =
                "playlist-details";


            /*
               Title
            */

            const songTitle =
                document.createElement(
                    "span"
                );


            songTitle.className =
                "playlist-title";


            songTitle.textContent =
                song.title;


            /*
               Artist
            */

            const songArtist =
                document.createElement(
                    "span"
                );


            songArtist.className =
                "playlist-artist";


            songArtist.textContent =
                song.artist;


            /*
               Playing animation
            */

            const bars =
                document.createElement(
                    "div"
                );


            bars.className =
                "playing-bars";


            bars.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;


            details.appendChild(
                songTitle
            );


            details.appendChild(
                songArtist
            );


            item.appendChild(
                number
            );


            item.appendChild(
                details
            );


            item.appendChild(
                bars
            );


            /*
               Select song
            */

            function selectSong() {

                currentSongIndex =
                    index;


                loadSong(
                    currentSongIndex
                );


                playSong();

            }


            item.addEventListener(
                "click",
                selectSong
            );


            item.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key ===
                            "Enter" ||
                        event.key ===
                            " "
                    ) {

                        event.preventDefault();

                        selectSong();

                    }

                }
            );


            container.appendChild(
                item
            );

        }
    );


    updateActivePlaylist();
}


/* =========================================
   20. LOAD NASHEEDS FROM API
========================================= */

async function loadNasheedsFromAPI() {

    console.log(
        "🎵 Loading Nasheeds from API..."
    );


    try {

        const response =
            await fetch(
                API_URL,
                {
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "HTTP Error: " +
                response.status
            );

        }


        const data =
            await response.json();


        /*
           API-এর files array
        */

        if (
            !data ||
            !Array.isArray(
                data.files
            )
        ) {

            throw new Error(
                "Invalid API response."
            );

        }


        /*
           Convert songs
        */

        const allSongs =
            data.files
                .map(convertSong)
                .filter(Boolean);


        /*
           Arabic songs first
        */

        const arabicSongs =
            allSongs.filter(
                song =>
                    song.language ===
                    "arabic"
            );


        /*
           Islamic categories
        */

        const islamicArabicSongs =
            arabicSongs.filter(
                song =>
                    [
                        "religious",
                        "supplication",
                        "prophet",
                        "seasonal"
                    ].includes(
                        song.category
                    )
            );


        /*
           Priority:
           Islamic Arabic
           → Arabic
           → Islamic songs
           → All songs
        */

        if (
            islamicArabicSongs.length
        ) {

            playlist =
                islamicArabicSongs.slice(
                    0,
                    MAX_SONGS
                );

        }

        else if (
            arabicSongs.length
        ) {

            playlist =
                arabicSongs.slice(
                    0,
                    MAX_SONGS
                );

        }

        else {

            const islamicSongs =
                allSongs.filter(
                    song =>
                        [
                            "religious",
                            "supplication",
                            "prophet",
                            "seasonal"
                        ].includes(
                            song.category
                        )
                );


            if (islamicSongs.length) {

                playlist =
                    islamicSongs.slice(
                        0,
                        MAX_SONGS
                    );

            }

            else {

                playlist =
                    allSongs.slice(
                        0,
                        MAX_SONGS
                    );

            }

        }


        /*
           Check playlist
        */

        if (!playlist.length) {

            throw new Error(
                "No playable Nasheeds found."
            );

        }


        /*
           Start first song
        */

        currentSongIndex = 0;


        renderPlaylist();


        loadSong(0);


        console.log(
            "✅ Nasheed API loaded:",
            playlist.length,
            "songs"
        );

    }


    catch (error) {

        console.error(
            "❌ Nasheed API failed:",
            error
        );


        /*
           Local fallback
        */

        playlist = [

            {
                title:
                    "Daily Nasheed",

                artist:
                    "Local Audio",

                src:
                    "nasheed.mp3"

            }

        ];


        currentSongIndex = 0;


        renderPlaylist();


        loadSong(0);


        console.warn(
            "⚠️ API unavailable. Using local nasheed.mp3."
        );

    }
}


/* =========================================
   21. PLAY BUTTON
========================================= */

if (playButton) {

    playButton.addEventListener(
        "click",
        togglePlay
    );

}


/* =========================================
   22. NEXT BUTTON
========================================= */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        nextSong
    );

}


/* =========================================
   23. PREVIOUS BUTTON
========================================= */

if (previousButton) {

    previousButton.addEventListener(
        "click",
        previousSong
    );

}


/* =========================================
   24. PROGRESS BAR
========================================= */

if (progress) {

    progress.addEventListener(
        "input",
        seekSong
    );

}


/* =========================================
   25. AUDIO EVENTS
========================================= */

if (nasheedAudio) {


    /*
       Time update
    */

    nasheedAudio.addEventListener(
        "timeupdate",
        () => {

            updateTime();

            updateProgress();

        }
    );


    /*
       Metadata loaded
    */

    nasheedAudio.addEventListener(
        "loadedmetadata",
        updateTime
    );


    /*
       Playing
    */

    nasheedAudio.addEventListener(
        "play",
        () => {

            updatePlayButton(
                true
            );

            setPlayingState(
                true
            );

            updateActivePlaylist();

        }
    );


    /*
       Paused
    */

    nasheedAudio.addEventListener(
        "pause",
        () => {

            updatePlayButton(
                false
            );

            setPlayingState(
                false
            );

        }
    );


    /*
       Song finished
    */

    nasheedAudio.addEventListener(
        "ended",
        () => {

            nextSong();

        }
    );


    /*
       Audio error
    */

    nasheedAudio.addEventListener(
        "error",
        event => {

            console.error(
                "❌ Audio error:",
                event
            );

        }
    );

}


/* =========================================
   26. INITIALIZE
========================================= */

updatePlayButton(false);

setPlayingState(false);

createPlaylist();

loadNasheedsFromAPI();


/* =========================================
   🚀 READY
========================================= */

console.log(
    "🚀 Islamic Soldier Nasheed Player Ready!"
);