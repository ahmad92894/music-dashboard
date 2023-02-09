function Artist(name, id){
    this.name = name,
    this.id = id
}

//Artist object that holds the artist name and their shazam ID, we can add more info if needed
function ArtistWithAvatar(name, id, avatar){
    this.name = name,
    this.id = id;
    this.avatar = avatar
}
//Song object that holds song name, artist object and song id (can add more info if we want)
function Song(name, artist, id, link){
    this.name = name,
    this.artist = artist,
    this.id = id;
    this.link = link;
}
//Album object that holds album name, artist, a url to the coverart, and album id
//coverart url needs desired dimensions as parameter otherwise it will not work
function Album(name, artist, coverArtUrl, id){
    this.name = name,
    this.artist = artist,
    this.coverArtUrl = coverArtUrl;
    this.id = id;
}
function AlbumWithSongs(album, songs){
    this.album = album,
    this.songs = songs
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
		'X-RapidAPI-Key': 'b4ec89dc57mshfd788e7303adbe9p130446jsn75e937b16068',
		'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
	}
};

//local storage variables
var usrPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
var usrAlbums = JSON.parse(localStorage.getItem('usrAlbums')) || [];
var usrSongs = JSON.parse(localStorage.getItem('usrSongs')) || [];
var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
// var lastSeachResults = JSON.parse(localStorage.getItem('lastSearchResult')) || [];
// var lastArtist = JSON.parse(localStorage.getItem('lastArtist')) || [];
// var lastAlbum = JSON.parse(localStorage.getItem('lastAlbum')) || [];
// var lastSearchStr = localStorage.getItem('lastSearchStr') || '';

function genericSearch(searchTerm){ //this fetch call returns a list of top songs and top artists that closely match a given search string
    console.log("Called Server!!!!!!!!");
    fetch('https://shazam.p.rapidapi.com/search?term=' + searchTerm + '&locale=en-US&offset=0&limit=10', options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){


            console.log(data);
         console.log(data.tracks.hits[0].track.url);


            var topSongs = data.tracks.hits;
           
            var userSongList=[];
            //console.log(userSongList)

            for(var i = 0; i < topSongs.length; i++){
                var songName = topSongs[i].track.title;             //song title
                var songId = topSongs[i].track.key;                 //song id
                var songLink = topSongs[i].track.url;
                var artist = new Artist(topSongs[i].track.subtitle, topSongs[i].track.artists[0].adamid)
                                        //artist                    //artist id
                var song = new Song(songName, artist, songId, songLink);
                userSongList.push(song);
            }
            var userArtistList=[];

            var topArtists = data.artists.hits;
            for(var i = 0; i < topArtists.length; i++){
                var artistAvatar = topArtists[i].artist.avatar;
                var artist = new ArtistWithAvatar(topArtists[i].artist.name, topArtists[i].artist.adamid, artistAvatar);
                userArtistList.push(artist);
            }
            console.log(data);
            console.log(data.tracks.hits[0].track.url);
            localStorage.setItem('lastSearchResult', JSON.stringify([userSongList, userArtistList]));
            printTopResults(userSongList, userArtistList);

      
        })
}

function artistSearch(artistId){ //this fetch targets a specific artist given the artists ID
    console.log("Called Server!!!!!!!!");
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
            var id = albumsObj[album].id;
            var undefinedCover = albumsObj[album].attributes.artwork.url;
            undefinedCover = undefinedCover.replace('{w}', 225);
            coverArtUrl = undefinedCover.replace('{h}', 225);
            var newAlbum = new Album(albumName, artist, coverArtUrl, id);
            myAlbumList.push(newAlbum);
        }
        localStorage.setItem('lastArtist', JSON.stringify(myAlbumList));
        printArtistAlbums(myAlbumList);
    })
}

