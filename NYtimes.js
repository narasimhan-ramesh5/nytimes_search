var authKey = "0fe8d0d0f9e6462e953cfa7a09612bcc";

// user's inputs via HTML
var queryTerm 	= "";
var numResults 	= 0;
var startYear 	= 0;
var endYear		= 0;


var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";

// Array to hold articles
var articleCounter = 0;

function runQuery(numArticles, queryURL){

	
	$.ajax({url: queryURL, method: "GET"}) 
		.done(function(NYTData) {
            console.log("------------------------------------")
			console.log("URL: " + queryURL);
			console.log("------------------------------------")
            console.log(NYTData);
            console.log("------------------------------------")
            
            for (var i=0; i<numArticles; i++) {

                articleCounter++;

                // Create the HTML Well (Section) and Add the Article content for each
                var wellSection = $("<div>");
                wellSection.addClass('well');
                wellSection.attr('id', 'articleWell-' + articleCounter)
                $('#wellSection').append(wellSection);

                if( NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original"))
					{
						$("#articleWell-"+ articleCounter).append('<h5>' + NYTData.response.docs[i].byline.original + "</h5>");

						}

					// 
					$("#articleWell-"+ articleCounter).append('<h5>Section: ' + NYTData.response.docs[i].section_name + "</h5>");
					$("#articleWell-"+ articleCounter).append('<h5>' + NYTData.response.docs[i].pub_date + "</h5>");
					$("#articleWell-"+ articleCounter).append("<a href='" + NYTData.response.docs[i].web_url + "'>" + NYTData.response.docs[i].web_url + "</a>");

					}
		});

}
	
	// On Click button associated with the Search Button
	$('#runSearch').on('click', function(){

		// Initially sets the articleCounter to 0
		articleCounter = 0;

		// Empties the region associated with the articles
		$("#wellSection").empty();

		// Search Term
		var searchTerm = $('#searchTerm').val().trim();
		queryURL = queryURLBase + searchTerm;

		// Num Results
		numResults = $("#numRecordsSelect").val();

		// Start Year
		startYear = $('#startYear').val().trim();

		// End Year
		endYear = $('#endYear').val().trim();

		// If the user provides a startYear -- the startYear will be included in the queryURL
		if (parseInt(startYear)) {
			queryURL = queryURL + "&begin_date=" + startYear + "0101";
		}

		// If the user provides a startYear -- the endYear will be included in the queryURL
		if (parseInt(endYear)) {
			queryURL = queryURL + "&end_date=" + endYear + "0101";
		}

		// Then we will pass the final queryURL and the number of results to include to the runQuery function
		runQuery(numResults, queryURL);

		// This line allows us to take advantage of the HTML "submit" property. This way we can hit enter on the keyboard and it registers the search (in addition to clicks).
		return false;
	});	

// This button clears the top articles section
$('#clearAll').on('click', function(){
	articleCounter = 0;
	$("#wellSection").empty();
})

