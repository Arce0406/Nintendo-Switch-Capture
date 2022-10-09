class Recoder {
  constructor(sampleRate) {
    this.leftDataList = [];
    this.rightDataList = [];
    this.mediaPlayer = null;
    this.audioContext = null;
    this.source = null;
    this.sampleRate = sampleRate || 44100;
  }
  startRecord() {
    return new Promise((resolve, reject) => {
      window.navigator.mediaDevices
        .getUserMedia({
          audio: {
            sampleRate: 8000, // 采样率
            channelCount: 1, // 声道
            audioBitsPerSecond: 64,
            volume: 1.0, // 音量
            autoGainControl: true,
          },
        })
        .then((mediaStream) => {
          console.log(mediaStream, "mediaStream");
          this.mediaPlayer = mediaStream;
          this.beginRecord(mediaStream);
          resolve();
        })
        .catch((err) => {
          // 如果用户电脑没有麦克风设备或者用户拒绝了，或者连接出问题了等
          // 这里都会抛异常，并且通过err.name可以知道是哪种类型的错误
          console.error(err);
          reject(err);
        });
    });
  }

  beginRecord(mediaStream) {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    // mediaNode包含 mediaStream，audioContext
    let mediaNode = audioContext.createMediaStreamSource(mediaStream);
    console.log(mediaNode, "mediaNode");
    // 创建一个jsNode
    // audioContext.sampleRate = 8000
    console.log(audioContext, "audioContext");
    let jsNode = this.createJSNode(audioContext);
    console.log(jsNode, "jsnode");
    // 需要连到扬声器消费掉outputBuffer，process回调才能触发
    // 并且由于不给outputBuffer设置内容，所以扬声器不会播放出声音
    jsNode.connect(audioContext.destination);
    jsNode.onaudioprocess = this.onAudioProcess.bind(this);
    // 把mediaNode连接到jsNode
    mediaNode.connect(jsNode);
    this.audioContext = audioContext;
  }

  onAudioProcess(event) {
    console.log("is recording");
    // 拿到输入buffer Float32Array
    let audioBuffer = event.inputBuffer;
    let leftChannelData = audioBuffer.getChannelData(0);
    // let rightChannelData = audioBuffer.getChannelData(1)

    // 需要克隆一下
    this.leftDataList.push(leftChannelData.slice(0));
    //this.rightDataList.push(rightChannelData.slice(0))
  }

  createJSNode(audioContext) {
    const BUFFER_SIZE = 4096;
    const INPUT_CHANNEL_COUNT = 1;
    const OUTPUT_CHANNEL_COUNT = 1;
    // createJavaScriptNode已被废弃
    let creator =
      audioContext.createScriptProcessor || audioContext.createJavaScriptNode;
    creator = creator.bind(audioContext);
    return creator(BUFFER_SIZE, INPUT_CHANNEL_COUNT, OUTPUT_CHANNEL_COUNT);
  }

  playRecord(arrayBuffer) {
    let blob = new Blob([new Int8Array(arrayBuffer)], {
      type: "audio/mp3", // files[0].type
    });
    let blobUrl = URL.createObjectURL(blob);
    this.source = blob;
    this.blobUrl = blobUrl;
    // document.querySelector('.audio-node').src = blobUrl
    return blobUrl;
  }

  stopRecord() {
    // 停止录音
    let leftData = this.mergeArray(this.leftDataList);
    //let rightData = this.mergeArray(this.rightDataList)
    let allData = this.interSingleData(leftData);
    let wavBuffer = this.createWavFile(allData);

    let source = this.playRecord(wavBuffer);
    this.resetRecord();
    return source;
  }

  transformArrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    for (var len = bytes.byteLength, i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  // 停止控件录音
  resetRecord() {
    this.leftDataList = [];
    this.rightDataList = [];
    this.audioContext.close();
    this.mediaPlayer.getAudioTracks().forEach((track) => {
      track.stop();
      this.mediaPlayer.removeTrack(track);
    });
  }

  createWavFile(audioData) {
    let channelCount = 1;
    const WAV_HEAD_SIZE = 44;
    const sampleBits = 16;
    let sampleRate = this.sampleRate;

    let buffer = new ArrayBuffer(audioData.length * 2 + WAV_HEAD_SIZE);
    // 需要用一个view来操控buffer
    let view = new DataView(buffer);
    // 写入wav头部信息
    // RIFF chunk descriptor/identifier
    this.writeUTFBytes(view, 0, "RIFF");
    // RIFF chunk length
    view.setUint32(4, 44 + audioData.length * channelCount, true);
    // RIFF type
    this.writeUTFBytes(view, 8, "WAVE");
    // format chunk identifier
    // FMT sub-chunk
    this.writeUTFBytes(view, 12, "fmt ");
    // format chunk length
    view.setUint32(16, 16, true);
    // sample format (raw)
    view.setUint16(20, 1, true);
    // stereo (2 channels)
    view.setUint16(22, channelCount, true);
    // sample rate
    view.setUint32(24, sampleRate, true);
    // byte rate (sample rate * block align)
    view.setUint32(28, sampleRate * 2, true);
    // block align (channel count * bytes per sample)
    view.setUint16(32, 2 * 2, true);
    // bits per sample
    view.setUint16(34, 16, true);
    // data sub-chunk
    // data chunk identifier
    this.writeUTFBytes(view, 36, "data");
    // data chunk length
    view.setUint32(40, audioData.length * 2, true);

    console.log(view, "view");
    let length = audioData.length;
    let index = 44;
    let volume = 1;
    for (let i = 0; i < length; i++) {
      view.setInt16(index, audioData[i] * (0x7fff * volume), true);
      index += 2;
    }
    return buffer;
  }

  writeUTFBytes(view, offset, string) {
    var lng = string.length;
    for (var i = 0; i < lng; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  interSingleData(left) {
    var t = left.length;
    let sampleRate = this.audioContext.sampleRate,
      outputSampleRate = this.sampleRate;
    sampleRate += 0.0;
    outputSampleRate += 0.0;
    var s = 0,
      o = sampleRate / outputSampleRate,
      u = Math.ceil((t * outputSampleRate) / sampleRate),
      a = new Float32Array(u);
    for (let i = 0; i < u; i++) {
      a[i] = left[Math.floor(s)];
      s += o;
    }
    return a;
  }

  // 交叉合并左右声道的数据
  interleaveLeftAndRight(left, right) {
    let totalLength = left.length + right.length;
    let data = new Float32Array(totalLength);
    for (let i = 0; i < left.length; i++) {
      let k = i * 2;
      data[k] = left[i];
      data[k + 1] = right[i];
    }
    return data;
  }

  mergeArray(list) {
    let length = list.length * list[0].length;
    let data = new Float32Array(length);
    let offset = 0;
    for (let i = 0; i < list.length; i++) {
      data.set(list[i], offset);
      offset += list[i].length;
    }
    return data;
  }

  // 播放音乐
  playMusic() {
    if (!this.value) {
      return;
    }
    // 直接使用File对象生成blob url
    let blobUrl = URL.createObjectURL(this.files[0]);
    document.querySelector(".audio-node").src = blobUrl;
  }

  play(arrayBuffer) {
    // Safari需要使用webkit前缀
    let AudioContext = this.AudioContext || this.webkitAudioContext;
    let audioContext = new AudioContext();
    // 创建一个AudioBufferSourceNode对象，使用AudioContext的工厂函数创建
    let audioNode = audioContext.createBufferSource();
    // 解码音频，可以使用Promise，但是较老的Safari需要使用回调
    audioContext.decodeAudioData(arrayBuffer, function (audioBuffer) {
      audioNode.buffer = audioBuffer;
      audioNode.connect(audioContext.destination);
      // 从0s开始播放
      audioNode.start(0);
    });
  }
}
let recoder = new Recoder(8000);
function record() {
  recoder.startRecord();
}

function stopRecord(params) {
  recoder.stopRecord();
  let source = recoder.source;
  let formData = new FormData();
  formData.append("audio", source);
  let audio = document.getElementById("audio");
  audio.src = recoder.blobUrl;
}