function albumSearch(albumId){ //this fetch targets a specific album given the albums specific ID
    console.log("Called Server!!!!!!!!");
    fetch('https://shazam.p.rapidapi.com/albums/get-details?id=' + albumId + '&l=en-US', options)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        //store data
        var albumSongs = [];
        var songArray = data.data[0].relationships.tracks.data;
        var artistAvatar = songArray[0].attributes.avatar;
        var albumArtist = new Artist(songArray[0].attributes.artistName, data.data[0].relationships.artists.data[0].id, artistAvatar);
        for(var i = 0; i < songArray.length; i++){
            var songName = songArray[i].attributes.name;
            var songId = songArray[i].id;
            var songLink = songArray[i].url;
            var song = new Song(songName, albumArtist, songId, songLink);
            albumSongs.push(song);
        }
        var undefinedCover = data.data[0].attributes.artwork.url;
        undefinedCover = undefinedCover.replace('{w}', 500);
        coverArtUrl = undefinedCover.replace('{h}', 500);
        var albumName = data.data[0].attributes.name;
        var album = new Album(albumName, albumArtist, coverArtUrl, albumId);
        var completeAlbum = new AlbumWithSongs(album, albumSongs);
        localStorage.setItem('lastAlbum', JSON.stringify(completeAlbum));
        printAlbumSongs(completeAlbum);
    })
}

