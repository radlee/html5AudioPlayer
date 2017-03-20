var audio;

//Hide Pause button

$('#pause').hide();


//Initialize Audio
initAudio($('#playlist li:first-child'));

//Initializer Funtion
function initAudio(element){
  var song = element.attr('song');
  var title = element.text();
  var cover = element.attr('cover');
  var artist = element.attr('artist');


  //Create an Audio Object

  audio = new Audio('sound/' + song );


  if(!audio.currentTime){
    $('#duration').html('0:00');
  }

  $('#audio-player .title').text(title);
  $('#audio-player .artist').text(artist);

  //Insert Cover Image

  $('img.cover').attr('src', 'img/' + cover);

  $('#playlist li').removeClass('active');
  element.addClass('active');
}

//Play when Selected from Playlist

$('#playlist li').click(function(){
  audio.play();
  element.addClass('active');
  $('#play').hide();
  $('#pause').show();
  $('#duration').fadeIn(400);
  showDuration();
})

//Play button

$('#play').click(function(){
  audio.play();
  $('#play').hide();
  $('#pause').show();
  $('#duration').fadeIn(400);
  showDuration();
})

// Pause Button
$('#pause').click(function(){
  audio.pause();
  $('#pause').hide();
  $('#play').show();
})

// Stop Button
$('#stop').click(function(){
  audio.pause();
  audio.currentTime = 0;
  $('#pause').hide();
  $('#play').show();
  $('#duration').fadeOut(400);
})

// Next Button
$('#next').click(function(){
  audio.pause();
  $('#play').hide();
  $('#pause').show();
  var next = $('#playlist li.active').next();
  if(next.length == 0){
    next = $('#playlist li:first-child');
  }
  initAudio(next);
  audio.play();
  showDuration();
})

// Prev Button
$('#prev').click(function(){
  audio.pause();
  var prev = $('#playlist li.active').prev();
  if(prev.length == 0){
    prev = $('#playlist li:last-child');
  }
  initAudio(prev);
  audio.play();
  showDuration();
})

//Volume Slider
$('#volume').change(function(){
  audio.volume = parseFloat(this.value / 10);
})


//Time duration
function showDuration(){
  $(audio).bind('timeupdate', function(){
    //Get Hours and Minutes
    var s = parseInt(audio.currentTime % 60);
    var m = parseInt((audio.currentTime) / 60) % 60;
    //Add 0 if less than 10

    if(s < 10){
      s = '0' + s;
    }
    $('#duration').html(m + ':' + s);
    var value = 0;
    if(audio.currentTime > 0){
      value = Math.floor((80 / audio.duration) * audio.currentTime);
      if(value === 80 ){
        $('#pause').hide();
        $('#play').show();
      }
    }
    $('#progress').css('width',value +'%');
  });
}
