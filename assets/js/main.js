(function() {

  
$(document).ready(function () {
    $.extend($.fn.bootstrapTable.defaults,
             $.fn.bootstrapTable.locales['en-US']);

    summaryTemplate = Handlebars.compile($('#summaryTemplate').text());
    graphTemplate = Handlebars.compile($('#graphTemplate').text());
    rawDataTemplate = Handlebars.compile($('#rawDataTemplate').text());
    alertTemplate = Handlebars.compile($('#alertTemplate').text());

    //var query = querystring.parse(window.location.search.substr(1));

    $('#bbl-form').on('submit', function (evt) {
      evt.preventDefault();
    });

    var autocomplete = new google.maps.places.Autocomplete($('#location')[0]);
    autocomplete.setTypes(['address']);
    autocomplete.setBounds(new google.maps.LatLngBounds(
      new google.maps.LatLng(40.49,-74.27),
      new google.maps.LatLng(40.87,-73.68)
    ));
    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();


        //history.pushState(null, null, window.location.pathname + '?' +
        //                  $.param({borough: borough,
        //                          street: street,
        //                          houseNumber: houseNumber }));
      parseGoogle(place)
        .then(getBBL)
        .then(getTaxData)
        .then(function (data) {
          showRawData(data);
          showGraphs(data);
          showSummary(data);
        })
        .fail(showError);
    });

    //if (query.houseNumber && query.borough && query.street) {
    //  $('#bbl-form').submit();
    //}
  });
})();
