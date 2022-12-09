/**
 * https://github.com/webrtc/samples/blob/gh-pages/src/content/getusermedia/record/js/main.js
 */

let mediaRecorder;
let recordedBlobs;
const mimeType = "video/mp4";

function stopRecording() {
  mediaRecorder.stop();
  //   recordButton.textContent = 'Start Recording';
  //   playButton.disabled = false;
  //   downloadButton.disabled = false;
  //   codecPreferences.disabled = false;
}

function startRecording() {
  recordedBlobs = [];
  const options = {
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 2500000,
    mimeType: mimeType,
  };

  try {
    mediaRecorder = new MediaRecorder(window.stream, options);
  } catch (e) {
    console.error("Exception while creating MediaRecorder:", e);
    // errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
    return;
  }

  console.log("Created MediaRecorder", mediaRecorder, "with options", options);
  //   recordButton.textContent = "Stop Recording";
  //   playButton.disabled = true;
  //   downloadButton.disabled = true;
  //   codecPreferences.disabled = true;
  mediaRecorder.onstop = (event) => {
    console.log("Recorder stopped: ", event);
    console.log("Recorded Blobs: ", recordedBlobs);
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
  console.log("MediaRecorder started", mediaRecorder);
}

function handleDataAvailable(event) {
  console.log("handleDataAvailable", event);
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function playVideo() {
  const superBuffer = new Blob(recordedBlobs, { type: mimeType });

  videoElement.src = null;
  videoElement.srcObject = null;
  videoElement.src = window.URL.createObjectURL(superBuffer);
  videoElement.controls = true;
  videoElement.play();
}

function downloadVideo() {
  const blob = new Blob(recordedBlobs, { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "test.webm";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}