$('#submit-btn').on('click', function(event){
    event.preventDefault();
    var usrInput = $('#generic-search').val();
    usrInput = usrInput.trim();
    var found = false;
    for(var i = 0; i < searchHistory.length; i++){
        if(searchHistory[i] === usrInput){
            found = true;
        }
    }
    if(!found){
        searchHistory.push(usrInput);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
    if(localStorage.getItem('lastSearchStr') === usrInput){
        printTopResults(JSON.parse(localStorage.getItem('lastSearchResult'))[0], JSON.parse(localStorage.getItem('lastSearchResult'))[1]);
    } else {
        localStorage.setItem('lastSearchStr', usrInput)
        if(usrInput.includes(' ')){
            usrInput = usrInput.replaceAll(' ', '%20'); // "kiss%20the%20rain"
        }        
        //will get the usr search into propper format, still need to implement a check that user didnt hit space twice in between words
        genericSearch(usrInput);
    }
});

$('#search-results').on('click', '.artist-link', function(event){
    var artistId = $(event.target).attr('data-artist');
    var lastArtist = JSON.parse(localStorage.getItem('lastArtist'));
    if(lastArtist){
        if(artistId === lastArtist[0].artist.id){
            printArtistAlbums(lastArtist);
        } else {
            artistSearch(artistId);
        }
    } else {
        artistSearch(artistId);
    }
});
    
$('#search-results').on('click', '.album-link', function(event){
    var albumId = $(event.target).attr('data-album');
    var lastAlbum = JSON.parse(localStorage.getItem('lastAlbum'));
    if(lastAlbum){
        if(albumId === lastAlbum.album.id){
            printAlbumSongs(lastAlbum);
        } else {
            albumSearch(albumId);
        }
    } else{
        albumSearch(albumId);
    }
});

$('#go-to-concerts').on('click', function(){
    window.location.replace('./bandintownindex.html');
})

$('#go-to-profile').on('click', function(){
    window.location.replace('./profile.html');
})

$('#search-results').on('click', '#backToAlbums', function(event){
    printArtistAlbums(JSON.parse(localStorage.getItem('lastArtist')));
})

$('#search-results').on('click', '#backToSearchResult', function(event){
    printTopResults(JSON.parse(localStorage.getItem('lastSearchResult'))[0], JSON.parse(localStorage.getItem('lastSearchResult'))[1]);
})

$("#generic-search").autocomplete({
    source: searchHistory
});

$('#search-results').on('click', '.songOptions', function(event){
    $(event.target).menu();
});

$('#search-results').on('click', '.likeSong', function(event){
    var songId = $(event.target).attr('data-song');
    console.log(songId);
    var found = false;
    var likedSong
    var songList1 = JSON.parse(localStorage.getItem('lastAlbum')).songs;
    var songList2 = JSON.parse(localStorage.getItem('lastSearchResult'))[0];
    for(var i = 0; i < songList1.length; i++){
        if(songId === songList1[i].id){
            found = true;
            likedSong = songList1[i];
        }
    }
    if(!found){
        for(var i = 0; i < songList2.length; i++){
            if(songId === songList2[i].id){
                found = true;
                likedSong = songList2[i];
            }
        }
    }
    usrSongs.push(likedSong);
    localStorage.setItem('userSongs', JSON.stringify(usrSongs));
});

$('#search-results').on('click', '.addSongToPlaylist', function(event){

});

// $('#search-results').on('click', '.likeAlbum', function(event){
    
// });


function printTopResults(userSongList, userArtistList){
    $('#search-results').empty();
    var topResults = $('<div>');
    topResults.attr('class', 'row');
    topResults.attr('id', 'row');
    $('#search-results').append(topResults);
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
    searchNav2.append(navWrapper2);
                    
    searchHeaderContainer2.append(searchNav2);
    $("#row").append(searchHeaderContainer2);

                    //search history list stems
        
    let divSearchColumns=$("<div>");
    divSearchColumns.addClass("col s6");
    let ulSearchHistory=$("<ul>");
    ulSearchHistory.addClass("collection");
    
    for (let i = 0; i < userSongList.length; i++) {
        
        let listenButtonLink=userSongList[i].link;
        console.log(listenButtonLink);
            
        let liSearchHistory=$("<li>");
        liSearchHistory.addClass("collection-item avatar");
        liSearchHistory.text(userSongList[i].name + " " + "-" + " ");
        var artistLink = $('<span>');
        artistLink.attr('class', 'artist-link');
        artistLink.attr('data-artist', userSongList[i].artist.id);
        artistLink.text(userSongList[i].artist.name);
        liSearchHistory.append(artistLink);
        //     let icon=$("<i>");
        //     icon.addClass("small material-icons circle #80cbc4 teal lighten-2");
        //     icon.text("headset");
        //     liSearchHistory.append(icon);
        let listenButton=$("<a>");
        listenButton.attr("href", listenButtonLink);
        listenButton.attr("target","_blank");
        listenButton.addClass("waves-effect waves-light circle btn-small #80cbc4 teal lighten-2");
        let listenIcon=$("<i>");
        listenIcon.addClass("material-icons");
        listenIcon.attr("id", "listen-icons");
        listenIcon.text("headset");
        //     icon.text("headset");
        listenButton.append(listenIcon);
        liSearchHistory.append(listenButton);
        ulSearchHistory.append(liSearchHistory);
        divSearchColumns.append(ulSearchHistory);
        $("#row").append(divSearchColumns)
    }
        
    let divArtistColumns=$("<div>");
    divArtistColumns.addClass("col s6");
    let ulArtistHistory=$("<ul>");
    ulArtistHistory.addClass("collection");
    
    for (let i = 0; i < userArtistList.length; i++) {
        
        let artistIcon=userArtistList[i].avatar;
        let artistIconImg=$("<img>");
        artistIconImg.attr("src", artistIcon);
        artistIconImg.attr('class', 'artist-avatar');
        
        let liArtistHistory=$("<li>");
        liArtistHistory.addClass("collection-item avatar artist-link");
        liArtistHistory.attr('data-artist', userArtistList[i].id);
        liArtistHistory.text(userArtistList[i].name);
        let icon=$("<i>");
        icon.addClass("small material-icons circle #80cbc4 teal lighten-3");
        icon.text("headset");

        liArtistHistory.append(icon);
        liArtistHistory.append(artistIconImg);
        ulArtistHistory.append(liArtistHistory);
        divArtistColumns.append(ulArtistHistory);
        $("#row").append(divArtistColumns);

        
        
    }
}

function printArtistAlbums(myAlbumList){
    $('#search-results').empty();
    var backToSearch = $('<button>');
    backToSearch.attr('id', 'backToSearchResult');
    backToSearch.attr('class', 'btn waves-effect waves-light');
    backToSearch.attr('type', 'submit');
    backToSearch.attr('name', 'action');
    backToSearch.text('Back To Search Results');
    var btnIcon = $('<i>');
    btnIcon.attr('class', 'material-icons left');
    btnIcon.text('arrow_back');
    backToSearch.append(btnIcon);
    $('#search-results').append(backToSearch);

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
        albumImg.append(imgEl, ablumTitle);
        var cardContent = $('<div>');
        cardContent.attr('class', 'card-content');
        var artistEl = $('<p>');
        artistEl.text(myAlbumList[i].artist.name);
        var albumLink = $('<a>');
        albumLink.attr('class', 'btn-floating waves-effect waves-light red right');
        var icon = $('<i>');
        icon.attr('class', 'material-icons album-link');
        icon.attr('data-album', myAlbumList[i].id);
        icon.text('send');
        albumLink.append(icon);
        artistEl.append(albumLink);
        cardContent.append(artistEl);
        albumCard.append(albumImg, cardContent);
        albumSize.append(albumCard);
        albumRow.append(albumSize);
    }
    resultContainer.append(albumRow);
    $('#search-results').append(resultContainer);
}

