$(document).ready(function() {
  // blogContainer holds all of our posts
  var blogContainer = $(".recipe-container");
  var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  $(document).on("click", "button.view", handlePostView);
  postCategorySelect.on("change", handleCategoryChange);
  var posts;

  // This function grabs posts from the database and updates the view
  function getPosts(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/posts" + categoryString, function(data) {
      console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    })
      .then(function() {
        getPosts(postCategorySelect.val());
      });
  }

  // Getting the initial list of posts
  getPosts();
  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    blogContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostImage = $("<img>");
    newPostImage.addClass("card-img-top");
    newPostImage.attr("src", post.image);
    newPostImage.attr("alt", post.name);
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostCardName = $("<h3>");
    newPostCardName.addClass("card-title col-md-7");
    newPostCardName.text(post.name);
    var newPostCategory = $("<h5>");
    newPostCategory.addClass("col-md-5");
    newPostCategory.text(post.category);
    newPostCategory.css({
      float: "right",
      "font-weight": "600",
      "margin-top":
      "-40px"
    });
    var buttonRow = $("<div>");
    buttonRow.addClass("row");
    var viewMoreBtn = $("<button>");
    viewMoreBtn.text("View More");
    viewMoreBtn.addClass("view btn btn-primary col-md-5");
    viewMoreBtn.css({
      float: "left",
      "margin-right": "2%"
    });
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger col-md-2");
    deleteBtn.css({
      float: "right"
    });
    // var emptySpace = $("<div>");
    // emptySpace.addClass("col-md-3");
    var editBtn = $("<button>");
    editBtn.text("Edit");
    editBtn.addClass("edit btn btn-secondary col-md-3");
    editBtn.css({
      "margin-right": "2%"
    });
    buttonRow.append(viewMoreBtn);
    buttonRow.append(editBtn);
    //buttonRow.append(emptySpace);
    buttonRow.append(deleteBtn);
    var newPostCardFooter = $("<div>");
    newPostCardFooter.addClass("card-footer");

    var newPostDate = $("<small>");
    var formattedDate = new Date(post.updatedAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newPostDate.text("Last updated " + formattedDate);
    newPostCardFooter.append(newPostDate);
    
    //newPostName.append(newPostDate);


    //var newPostCardHeading = $("<div>");
    //newPostCardHeading.addClass("card-header");

    //var newPostName = $("<h2>");


    //var newPostCardBody = $("<div>");
    //newPostCardBody.addClass("card-body");
    //var newPostBody = $("<p>");
    //newPostName.text(post.name + " ");
    //newPostBody.text(post.body);


    //newPostCardHeading.append(newPostName);

    //newPostCardBody.append(newPostBody);
    newPostCardBody.append(newPostCardName);
    newPostCardBody.append(newPostCategory);
    newPostCardBody.append(buttonRow);




    newPostCard.append(newPostImage);
    //newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.append(newPostCardFooter);
    newPostCard.data("post", post);
    return newPostCard;
  }

  // This function figures out which post we want to delete and then calls
  // deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
    console.log(currentPost.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  function handlePostEdit() {
    console.log("the edit function is being fired");
    var currentPost = $(this)
      .parent()
      .parent()
      .parent()
      .data("post");
    window.location.href = "/create?post_id=" + currentPost.id;
    console.log(currentPost.id);
  }

  function handlePostView() {
    console.log("the view function is being fired");
    var currentPost = $(this)
      .parent()
      .parent()
      .parent()
      .data("post");
    window.location.href = "/recipe/" + currentPost.id;
    console.log(currentPost.id);
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No recipes yet for this category, navigate <a href='/create'>here</a> in order to create a new recipe.");
    blogContainer.append(messageH2);
  }

  // This function handles reloading new posts when the category changes
  function handleCategoryChange() {
    var newPostCategory = $(this).val();
    getPosts(newPostCategory);
  }

});
