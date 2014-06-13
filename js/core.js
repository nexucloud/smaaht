$(document).ready(function() {

// Modal
$('.btn-add').on('click', function(){
	$('.modal-box').fadeIn();
});

$('.form-close').on('click', function(){
	closeModal();
});

function closeModal(){
	$('.modal-box').fadeOut({speed: 'fast'});
}


// Tags Controller
  $('#tags input').on('focusout',function(){    
    var txt= this.value.replace(/[^a-zA-Z0-9\ \+\-\.\#]/g,''); // allowed characters
    if ((txt) && (txt != '')) {
      $(this).before('<li class="tag">'+ txt +'</li>');
    }
    this.value="";
  }).on('keyup',function( e ){
    // if: comma,enter (delimit more keyCodes with | pipe)
    if(/(188|13)/.test(e.which)) $(this).focusout(); 

  });
  
  
  $('#tags').on('click','.tag',function(){
     //if(confirm("Really delete this tag?")) 
     $(this).remove(); 
  });

  // Form Data
  function getFormData(listingType){

  	//Extract all the text from tags and separate them by comma.
  	var category = $('#tags li').map(function(){ 
		  return $(this).text(); 
		}).get().join(',');

  	return { 
	  	'businessName' : $('#txtBusinessName').val(),
		'address': $('#txtAddress').val(),
		'city': $('#txtCity').val(),
		'state': $('#selState').val(),
		'phone': $('#txtPhone').val(),
		'website': $('#txtPhone').val(),
		'email': $('#txtWebsite').val(),
		'category': category,
		'listingType': listingType 
	}
  }

  // Ajax Post Free Listing
  $('#btnFree').on('click', function(){

  	$.ajax({
  		type: 'POST',
  		url: 'api/index.php',
  		data: getFormData('free'), //Add as free

  		success: function (data) {
  			//alert(data);
  		}
  	 })
  	.done(function(data) {

		// log data to the console so we can see
		console.log(data); 

		// here we will handle errors and validation messages
	});

	// stop the form from submitting the normal way and refreshing the page
	event.preventDefault();
	closeModal();
  	;
  });

  // Ajax Post Premium Listing
  $('#btnPremium').on('click',function(){

	$.ajax({
  		type: 'POST',
  		url: 'api/index.php',
  		data: getFormData('premium'), //Add as premium

  		success: function (data) {
  			//alert(data);
  		}
  	 })
  	.done(function(data) {

		// log data to the console so we can see
		console.log(data); 

		// here we will handle errors and validation messages
	});

	// stop the form from submitting the normal way and refreshing the page
	event.preventDefault();
	closeModal();
  	;
  });
});