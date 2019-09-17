  function loggedIn() {
    return localStorage.getItem('token') && !!localStorage.getItem('profile');
  }

  function showHide(selector,show){    
    $(selector).each(function(i,element){
      if (show) {
	$(element).addClass("show");
        $(element).show();
      }
      else {
	$(element).removeClass("show");
	$(element).hide();
      }
    })
  }
  
  function showEach(selector) {
    showHide(selector,true);
  }
  
  function hideEach(selector) {
    showHide(selector,false);
  }
  
  function filterAuthFields() {
    if (loggedIn()) {
      
      $(".authenticate").hide();
      $(".loadcredo").hide();


      showEach(".dropdown");
      showEach(".inventory_nav");
      
    }
    else {
      hideEach(".user-profile-menu");
      hideEach(".inventory_nav");
      hideEach(".dropdown")
      
      $("#logout").removeClass("active");
      $("#logout").parent().removeClass("active");

      
      showEach(".authenticate");
      showEach(".loadcredo");
    }
  }

  function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    
    filterAuthFields();
  }
