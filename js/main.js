let width = 500,
  height = 0,
  filter = "none",
  streaming = false;

const video = document.querySelector("#video");
const photoButton = document.querySelector("#photoButton");
const filters = document.querySelector("#filters");
const clearButton = document.querySelector("#clear");
const photosDiv = document.querySelector("#photos");
const canvas = document.querySelector("#canvas");

// Get media stream
navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then((stream) => {
    // Link to the video source
    video.srcObject = stream;
    video.play();
  })
  .catch((err) => {
    console.log(err);
  });

video.addEventListener(
  "canplay",
  function (e) {
    if (!streaming) {
      //Set video / canvas height
      height = video.videoHeight / (video.videoWidth / width);
      video.setAttribute("width", width);
      video.setAttribute("height", height);
      canvas.setAttribute("height", height);

      streaming = true;
    }
  },
  false
);

photoButton.addEventListener("click", function (e) {
  takePicture();
  e.preventDefault();
});

function takePicture() {
  // Create canvas
  const context = canvas.getContext("2d");
  if (width && height) {
    // Set canvas props
    canvas.width = width;
    canvas.height = height;
    // Draw an image of the video on the canvas
    context.drawImage(video, 0, 0, width, height);

    // Create image from the canvas
    const imgUrl = canvas.toDataURL("image/png");

    // Create image element
    const img = document.createElement("img");
    img.style.filter = filter;
    img.setAttribute("src", imgUrl);

    photosDiv.appendChild(img);
  }
}

function clearPictures() {}

filters.addEventListener("change", function (e) {
  e.preventDefault();
  filter = e.target.value;
  video.style.filter = filter;
});

clearButton.addEventListener("click", function () {
  // Clear photos
  photosDiv.innerHTML = "";
  filter = "none";
  video.style.filter = filter;
  filters.selectedIndex = 0;
});
