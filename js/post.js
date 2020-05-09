var APP = {

    showPosts: function (address) {

        document.getElementById("postContainer").innerHTML = "starting..";

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {  // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {
                APP.visualJsonPosts(this.responseText);

            }
            else
                document.getElementById("postContainer").innerHTML = "doing..";

        }
        xmlhttp.open("GET", address, true);
        xmlhttp.send();
    },

    visualJsonPosts: function (risposta) {

        var postList = JSON.parse(risposta);

        for (var i = 0; i < postList.length; i++) {

            var text = document.getElementById("postContainer").innerHTML;
            var post = postList[i];

            if (text === "doing..") {
                text = "";
            }

            document.getElementById("postContainer").innerHTML = text + 
                "<div class='col-lg-4'>" +
                    "<div class='card mb-4 box-shadow rounded-0'>" +
                        "<div class='card-body'>" +
                            "<h4 class='text-center card-title'>" + post.titolo + "</h4>" +
                            "<p class='text-center card-text'>" + post.contenuto + "</p>" +
							"<h6 class='text-right text-muted card-subtitle mb-2'> Scritto da " + post.utente.username + "</h6>" +
                            "<div class='card'>" +
                                "<div class='card-body'> <h5 class='text-center card-title'>Commenti</h5> <br> <div id='commentiContainer" + post.id + "'> </div> </div>" + 
                            "</div>" +
                            "<br>"+
                            " <textarea class='form-control' id='commentText" + post.id + "' rows='2'></textarea><br>" + 
                            "<button class='btn btn-primary' id='buttonComment" +  post.id + "' type='submit' style='filter: contrast(114%) hue-rotate(280deg) invert(16%) saturate(180%) sepia(15%);'>Commenta</button>"
                        "</div>" +
                    "</div>" +
                "</div>";
            
                APP.showComments(post.id);
        }

        
        for (var i = 0; i < postList.length; i++) {
            $("#buttonComment" + postList[i].id).on("click", APP.getPostById);
        }
    },

    showComments : function(postId) {

        var address = "http://localhost:8080/Microblog/rest/comments/post/" + postId;

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {  // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {
                APP.visualJsonComments(this.responseText);

            }

        }
        xmlhttp.open("GET", address, true);
        xmlhttp.send();
    },

    visualJsonComments : function(data) {

        var comments = JSON.parse(data);
        
        for (var i = 0; i < comments.length; i++) {

            var container = document.getElementById("commentiContainer" + comments[i].post.id);
            var commento = comments[i];
            var text = container.innerHTML;

            container.innerHTML = text + "<h6 class='text-muted card-subtitle mb-2'> Utente: " + commento.utente.username + "</h6>" +
            "<p class='card-text'>" + commento.contenuto + "</p>";

        }

    },

    addPost : function() {

        var title = document.getElementById("title").value;
        var body = document.getElementById("body").value;

        var address = "http://localhost:8080/Microblog/rest/posts";

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {  // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function () {

            if (this.readyState === 4) {
                
                window.location.replace("visualizza.html");

            }

        }

        var post = JSON.stringify({
            "titolo": title,
            "contenuto": body,
            "utente": {
                "username":"Tutor",
                "email":"sahaspool@gmail.com",
                "password":"8fd62a9b391288c66173dabef4925fccf57382946e2ed8ede64e1be0de4ad900",
                "salt":"z9pZ4WGy6KJmXqaHFvbomg==",
                "ruolo":"ADMIN"
            }
        });

        xmlhttp.open("POST", address, true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(post);
    },

    getPostById : function(event) {

        var id = event.target.id;
        var s = id.split("buttonComment");
        var postId = s[1];

        var address = "http://localhost:8080/Microblog/rest/posts/" + postId;

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {  // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {

                var response = this.responseText;
                APP.addComment(JSON.parse(response));

            }
        
        }

        xmlhttp.open("GET", address, true);
        xmlhttp.send();

    },

    addComment: function(post) {

        var contenuto = document.getElementById("commentText" + post.id).value;

        var address = "http://localhost:8080/Microblog/rest/comments";

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {  // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function () {

            if (this.readyState === 4) {
                
                location.reload();

            }

        }

        var commento = JSON.stringify({
            "contenuto": contenuto,
            "post": {
                "id": post.id,
                "titolo": post.titolo,
                "contenuto": post.contenuto,
                "utente": {
                    "username":"Tutor",
                    "email":"sahaspool@gmail.com",
                    "password":"8fd62a9b391288c66173dabef4925fccf57382946e2ed8ede64e1be0de4ad900",
                    "salt":"z9pZ4WGy6KJmXqaHFvbomg==",
                    "ruolo":"ADMIN"
                }
            },
            "utente": {
                "username":"nero",
                "email":"nero@ner.it",
                "password":"64da352d054d2f122b959621bd15acb1bde63d7b1c9fd4965017c179adb15cdd",
                "salt":"iToMm5YV7CrMRxYAilhO2g==",
                "ruolo":"ADMIN"
            }
        });
        xmlhttp.open("POST", address, true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(commento);
    },

    init_addPost: function() {
        $("#addPost").on("click", APP.addPost);
    }

}

$(document).ready(function () {
    APP.init_addPost();
    APP.showPosts("http://localhost:8080/Microblog/rest/posts")
});