/**
 * https://ithelp.ithome.com.tw/articles/10205296
 * https://css-tricks.com/making-an-audio-waveform-visualizer-with-vanilla-javascript/
 */

const audioContext = new AudioContext();
let analyser = audioContext.createAnalyser();
analyser.fftSize = 1024;
let fftArray = [];
let isPlaying = false;
console.log(analyser);

function gotAudio(stream) {
  // 將 WebRTC 所採集的聲音轉換成 AudioNode。
  const destinationNode = audioContext.destination;
  const sourceNode = audioContext.createMediaStreamSource(stream);

  // compress(audioContext, destinationNode, sourceNode);
  // biquadFilter(audioContext, sourceNode);
  // volumeGain(audioContext, destinationNode, sourceNode);
}

function compress(audioContext, destinationNode, sourceNode) {
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
}

function biquadFilter(audioContext, sourceNode) {
  // 濾波
  var biquadFilter = audioContext.createBiquadFilter();
  biquadFilter.type = "lowshelf";
  biquadFilter.frequency.value = 1000;
  biquadFilter.gain.value = 25;
  sourceNode.connect(biquadFilter);
  biquadFilter.connect(audioContext.destination);
}

function volumeGain(audioContext, destinationNode, sourceNode) {
  // 音量
  const processNode = audioContext.createGain();
  processNode.gain.value = 20;
  sourceNode.connect(processNode);
  processNode.connect(destinationNode);
}

function getCurrentSettings(stream) {
  if (videoTrack) {
    videoSettingsText.value = JSON.stringify(videoTrack.getSettings(), null, 2);
  }

  if (audioTrack) {
    audioSettingsText.value = JSON.stringify(audioTrack.getSettings(), null, 2);
  }
}

function wave(playStatus) {
  isPlaying = playStatus;
  requestAnimationFrame(getFFTData);
}

function getFFTData() {
  fftArray = new Uint8Array(analyser.fftSize);
  analyser.getByteFrequencyData(this.fftArray);
  if (isPlaying) requestAnimationFrame(this.getFFTData);
}

function drawave(node) {
  if(!fftArray)
  for (let n = 0; n < fftArray.length; n++) {
    const div = document.createElement("div");
    div.style.height = `${fftArray[n] + 2}px`;
  }
}

export { wave };
