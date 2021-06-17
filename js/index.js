const videoEl = document.getElementById('user-video');
const shareVideoEl = document.getElementById('screen-video');
const shareBtnEl = document.getElementById('shareBtn');
const callBtnEl = document.getElementById('callBtn');

let sharing = false;
let videoIsOn = true;

const userVideoContraint = {
  audio: false,
  video: true,
};

const screenContraint = {
  video: {
    cursor: 'always',
  },
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100,
  },
};

const startCamera = () => {
  navigator.mediaDevices
    .getUserMedia(userVideoContraint)
    .then((media) => {
      console.log(media);
      videoEl.srcObject = media;
      videoIsOn = true;
      callBtnEl.innerText = 'Stop Video';
      callBtnEl.classList.remove('is-success');
      callBtnEl.classList.add('is-danger');
    })
    .catch((err) => {
      console.log(err);
    });
};

startCamera();

const stopCamera = () => {
  let tracks = videoEl.srcObject.getTracks();

  tracks.forEach((track) => track.stop());
  videoEl.srcObject = null;
  videoIsOn = false;
  callBtnEl.innerText = 'Start Video';
  callBtnEl.classList.add('is-success');
  callBtnEl.classList.remove('is-danger');
};

const shareScreen = async () => {
  const stream = await navigator.mediaDevices.getDisplayMedia(screenContraint);
  shareVideoEl.srcObject = stream;
  sharing = true;
  shareBtnEl.innerText = 'Stop Sharing';
  shareBtnEl.classList.toggle('is-danger');
};

const stopShareScreen = () => {
  let tracks = shareVideoEl.srcObject.getTracks();

  tracks.forEach((track) => track.stop());
  shareVideoEl.srcObject = null;
  sharing = false;
  shareBtnEl.innerText = 'Share Screen';
  shareBtnEl.classList.toggle('is-danger');
};

const handleShareScreen = () => {
  if (sharing) {
    stopShareScreen();
  } else {
    shareScreen();
  }
};

const handleCall = () => {
  if (videoIsOn) {
    stopCamera();
  } else {
    startCamera();
  }
};
shareBtnEl.onclick = handleShareScreen;
callBtnEl.onclick = handleCall;
