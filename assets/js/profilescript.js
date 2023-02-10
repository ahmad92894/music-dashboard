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





//     // code for album below
// $('#go-to-search').on('click', function(){
//         window.location.replace('./index.html')
//     })
    
//     var usrAlbum = JSON.parse(localStorage.getItem('userAlbum'));
//     var codeBlock = $('#liked-album');
    
//     for(var i = 0; i < usrAlbum.length; i++) {
//         //console.log(usrSongs[i]);
//         var albumString = usrAlbum[i].name + " by " + usrAlbum[i].artist.name;
//         var addSong = $('<span>');
//         addSong.text(songString);
//         codeBlock.append(addSong);
//         var newline = $('<hr>')
//         codeBlock.append(newline)

// // code for favorite artist below
// $('#go-to-search').on('click', function(){
//             window.location.replace('./index.html')
//         })
        
//         var usrfaveArtist = JSON.parse(localStorage.getItem('userfaveArtist'));
//         var codeBlock = $('#liked-artist');
        
//         for(var i = 0; i < usrSongs.length; i++) {
//             //console.log(usrSongs[i]);
//             var songString = usrSongs[i].name + " by " + usrSongs[i].artist.name;
//             var addSong = $('<span>');
//             addSong.text(songString);
//             codeBlock.append(addSong);
//             var newline = $('<hr>')
//             codeBlock.append(newline)

// // code for playlist
        
        
    