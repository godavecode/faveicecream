//When document loads we create 10 buttons with ice cream flavors.

$( document ).ready(function() {
    
    var iceFlavors = ["strawberry", "choclate", "vanilla", "cake", "cheesecake", "choclate chip", "fudge", "snickers", 
    "coconut", "rocky road"];
    $(function createButtons() {
        for (var i=0; i < iceFlavors.length; i++){
            var r= $('<button type="button" >');            
            r.html(iceFlavors[i])
            $("#iceButtons").append(r);
            
        }
    });
});

function iceCreamSearch()
    {
        $("#iceCreamSearch").val("");
    }
		
// On Click button associated with the Search Button we add a new button
//ice cream flavor.
$('#runSearch').on('click', function(){
	    
    var searchText = $("#iceCreamSearch").val();
    var newFlavor= $('<button type="button">');            
    newFlavor.html(searchText)
    //iceFlavors.push(newFlavor);
            
    $("#iceButtons").append(newFlavor);
    $("#iceCreamSearch").empty();
        
        
    iceCreamSearch();
    return false;
      
        
});
	
	
	
	
	
    