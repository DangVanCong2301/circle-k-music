const homeMobile = document.querySelector(".home-mobile");
const musicImgMobile = homeMobile.querySelector(".listen-mobile__thumbnail-img");
const musicNameMobile = homeMobile.querySelector(".listen-mobile__info-song-name");
const musicArtistMobile = homeMobile.querySelector(".listen-mobile__info-song-artist");
const mainAudioMobile = homeMobile.querySelector(".listen-mobile__audio");
const playPauseBtnMobile = homeMobile.querySelector(".listen-mobile__control-play-pause");
const prevBtnMobile = homeMobile.querySelector(".listen-mobile__control-prev");
const nextBtnMobile = homeMobile.querySelector(".listen-mobile__control-next");
const progressBarMobile = homeMobile.querySelector(".listen-mobile__seekbar-bar");
const progressAreaMobile = homeMobile.querySelector(".listen-mobile__seekbar-area");
const repeatBtnMobile = homeMobile.querySelector(".listen-mobile__control-icon-repeat");
const repeatBackBtnMobile = homeMobile.querySelector(".listen-mobile__control-repeat-one");

window.addEventListener('load', () => {
    loadMusicMobile(musicIndex);
});

const cdThumbAnimateMobile = musicImgMobile.animate(
    [{
        transform: 'rotate(360deg)'
    }], {
        duration: 10000,
        iterations: Infinity
    }
);
cdThumbAnimateMobile.pause();

function loadMusicMobile(indexNumb) {
    musicNameMobile.innerText = allSongs[indexNumb - 1].songName;
    musicArtistMobile.innerText = allSongs[indexNumb - 1].artist;
    musicImgMobile.src = `./assets/img/${allSongs[indexNumb - 1].poster}.jpg`
    mainAudioMobile.src = `./assets/audio/${allSongs[indexNumb - 1].src}.mp3`;

    let htmlSongMoreBottmSheet = "";
    htmlSongMoreBottmSheet += 
    `
        <div class="listen-mobile__header-more-bottom-sheet-song-img" style="background-image: url(./assets/img/${allSongs[indexNumb - 1].poster}.jpg);"></div>
        <div class="listen-mobile__header-more-bottom-sheet-song-desc">
            <div class="listen-mobile__header-more-bottom-sheet-song-name">${allSongs[indexNumb - 1].songName}</div>
            <div class="listen-mobile__header-more-bottom-sheet-song-artist">${allSongs[indexNumb - 1].artist}</div>
        </div>
        <a href="#" class="listen-mobile__header-more-bottom-sheet-song-share">
            <i class="uil uil-share listen-mobile__header-more-bottom-sheet-song-share-icon"></i>
        </a>
    `;
    homeMobile.querySelector(".listen-mobile__header-more-bottom-sheet-song").innerHTML = htmlSongMoreBottmSheet;

    let htmlSongPlayingList = "";
    htmlSongPlayingList += 
    `
        <div class="listen-song__bottom-playlist-modal-song-item playing">
            <img src="./assets/img/${allSongs[indexNumb - 1].poster}.jpg" class="listen-song__bottom-playlist-modal-song-item-img" alt="">
            <div class="listen-song__bottom-playlist-modal-item-info">
                <div class="listen-song__bottom-playlist-modal-song-item-info-name">${allSongs[indexNumb - 1].songName}</div>
                <div class="listen-song__bottom-playlist-modal-song-item-info-artist">${allSongs[indexNumb - 1].artist}</div>
            </div>
            <div class="listen-song__bottom-playlist-modal-song-item-ware active">
                <div class="listen-song__bottom-playlist-modal-song-item-ware-item"></div>
                <div class="listen-song__bottom-playlist-modal-song-item-ware-item"></div>
                <div class="listen-song__bottom-playlist-modal-song-item-ware-item"></div>
            </div>
        </div>
    `;
    homeMobile.querySelector(".listen-song__bottom-playlist-modal-song-item-playing").innerHTML = htmlSongPlayingList;
}

function playMusicMobile() {
    homeMobile.classList.add("paused");
    playPauseBtnMobile.querySelector(".listen-mobile__control-play-pause").classList.add("uil-pause");
    cdThumbAnimateMobile.play();
    mainAudioMobile.play();
}