function printAlbumSongs(albumWithSongs){
    $('#search-results').empty();
    var backToAlbums = $('<button>');
    backToAlbums.attr('id', 'backToAlbums')
    backToAlbums.attr('class', 'btn waves-effect waves-light');
    backToAlbums.attr('type', 'submit');
    backToAlbums.attr('name', 'action');
    backToAlbums.text('Back To Albums');
    var btnIcon = $('<i>');
    btnIcon.attr('class', 'material-icons left');
    btnIcon.text('arrow_back');
    backToAlbums.append(btnIcon);
    $('#search-results').append(backToAlbums);

    var albumHeader = $('<div>');
    albumHeader.attr('class', 'container');
    albumHeader.attr('id', 'album-header');

    var albumImg = $('<img>');
    albumImg.attr('src', albumWithSongs.album.coverArtUrl);
    albumHeader.append(albumImg);

    var albumHeaderInfo = $('<div>');
    albumHeaderInfo.attr('id', 'album-header-info')
    var albumName = $('<h2>');
    albumName.text(albumWithSongs.album.name);
    var albumArtist = $('<h4>');
    albumArtist.text(albumWithSongs.album.artist.name);
    albumHeaderInfo.append(albumName, albumArtist);
    albumHeader.append(albumImg, albumHeaderInfo);
    $('#search-results').append(albumHeader);

    var songsContainer = $('<div>');
    songsContainer.attr('class', 'container');
    for(var i = 0; i < albumWithSongs.songs.length; i++){
        var songRow = $('<div>');
        songRow.attr('class', 'row');
        var rowSize = $('<div>');
        rowSize.attr('class', 'col s12');
        var infoList = $('<ul>');
        infoList.attr('class', 'collection')
        var songInfo = $('<li>');
        songInfo.attr('class', 'collection-item avatar');
        var icon = $('<i>');
        icon.attr('class', 'material-icons circle teal lighten-3')
        icon.text('headset');
        var songTitle = $('<span>');
        songTitle.attr('class', 'title');
        songTitle.text(albumWithSongs.songs[i].name);
//songOptions Btn------------------------------

        var likeSong = createSongOptions(albumWithSongs.songs[i].id);

//---------------------------------------


        var subTitle = $('<p>');
        subTitle.text(albumWithSongs.songs[i].artist.name);
        var newLine = $('<br>');
        subTitle.append(newLine);
        songInfo.append(icon, songTitle, likeSong, subTitle);
        infoList.append(songInfo);
        rowSize.append(infoList);
        songRow.append(rowSize);
        songsContainer.append(songRow);
    }
    $('#search-results').append(songsContainer);
}

function createSongOptions(songId) {
    var dropdownList = $('<ul>');
    dropdownList.attr('class', 'dropdown-trigger btn right songOptions');
    dropdownList.text('...');

    var listElOne = $('<li>');
    var likeSong = $('<div>');
    likeSong.attr('data-song', songId);
    likeSong.attr('class', 'likeSong')
    likeSong.text('Like Song');
    listElOne.append(likeSong);
    dropdownList.append(listElOne);

    var ListElTwo = $('<li>');
    var addTo = $('<div>');
    addTo.attr('data-song', songId);
    addTo.attr('class', 'ui-state-disabled addToPlaylist')
    addTo.text('Add To Playlist');
    ListElTwo.append(addTo);
    dropdownList.append(ListElTwo);

    var listElTest = $('<ul>');

    var playList1 = $('<li>');
    var playListName = $('<div>');
    playListName.attr('data-song', songId);
    playListName.attr('class', 'ui-state-disabled addToPlaylist')
    playListName.text('Playlist 1');
    listElTest.append(playList1);

    var playList2 = $('<li>');
    var playListName2 = $('<div>');
    playListName2.attr('data-song', songId);
    playListName2.attr('class', 'ui-state-disabled addToPlaylist')
    playListName2.text('Playlist 2');
    listElTest.append(playList2);

    var playList3 = $('<li>');
    var playListName3 = $('<div>');
    playListName3.attr('data-song', songId);
    playListName3.attr('class', 'ui-state-disabled addToPlaylist')
    playListName3.text('Playlist 3');
    listElTest.append(playList3);

    dropdownList.append(listElTest);
    return dropdownList;
}