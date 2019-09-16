
$( document ).ready(function() {
   $.ajax({
            url: "/api/",
            type: 'GET',
			dataType: 'json',
			contentType: 'application/json',
            success: function(res) {
                console.log(res);
                $('#panda').text(res.user);
				$('#deposit').text(res.user);
				
				
				$balance = res.success - res.failed;
				$('#balance').text($balance);
					
				
            },
			 error: function(xhr, status, error) {
			alert('An Error Occured')
			}
    });
	
	$("#updateinfo").submit(function(event){
            event.preventDefault();
	$.ajax({
		

            url: "/api/updateInfo",
            type: 'POST',
			dataType: 'json',
			data : {email : $('#email').val()
		 },
			contentType: 'application/json',
            success: function(res) {
                console.log(res)
						
            },
			 error: function(xhr, status, error) {
				alert('An Error Occured')
			}
    });
	});

});	