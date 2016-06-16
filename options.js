$.get("carsdb.jtracker", function(string) {
    console.log('string: '+string);
    var jsonPretty = JSON.stringify(JSON.parse(string),null,2);  
    console.log(jsonPretty);
   
    var status = document.getElementById('status');
    status.textContent = jsonPretty;
});

