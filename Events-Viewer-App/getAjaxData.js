//global varible for saving id
var globalId;
//global array variable for the longitude and latiude
var lonlatArray;
//global variable for the latiude
var lat;
//global variable for the longitude 
var lon;

/* Function that gets all the ajax data from the database,
 is triggered on page loading,
 takes method, url, data, and callback as parameters */
let getEventsAjax = (method, url, data, callback) => {

    //Declare XHR object called request
    var request = new XMLHttpRequest();


    //If the data is an object set the header to json
    if (typeof testIfJson == "object") {
        //request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Content-Type', 'application/json');
    }

    //specify the php script to open and the type of method used
    request.open(method, url);

    //if the method is a post method, set the request header
    if (method == "POST") {
        //set the request header
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }

    //onload function
    request.onload = function () {
        //store the response text in the response variable
        var response = request.responseText;
        callback(response);
    }

    //send the data, empty if there is no data
    request.send(data);
}

/*Function that takes the id value of the list item as a parmater 
using it to make an id key value pair to post to the database
requesting items that match*/
function getListDetails(id_value) {

    //get all the buttons via dom
    var updateButton = document.getElementById('update_button');
    var weatherButton = document.getElementById('weather_button');
    var homeButton = document.getElementById('home_button');
    var updateInput = document.getElementById('updateInput');
    var fetchDiv = document.getElementById("weather_div");
    var clearButton = document.getElementById('clear_button');
    var saveButton = document.getElementById('send_updatedText');
    //hide the save clear and weather_div 
    saveButton.style.visibility = "hidden";
    clearButton.style.visibility = 'hidden';
    fetchDiv.style.visibility = 'hidden';
    updateInput.value = "";
    //hide the update input text area
    updateInput.style.visibility = "hidden";
    //show the home update and weather buttons
    homeButton.style.visibility = "visible";
    updateButton.style.visibility = "visible";
    weatherButton.style.visibility = "visible";
    //set the global varible to the id value passed in
    globalId = id_value;

    //send an ajax request with the id, for details

    //url variable storing php file name
    var url = "getAjaxDataDetails.php";
    var data = "id=" + id_value;
    //call the getEventsAjax function with the given parameters
    getEventsAjax("POST", url, data, processingDetailsData);


}
//make the update clear and save buttons visible
let updateNotes = () => {
    //get the update clear and save buttons
    var updateInput = document.getElementById('updateInput');
    var clearButton = document.getElementById('clear_button');
    var saveButton = document.getElementById('send_updatedText');
    //make them visible
    saveButton.style.visibility = "visible"
    clearButton.style.visibility = "visible";
    updateInput.style.visibility = "visible";
}
//Clear the textarea by setting its value to zero
let clearTextArea = () => {
    var textArea = document.getElementById('updateInput');
    textArea.value = "";
}

//Updates the database with the url given sending the data as a post request
let updateDatabase = () => {
    //assign the textarea tag to a local variable ang get its value
    let textToSend = document.getElementById('updateInput').value;
    // the url location
    var url = 'updateAjaxData.php';


    //send the request with the id and the notes to update
    let data = JSON.stringify({
        id: globalId,
        notes: textToSend
    });
    getEventsAjax("POST", url, data, getAllData);

}




//function that calls the getEventsAjax function repeatedly
let getAllData = () => {
    //get and hide the buttons for updating, checking the weather, and home. Hide the input textbox
    var updateInput = document.getElementById('updateInput');
    var updateButton = document.getElementById('update_button');
    var weatherButton = document.getElementById('weather_button');
    var homeButton = document.getElementById('home_button');
    var clearButton = document.getElementById('clear_button');
    var saveButton = document.getElementById('send_updatedText');
    var fetchDiv = document.getElementById("weather_div");
    var details = document.getElementById('details_section');
    details.style.display = "hiddden";
    fetchDiv.style.visibility = 'hidden';
    saveButton.style.visibility = "hidden"
    clearButton.style.visibility = "hidden";
    updateInput.style.visibility = "hidden";
    homeButton.style.visibility = "hidden";
    updateButton.style.visibility = "hidden";
    weatherButton.style.visibility = "hidden";

    //clear the div 
    var detailsDisplay = document.getElementById('details_section');
    detailsDisplay.innerHTML = "";
    //url variable storing php file name
    var url = "getAjaxData.php";
    //call the getEventsAjax function every second with the given parameters
    //setInterval(function() { getEventsAjax("GET", url, "", processingData) }, 20000)
    getEventsAjax("GET", url, "", processingData);
}


