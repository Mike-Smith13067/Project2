var savedRecipes = [];


$(".searchResults").hide();

$("#submit").on("click", function () {
    event.preventDefault();

    $(".searchResults").show();

    var search = $("#recipeSearch").val().trim();

    var queryurl = "https://api.edamam.com/search?q=" + search + "&app_id=5523611c&app_key=b5d9d084b57902b4517c0ce63e217e18&from=0&to=10"

    $.ajax({
        url: queryurl,
        method: "GET"
    }).then(function (response) {
        for (i = 0; i < 2; i++) {
            $(".card-body0").text(response.hits[0].recipe.label);
            apiName = response.hits[0].recipe.label;
            $(".card-body1").text(response.hits[1].recipe.label);
            $("#rec0").prop("href", response.hits[0].recipe.url);
            apiurl = response.hits[0].recipe.url;
            $("#rec1").prop("href", response.hits[1].recipe.url);
            apiImage = response.hits[0].recipe.image;

        }
        console.log(response);
    });
    
});

$("#savebtn").on("click", function(event) {
    var recipeInfo = {
        recipeName: apiName,
        recipeurl: apiurl,
        recipeImage: apiImage
    }
    console.log(recipeInfo)
    $.ajax({
        type: "POST",
        url: "api/addRecipe",
        data: recipeInfo
    })
});

$.ajax({
    url: "api/addRecipe",
    method: "GET"
}).then(function(response) {
    console.log(response[0]);
    $(".savedRecipes").append("\nName: " + response[0].recipeName);
    $("#savedRec").prop("href", response[0].recipeurl);
});


// $("#savebtn").on("click", function () {
//     function loggedIn(req, res, next) {
//         if (req.user) {
//             next();
//         } else {
//             res.redirect('/login');
//         }
//     }
//     app.get('/profile', loggedIn, function (req, res, next) {
//         // req.user - will exist
//         // load user orders and render them
//     });

// });

// var queryurl1 = "https://api.edamam.com/api/nutrition-data?app_id=7e1b6072&app_key=b2f9db58b673c1dbdf0bbc30928a9d81&ingr=" 
// + response.hits[1].recipe.ingredientLines[0].split(" ").join("%20");

// $.ajax({
//     url: queryurl1,
//     method: "GET"
// }).then(function (response) {
//     console.log(response);
//     $(".card-body0").append("\nCalories" + response.calories);
//     $(".card-body1").append("\nCalories" + response.calories);

// });
