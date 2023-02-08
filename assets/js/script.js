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
            console.log(data);
            var topSongs = data.tracks.hits;
            for(var i = 0; i < topSongs.length; i++){
                var songName = topSongs[i].track.title;             //song title
                var songId = topSongs[i].track.key;                 //song id
                var artist = new Artist(topSongs[i].track.subtitle, topSongs[i].track.artists[0].adamid)
                                        //artist                    //artist id
                var song = new Song(songName, artist, songId);
                console.log(song);
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
                // JC edits
    let searchHeaderContainer1=$("<div>");
        searchHeaderContainer1.attr("class", "col s6")
                            
    let navWrapper1 = $("<div>");
        navWrapper1.attr("class", "nav-wrapper")
                                        
    let searchBarLink1 = $('<a>');
        searchBarLink1.attr('class','brand-logo center');
        searchBarLink1.text('Songs');
                            
        navWrapper1.append(searchBarLink1);
    let searchNav1 = $("<nav>");
        searchNav1.append(navWrapper1)
                            
        searchHeaderContainer1.append(searchNav1);
        $("#row").append(searchHeaderContainer1);


    let searchHeaderContainer2=$("<div>");
        searchHeaderContainer2.attr("class", "col s6")
                    
    let navWrapper2 = $("<div>");
        navWrapper2.attr("class", "nav-wrapper")
                                
    let searchBarLink2 = $('<a>');
        searchBarLink2.attr('class','brand-logo center');
        searchBarLink2.text('Artists');
                    
        navWrapper2.append(searchBarLink2);
    let searchNav2 = $("<nav>");
        searchNav2.append(navWrapper2)
                    
        searchHeaderContainer2.append(searchNav2);
        $("#row").append(searchHeaderContainer2);

                //search history list istems

    let ulSearchHistory=$("<ul>");
        ulSearchHistory.addClass("collection");

    for (let i = 0; i < ulSearchHistory.length; i++) {
       
    let liSearchHistory=$("<li>");
        liSearchHistory.addClass("collection-item avatar");
        liSearchHistory.text('something');
    // let starIcon=$("<i>")
        // starIcon.addClass("material-icons circle #80cbc4 teal lighten-3")
        // starIcon.text(headset);
        // starIcon.append(liSearchHistory);
        ulSearchHistory.append(liSearchHistory);
        $("#search-history-container").append(ulSearchHistory)

    };
  

        })
}

function artistSearch(artistId){ //this fetch targets a specific artist given the artists ID
    fetch('https://shazam.p.rapidapi.com/artists/get-summary?id=' + artistId + '&l=en-US', options)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        //retrieve data
        var myAlbumList = [];
        var albumsObj = data.resources.albums;
        for(var album in albumsObj){
            var albumName = albumsObj[album].attributes.name;
            var artist = new Artist(albumsObj[album].attributes.artistName, artistId);
            var isSingle = albumsObj[album].attributes.isSingle;
            var id = albumsObj[album].id;
            var undefinedCover = albumsObj[album].attributes.artwork.url;
            undefinedCover = undefinedCover.replace('{w}', 225);
            coverArtUrl = undefinedCover.replace('{h}', 225);
            var newAlbum = new Album(albumName, artist, isSingle, coverArtUrl, id);
            myAlbumList.push(newAlbum);
        }
        //DOM manipulation
        $('#search-results').empty();
        var headerRow = $('<div>');
        headerRow.attr('class', 'row');
        var artistHeader = $('<div>');
        artistHeader.attr('class', 'col s12');
        var navBar = $('<nav>');
        var navWrap = $('<div>');
        navWrap.attr('class', 'nav-wrapper');
        var artistName = $('<a>');
        artistName.attr('class', 'brand-logo center');
        artistName.attr('href', '#');
        artistName.text(myAlbumList[0].artist.name);
        navWrap.append(artistName);
        navBar.append(navWrap);
        artistHeader.append(navBar);
        headerRow.append(artistHeader);
        $('#search-results').append(headerRow);
        var resultContainer = $('<div>');
        resultContainer.attr('class', 'container');
        resultContainer.css('display: flex; justify-content: space-between');
        var albumRow = $('<div>');
        albumRow.attr('class', 'row');
        for(var i = 0; i < myAlbumList.length; i++){
            var albumSize = $('<div>');
            albumSize.attr('class', 'col s12 m5 l3');
            var albumCard = $('<div>');
            albumCard.attr('class', 'card');
            var albumImg = $('<div>');
            albumImg.attr('class', 'card-img');
            var imgEl = $('<img>');
            imgEl.attr('src', myAlbumList[i].coverArtUrl);
            imgEl.attr('class', 'album-img');
            var ablumTitle = $('<span>');
            ablumTitle.attr('class', 'card-title album-title');
            ablumTitle.text(myAlbumList[i].name);
            var albumLink = $('<a>');
            albumLink.attr('class', 'btn-floating halfway-fab waves-effect waves-light red');
            var icon = $('<i>');
            icon.attr('class', 'material-icons album-link');
            icon.attr('data-album', myAlbumList[i].id);
            icon.text('send');
            albumLink.append(icon);
            albumImg.append(imgEl, ablumTitle, albumLink);
            var cardContent = $('<div>');
            cardContent.attr('class', 'card-content');
            var artistEl = $('<p>');
            artistEl.text(myAlbumList[i].artist.name);
            cardContent.append(artistEl);
            albumCard.append(albumImg, cardContent);
            albumSize.append(albumCard);
            albumRow.append(albumSize);
        }
        resultContainer.append(albumRow);
        $('#search-results').append(resultContainer);
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

            let searchHeaderContainer=document.createElement("p");
            searchHeaderContainer.textContent=("something")

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

$('#go-to-concerts').on('click', function(){
    window.location.replace('./bandintownindex.html')
})

$('#go-to-profile').on('click', function(){
    window.location.replace('./profile.html')
})



// function clearMain(){

// }

