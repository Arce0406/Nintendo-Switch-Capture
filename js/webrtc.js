import * as StreamCapture from "./webrtc/stream-capture.js";

window.addEventListener("load", function (event) {
  StreamCapture.start();
});
