$('#go-to-search').on('click', function(){
    window.location.replace('./index.html')
})

var tableBody = document.getElementById('api-table');
var fetchButton = document.getElementById('fetch-button');
    
fetchButton.addEventListener('click', function(event){
    var userZip = document.getElementById('zip-search').value;
    var userSearch = document.getElementById('artist-search').value;
    var artistId ///=null
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
            console.log(data.recommendations)
            var eventArray = data.recommendations;
        
        
        let tableHeadEl=$("<thead>");
        let tableRowEl=$("<tr>");
        let tableHeader1=$("<th>");
            tableHeader1.text("Artist")
            tableHeader1.attr("id", "table-header-1" )
        let tableHeader2=$("<th>");
            tableHeader2.text("Venue");
            tableHeader2.attr("id", "table-header-2")
        let tableHeader3=$("<th>");
            tableHeader3.text("Local Time");
            tableHeader3.attr("id", "table-header-3")
        // let tableRow1=$("<tr>");
        // let tableRow2=$("<tr>");
        // let tableRow3=$("<tr>");
        let tableBody=$("<tbody>");
     
      
        tableRowEl.append(tableHeader1);
        tableRowEl.append(tableHeader2);
        tableRowEl.append(tableHeader3);
        tableHeadEl.append(tableRowEl);

        $("#table").append(tableHeadEl);
        //$("#table").append(tableBody);

        // tableBody.append(tableRow1);
        // tableBody.append(tableRow2);
        // tableBody.append(tableRow3);
        

            for(var i= 0; i < eventArray.length;i++){
                //console.log(eventArray[index].event); //event
                var nameOfEvent = eventArray[i].event.title //event.title
                var nameOfVenue = eventArray[i].event.venue.name 
                var localStartTime = eventArray[i].event.datetime_local
                var timeFormatted = dayjs(localStartTime).format('h:mmA ddd, MMM D, YYYY')

            
        // let tdRowContainer=$("<div>");
        //     tdRowContainer.attr("class", "row");
            let tableRow=$("<tr>");

            let eventName = $("<td>");
            let eventVenue = $("<td>");
            let eventTime = $("<td>");

            eventName.text(nameOfEvent);
            eventVenue.text(nameOfVenue);
            eventTime.text(timeFormatted);
            
            tableRow.append(eventName, eventVenue, eventTime);
            
            tableBody.append(tableRow);
            // let tdContainer1=$("<div>");
            // tdContainer1.attr("class", "col");
            // let tableDataArtist=$("<td>");
            // tableDataArtist.text(nameOfEvent);
            // console.log(tableDataArtist);
                
            // tdContainer1.append(tableDataArtist);
            // tableRow1.append(tdContainer1)
            // tableBody.append(tableRow1);
            // $("#table").append(tableBody);
            
            // let tdContainer2=$("<div>");
            // tdContainer2.attr("class", "col push-s6");
        
            // let tableDataVenue=$("<td>")
            // tableDataVenue.text(nameOfVenue);
            // console.log(tableDataVenue);
    
            // tdContainer2.append(tableDataVenue);
            // tableRow2.append(tdContainer2)
            // tableBody.append(tableRow2);
            // $("#table").append(tableBody);

            // let tdContainer3=$("<div>");
            // tdContainer3.attr("class", "col");
            // let tableDataTime=$("<td>")
            // tableDataTime.text(localStartTime);
            // console.log(tableDataTime);
    
            // tdContainer3.append(tableDataTime);
            // tableRow3.append(tdContainer3)
            // tableBody.append(tableRow3);
            // $("#table").append(tableBody);
            
           

            
            // tableRow1.append(tableDataArtist);
            // tableBody.append(tableRow1);
            // $("#table").append(tableBody);

        
            // var listItem = document.createElement('li');
            // listItem.textContent = nameOfEvent + " at the " + nameOfVenue + " starting at " + timeFormatted + " local time";
            // tableBody.appendChild(listItem);

            }
            $("#table").append(tableBody);
            
            //add code here to get the right information from variable data
            
            
            
        })
    })
    
});
