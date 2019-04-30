//var db = require("../models");

$(document).ready(function () {
    $.get("/api/posts/", function (data) {
        $(document).on("click", "button.deleted", handlePostDelete);
        $(document).on("click", "button.edited", handlePostEdit);

        console.log(data[0].id);
        function handlePostEdit() {
            window.location.href = "/create?post_id=" + data[0].id;
            console.log("the edit function is being fired");
        }
        var iddd = data[0].id;

        function handlePostDelete() {
            var conf = confirm("Are you sure you would like to delete this recipe?");
            if(conf == true) {
                function deletePost(id) {
                    $.ajax({
                        method: "DELETE",
                        url: "/api/posts/" + id
                    })
                        .then(function () {
                            window.location.href = "/recipebook";
                        });
                }
                deletePost(iddd);
            }
        }
        var formattedDate = new Date(data[0].updatedAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        updatedAt.append(formattedDate);
    });










});