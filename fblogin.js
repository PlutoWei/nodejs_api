var page = require('webpage').create();

page.open("http://www.facebook.com/login.php", function(status) {

  if (status === "success") {
    page.evaluate(function() {
        document.getElementById("email").value = "christiandickignacio1992.5@gmail.com";
        document.getElementById("pass").value = "Dick4869";
        document.getElementById("u_0_1").click();
    });
    window.setTimeout(function() {
       page.render("page.png");
       phantom.exit();
    }, 5000);
  }
});