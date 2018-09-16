var fruit = [''];
var currentGif; var pausedGif; var animatedGif; var stillGif;

//creates buttons
function createButtons(){
	$('#fruitdiv').empty();
	for(var i = 0; i < fruit.length; i++){
		var fruitBtn = $('<button>').text(fruitdiv[i]).addClass('fruitBtn').attr({'data-name': fruitdiv[i]});
		$('#FruitButton').append(showBtn);
	}

	//displays gifs on click
	$('.fruitBtn').on('click', function(){
		$('.display').empty();

    $("button").on("click", function() {
    var fruit = $(this).attr("data-fruit");
		var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + fruit + "&api_key=11sIyDJJvHhuDRQcPU5acLQq0mPjhdRw&limit=10";
        
        $.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;
				
				if(thisRating == ''){
					thisRating = 'unrated';
				}
				var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
				stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}


$(document).on('mouseover','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('animated'));
 });
 $(document).on('mouseleave','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('paused'));
 });


$('#addFruit').on('click', function(){
	var newFruit = $('#newFruitInput').val().trim();
	fruitdiv.push(newFruit);
	createButtons();
	return false;
});

createButtons();