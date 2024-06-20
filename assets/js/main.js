// Cập nhật lại Website trên GitHub Pages
// Nguồn: https://www.youtube.com/watch?v=5vDepCaFdj4&t=441s

const wrapper = document.querySelector(".wrapper")
musicImg = wrapper.querySelector("#poster-master-play")
musicName = wrapper.querySelector(".title")
musicArtist = wrapper.querySelector(".artist-name")
mainAudio = wrapper.querySelector("#main-audio")
playPauseBtn = wrapper.querySelector(".play-pause")
prevBtn = wrapper.querySelector("#prev")
nextBtn = wrapper.querySelector("#next")
progressBar = wrapper.querySelector(".progress-bar")
progressArea = wrapper.querySelector(".progress-area")
volumeArea = wrapper.querySelector(".volume-area")
progressDot = wrapper.querySelector(".dot")
musicList = wrapper.querySelector(".menu__song")
iconRepeatOne = wrapper.querySelector(".icon-repeat-one")
iconVolume = wrapper.querySelector(".volume-icon");
wave = wrapper.querySelector(".wave");
musicImg = wrapper.querySelector(".music__img");


let musicIndex = Math.floor((Math.random() * allSongs.length) + 1)


window.addEventListener('load', () => {
    loadMusic(musicIndex);
    playingNow();
})

const cdThumbAnimate = musicImg.animate(
    [{
        transform: 'rotate(360deg)'
    }], {
        duration: 10000,
        iterations: Infinity
    }
)
cdThumbAnimate.pause();

function loadMusic(indexNumb) {
    musicName.innerText = allSongs[indexNumb - 1].songName;
    musicArtist.innerText = allSongs[indexNumb - 1].artist;
    musicImg.src = `./assets/img/${allSongs[indexNumb - 1].poster}.jpg`;
    mainAudio.src = `./assets/audio/${allSongs[indexNumb - 1].src}.mp3`
}

function playMusic() {
    wrapper.classList.add("paused")
    playPauseBtn.classList.add("paused")
    wave.classList.add('active2')
    cdThumbAnimate.play();
    mainAudio.play();
}

function pauseMusic() {
    wrapper.classList.remove("paused")
    playPauseBtn.classList.remove("paused")
    wave.classList.remove('active2')
    cdThumbAnimate.pause();
    mainAudio.pause();
}

playPauseBtn.addEventListener('click', () => {
    const isMusicPaused = wrapper.classList.contains('paused')
    isMusicPaused ? pauseMusic() : playMusic();
})

function nextMusic() {
    musicIndex++;
    musicIndex > allSongs.length ? musicIndex = 1 : musicIndex = musicIndex
    loadMusic(musicIndex)
    playMusic();
    playingNow();
}

function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allSongs.length : musicIndex = musicIndex
    loadMusic(musicIndex)
    playMusic();
    playingNow();
}

nextBtn.addEventListener('click', () => {
    nextMusic();
})

prevBtn.addEventListener('click', () => {
    prevMusic();
})

mainAudio.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100
    progressBar.style.width = `${progressWidth}%`;
    let musicCurrentTime = document.getElementById("currentStart");
    let musicDuration = document.getElementById("currentEnd");
    mainAudio.addEventListener("loadeddata", () => {
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`
    });
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`
})

progressArea.addEventListener('click', (e) => {
    let progressBarWithVal = progressArea.clientWidth;
    let clickedOfSetX = e.offsetX;
    let songDuration = mainAudio.duration;
    mainAudio.currentTime = (clickedOfSetX / progressBarWithVal) * songDuration;
    playMusic();
});

const repeatBtn = wrapper.querySelector('#repeat-plist');
repeatBtn.addEventListener('click', () => {
    let getText = repeatBtn.innerText;
    switch(getText) {
        case 'repeat':
            repeatBtn.innerText = 'repeat_one';
            repeatBtn.setAttribute('title', 'Song looped');
            break;
        case 'repeat_one':
            repeatBtn.innerText = 'shuffle';
            repeatBtn.setAttribute('title', 'Playback shuffle');
            break;
        case 'shuffle':
            repeatBtn.innerText = 'repeat';
            repeatBtn.setAttribute('title', 'Playlist looped');
            break;
    }
})

mainAudio.addEventListener('ended', () => {
    let getText = repeatBtn.innerText;
    switch(getText) {
        case 'repeat':
            nextMusic();
            break;
        case 'repeat_one':
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case 'shuffle':
            let randIndex = Math.floor((Math.random() * allSongs.length) + 1);
            do {
                randIndex = Math.floor((Math.random() * allSongs.length) + 1);
            } while (musicIndex == randIndex)
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            playingNow();
            break;
            
    }
})

iconRepeatOne.addEventListener('click', () => {
    let currentIndex = musicIndex;
    console.log(currentIndex);
    loadMusic(currentIndex);
    playMusic();
})