function pauseMusicMobile() {
    homeMobile.classList.remove("paused");
    playPauseBtnMobile.querySelector(".listen-mobile__control-play-pause").classList.remove("uil-pause");
    cdThumbAnimateMobile.pause();
    mainAudioMobile.pause();
}

playPauseBtnMobile.addEventListener('click', () => {
    const isMusicPaused = homeMobile.classList.contains("paused");
    isMusicPaused ? pauseMusicMobile() : playMusicMobile();
});

function nextMusicMobile() {
    musicIndex++;
    musicIndex > allSongs.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusicMobile(musicIndex);
    playMusicMobile();
}

function prevMusicMobile() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allSongs.length : musicIndex = musicIndex;
    loadMusicMobile(musicIndex);
    playMusicMobile();
}

nextBtnMobile.addEventListener('click', () => {
    nextMusicMobile();
});

prevBtnMobile.addEventListener('click', () => {
    prevMusicMobile();
});

mainAudioMobile.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBarMobile.style.width = `${progressWidth}%`;
    let musicCurrentTime = homeMobile.querySelector(".listen-mobile__seekbar-time-start");
    let musicDuration = homeMobile.querySelector(".listen-mobile__seekbar-time-end");
    mainAudioMobile.addEventListener("loadeddata", () => {
        let audioDuration = mainAudioMobile.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressAreaMobile.addEventListener('click', (e) => {
    let progressBarWithVal = progressAreaMobile.clientWidth;
    let clickedOfSetX = e.offsetX;
    let songDuration = mainAudioMobile.duration;
    mainAudioMobile.currentTime = (clickedOfSetX / progressBarWithVal) * songDuration;
    playMusicMobile();
});

repeatBtnMobile.addEventListener('click', () => {
    let getText = repeatBtnMobile.innerText;
    switch(getText) {
        case 'repeat':
            repeatBtnMobile.innerText = 'repeat_one';
            repeatBtnMobile.setAttribute('title', 'Song looped');
            break;
        case 'repeat_one':
            repeatBtnMobile.innerText = 'shuffle';
            repeatBtnMobile.setAttribute('title', 'Playback shuffle');
            break;
        case 'shuffle':
            repeatBtnMobile.innerText = 'repeat';
            repeatBtnMobile.setAttribute('title', 'Playlist looped');
            break;
    }
});

mainAudioMobile.addEventListener('ended', () => {
    let getText = repeatBtnMobile.innerText;
    switch(getText) {
        case 'repeat':
            nextMusicMobile();
            break;
        case 'repeat_one':
            mainAudioMobile.currentTime = 0;
            loadMusicMobile(musicIndex);
            playMusicMobile();
            break;
        case 'shuffle':
            let randomIndex = Math.floor((Math.random() * allSongs.length) + 1);
            do {
                randomIndex = Math.floor((Math.random() * allSongs.length) + 1);
            } while (musicIndex == randomIndex);
            musicIndex = randomIndex;
            loadMusicMobile(musicIndex);
            playMusicMobile();
            break;
    }
});

repeatBackBtnMobile.addEventListener('click', () => {
    let currentIndex = musicIndex;
    loadMusicMobile(currentIndex);
    playMusicMobile();
});

function renderSongsMobile() {
    let htmlListSongsMobile = "";
    htmlListSongsMobile += allSongs.map((obj, index) => 
    `
        <div class="listen-song__bottom-playlist-modal-song-item">
            <img src="./assets/img/${obj.poster}.jpg" class="listen-song__bottom-playlist-modal-song-item-img" alt="">
            <div class="listen-song__bottom-playlist-modal-item-info">
                <div class="listen-song__bottom-playlist-modal-song-item-info-name">${obj.songName}</div>
                <div class="listen-song__bottom-playlist-modal-song-item-info-artist">${obj.artist}</div>
            </div>
            <div class="listen-song__bottom-playlist-modal-song-item-bar">
                <i class="uil uil-bars listen-song__bottom-playlist-modal-song-item-bar-icon"></i>
            </div>
            <audio src="./assets/audio/${obj.src}.mp3" class="listen-song__bottom-playlist-modal-song-item-audio"></audio>
        </div>
    `
    ).join('');
    document.querySelector(".listen-song__bottom-playlist-modal-body-list").innerHTML = htmlListSongsMobile;
}
renderSongsMobile();