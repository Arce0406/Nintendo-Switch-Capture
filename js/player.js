// const videoElement = document.querySelector("video");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const volume_on = document.getElementById("volume_on");
const volume_off = document.getElementById("volume_off");
const fullscreen = document.getElementById("fullscreen");
const fullscreen_exit = document.getElementById("fullscreen_exit");
const pip = document.getElementById("pip");
// const cast = document.getElementById("cast");

play.addEventListener("click", playPauseMedia);
pause.addEventListener("click", playPauseMedia);
volume_on.addEventListener("click", onOffMediaVolume);
volume_off.addEventListener("click", onOffMediaVolume);
fullscreen.addEventListener("click", goFullScreen);
fullscreen_exit.addEventListener("click", goFullScreen);
pip.addEventListener("click", togglePictureInPicture);
// cast.addEventListener("click", remotePrompt);

function playPauseMedia() {
  if (videoElement.paused) {
    play.classList.add("d-none");
    pause.classList.remove("d-none");
    videoElement.play();
  } else {
    pause.classList.add("d-none");
    play.classList.remove("d-none");
    videoElement.pause();
  }
}

function onOffMediaVolume() {
  if (videoElement.volume === 0.0) {
    volume_off.classList.add("d-none");
    volume_on.classList.remove("d-none");
    videoElement.volume = 1;
  } else if (videoElement.volume === 1.0) {
    volume_on.classList.add("d-none");
    volume_off.classList.remove("d-none");
    videoElement.volume = 0;
  }
}

function goFullScreen() {
  console.log(document.fullscreenElement);
  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    fullscreen.classList.add("d-none");
    fullscreen_exit.classList.remove("d-none");
    document.body.requestFullscreen();
  } else {
    fullscreen_exit.classList.add("d-none");
    fullscreen.classList.remove("d-none");
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

function remotePrompt() {
  videoElement.remote.prompt().then(function (e) {});
}

function togglePictureInPicture() {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  } else if (document.pictureInPictureEnabled) {
    videoElement.requestPictureInPicture();
  }
}

videoElement.addEventListener("play", (event) => {
  console.log("play");
  //   console.log(videoElement.srcObject);
});

videoElement.addEventListener("pause", (event) => {
  console.log("pause");
});

videoElement.addEventListener("emptied", (event) => {
  console.log("emptied");
});

videoElement.addEventListener("ended", (event) => {
  console.log("ended");
});

videoElement.addEventListener("emptied", (error) => {
  console.error(`Error when loading.`);
});
