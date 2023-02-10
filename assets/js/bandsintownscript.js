$('#go-to-search').on('click', function(){
    window.location.replace('./index.html')
})



// let navEl=$("<nav>");
// let navWrapperDiv=$("<div>");
//     navWrapperDiv.addClass("nav-wrapper");
// let formEl=$("<form>");
// let inputDiv=$("<div>");
//     inputDiv.addClass("input-field");
// let searchBar=$("<input>");
//     searchBar.attr("id", "search");
//     searchBar.attr("type", "search");
//     searchBar.attr("placeholder", "Search Here!")
//     searchBar.attr("required", true);
// let labelEl=$("<label>");
//     labelEl.addClass("label-icon");
//     labelEl.attr("for", "search");
// let anchorEl=$("<a>");
//     anchorEl.addClass("waves-effect waves-light btn-large")
//     anchorEl.attr("id", "search-button");
//     anchorEl.text("Search")
// let iconEl=$("<i>");
//     iconEl.addClass("material-icons");
//     iconEl.text("search");
// let iconEl2=$("<i>");
//     iconEl2.addClass("material-icons");
//     iconEl2.text("close");

// labelEl.append(iconEl);
// labelEl.append(iconEl2);
// labelEl.append(anchorEl);
// inputDiv.append(labelEl);
// inputDiv.append(searchBar);
// formEl.append(inputDiv);
// navWrapperDiv.append(formEl);
// navEl.append(navWrapperDiv);
// $("#search-bar-1").append(navEl);

// $('#search-button').on("click", function(event) {
//     event.preventDefault();
//     let userInput=$("#search").val();
//     console.log(userInput);
// }
// )

// 
var tableBody = document.getElementById('api-table');
var fetchButton = document.getElementById('fetch-button');

var URL=("https://api.seatgeek.com/2/events?client_id=MzE4NDUyNTh8MTY3NTk2OTYzMS4wMDM2NTg4&client_secret=4fc93e4026f14705f22aa198d72446ccf014abbb3eed9e0e859909fc50868d0b")




let postalURL = 'https://api.seatgeek.com/2/venues?postal_code= + userZipSearch'

// artistSearchButton.on("click", function (){

fetch(URL)
    .then(function(response){return response.json()})
	.then(function(data){
        
        console.log(data);

        for (var i = 0; i < data.length; i++) {
        // let events=data

        let userArtistSearch=userArtistText.val;
console.log(userArtistSearch);
        
           
        }
    });

let artistSearchButton=$("#artist-button");
let zipSearchButton=$("#zip-button");
let artistSearchText=$("#artist-search");
let zipSearchText=$("#zip-search");

artistSearchButton.on("click", function() {




let artistSearchInput=artistSearchText.val;
console.log(artistSearchInput);



var userZip = 60201;
var userSearch = "hank mobley"; //taylor-swift
var artistId
userSearch = userSearch.trim();
userSearch = userSearch.replace(' ', '-')


fetch('https://api.seatgeek.com/2/performers?slug=' + userSearch + '&client_id=MzE4NDUyNTh8MTY3NTk2OTYzMS4wMDM2NTg4&client_secret=4fc93e4026f14705f22aa198d72446ccf014abbb3eed9e0e859909fc50868d0b')
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);
    artistId = data.performers[0].id;

    console.log(artistId);
    
    fetch('https://api.seatgeek.com/2/recommendations?performers.id=' + artistId + '&postal_code=' + userZip + '&client_id=MzE4NDUyNTh8MTY3NTk2OTYzMS4wMDM2NTg4')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);

    
    

    let recommendations=data.recommendations[0].event.title;
    console.log(recommendations);

    for (let i = 0; i < recommendations.length; i++) {
        
        let recContainerDiv=$("<div>");
        recContainerDiv.attr("id", "something");
        let pEl=$("<p>");
        pEl.text="something";
        recContainerDiv.append(pEl);


    }
})
   
    




            //add code here to get the right information from variable data



    })
})


