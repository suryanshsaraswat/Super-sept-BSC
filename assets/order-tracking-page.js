$(document).ready(function(){
    $(".tracker-button").click(function() {
      var inputValue = $("#trackingInput").val();
      var regexPattern = /^(BSC|bsc)\d{9}$/i;
      if(!regexPattern.test(inputValue)){
        $("#trackingError").text("Please specify correct Order ID or AWB No.");
      } else{
        $("#loader").show();
      $('.number-step').hide();
    var url = "https://bitools.bombayshavingcompany.com/index.php/authentication/tracking/"+inputValue;
    $.ajax({
        url: url,
        type: "GET",
        success: function(data) {
            var IS_JSON = true;
            try
            {
                 var jsonData = $.parseJSON(data);
            }
            catch(err)
            {
                 IS_JSON = false;
            }   

            if(!IS_JSON)
            {
              $("#trackingError").text("Please specify correct Order ID or AWB No.");
            }
            else
            {
              // Parse the JSON data
              $('#loader').hide();
              $('#order-track').show();
              var jsonData = JSON.parse(data);
  
              // Access specific values from the JSON
              var shipStatus = jsonData.Ship_Status;
              var deliveryDate = jsonData.Delivery_Date;
              var customerName = jsonData.Customer_Name;
              var orderAmount = jsonData.Amount;
              var estimatedDeliveryDate = jsonData.Estimated_Delivery_Date;
              var deliveryPartner = jsonData.Delivery_Partner;
              var trackingId = jsonData.Tracking_ID;
              var orderName = jsonData.Order_Name;
              var discount = jsonData.Discount_Used;
              var orderPlacedDate = jsonData.Order_Placed_Date;
              var customerMobile = jsonData.Customer_Mobile_Number;
              var customerEmail = jsonData.Customer_Email_Id;
              var orderPrepaidCod = jsonData.Order_Prepaid_Cod;
              var shippingAddress = jsonData.Shipping_Address;
              var orderDateNew = new Date(orderPlacedDate);
              var estimatedDeliveryDate = new Date(orderDateNew);
              estimatedDeliveryDate.setDate(orderDateNew.getDate() + 4);
              var formattedEstimatedDeliveryDate = estimatedDeliveryDate.toDateString();
              console.log("Estimated Delivery Date: " + formattedEstimatedDeliveryDate);
  
            //parsing delivered date in day, month, year format
            var date = new Date(deliveryDate);
            var months = [
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December'
            ];
            // Get the day, month, and year from the date object
            var day = date.getDate();
            var month = months[date.getMonth()];
            var year = date.getFullYear();
            // Create a function to add 'th', 'st', 'nd', or 'rd' to the day
            function getDayWithSuffix(day) {
              if (day >= 11 && day <= 13) {
                return day + 'th';
              }
              switch (day % 10) {
                case 1: return day + 'st';
                case 2: return day + 'nd';
                case 3: return day + 'rd';
                default: return day + 'th';
              }
            }
            var formattedDate = getDayWithSuffix(day) + ' ' + month + ' ' + year;
            //Parsing Order Placed Date in dd, mm, yyyy format
            var orderDate = new Date(orderPlacedDate);
            var orderMonths = [
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December'
            ];
            // Get the day, month, and year from the date object
            var orderDay = orderDate.getDate();
            var orderMonth = orderMonths[orderDate.getMonth()];
            var orderYear = orderDate.getFullYear();
            // Create a function to add 'th', 'st', 'nd', or 'rd' to the day
            function getDayOrderWithSuffix(orderDay) {
              if (orderDay >= 11 && orderDay <= 13) {
                return orderDay + 'th';
              }
              switch (orderDay % 10) {
                case 1: return orderDay + 'st';
                case 2: return orderDay + 'nd';
                case 3: return orderDay + 'rd';
                default: return orderDay + 'th';
              }
            }
            var formattedOrderDate = getDayWithSuffix(orderDay) + ' ' + orderMonth + ' ' + orderYear;
              console.log("Ship Status: " + shipStatus);
              console.log("Delivery Date: " + deliveryDate);
              console.log("Customer Name: " + customerName);
              console.log("Order Amount: " + orderAmount);
              console.log("Address street" + shippingAddress.Street);
              console.log("estimated Delivery Date " + estimatedDeliveryDate);
              console.log("tracking Id " + trackingId);
              console.log("order Name" + orderName);
              console.log("orderPlacedDate" + orderPlacedDate);
              console.log("customer Mobile" + customerMobile);
              console.log("COD or Prepaid:" +orderPrepaidCod);
              console.log("shipping address:"+shippingAddress.Street+","+shippingAddress.Zipcode);
              if(deliveryPartner === "Delhivery Direct Sur" || deliveryPartner === "Delhivery Surface"){
                $('#delivery-partner-logo').html('<h2><img src="https://cdn.shopify.com/s/files/1/0459/6563/9834/files/Delhivery.png?v=1697526138" alt="delivery logo" style="width:30px; height:30px"></h2>');
              };
            if(deliveryDate === null){
              $("#delivery-date").html('<p>Order is under processing</p><h3 style="margin-bottom: 8px;">Status</h3><h2>' + shipStatus + '</h2>');
            }
            else {
              $("#delivery-date").html("<h3>Delivered On</h3><h2>" + formattedDate + "</h2>");
            }
              $("#order-summary").html("<tbody><tr><td>Order Name</td><td>"+ orderName +"</td></tr><tr><td>Order Placed On</td><td>"+ formattedOrderDate +"</td></tr><tr><td>Order Total</td><td>"+ orderAmount +"</td></tr><tr><td>Payment Method</td><td>"+ orderPrepaidCod +"</td></tr><tr><td>Shipping Address</td><td>"+ shippingAddress.Street +"</td></tr><tr><td>Contact Details;</td><td>"+ customerMobile +"</td></tr></tbody>");
              $("#delivery_partner").html(deliveryPartner);
              $("#tracking").html('<p>Tracking ID:<br><span style="font-weight:500; color:blue">'+ trackingId +'</span></p>');
              $("#delivery_status").html("<p>Status:</p><h2>" + shipStatus + "</h2>");
              $(".heading-otp").html("<h2>Hi, "+customerName+"</h2><p>Based on your Order ID/AWB, here are your order details</p>");
              const statuses = ["Open", "Picked", "Shipped", "Out Of Delivery", "Delivered"];
              if ( shipStatus === "Open" || shipStatus === null || shipStatus === "OrderConfirmed"){
                var shipStatusUpdate = "Open";
                $('#est-del-status').html('<p>Estimated date of Delivery: <span class="del-date">' +formattedEstimatedDeliveryDate+ '</span></p>');
                }else if ( shipStatus === "Packed"){
                var shipStatusUpdate = "Picked";
                $('#est-del-status').html('<p>Estimated date of Delivery: <br><span class="del-date">' +formattedEstimatedDeliveryDate+ '</span></p>');
                }else if (shipStatus === "Picked" || shipStatus === "Shipped" || shipStatus === "InTransit" || shipStatus === "LostInTransit"){
                var shipStatusUpdate = "Shipped";
                $('#est-del-status').html('<p style="margin-left:10px; color:#fff; font-size:15px">Estimated date of Delivery: <span class="del-date">' +formattedEstimatedDeliveryDate+ '</span></p>');
                }else if(shipStatus === "Out Of Delivery"){
                var shipStatusUpdate = "Out Of Delivery";
                } else if(shipStatus === "Delivered"){
                var shipStatusUpdate = "Delivered";
                }
              let currentStatus = shipStatusUpdate;
              console.log("shipping status found: " +currentStatus);
              let currentIndex = statuses.indexOf(currentStatus);
              if (currentIndex !== -1) {
                  const progress = document.getElementById("progress");
                  const trigger = document.getElementById(currentStatus);
                  progress.style.width = `${(currentIndex) * 25}%`;
                  trigger.style.backgroundColor = "#4CAF50";
              }
          },
          error: function(xhr, status, error) {
              console.error("AJAX request failed. Status:", status, "Error:", error);
          }
        }
    });
      }
      
});
            });