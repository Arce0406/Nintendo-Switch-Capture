import * as StreamCapture from "./webrtc/stream-capture.js";
import * as StreamRecorder from "./webrtc/stream-recorder.js";

window.addEventListener("load", function (event) {
  StreamCapture.init();
  // StreamRecorder.load('record');
});
