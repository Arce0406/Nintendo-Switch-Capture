const videoElement = document.querySelector("video");
const audioInputSelect = document.querySelector("select#audioSource");
const audioOutputSelect = document.querySelector("select#audioOutput");
const videoSelect = document.querySelector("select#videoSource");
const selectors = [audioInputSelect, audioOutputSelect, videoSelect];

audioOutputSelect.disabled = !("sinkId" in HTMLMediaElement.prototype);

const logOutput = document.getElementById("log");
function log(msg) {
  var li = document.createElement("li");
  li.className = "box";
  li.innerHTML = msg;
  logOutput.appendChild(li);
}

function gotDevices(deviceInfos) {
  // console.log(deviceInfos);
  // Handles being called several times to update labels. Preserve values.
  const values = selectors.map((select) => select.value);
  selectors.forEach((select) => {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    const option = document.createElement("option");
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === "audioinput") {
      option.text =
        deviceInfo.label || `microphone ${audioInputSelect.length + 1}`;
      audioInputSelect.appendChild(option);
    } else if (deviceInfo.kind === "audiooutput") {
      option.text =
        deviceInfo.label || `speaker ${audioOutputSelect.length + 1}`;
      audioOutputSelect.appendChild(option);
    } else if (deviceInfo.kind === "videoinput") {
      option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
    } else {
      console.log("Some other kind of source/device: ", deviceInfo);
    }
  }
  selectors.forEach((select, selectorIndex) => {
    if (
      Array.prototype.slice
        .call(select.childNodes)
        .some((n) => n.value === values[selectorIndex])
    ) {
      select.value = values[selectorIndex];
    }
  });
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

// Attach audio output device to video element using device/sink ID.
function attachSinkId(element, sinkId) {
  if (typeof element.sinkId !== "undefined") {
    element
      .setSinkId(sinkId)
      .then(() => {
        console.log(`Success, audio output device attached: ${sinkId}`);
      })
      .catch((error) => {
        let errorMessage = error;
        if (error.name === "SecurityError") {
          errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
        }
        console.error(errorMessage);
        // Jump back to first output device in the list as it's the default.
        audioOutputSelect.selectedIndex = 0;
      });
  } else {
    console.warn("Browser does not support output device selection.");
  }
}

function changeAudioDestination() {
  const audioDestination = audioOutputSelect.value;
  attachSinkId(videoElement, audioDestination);
}

function gotAudio(stream) {
  const audioContext = new AudioContext();

  // 取得原始音訊取樣頻率、時間
  let analyser = audioContext.createAnalyser();
  console.log(analyser);

  // 將 WebRTC 所採集的聲音轉換成 AudioNode。
  const destinationNode = audioContext.destination;
  const sourceNode = audioContext.createMediaStreamSource(stream);

  // 壓縮
  const compressor = audioContext.createDynamicsCompressor();
  compressor.threshold.setValueAtTime(0, audioContext.currentTime);
  compressor.knee.setValueAtTime(20, audioContext.currentTime);
  compressor.ratio.setValueAtTime(5, audioContext.currentTime);
  // compressor.reduction.setValueAtTime(0, audioContext.currentTime);
  compressor.attack.setValueAtTime(0, audioContext.currentTime);
  compressor.release.setValueAtTime(0.25, audioContext.currentTime);
  sourceNode.connect(compressor);
  compressor.connect(destinationNode);

  // 濾波
  // var biquadFilter = audioContext.createBiquadFilter();
  // biquadFilter.type = "lowshelf";
  // biquadFilter.frequency.value = 1000;
  // biquadFilter.gain.value = 25;
  // sourceNode.connect(biquadFilter);
  // biquadFilter.connect(audioContext.destination);

  // 音量
  // const processNode = audioContext.createGain();
  // processNode.gain.value = 20;
  // sourceNode.connect(processNode);
  // processNode.connect(destinationNode);
}

function gotStream(stream) {
  // gotAudio(stream);
  window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;
  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}

function getCurrentSettings(stream) {
  if (videoTrack) {
    videoSettingsText.value = JSON.stringify(videoTrack.getSettings(), null, 2);
  }

  if (audioTrack) {
    audioSettingsText.value = JSON.stringify(audioTrack.getSettings(), null, 2);
  }
}

function handleError(error) {
  console.log(
    "navigator.MediaDevices.getUserMedia error: ",
    error.message,
    error.name
  );
}

function start() {
  if (window.stream) {
    window.stream.getTracks().forEach((track) => {
      track.stop();
    });
  }
  const audioSource = audioInputSelect.value;
  const videoSource = videoSelect.value;
  const constraints = {
    // 音源部分禁用瀏覽器的預設調整，才能保證正常音源品質。
    audio: {
      deviceId: audioSource ? { exact: audioSource } : undefined,
      channelCount: { ideal: 1 },
      autoGainControl: false,
      echoCancellation: false,
      googAutoGainControl: false,
      noiseSuppression: false,
    },
    video: {
      deviceId: videoSource ? { exact: videoSource } : undefined,
      width: { min: 640, ideal: 1280, max: 1920 },
      height: { min: 360, ideal: 720, max: 1080 },
      aspectRatio: { ideal: 1.7777777778 },
    },
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(gotStream)
    .then(gotDevices)
    // .then(getCurrentSettings)
    .catch(handleError);
}

audioInputSelect.onchange = start;
audioOutputSelect.onchange = changeAudioDestination;

videoSelect.onchange = start;

start();
