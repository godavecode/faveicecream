//When document loads we create 10 buttons with ice cream flavors.

$( document ).ready(function() {
    
    var iceFlavors = ["strawberry", "choclate", "vanilla", "cake", "cheesecake", "choclate chip", "fudge", "snickers", 
    "coconut", "rocky road"];
    
    //Creates the buttons at the top of the page
    function createButtons() {
        //Clears the div buttonPlace so that it can reload all of the array
        $('#iceButtons').empty();
        for (var i=0; i < iceFlavors.length; i++){
            var r= $('<button class="iceButton" >');            
            r.html(iceFlavors[i])
            $("#iceButtons").append(r);
        }
    };
    
    //createButtons();
      
    $('body').on('click', '.iceButton', onClickIceButtons);
    //What happens when you click on the ice cream flavors buttons.
    // Gets the value from iceButton that was clicked.
    function onClickIceButtons() {
        var iceGiphy = $(this).html();
        console.log(iceGiphy + " working");
        
            
        //Configures the URL needed to access the correct Giphy JSON
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + iceGiphy + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Clears the gifs already present 
        $('#iceDiv').empty();
        
        // Ajax call to get the information from the Giphy JSON
        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
            //Stores the data instead of meta for easier access to the right portion of the JSON
            var results = response.data;

            //Iterates through the results
            for (var i = 0; i < results.length; i++) {
                //Creates a div for each gif in the results
                var gifDiv = $('<div class="gif">')

            //Capitalizes the rating and sets it to N/A if there is no rating
                var rating = results[i].rating.toUpperCase();
                if(rating == "") {
                      rating = "N/A";
                }

            //Creates the visual of the rating and gifs, including the animate and still images
                var ratingText = $('<p>').text("Rating: " + rating);
                var iceImage = $('<img src=' + results[i].images.fixed_height_still.url + ' data-still=' +
                    results[i].images.fixed_height_still.url + ' data-animate=' +
                    results[i].images.fixed_height.url + ' data-state="still" class="iceImage">');

              //Appends the visuals to gifDiv
               gifDiv.append(ratingText);
               gifDiv.append(iceImage);

              //Appends each gif to iceDiv
              $('#iceDiv').append(gifDiv);
            }  
        });
    }
        
        // On Click search it will add a new button to the array.
    
        //function addNewFlavor() {
        $('#runSearch').on('click', function() {
        
            //Gets value of what the user entered.
            var searchText = $("#iceCreamSearch").val();
            //Adds it to the array of ice cream flavors
            iceFlavors.push(searchText);
            console.log(iceFlavors);
            //Recreates the buttons
            createButtons();
            
            //Clears searchbox
            $("#iceCreamSearch").val("");
            
            //Returns false so it does not continue to another page
            return false;
        })
        //}
        
        //Runs the imageMove function if the images are clicked
        $(document).on('click', '.iceImage', giphyMove);
        //Function to make still and animate giphy image; make a variable named state and then reference the button's data-state into it. 
        function giphyMove() {
            
            //Sets state to be the data in state for the images
            var state = $(this).attr('data-state'); 
            console.log(state);
            
            //  if variable state is equal to 'still' then 
            //  update the src attribute of this image that you clicked on to what data-animate is equal to for this image
            //  and update the data-state attribute to 'animate'
            //  if state does not equal 'still' then 
            //  update the src attribute of this image that you clicked on to what data-still is equal to for this image
            //  and update the data-state attribute to 'still'
        
            //Enables the user to click the images to have them pause or move.
            if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }
            else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
        } 
            
    //Sets up the buttons and form when the page loads
    createButtons();
    addNewFlavor();
    giphyMove();
});

    
    