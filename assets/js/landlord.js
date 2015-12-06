function parseData(data){
  // var json_data = jQuery.parseJSON(data);
  domUpdateLandlord(data);
}

function domUpdateLandlord(json_data){
  if(json_data.length === 0){
    $('#result-container h6').text("No results found")
  }else{
    $.each(json_data, function(idx, contact){
      appendTable(contact);
    });
  }
}

function appendTable(contact){
  var string = "<table class='table table-striped'><thead></thead><tbody><tr><td id='registrationcontacttype'>Type</td><td id='result_registrationcontacttype'>"+ contact['registrationcontacttype'] + "</td></tr><tr><td id='contactdescription'>Description</td><td id='result_contactdescription'>"+ contact['contactdescription'] + "</td></tr><tr><td id='title'>Title</td><td id='result_title'>" + contact['title'] + "</td></tr><tr><td id='name'>Name</td><td id='result_name'>" + contact['firstname'] +' '+  contact['lastname'] +"</td></tr></tbody></table><br>";
  $('#contact-result-tables').append(string);
}