// DOM
var context = document.querySelector('.music-container');
var controls = document.querySelector('.controls');
var cover = document.querySelector('.cover');
var artwork = document.getElementById('artwork_left');
var artwork2 = document.getElementById('artwork_right');
var artista = document.getElementById('track');
//CONST
var CLIENTID = 'lUtO5cvqsVPAe5jGxye32pL23HwiqNma';
var trackid = "386427926"
// VARS
var audioPlayer;


// Init Soundcloud Widget
SC.initialize({
	client_id: CLIENTID
});
let trackid2;
//var url = 'https://soundcloud.com/user-683568472/zat-datura';
var url2 = 'https://soundcloud.com/umboniamusic/sets/va-001';
SC.resolve(url2).then(function(result){
   console.log(result.id);
	console.log(result);
	this.trackid2= result;
});


//SC.get('/tracks/'+trackid+'/').then(function(trackid){
	SC.get('/tracks/'+trackid2+'/').then(function(trackid){
  // Injecting infos
  artwork.src=trackid.artwork_url.replace('-large', '-crop');
  artwork2.src=trackid.artwork_url.replace('-large', '-crop');
  document.getElementById('track').innerHTML = trackid.title
  console.log(trackid.title)
});

SC.stream('tracks/386427926').then(function(player) {
	audioPlayer = player;
  //console.log(player);
	init();
});

function toggleHover() {
	context.classList.toggle('is-hovering');
}

// FN
function handleControlsClick(e) {
	var trgt = e.target;
	if (trgt.nodeName !== 'LABEL' && !audioPlayer) {
		return;
	}

	switch (trgt.className) {
		case 'lbl-btn-play':
			audioPlayer.play();
      console.log("play")
			break;
		case 'lbl-btn-pause':
			audioPlayer.pause();
      console.log("pause");
			break;
		/*case 'lbl-btn-reset':
			audioPlayer.seek(0);
			audioPlayer.play();
			break;*/
     case 'lbl-btn-next':
			audioPlayer.pause();
			break;
		default:
			return false;
	}
}

function init() {
	context.classList.add('is-hovering');

	setTimeout(function() {
		controls.querySelector('input#btn-play')/*.checked = true*/;
		audioPlayer.play();
	}, 1000);
	setTimeout(function() {
		context.classList.remove('is-hovering');
	}, 4000);

	controls.addEventListener('click', handleControlsClick);

	if (Modernizr.touch) {
		context.addEventListener('click', toggleHover);
	}
}

$('.lbl-btn-share').on('click', function(){
  $(this).toggleClass('scale');
  $('div#hide').removeAttr('id');
  $('.active').toggleClass('open');
});