/*Processes the details data recieved from the request
creating paragraph elements with the data as its contents
displays this info to the page */
let processingDetailsData = (response) => {
    //get the div for displaying details
    var detailsDisplay = document.getElementById('details_section');

    //assign to the variable result our parsed json response
    let result = JSON.parse(response);

    //clear the div element and set is class
    detailsDisplay.innerHTML = "";
    var detailedEvents = document.createElement("div");
    detailedEvents.setAttribute('class', 'detailed_block');

    //create paragraph elements for name, category, month, time, cost, location, id, 
    //latlon and notes to hold the data. And set their id attributes
    var namePara = document.createElement("p");
    namePara.setAttribute('id', 'namePara');

    var categoryPara = document.createElement("p");
    categoryPara.setAttribute('id', 'categoryPara');

    var monthPara = document.createElement("p");
    monthPara.setAttribute('id', 'monthPara');

    var dayPara = document.createElement("p");
    dayPara.setAttribute('id', 'dayPara');

    var timePara = document.createElement("p");
    timePara.setAttribute('id', 'timePara');

    var costPara = document.createElement("p");
    costPara.setAttribute('id', 'costPara');

    var locationPara = document.createElement("p");
    locationPara.setAttribute('id', 'locationPara');

    var idPara = document.createElement("p");
    idPara.setAttribute('id', 'idPara');

    var lonlatPara = document.createElement("p");
    lonlatPara.setAttribute('id', 'lonlatPara');

    var notedPara = document.createElement("p");
    notedPara.setAttribute('id', 'notedPara');



    //loop through the result data 
    for (let i = 0; i < result.length; i++) {

        //add values from the result to their relevant variable
        //Then append the item to the html tag

        let name = result[i].name;
        namePara.innerText = "Event: " + name;
        detailedEvents.appendChild(namePara);

        let category = result[i].category;
        categoryPara.innerText = "Type: " + category;
        detailedEvents.appendChild(categoryPara);

        let month = result[i].month;
        let day = result[i].day;
        dayPara.innerText = "Date: " + day + " " + month;
        detailedEvents.appendChild(dayPara);


        let time = result[i].time;
        timePara.innerText = "Time: " + time;
        detailedEvents.appendChild(timePara);

        let cost = result[i].cost;
        costPara.innerText = "Cost: $" + cost;
        detailedEvents.appendChild(costPara);


        let location = result[i].location;
        locationPara.innerText = "Location: " + location;
        detailedEvents.appendChild(locationPara);

        let noted = result[i].notes;
        notedPara.innerText =  "Notes: " + noted;
        detailedEvents.appendChild(notedPara);

        let lonlat = result[i].lon_lat;
        //split lon and lat
        lonlatArray = lonlat.split(', ');
        //assign the lat and lon global variable from array
        lat = lonlatArray[0];
        lon = lonlatArray[1];
        console.log('lat:' + lat);
        console.log('lon:' + lon);
        detailedEvents.appendChild(lonlatPara);

    }
    //add the detailsDispaly the detailedEvents div
    detailsDisplay.appendChild(detailedEvents);
}


//function that processes the response data from the request to the db
let processingData = (response) => {
    //get the event_list div
    var eventsList = document.getElementById("events_list");

    //assign to the variable result our parsed json response
    let result = JSON.parse(response);

    //clear the div elements
    eventsList.innerHTML = "";
    //create a list
    var listedEvents = document.createElement("ul");

    //loop through the result data 
    for (let i = 0; i < result.length; i++) {
        //assign to local variables the relevant values from result
        let name = result[i].name;
        let id = result[i].id;
        
        //create a list item and set its onclick to a function called getListDetails with the id as a parameter
        var item1 = document.createElement("li");
        item1.innerText = name;
        item1.setAttribute("onclick", "getListDetails(" + id + ")");
        //add the lsit item to the list
        listedEvents.appendChild(item1);

    }
    //add the lsit to the listedEvents div
    eventsList.appendChild(listedEvents);
}


/*Send the url along with the lat and lon values via a fetch request to 
openweather api and set the callback to dispaly weather  */
let fetchWeather = () => {
    //Unhide the div in which the weather is dispalyed
    var fetchDiv = document.getElementById("weather_div");
    fetchDiv.style.visibility = 'visible';
    //set the url string with the lat and lon values added
    var url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units=metric&appid=17bf13b36fb53df3d96ad7bc8b68ec15';
    //make a fetch request, with the url and the method set to get, set displayWeather as the callback fucntion 
    fetch(url, 
          {method:"GET"}
    )
    .then(response=>response.json())
    .then(displayWeather);

}
/*Displays the weather from the api, getting the temperature, decription and image from the data sent back */
let displayWeather = (response) => {
    //get the weather div and clear its contents
    var weatherDiv = document.getElementById('weather_div');
    weatherDiv.innerHTML = "";
    
    //Create a header paragraph and set its id
    var header = document.createElement('p');
    header.setAttribute('id', 'weather_heading');
    //Create a  paragraph for teh data
    var para = document.createElement('p');

    //get the temaprature description and image id from the returned data and assign them to variables
    var tempCelcius = response.main.temp + "\u00B0C";
    var description = response.weather[0].description;
    var imageId = response.weather[0].icon;

    //creating an image with the weather icon as its source content
    var image = document.createElement('img');
    image.setAttribute('src', 'https://openweathermap.org/img/w/'+imageId+'.png');
    image.setAttribute('alt', 'An icon showing the current weather consitions');
    image.setAttribute('id', 'cloud_image');

    //setting header and paragraph text
    header.innerText = "Current Weather";
    para.innerText += tempCelcius + " " + description;

    //Appending the header paragraph and image to teh weather div
    weatherDiv.appendChild(header);
    weatherDiv.appendChild(para);
    weatherDiv.appendChild(image);
}
/*
let addToList = (response) =>{
    var weatherList = JSON.parse(response);
    var weatherDiv = document.getElementById('weather_div');
    for(i=0; i<weatherList.length; i++){
        weatherDiv.innerText += "sdfg" + weatherList[i];
    }
    
}
*/




