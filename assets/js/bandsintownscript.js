$('#go-to-search').on('click', function(){
    window.location.replace('./index.html')
})

let url="https://api.seatgeek.com/2/events?client_id=MzE4NDUyNTh8MTY3NTk2OTYzMS4wMDM2NTg4&client_secret=4fc93e4026f14705f22aa198d72446ccf014abbb3eed9e0e859909fc50868d0b"


fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    //   console.log(data)

    let eventType=data.events;
//    console.log(eventType);

    let eventArray=[]
    ////console.log(eventArray)

    for (let i = 0; i < data.events.length; i++) {
       let eventTypes=data.events[i].type;
    //    console.log(eventTypes);
        // console.log(eventTypes);
        eventArray.push(eventTypes);

        if(eventArray[i]==="concert") {
            //console.log("concert")
        } else {
            //console.log('not concert')
        }

        
        
}})

var tableBody = document.getElementById('api-table');
var fetchButton = document.getElementById('fetch-button');
var Url=("https://api.seatgeek.com/2/events?client_id=MzE4NDUyNTh8MTY3NTk2OTYzMS4wMDM2NTg4&client_secret=4fc93e4026f14705f22aa198d72446ccf014abbb3eed9e0e859909fc50868d0b")
var url2=("https://api.seatgeek.com/2/events?client_id=MzE4NDUyNTh8MTY3NTk2OTYzMS4wMDM2NTg4&client_secret=4fc93e4026f14705f22aa198d72446ccf014abbb3eed9e0e859909fc50868d0b")
function getApi(){
// document.addEventListener("click",getApi)
fetch(url2)
    .then(function(response){return response.json()})
	.then(function(data){
        for (var i = 0; i < data.length; i++) {
            var listItem = document.createElement('li');
            listItem.textContent = data[i].html_url;
            tableBody.appendChild(listItem);
            //console.log(data[i])
        }
    });}




  
    
        
    
fetchButton.addEventListener('click', getApi);



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
    artistId = data.performers[0].id;
    
    fetch('https://api.seatgeek.com/2/recommendations?performers.id=' + artistId + '&postal_code=' + userZip + '&client_id=MzE4NDUyNTh8MTY3NTk2OTYzMS4wMDM2NTg4')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);


            //add code here to get the right information from variable data



    })
})


