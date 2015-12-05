(function() {
  var summaryTemplate, graphTemplate, rawDataTemplate, alertTemplate;

  //10.31.105.59:8080

  function getLandlord(bbl){
    var url = '10.31.105.59:8080';

    return $.ajax({
      url: url,
      dataType: 'json'
    }).then(function(res){
      var landlordInfo = res;
      console.log('landlord info', res);
      return landlordInfo;
    }).fail(function(err){
      console.log('Failed to get landlord info with: ', err);
    })
  };

  function getContacts(address, borough){
    var url = 'hpd-elephantbird.rhcloud.com/address/';

    return $.ajax({
      url: url + borough + '/' + address;
      dataType: 'json'
    }).then(function(res){
      var contacts = res;
      return contacts;
    }).fail(function(err){
      console.log('Failed to get contacts with: ', err)
    })
  };

  function getBBL(data) {
    console.log(data);
    var url = 'https://who.owns.nyc/geoclient/address.json?borough='+data.borough+'&street='+data.street+'&houseNumber='+data.houseNumber;
    return $.ajax({
      url: url,
      dataType: 'json'
    }).then(function(addressData){
      var result = addressData.address;
      return result;
    })
  }

function getTaxData(data) {
    var borough = data.borough,
        block = data.block,
        lot = data.lot,
        taxUrl = '/' + borough + '/' + block + '/' + lot + '/data.json';
    return $.ajax({
      url: taxUrl,
      dataType: 'json'
    }).then(function (table) {
      return {
        borough: borough,
        block: block,
        lot: lot,
        table: table,
        url: taxUrl
      };
    }, function () {
      return "Sorry, I wasn't able to find tax data for that address (" +
        'BBL ' + borough + block + lot + ').';
    });
  }

function parseGoogle(place, borough) {
    console.log("in parseGoogle");
    var $dfd = new $.Deferred();

    // console.log(place.address_components);

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

    $dfd.resolve({
      houseNumber: houseNumber,
      street: street,
      borough: borough
    });
    return $dfd.promise();
  }

$(document).ready(function () {

    var place;

    $('#lookup-form').on('submit', function (evt) {
      evt.preventDefault();
      var borough = $('#sel1').val();

      parseGoogle(place, borough)
        .then(getBBL)
        .then(function(data) {
          console.log('tax data', data);
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
      place = autocomplete.getPlace();
    });


  });
})();
