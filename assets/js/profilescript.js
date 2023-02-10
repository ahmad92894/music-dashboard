$('#go-to-search').on('click', function(){
    window.location.replace('./index.html')
})

var usrSongs = JSON.parse(localStorage.getItem('userSongs')) || [];
var codeBlock = $('#liked-songs');

for(var i = 0; i < usrSongs.length; i++) {
    //console.log(usrSongs[i]);
    var songString = usrSongs[i].name + " by " + usrSongs[i].artist.name;
    var addSong = $('<span>');
    addSong.text(songString);
    codeBlock.append(addSong);
    var newline = $('<hr>')
    codeBlock.append(newline)
}