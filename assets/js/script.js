    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '301970d4b6msh2fa749238695abep1923b8jsnc41e808e6e6f',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };
    
    // "kiss%20the%20rain"

var searchTerm = "greenday";

// fetch('https://shazam.p.rapidapi.com/search?term=' + searchTerm + '&locale=en-US&offset=0&limit=5', options)
//     .then(response => response.json())
//     //.then(response => console.log(response))
//     .catch(err => console.error(err));


// //get small amount of detail based on artist ID
// fetch('https://shazam.p.rapidapi.com/artists/get-details?id=954266&l=en-US', options)
// 	.then(response => response.json())
// 	//.then(response => console.log(response))
// 	.catch(err => console.error(err));


// //get a lot of detail based on artist ID
// fetch('https://shazam.p.rapidapi.com/artists/get-summary?id=954266&l=en-US', options)
// 	.then(response => response.json())
// 	//.then(response => console.log(response))
// 	.catch(err => console.error(err));


// //get album by ID
// fetch('https://shazam.p.rapidapi.com/albums/get-details?id=207192731&l=en-US', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


    //data.relationships.tracks.data[index].attributes.name => gets album name