$('#go-to-search').on('click', function(){
    window.location.replace('./index.html')
})

var usrSongs = JSON.parse(localStorage.getItem('userSongs')) || [];
var codeBlock = $('#liked-songs');

for(var i = 0; i < usrSongs.length; i++) {
    var songString = usrSongs[i].name + " by " + usrSongs[i].artist.name;
    var addSong = $('<span>');
    addSong.text(songString);
    codeBlock.append(addSong);
    var newline = $('<hr>')
    codeBlock.append(newline)
}

var usrArtists = JSON.parse(localStorage.getItem('topArtists')) || [];
var codeBlock2 = $('#top-Artists');

for(var i = 0; i < usrArtists.length; i++) {
    var artistStr = i+1 + ". " + usrArtists[i].artist.name;
    var addArtist = $('<span>');
    addArtist.text(artistStr);
    codeBlock2.append(addArtist);
    var newline = $('<hr>');
    codeBlock2.append(newline)
}


var usrAlbum = JSON.parse(localStorage.getItem('userAlbums')) || [];
var codeBlock3 = $('#top-Album');

for(var i = 0; i < usrAlbum.length; i++) {
    var albumStr = i+1 + ". " + usrAlbum[i].album.name;
    var addAlbum = $('<span>');
    addAlbum.text(albumStr);
    codeBlock3.append(addAlbum);
    var newline = $('<hr>');
    codeBlock3.append(newline)
}



