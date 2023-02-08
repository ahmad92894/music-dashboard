//Artist object that holds the artist name and their shazam ID, we can add more info if needed
function Artist(name, id){
    this.name = name,
    this.id = id;
}
//Song object that holds song name, artist object and song id (can add more info if we want)
function Song(name, artist, id){
    this.name = name,
    this.artist = artist,
    this.id = id;
}
//Album object that holds album name, artist, a url to the coverart, and album id
//coverart url needs desired dimensions as parameter otherwise it will not work
function Album(name, artist, isSingle, coverArtUrl, id){
    this.name = name,
    this.artist = artist,
    this.isSingle = isSingle,
    this.coverArtUrl = coverArtUrl;
    this.id = id;
}
//user created playlist that has a name and an Array of Songs
function Playlist(name, songs) {
    this.name = name, 
    this.songs = songs;
}
//user object that holds an array of playlist objects, an array of album objects, and an array of song objects
function User(playlists, albums, songs) {
    this.playlists = playlists,
    this.albums = albums, 
    this.songs = songs;
}

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '301970d4b6msh2fa749238695abep1923b8jsnc41e808e6e6f',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
};

function genericSearch(searchTerm){ //this fetch call returns a list of top songs and top artists that closely match a given search string
    fetch('https://shazam.p.rapidapi.com/search?term=' + searchTerm + '&locale=en-US&offset=0&limit=10', options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
            var topSongs = data.tracks.hits;
            for(var i = 0; i < topSongs.length; i++){
                var songName = topSongs[i].track.title;
                var songId = topSongs[i].track.key;
                var artist = new Artist(topSongs[i].track.subtitle, topSongs[i].track.artists[0].adamid)
                var song = new Song(songName, artist, songId);
                var newSong = $('<li>');
                newSong.attr('data-song', song.id);
                newSong.text(song.name + ' by ' + song.artist.name);
                $('#search-results').append(newSong);
            }
            var topArtists = data.artists.hits;
            for(var i = 0; i < topArtists.length; i++){
                var artist = new Artist(topArtists[i].artist.name, topArtists[i].artist.adamid);
                var newArtist = $('<h4>');
                newArtist.attr('data-artist', artist.id);
                newArtist.attr('class', 'artist-link');
                newArtist.text(artist.name);
                $('#search-results').append(newArtist);
                $('#search-results').append($('<br>'));
            }
        })
}

function artistSearch(artistId){ //this fetch targets a specific artist given the artists ID
    fetch('https://shazam.p.rapidapi.com/artists/get-summary?id=' + artistId + '&l=en-US', options)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        var albumsObj = data.resources.albums;
        for(var album in albumsObj){
            var albumName = albumsObj[album].attributes.name;
            var artist = new Artist(albumsObj[album].attributes.artistName, artistId);
            var isSingle = albumsObj[album].attributes.isSingle;
            var id = albumsObj[album].id;
            var undefinedCover = albumsObj[album].attributes.artwork.url;
            undefinedCover = undefinedCover.replace('{w}', albumsObj[album].attributes.artwork.width);
            coverArtUrl = undefinedCover.replace('{h}', albumsObj[album].attributes.artwork.height);
            var newAlbum = new Album(albumName, artist, isSingle, coverArtUrl, id);
            var newAlbumEl = $('<h3>');
            newAlbumEl.attr('data-album', newAlbum.id);
            newAlbumEl.attr('class', 'album-link');
            newAlbumEl.text(newAlbum.name + " by " + newAlbum.artist.name);
            $('#search-results').append(newAlbumEl);
            $('#search-results').append($('<br>'));
        }
    })
}

function albumSearch(albumId){ //this fetch targets a specific album given the albums specific ID
    fetch('https://shazam.p.rapidapi.com/albums/get-details?id=' + albumId + '&l=en-US', options)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        var songArray = data.data[0].relationships.tracks.data;
        for(var i = 0; i < songArray.length; i++){
            var songName = songArray[i].attributes.name;
            var songId = songArray[i].id;
            var artist = new Artist(songArray[i].attributes.artistName, data.data[0].relationships.artists.data[0].id);
            var song = new Song(songName, artist, songId);
            var newSong = $('<li>');
            newSong.attr('data-song', song.id);
            newSong.text(song.name);
            $('#search-results').append(newSong);
        }
    })
}

$('#submit-btn').on('click', function(event){
    event.preventDefault();
    var usrInput = $('#generic-serch').val();
    usrInput = usrInput.trim();
    if(usrInput.includes(' ')){
        usrInput = usrInput.replaceAll(' ', '%20'); // "kiss%20the%20rain"
    }
    //will get the usr search into propper format, still needs to check that user didnt hit space twice in between words
    genericSearch(usrInput);
});

$('#search-results').on('click', '.artist-link', function(event){
    var artistId = $(event.target).attr('data-artist');
    artistSearch(artistId);
});

$('#search-results').on('click', '.album-link', function(event){
    var albumId = $(event.target).attr('data-album');
    albumSearch(albumId)
})