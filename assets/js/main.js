(function() {
  var summaryTemplate, graphTemplate, rawDataTemplate, alertTemplate;

  function getBBL(data) {
    return $.ajax({
      url: 'https://who.owns.nyc/geoclient/address.json?' + $.param({
        borough: data.borough, street: data.street, houseNumber: data.houseNumber
      }),
      dataType: 'json'
    }).then(function (addressData) {
      var data = addressData.address;
      if (data.message || data.message2) {
        return new $.Deferred().reject(data.message || data.message2);
      } else {
        data.borough = data.bblBoroughCode;
        data.block = data.bblTaxBlock;
        data.lot = data.bblTaxLot;
        return data;
      }
    }, function () {
      return 'Sorry, geocoding seems to not be working right now. ' +
          'Please try later.';
    });
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

function parseGoogle(place) {
    var $dfd = new $.Deferred();

    if (!place.address_components) {
      return $dfd.reject("Sorry, I can't work with that address");
    }
    if (!place.address_components[0].types.contains('street_number')) {
      return $dfd.reject("Double-check this address, I can't find it");
    }
    var houseNumber = place.address_components[0].short_name,
        street = place.address_components[1].short_name,
        borough;

    for (var i = 0; i < place.address_components.length; i += 1) {
      var county = place.address_components[i].long_name;
      if (county.match(/county$/i)) {
        borough = county2borough(county);
      }
      if (borough) {
        break;
      }
    }

    if (!borough) {
      return $dfd.reject("Unknown borough");
    }

    $dfd.resolve({
      houseNumber: houseNumber,
      street: street,
      borough: borough
    });
    return $dfd.promise();
  }

$(document).ready(function () {

    $('#lookup-form').on('submit', function (evt) {
      evt.preventDefault();
    });

    var autocomplete = new google.maps.places.Autocomplete($('#address_lookup')[0]);
    autocomplete.setTypes(['address']);
    autocomplete.setBounds(new google.maps.LatLngBounds(
      new google.maps.LatLng(40.49,-74.27),
      new google.maps.LatLng(40.87,-73.68)
    ));
    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();

      parseGoogle(place)
        .then(getBBL)
        .then(getTaxData)
        .then(function (data) {
          console.log(data);
        })
        .fail(showError);
    });


  });
})();
