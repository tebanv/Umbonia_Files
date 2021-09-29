// settings
var clientId = "853fdb79a14a9ed748ec9fe482e859dd";
var trackId = "120912535";

// DOM elements
var artwork = $("#artwork");
var band = $("#band");
var song = $("#track");

// Init SoundCloud JS SDK (dont forget to include the .js SDK)
SC.initialize({
  client_id: clientId
});

// Getting SC track infos
SC.get("/tracks/" + trackId, function(track) {
  // Injecting infos
  artwork.attr("src", track.artwork_url.replace("-large", "-crop")); // Cover (replacing the default image size "large" with "crop")
  band.html(track.user.username); // Band Name
  song.html(track.title); // Song name

  // Play btn
  var status = false; // play status

  $("#play").click(function(e) {
    e.preventDefault();

    if (status == false) {
      $("#player").addClass("open"); // Opening the player
      $("#record").addClass("spinning"); // vinyl now spinning
      $(this)
        .removeClass("ion-ios7-play")
        .addClass("ion-ios7-pause"); // change play btn to pause btn

      audioPlayer = new Audio(track.uri + "/stream?client_id=" + clientId); // Create audio object with stream url...
      audioPlayer.play(); // ...and play

      status = !status; // invert player status
    } else {
      $("#player").removeClass("open"); // Closing the player
      $("#record").removeClass("spinning"); // vinyl stopped spinning
      $(this)
        .removeClass("ion-ios7-pause")
        .addClass("ion-ios7-play"); // change pause btn to play btn

      audioPlayer.pause(); // Pause the player
      status = !status; // invert status
    }
  });
});