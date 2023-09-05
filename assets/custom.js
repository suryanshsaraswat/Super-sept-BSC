
$(document).ready(function () {
  $("#checkPincodeButton").click(function () {
    var enteredPincode = $("#pincodeInput").val();
    if (enteredPincode) {
      var found = false;
      var days = 0;
      $.getJSON(
        "//cdn.shopify.com/s/files/1/0459/6563/9834/t/161/assets/pincodes_BSC.json?v=14671247148063286691676096992",
        function (data) {
          $.each(data, function (row) {
            if (data[row]["Pincode"] == enteredPincode) {
              found = true;
              days = data[row]["Days to Delivery"];
              return false;
            }
          });
          if (found) {
            $(".msgg").hide();
            $(".deldate").text(days);
            $(".msgg").show();
          } else {
            $(".msgg").hide();
            $(".msgg").html("Sorry, This pincode is not servicable");
            $(".msgg").css("color", "red");
            $(".msgg").show();
          }
        }
      );
    }
  });
});

$(document).on('click', ".clear-cart", function(e){
  e.preventDefault();
  jQuery.ajax({
    type: "POST",
    url: '/cart/clear.js',
    dataType: 'json',
    success: function(){
      document.documentElement.dispatchEvent(
        new CustomEvent("cart:refresh", {
          bubbles: true, //this code is for prestige theme, is to refresh the cart
        })
      );
    }
   });
});


$(document).on("click", ".ad_to_cart_coll", function () {
  console.log("added");
  var ID = $(this).attr("data-var_id");
  addItemToCart(ID, 1); // paste your id product number
  $(".cart_dr").trigger("click");
  // $("#sidebar-cart").attr("aria-hidden", "false");
  _tfa.push({ notify: "event", name: "addtocart", id: 1489967 });
  window.sendCooeeAddToCart(ID);
});

function addItemToCart(variant_id, qty) {
  data = {
    id: variant_id,
    quantity: qty,
  };
  jQuery.ajax({
    type: "POST",
    url: "/cart/add.js",
    data: data,
    dataType: "json",
    success: function () {
      document.documentElement.dispatchEvent(
        new CustomEvent("cart:refresh", {
          bubbles: true, //this code is for prestige theme, is to refresh the cart
        })
      );
    },
  });
  seconds = upgradeTime;
}

// function addItemToCart(variant_id, qty) {
//   data = {
//     id: variant_id,
//     quantity: qty,
//   };

//   fetch("/cart/add.js", {
//     method: "POST",
//     "Content-Type": "application/json",
//     body: JSON.stringify(data),
//   })
//     .then(function () {
//       document.documentElement.dispatchEvent(
//         new CustomEvent("cart:refresh", {
//           bubbles: true, //this code is for prestige theme, is to refresh the cart
//         })
//       );
//     })
//     .catch((err) => null);

//   seconds = upgradeTime;
// }

$(window).ready(function () {
  $(".Product__Gallery").addClass("notextt");
  setInterval(function () {
    $(".Product__Gallery").removeClass("notextt");
    $(".viewsimilar").fadeIn();
  }, 4000);
});
$(".ProductForm__AddToCart").click(function () {
  seconds = upgradeTime;
});

var upgradeTime = 600; // seconds
var seconds = upgradeTime;

function timer() {
  var days = Math.floor(seconds / 24 / 60 / 60);
  var hoursLeft = Math.floor(seconds - days * 86400);
  var hours = Math.floor(hoursLeft / 3600);
  var minutesLeft = Math.floor(hoursLeft - hours * 3600);
  var minutes = Math.floor(minutesLeft / 60);
  var remainingSeconds = seconds % 60;

  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  document.getElementById("timer").innerHTML =
    pad(minutes) + ":" + pad(remainingSeconds);
  if (seconds == 0) {
    seconds = upgradeTime;
  } else {
    seconds--;
  }
}
var countdownTimer = setInterval("timer()", 1000);

document.addEventListener(
  "quizKitAddToCartSuccess",
  function () {
    document.documentElement.dispatchEvent(
      new CustomEvent("cart:refresh", {
        bubbles: true,
      })
    );

    document.querySelector('a[href="/cart"]').click();
  },
  false
);

$(".vewsim").click(function () {
  $("html, body").animate(
    {
      scrollTop: $(".cbb-frequently-bought-container ").offset().top - 200,
    },
    1000
  );
});
$(".neww").click(function () {
  $("html, body").animate(
    {
      scrollTop: $(".accordion-container").offset().top - 200,
    },
    1000
  );
});

$(".collectionheadimg").click(function () {
  $("html, body").animate(
    {
      scrollTop: $(".PageHeader ").offset().top - 200,
    },
    1000
  );
});
