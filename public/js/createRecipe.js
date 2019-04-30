$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var postId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/cms?post_id=1, postId is 1
  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId);
  }

  // Getting jQuery references to the post body, title, form, and category select
  var ingredientsInput = $("#ingredients-input");
  var instructionsInput = $("#instructions-input");
  var recipeNameInput = $("#recipe-name-input");
  var imageUrlInput = $("#image-url-input");
  // ---took this out because it wasn't able to trigger the on submit event---
  // var createRecipeForm = $("#create-recipe-form");
  var postCategorySelect = $("#category");
  var array = [];
  // Giving the postCategorySelect a default value
  postCategorySelect.val("");

  // ----replaced this event listener by giving the button an id and changing the event listener to .click---
  // $(createRecipeForm).on("submit", function handleFormSubmit(event) {
    $("#formSubmit").click(function handleFormSubmit(event){
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!recipeNameInput.val().trim() || !imageUrlInput.val().trim() || array === [] || ingArray === [] ) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newPost = {
      name: recipeNameInput.val().trim(),
      image: imageUrlInput.val().trim(),
      ingredients: array.toString(),
      instructions: ingArray.toString(),
      category: postCategorySelect.val()
    };

    console.log(newPost);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newPost.id = postId;
      updatePost(newPost);
    }
    else {
      submitPost(newPost);
    }
  });

  // Submits a new post and brings user to blog page upon completion
  function submitPost(Post) {
    $.post("/api/posts/", Post, function() {
      window.location.href = "/recipebook";
    });
  }

  // Gets post data for a post if we're editing
  function getPostData(id) {
    $.get("/api/posts/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data
        recipeNameInput.val(data.name);
        imageUrlInput.val(data.image);
        ingredientsInput.val(data.ingredients);
        instructionsInput.val(data.instructions);
        postCategorySelect.val(data.category);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given post, bring user to the blog page when done
  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/posts",
      data: post
    })
      .then(function() {
        window.location.href = "/recipebook";
      });
  }

// Create a new list item when clicking on the "Add" button
var num = 0;
var numb = 0;
var array = [];
var ingArray = [];
$("#addBtn").click(function(){
  var ul = $("#myUL");
  var li = $(`<li id=item${num}>`)
  var inputValue = $("#myInput");
  var t = document.createTextNode(inputValue.val());
//values are not being pushed into the array, this needs to be fixed.
  array.push(inputValue.val());
  console.log(array);
  li.append(t);
  if (inputValue.val() === '') {
    alert("You must write something!");
  } else {
    ul.append(li);
  }
  inputValue.val("");

//clear x buttons and appends to list item
  var button = $(`<button class="close">`);
  var txt = document.createTextNode("\u00D7");
  button.append(txt)
  li.append(button);
  num ++;
//logic to close item when button is clicked
  $(".close").click(function(){
    console.log("somethinggg");
    console.log($(this).parent().attr("id"));
    $(this).parent().remove();

    // looking into deleting array dynamically... issues with the current method is aligning the item num with array index
    // var itemNum = $(this).parent().attr("id").slice(3);
    // console.log(itemNum);

  })
})

$("#addInstruction").click(function(){
  var ul = $("#myInstruction");
  var li = $(`<li id=instruction${numb}>`)
  var inputValue = $("#instructions-input");
  var t = document.createTextNode(inputValue.val());
//values are not being pushed into the array, this needs to be fixed.
  ingArray.push(inputValue.val());
  console.log(ingArray);
  li.append(t);
  if (inputValue.val() === '') {
    alert("You must write something!");
  } else {
    ul.append(li);
  }
  inputValue.val("");

//clear x buttons and appends to list item
  var button = $(`<button class="close">`);
  var txt = document.createTextNode("\u00D7");
  button.append(txt)
  li.append(button);
  numb ++;
//logic to close item when button is clicked
  $(".close").click(function(){
    console.log("somethinggg");
    console.log($(this).parent().attr("id"));
    $(this).parent().remove();

    // looking into deleting array dynamically... issues with the current method is aligning the item num with array index
    // var itemNum = $(this).parent().attr("id").slice(3);
    // console.log(itemNum);

  })
})
});


