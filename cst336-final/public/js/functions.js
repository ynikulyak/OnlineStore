function placeOrder(itemIds, counts) {
  let items = [];
  for (let i = 0; i < itemIds.length; i++) {
    items.push({
      id: parseInt(itemIds[i]),
      count: parseInt(counts[i])
    })
  }
  $.ajax({
    method: "post",
    url: "/api/placeOrder",
    data: {
      "items": items,
    },
    success: () => {
      clearCart();
      itemIds = [];
      counts = 0;
      $('#cart-count').html('0');
      $('.main').html("<h2>Thank you for your order</h2>");
    }
  });
}

function clearCart() {
  $.ajax({
    method: "get",
    url: "/api/deleteCart",
    success: function(rows, status) {}
  });
}

function asInt(x) {
  return parseInt(x, 10) || 0;
}

function getMakeChoice() {
  return $("#inputGroupSelect01").val();
}

function getYearChoiceFrom() {
  return $("#inputGroupSelect02").val();
}

function getYearChoiceTo() {
  return $("#inputGroupSelect03").val();
}

function getPriceFrom() {
  return $("#inputGroupSelect04").val();
}

function getPriceTo() {
  return $("#inputGroupSelect05").val();
}
// to disable years choice in To that are greater then chosen year in From
function fromYearUpdated(event) {
  var year = asInt(getYearChoiceFrom());
  $("#inputGroupSelect03 option").each(function(index, element) {
    element.disabled = (year > 0 && index > 0 && asInt(element.value) <= year);
  });
}

// to disable years choice in From that are less then chosen year in To
function toYearUpdated(event) {
  var year = asInt(getYearChoiceTo());
  $("#inputGroupSelect02 option").each(function(index, element) {
    element.disabled = (year > 0 && index > 0 && asInt(element.value) >= year);
  });
}

function hideCart() {
  $('#cart-icon').hide();
}

//display cart only if there is at least one item there
function displayCartInfoAsync() {
  $.ajax({
    method: "get",
    url: "/api/getCartInfo",
    success: function(rows, status) {
      if (rows && rows[0] && rows[0].NUM > 0) {
        $('#cart-icon').show();
        $('#cart-count').html(rows[0].NUM);
      } else {
        $('#cart-icon').hide();
      }
    }
  });
}

function addToCart(clickedButton) {
  $(clickedButton).prop('disabled', true);
  $.ajax({
    method: "post",
    url: "/api/updateCart?action=add&itemId=" + encodeURIComponent(clickedButton.getAttribute('data')),
    success: function(rows, status) {
      displayCartInfoAsync();
    }
  });
  return false;
}

function updateCartItemWithButton(clickedButton) {
  $(clickedButton).prop('disabled', true);
  var itemId = clickedButton.getAttribute('data');
  var quantity = asInt($('#quantity' + itemId).val());
  updateCartItem(clickedButton.getAttribute('data'), quantity);
}

function updateCartItem(itemId, quantity) {
  $.ajax({
    method: "post",
    url: "/api/updateCart?action=set&itemId=" + encodeURIComponent(itemId) + "&quantity=" + encodeURIComponent(quantity),
    success: function(rows, status) {
      reloadCart();
    }
  });
  return false;
}

function reloadCart() {
  document.location = '/cart?update=' + (new Date().getTime());
}

$(document).ready(function() {
  hideCart();
  displayCartInfoAsync();

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });

  $("#inputGroupSelect02").on('change', fromYearUpdated);
  $("#inputGroupSelect03").on('change', toYearUpdated);

  //display search result
  $("#search-btn").on("click", function(event) {
    event.preventDefault();
    var carMake = getMakeChoice();
    var carYearFrom = getYearChoiceFrom();
    var carYearTo = getYearChoiceTo();
    var carPriceFrom = getPriceFrom();
    var carPriceTo = getPriceTo();
    $.ajax({
      method: "get",
      url: "/api/displayCars",
      data: {
        "make": carMake,
        "yearFrom": carYearFrom,
        "yearTo": carYearTo,
        "priceFrom": carPriceFrom,
        "priceTo": carPriceTo
      },
      success: function(rows, status) {
        $("#selected-cars").html("");
        rows.forEach(function(row, i) {

          $("#selected-cars").append("<div class='card mb-3 pics' style='max-width: 640px;'><div class='row no-gutters'><div class='col-md-4'>" +
            "<img src='img/car.png' class='card-img' alt='car'></div><div class='col-md-8'><div class='card-body'><h3 class='card-title'>" +
            row.make + " " + row.model + "</h3><br><p class='card-text'>Year: " + row.year + " / " + row.type + " / Color: " + row.color + "</p><br>" +
            "<h3><strong>Price: " + formatter.format(row.price) + "</h3><br><button data='" + row.id + "' type='button' class='btn btn-dark add-to-cart' onclick='return addToCart(this);'>Add To Cart</button> </div></div></div</div>"
          )
        }); //foreach
      }
    });
  });
});