(function() {
  var summaryTemplate, graphTemplate, rawDataTemplate, alertTemplate;

  function getLandlord(bbl){
    var url = 'hpd-elephantbird.rhcloud.com/contacts/';
    // var bbl = '3012720008';

    return $.ajax({
      url: url + bbl,
      crossDomain: true,
      dataType: 'json'
    }).then(function(res){
      var landlordInfo = res;
      // landlordData.registrationId = landlordInfo.registrationid;
      return landlordInfo;
    }).fail(function(err){
      console.log('Failed to get landlord info with: ', err);
    })
  };

  // function getContacts(data){
  //   var url = 'hpd-elephantbird.rhcloud.com/address/';

  //   return $.ajax({
  //     url: url + data.borough + '/' + data.address,
  //     dataType: 'json'
  //   }).then(function(res){
  //     var contacts = res;
  //     return contacts;
  //   }).fail(function(err){
  //     console.log('Failed to get contacts with: ', err)
  //   })
  // };

  function getBBL(data) {
    var url = 'https://who.owns.nyc/geoclient/address.json?borough='+data.borough+'&street='+data.street+'&houseNumber='+data.houseNumber;
    return $.ajax({
      url: url,
      crossDomain: true,
      dataType: 'json'
    }).then(function(addressData){
      var result = addressData.address;
      console.log(result.bbl);
      return result.bbl;
    })
  }

// function getTaxData(data) {
//     var borough = data.borough,
//         block = data.block,
//         lot = data.lot,
//         taxUrl = '/' + borough + '/' + block + '/' + lot + '/data.json';
//     return $.ajax({
//       url: taxUrl,
//       dataType: 'json'
//     }).then(function (table) {
//       return {
//         borough: borough,
//         block: block,
//         lot: lot,
//         table: table,
//         url: taxUrl
//       };
//     }, function () {
//       return "Sorry, I wasn't able to find tax data for that address (" +
//         'BBL ' + borough + block + lot + ').';
//     });
//   }

function parseGoogle(place, borough) {
    console.log("in parseGoogle");
    var $dfd = new $.Deferred();

    if (!place.address_components) {
      return $dfd.reject("Sorry, I can't work with that address");
    }

    // if (!place.address_components[0].types.contains('street_number')) {
    //   return $dfd.reject("Double-check this address, I can't find it");
    // }

    var houseNumber = place.address_components[0].short_name,
        street = place.address_components[1].short_name;

    if (!borough) {
      return $dfd.reject("Unknown borough");
    }


    console.log("house num:" + houseNumber);
    console.log("street: " + street);
    console.log("borough: " + borough);
    console.log("borough: " + place.address_components[0]);

    $dfd.resolve({
      houseNumber: houseNumber,
      street: street,
      borough: borough,
      address: place
    });
    return $dfd.promise();
  }

$(document).ready(function () {

    var landlordData = {
      borough: '',
    };

    $("#results-container").css("display", "none");

    $('#lookup-form').on('submit', function (evt) {
      evt.preventDefault();
      landlordData.borough = $('#borough-select').val();

      console.log(landlordData);
      parseGoogle(landlordData.address, landlordData.borough)
        // .then(getContacts)
        .then(getBBL)
        .then(getLandlord)
        .then(function(data) {
          parseData(data);
          $("#results-container").slideDown("slow");

        })
        .fail(function(){
          console.log('Lookup failed');
        });

    });

    var autocomplete = new google.maps.places.Autocomplete($('#address_lookup')[0]);
    autocomplete.setTypes(['address']);
    autocomplete.setBounds(new google.maps.LatLngBounds(
      new google.maps.LatLng(40.49,-74.27),
      new google.maps.LatLng(40.87,-73.68)
    ));

    autocomplete.addListener('place_changed', function() {
      landlordData.address = autocomplete.getPlace();
    });


  });
})();