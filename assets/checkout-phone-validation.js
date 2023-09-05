(function($) {
  window.PhoneNumberInputFormatter=function(){return false;};
  $(document).on('page:load page:change', function() 
                 {
    if (Shopify.Checkout.step === 'contact_information') 
    {
      var $phoneField = $('[name="checkout[shipping_address][phone]"]:not([tabindex="-1"])'),
          phoneFormatValidated = false;
      var errorClass = 'field--error';

      // Remove automatic formatting triggers
      $phoneField.removeAttr('data-phone-formatter data-phone-formatter-country-select');

      // Set maxium size
      $phoneField.attr('maxlength', 10);

      function phoneNumberValidation() 
      {
        phoneFormatValidated = false;
        var phoneFieldVal = $phoneField.val();

        //remove leading 0
        phoneFieldVal = phoneFieldVal.replace(/^0+/, '');

        // Strip out any non-numeric characters
        var formattedPhoneValue = phoneFieldVal.replace(/[^0-9]/g, '');
        $phoneField.val(formattedPhoneValue);

        //alert(formattedPhoneValue.length)
        if(formattedPhoneValue && formattedPhoneValue.length != 10)
        {
          phoneFormatValidated = false;
          //alert('False')
        }
        else
        {
          phoneFormatValidated = true;
          //alert('true')
        }
        return phoneFormatValidated;
      }

      // Run validator if there is a previously cached phone number
      if ($phoneField.val() != "") { phoneNumberValidation() };

      // Run validator when the user has switched focus from the phone field
      $phoneField.on('blur', phoneNumberValidation);

      // Run the function when the continue button is clicked or the enter key is pressed
      $('[data-step] form [type="submit"]').on('click', function(e) {
        e.preventDefault();
        var errorMessage = "Enter a valid phone number";
        phoneFormatValidated = phoneNumberValidation();
        //alert("Manish " + phoneFormatValidated)
        if (phoneFormatValidated) {
          $('[data-step] form').trigger('submit');
          $phoneField.closest('[data-address-field]').removeClass(errorClass);
          $("p").remove( "#error-for-phone" );
        }
        else
        {
          $("p").remove( "#error-for-phone" );
          $phoneField.closest('[data-address-field]').addClass(errorClass);
          $phoneField.closest('[data-address-field]').after("<p style='display:block' class='field__message field__message--error' id='error-for-phone'>"+ errorMessage +"</p>");
          return false;
        }
      });

      $('[data-step] form').on('keypress', function(e) {
        if (e.keyCode === 13) {
          e.preventDefault();
          $('[data-step] form [type="submit"]').trigger('click');
        }
      });
    }
  });
})(Checkout.$);