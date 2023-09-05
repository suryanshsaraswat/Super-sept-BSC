function checkPin() 
{
  $('#continue_button[name="button"]').removeAttr('disabled');
  $("#checkout_shipping_address_zip").parent().after().find("p").remove();
  
  var zipCode = $('#checkout_shipping_address_zip').val();
  //alert(zipCode);
  //console.log(zipCode);
  var zip = parseInt(zipCode);
  var allpg = cod = prepaid = 0;
  for (var i = 0; i < allpincodes.length; i++) {
    if (allpincodes[i] == zip)
    {
      allpg = 1;
      //alert("All Pin codes");
    }
  }
  if (!allpg) {
    for (var i = 0; i < prepaidpincodes.length; i++) {
      if (prepaidpincodes[i] == zip)
      {
        prepaid = 1;
        //alert("Prepaid Only");
        $("#checkout_shipping_address_zip").parent().after().find("p").remove();
        $('.content-box__row[data-select-gateway="59397275802"]').css("display", "none");
        $('.content-box__row[data-subfields-for-gateway="59397275802"]').css("display", "none");
        $("#checkout_shipping_address_zip").parent().after().append('<p id="pincode_message_custom" class="field__message field__message--error-custom">COD is not available for ' + zip + ' PIN Code</p>'); 
      }
    }
    if (!prepaid) {
      for (var i = 0; i < codpincodes.length; i++) {
        if (codpincodes[i] == zip)
        {
          cod = 1;
          //alert("COD Only");
        }
      }
    }
    
    $("#checkout_shipping_address_zip").parent().after().find("p").remove();
    $('#continue_button[name="button"]').removeAttr('disabled');
    
    if (!cod && !allpg && !prepaid) {      
      $('#pincode_message_custom').html('COD not available for ' + zip + ' PIN Code');
      $('#continue_button[name="button"]').prop('disabled', true);
      $("#checkout_shipping_address_zip").parent().after().append('<p id="pincode_message_custom" class="field__message field__message--error-custom">Delivery is not available for ' + zip + ' PIN Code</p>'); 
    }
  } 
  return;
}
//alert('Manish');
    $(document).on("click change", "#checkout_shipping_address_zip", function () {
      //alert('call');
      checkPin();
      //alert('called');
    });