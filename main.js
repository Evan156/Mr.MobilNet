function setup() {
  canvas = createCanvas(250, 250);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded); //importation

}

function modelLoaded() {
  console.log("modelLoaded"); //to check the moadel is loaded
}

function draw() {
  image(video, 0, 0, 250, 250) //the X,Y,W,H
  classifier.classify(video, gotResult);

}

var previous_result = ""

function gotResult(error, results) {

  if (error) {
    console.log(error)
  } else {

    if ((results[0].confidence > 0.5) && (previous_result != results[0].label)) {
      console.log(results);
      previous_result = results[0].label;
      var synth = window.speechSynthesis;//converts T to S
      speak_data = 'Object detected is - ' + results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);
     
      document.getElementById("Mr_O").innerHTML = results[0].label;
      document.getElementById("Mr_A").innerHTML = results[0].confidence.toFixed(3);
    }







  }





}