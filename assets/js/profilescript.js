$('#go-to-search').on('click', function(){
    window.location.replace('./index.html')
})

var usrSongs = JSON.parse(localStorage.getItem('userSongs'));

for(var i = 0; i < usrSongs.length; i++) {
    //console.log(usrSongs[i]);
    console.log(usrSongs[i].name + " by " + usrSongs[i].artist.name);
}