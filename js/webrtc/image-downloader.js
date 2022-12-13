
function gotTrack(stream) {
  // const tracks = stream.getVideoTracks();
  // console.log(tracks);
  const track = stream.getVideoTracks()[0];
  imageCapture = new ImageCapture(track);
  grabFrame()
}

function grabFrame() {
  imageCapture.grabFrame()
    .then((imageBitmap) => {
      console.log('Grabbed frame:', imageBitmap);
      downloadFile(imageBitmap);
      // canvas.width = imageBitmap.width;
      // canvas.height = imageBitmap.height;
      // canvas.getContext('2d').drawImage(imageBitmap, 0, 0);
      // canvas.classList.remove('hidden');
    })
    .catch((error) => {
      console.error('grabFrame() error: ', error);
    });
}


function downloadFile(file) {
  // Create a link and set the URL using `createObjectURL`
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = URL.createObjectURL(file);
  link.download = file.name;

  // It needs to be added to the DOM so it can be clicked
  document.body.appendChild(link);
  link.click();

  // To make this work on Firefox we need to wait
  // a little while before removing it.
  setTimeout(() => {
    URL.revokeObjectURL(link.href);
    link.parentNode.removeChild(link);
  }, 0);
}