for (let i = 0; i < allSongs.length; i++) {
    let liTag = `<li li-index=${i + 1} class="songItem">
                    <span>${allSongs[i].id}</span>
                    <img src="./assets/img/${allSongs[i].poster}.jpg" alt="">
                    <h5>${allSongs[i].songName}
                        <div class="subtitle">${allSongs[i].artist}</div>
                    </h5>
                    <audio src="./assets/audio/${allSongs[i].src}.mp3" class="${allSongs[i].src}"></audio>
                </li>`
    musicList.insertAdjacentHTML("beforeend", liTag);
    
}

const allLiTags = musicList.querySelectorAll('li');
function playingNow() {
    for(let j = 0; j < allLiTags.length; j++) {
        if (allLiTags[j].classList.contains('playing')) {
            allLiTags[j].classList.remove('playing')
        }
        if (allLiTags[j].getAttribute('li-index') == musicIndex) {
            allLiTags[j].classList.add('playing')
        }
        allLiTags[j].setAttribute('onclick', 'clicked(this)')
    }
}

function clicked(element) {
    let getLiIndex = element.getAttribute('li-index');
    musicIndex = getLiIndex;
    console.log(getLiIndex);
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

let vol = wrapper.querySelector('#vol');
let volBar = wrapper.querySelector('.vol__bar');
let volDot = wrapper.querySelector('.dot');

vol.addEventListener('change', () => {
    if (vol.value == 0) {
        iconVolume.classList.remove('uil-volume');
        iconVolume.classList.remove('uil-volume-down')
        iconVolume.classList.add('uil-volume-off')
    }
    if (vol.value > 0) {
        iconVolume.classList.remove('uil-volume');
        iconVolume.classList.add('uil-volume-down')
        iconVolume.classList.remove('uil-volume-off')
    } 
    if (vol.value > 50) {
        iconVolume.classList.add('uil-volume');
        iconVolume.classList.remove('uil-volume-down')
        iconVolume.classList.remove('uil-volume-off')
    }
    let volA = vol.value;
    volBar.style.width = `${volA}%`;
    volDot.style.left = `${volA}%`;
    mainAudio.volume = volA / 100;
});
 
// Hide Listen Window
function hideListenSongWindow() {
    document.querySelector(".listen-mobile").classList.add("hide");
}

function showListenSongWindow() {
    document.querySelector(".listen-mobile").classList.remove("hide");
}

// Header More Bottom Sheet
function openHeaderMoreBotomSheet() {
    document.querySelector(".listen-mobile__header-more-bottom-sheet-overlay").classList.add("show");
    document.querySelector(".listen-mobile__header-more-bottom-sheet-container").classList.add("show");
}

window.addEventListener('click', e => {
    if (e.target == document.querySelector(".listen-mobile__header-more-bottom-sheet-overlay")) {
        document.querySelector(".listen-mobile__header-more-bottom-sheet-overlay").classList.remove("show");
        document.querySelector(".listen-mobile__header-more-bottom-sheet-container").classList.remove("show");
    }
});

// Chat Bottom Sheet
function openChatBottomSheet() {
    document.querySelector(".listen-song__bottom-chat-bottom-sheet-overlay").classList.add("show");
    document.querySelector(".listen-song__bottom-chat-bottom-sheet-container").classList.add("show");
}

function closeChatBottomSheet() {
    console.log(document.querySelector(".listen-song__bottom-chat-bottom-sheet-container").style);
    document.querySelector(".listen-song__bottom-chat-bottom-sheet-overlay").classList.remove("show");
    document.querySelector(".listen-song__bottom-chat-bottom-sheet-container").classList.remove("show");
}

window.addEventListener('click', e => {
    if (e.target == document.querySelector(".listen-song__bottom-chat-bottom-sheet-overlay")) {
        document.querySelector(".listen-song__bottom-chat-bottom-sheet-overlay").classList.remove("show");
        document.querySelector(".listen-song__bottom-chat-bottom-sheet-container").classList.remove("show");
    }
});

// Add Playlist Bottom Sheet
function showAddPlaylistBottomSheet() {
    document.querySelector(".listen-song__bottom-add-playlist-bottom-sheet-overlay").classList.add("show");
    document.querySelector(".listen-song__bottom-add-playlist-bottom-sheet-container").classList.add("show");
}

window.addEventListener('click', e => {
    if (e.target == document.querySelector(".listen-song__bottom-add-playlist-bottom-sheet-overlay")) {
        document.querySelector(".listen-song__bottom-add-playlist-bottom-sheet-overlay").classList.remove("show");
        document.querySelector(".listen-song__bottom-add-playlist-bottom-sheet-container").classList.remove("show");
    }
});

// Playlist Modal
function openPlaylistModal() {
    document.querySelector(".listen-song__bottom-playlist").classList.add("active");
    document.querySelector(".listen-song__bottom-playlist-modal").classList.add("open");
}

function closePlaylistModal() {
    document.querySelector(".listen-song__bottom-playlist").classList.remove("active");
    document.querySelector(".listen-song__bottom-playlist-modal").classList.remove("open");

}