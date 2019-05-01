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
            if (conf == true) {
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


        var str = data[0].ingredients;
        var strArray = str.split(",");
        console.log(strArray);


        var newIngredientList = $("<div>");

        for (var i = 0; i < strArray.length; i++) {
            var newIngredientForm = $("<div>");
            newIngredientForm.addClass("form-group form-check");

            var newIngredientCheck = $("<input>");
            newIngredientCheck.attr("type", "checkbox");
            newIngredientCheck.addClass("form-check-input");
            newIngredientCheck.attr("id", [i]);

            var newIngredientCheckLabel = $("<label>");
            newIngredientCheckLabel.addClass("form-check-label");
            newIngredientCheckLabel.attr("for", [i]);
            newIngredientCheckLabel.text(strArray[i]);

            newIngredientForm.append(newIngredientCheck);
            newIngredientForm.append(newIngredientCheckLabel);
            newIngredientList.append(newIngredientForm);
        }
        $("#ingredients-list-container").append(newIngredientList);

        var instructionsStr = data[0].instructions;
        var instructionsStrArray = instructionsStr.split(",");
        console.log(instructionsStrArray);

        var newInstructionsList = $("<ol>");

        for (var j = 0; j < instructionsStrArray.length; j++) {
            var newInstruction = $("<li>");
            newInstruction.text(instructionsStrArray[j]);

            newInstructionsList.append(newInstruction);
        }
        $("#instructions-list-container").append(newInstructionsList);

    });










});