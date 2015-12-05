var data = '{"corporationname":"SILVERSHORE PROPERTIES 74 LLC","id":55783,"buildingcount":61,"uniqnames":["SILVERSHORE PROPERTIES 79 LLC","SILVERSHORE PROPERTIES 34, LLC","SILVERSHORE PROPERTIES 71 LLC","SILVERSHORE PROPERTIES 64 LLC","SILVERSHORE PROEPRTIES 58 LLC","SILVERSHORE PROPERTIES 85 LLC","SILVERSHORE PROPERTIES 21 LLC","SILVERSHORE PROPERTIES 70 LLC","SILVERSHORE PROPERTIES 56 LLC","SILVERSHORE PROPERTIES 53 LLC","SILVERSHORE PROPERTIES 81 LLC","SILVERSHORE PROPERTIES 61 LLC","SILVERSHORE PROPERTIES 8 LLC","SILVERSHORE PROPERTIES 36 LLC","SILVERSTONE PROPERTIES 41 LLC","SILVERSHORE PROPERTIES 39 LLC","SILVERSHORE PROPERTIES 45 LLC","SILVERSHORE PROPERTIES 22 LLC","SILVERSHORE PROPERTIES 88 LLC","SILVERSHORE PROPERTIES 35,LLC","BK 63 LLC","5416-5422 4TH AVENUE LLC","SILVERSHORE PROPERTIES 32, LLC","SILVERSHORE PROPERTIES 90 LLC","SILVERSHORE PROPERTIES 11 LLC","SILVERSHORE PROPERTIES 33, LLC","SILVERSHORE PROPERTIES 50 LLC","SILVERSHORE PROPERTIES 74 LLC","SILVERSHORE PROPERTIES 16 LLC","SILVERSHORE PROPERTIES 60 LLC","SILVERSHORE PROPERTIES 80 LLC","SILVERSHORE PROPERTIES 1 LLC","SILVERSHORE PROPERTIES 65 LLC","SILVERSHORE PROPERTIES 87 LLC","SILVERSHORE PROPERTIES 37, LLC","SILVERSHORE PROPERTIES 69 LLC","SILVERSHORE PROPERTIES 89 LLC","SILVERSHORE PROPERTIES 28, LLC","SILVERSHORE PROPERTIES 73 LLC","SILVERSHORE PROPERTIES 75 LLC","SILVERSHORE PROPERTIES 76 LLC","283 ALBANY LLC","SILVERSHORE PROPERTIES 77 LLC","SILVERSHORE PROPERTIES 17 LLC","SILVERSHORE PROPERTIES 10 LLC","SILVERSHORE PROPERTIES 57 LLC","SILVERSHORE PROPERTIES 9 LLC","SILVERSHORE PROPERTIES 23 LLC","SILVERSHORE PROPERTIES 52 LLC","SILVERSHORE PROPERTIES 44 LLC","SILVERSHORE PROPERTIES 14 LLC","SILVERSHORE PROPERTIES 83 LLC","SILVERSHORE PROPERTIES 54","SILVERSHORE PROPERTIES 86 LLC"],"businesshousenumber":"38","businessstreetname":"EAST 29 STREET","businesszip":"10016","regid":360433,"status":"ok"}'

function parseData(){
  var json_data = jQuery.parseJSON(data);
  domUpdateLandlord(json_data);
}

function domUpdateLandlord(json_data){
  if(json_data.length === 0){
  	$("#results-container").slideDown("slow");
    $('#result-container h6').text("No results found")
  }else{
    $("#result_deed_owner").text(json_data['corporationname']);
    $("#result_deed_holder_address").text(json_data["businesshousenumber"] + " " +
      json_data["businessstreetname"] + ", " +
      json_data["businesszip"] );
    $("#results-container").slideDown("slow");
    // $('#result-container h6').text("Results found for address")
    // $("#result_bbl_number").text(json_data['corporationname']);
    // $("#result_address").text(json_data['corporationname']);
  }
}


