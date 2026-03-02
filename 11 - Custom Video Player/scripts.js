"use strict";

// Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build out functions
function togglePlay () {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton () {
    const icon = this.paused ? '►' : '⏸︎';
    toggle.textContent = icon;
}

function skip () {
    console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate () {
    video[this.name] = this.value;
    // console.log(this.name);
    // console.log(this.value);
}

function handleProgress () {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub (e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    if (!video.play()) {
        togglePlay;
    }
    console.log(e)
}

// Event listeners

// video.addEventListener('click', () => {
//     togglePlay()
//     if (!video.paused) {
//         toggle.textContent = "⏸︎";
//     } else {
//         toggle.textContent = "►"
//     }
// });
// toggle.addEventListener('click', () => {
//     togglePlay()
//     if (!video.paused) {
//         toggle.textContent = "⏸︎";
//     } else {
//         toggle.textContent = "►"
//     }
// });

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

// Tento pristup umoznuje update i na zaklade napriklad jineho spusteni videa, nez klik
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
// skipButtons.addEventListener('click')

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => {
    mouseDown && scrub(e)
});
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)