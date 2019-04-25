$(document).ready(function() {
  // Getting references to the name input and seller container, as well as the table body
  var nameInput = $("#seller-name");
  var sellerList = $("tbody");
  var sellerContainer = $(".seller-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an seller
  $(document).on("submit", "#seller-form", handleSellerFormSubmit);
  $(document).on("click", ".delete-seller", handleDeleteButtonPress);

  // Getting the initial list of sellers
  getsellers();

  // A function to handle what happens when the form is submitted to create a new seller
  function handleSellerFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertseller function and passing in the value of the name input
    upsertSeller({
      name: nameInput
        .val()
        .trim()
    });
  }

  // A function for creating an seller. Calls getsellers upon completion
  function upsertSeller(sellerData) {
    $.post("/api/sellers", sellerData)
      .then(getSellers);
  }

  // Function for creating a new list row for sellers
  function createSellerRow(sellerData) {
    var newTr = $("<tr>");
    newTr.data("seller", sellerData);
    newTr.append("<td>" + sellerData.name + "</td>");
    if (sellerData.Items) {
      newTr.append("<td> " + sellerData.Itemss.length + "</td>");
    } else {
      newTr.append("<td>0</td>");
    }
    newTr.append("<td><a href='/blog?seller_id=" + sellerData.id + "'>Go to Itemss</a></td>");
    newTr.append("<td><a href='/cms?seller_id=" + sellerData.id + "'>Create a Item</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-seller'>Delete Seller</a></td>");
    return newTr;
  }

  // Function for retrieving sellers and getting them ready to be rendered to the page
  function getSellers() {
    $.get("/api/sellers", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createSellerRow(data[i]));
      }
      renderSellerList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of sellers to the page
  function renderSellerList(rows) {
    sellerList.children().not(":last").remove();
    sellerContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      sellerList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no sellers
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an seller before you can create a Item.");
    sellerContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("seller");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/sellers/" + id
    })
      .then(getSellers);
  }
});