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
                APP.visualJson(this.responseText);

            }
            else
                document.getElementById("postContainer").innerHTML = "doing..";

        }
        xmlhttp.open("GET", address, true);
        xmlhttp.send();
    },

    visualJson: function (risposta){

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
                        "</div>" +
                    "</div>" +
                "</div>";
        }
    }

}

$(document).ready(function () {
    APP.showPosts("http://localhost:8080/Microblog/rest/posts");
});