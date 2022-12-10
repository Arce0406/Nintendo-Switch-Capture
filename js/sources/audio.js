
function getCurrentSettings(stream) {
  if (videoTrack) {
    videoSettingsText.value = JSON.stringify(videoTrack.getSettings(), null, 2);
  }

  if (audioTrack) {
    audioSettingsText.value = JSON.stringify(audioTrack.getSettings(), null, 2);
  }
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