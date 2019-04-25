$(document).ready(function() {
  /* global moment */

  // sellerContainer holds all of our items
  var itemContainer = $(".item-container");
  var itemCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleItemDelete);
  $(document).on("click", "button.edit", handleItemEdit);
  // Variable to hold our items
  var items;

  // The code below handles the case where we want to get item posts for a specific seller
  // Looks for a query param in the url for seller_id
  var url = window.location.search;
  var sellerId;
  if (url.indexOf("?seller_id=") !== -1) {
    sellerId = url.split("=")[1];
    getItems(sellerId);
  }
  // If there's no sellerId we just get all posts as usual
  else {
    getItems();
  }


  // This function grabs posts from the database and updates the view
  function getItems(seller) {
    sellerId = seller || "";
    if (sellerId) {
      sellerId = "/?seller_id=" + sellerId;
    }
    $.get("/api/items" + sellerId, function(data) {
      console.log("Items", data);
      items = data;
      if (!items || !items.length) {
        displayEmpty(seller);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deleteItem(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/items/" + id
    })
      .then(function() {
        getItems(itemCategorySelect.val());
      });
  }

  // InitializeRows handles appending all of our constructed post HTML inside equipContainer
  function initializeRows() {
    itemContainer.empty();
    var itemsToAdd = [];
    for (var i = 0; i < items.length; i++) {
      itemsToAdd.push(createNewRow(items[i]));
    }
    itemContainer.append(itemsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(item) {
    var formattedDate = new Date(item.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newItemCard = $("<div>");
    newItemCard.addClass("card");
    var newItemCardHeading = $("<div>");
    newItemCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newItemTitle = $("<h2>");
    var newItemDate = $("<small>");
    var newItemSeller = $("<h5>");
    newItemSeller.text("Written by: " + item.seller.name);
    newItemSeller.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newItemCardBody = $("<div>");
    newItemCardBody.addClass("card-body");
    var newItemBody = $("<p>");
    newItemTitle.text(item.title + " ");
    newItemBody.text(item.body);
    newItemDate.text(formattedDate);
    newItemTitle.append(newitemDate);
    newItemCardHeading.append(deleteBtn);
    newItemCardHeading.append(editBtn);
    newItemCardHeading.append(newItemTitle);
    newItemCardHeading.append(newItemSeller);
    newItemCardBody.append(newItemBody);
    newItemCard.append(newItemCardHeading);
    newItemCard.append(newItemCardBody);
    newItemCard.data("item", item);
    return newItemCard;
  }

  // This function figures out which post we want to delete and then calls deleteItem
  function handleItemDelete() {
    var currentItem = $(this)
      .parent()
      .parent()
      .data("item");
    deleteItem(currentItem.id);
  }

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handleItemEdit() {
    var currentItem = $(this)
      .parent()
      .parent()
      .data("item");
    window.location.href = "/cms?item_id=" + currentItem.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Seller #" + id;
    }
    itemContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No items yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    itemContainer.append(messageH2);
  }

});
