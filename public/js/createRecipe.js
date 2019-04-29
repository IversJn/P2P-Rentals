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
  var createRecipeForm = $("#create-recipe-form");
  var postCategorySelect = $("#category");
  var array = [];
  // Giving the postCategorySelect a default value
  postCategorySelect.val("Personal");
  // Adding an event listener for when the form is submitted
  $(createRecipeForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    
    // Wont submit the post if we are missing a body or a title
    if (!recipeNameInput.val().trim() || !imageUrlInput.val().trim() || !ingredientsInput.val().trim() || !instructionsInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newPost = {
      name: recipeNameInput.val().trim(),
      image: imageUrlInput.val().trim(),
      ingredients: ingredientsInput.val().trim(),
      instructions: instructionsInput.val().trim(),
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
var array = [];
$("#addBtn").click(function(){
  var ul = $("#myUL");
  var li = $(`<li id=item${num}>`)
  var inputValue = $("#myInput");
  var t = document.createTextNode(inputValue.val());
//values are not being pushed into the array, this needs to be fixed.
  array.push(inputValue);
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
  })
})
function newElement() {
  
}
});


