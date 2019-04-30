//var db = require("../models");

$(document).ready(function () {
    $.get("/api/posts/", function(data) {
        $(document).on("click", "button.deleted", handlePostDelete);
        $(document).on("click", "button.edited", handlePostEdit);

        console.log(data[0].id);
        function handlePostEdit() {
            window.location.href = "/create?post_id=" + data[0].id;
            console.log("the edit function is being fired");
        }
        var iddd = data[0].id;



          function handlePostDelete() {
            function deletePost(id) {
                $.ajax({
                  method: "DELETE",
                  url: "/api/posts/" + id
                })
                  .then(function() {
                    window.location.href = "/recipebook";
                  });
              }
             deletePost(iddd);
            //console.log("the delete function is being fired");
        }

    });
    


    // This function figures out which post we want to delete and then calls
    // deletePost
    

    // This function figures out which post we want to edit and takes it to the
    // Appropriate url

    //     // Retrieve the template data from the HTML (jQuery is used here).  
    //     var template = $('#recipe').Handlebars();  
    //     // Compile the template data into a function  
    //     //var templateScript = Handlebars.compile(template);  
    //     // Define data in JSON format.  
    //     var context = {
    //         "id":   
    //         "name": "name",  
    //         "image": "image"  
    //     };  
    //     // Pass Data to template script.  
    //     var html = template(context);  
    //     // Insert the HTML code into the page  
    //     $(document.body).append(html);  
});