$(document).ready(function () {
    function ajaxRegister(){

	


        var email = $('#reg_email').val();
        var password = $('#reg_password').val();
        var lastname = $('#lastname').val();
		var firstname = $('#firstname').val();
        var username = $('#username').val();
        var referrer = $('#referrer').val();
		var country = $('#country').val();
		var phone_number = $('#phone_number').val();
        var pubKey = $('#pubKey').val();
        var privKey = $('#privKey').val();
		var captcha_id = $('#regCaptcha-id').val();
		var captcha = $('#captcha-reg-text').val();
    
        
        var data = {
            "email" : email,
            "lastname" : lastname,
			"firstname" : firstname,
            "password" : password,
            "username" : username,
            "pubKey" : pubKey,
            "privKey" : privKey,
			"referrer" : referrer,
			"captcha_id" : captcha_id,
			"captcha" : captcha,
			"country" : country,
			"phone_number" : phone_number
        };
		
        console.log(data)
        
			var baseUrl = document.location.origin;
			var url =  baseUrl + '/register';
        
        $.ajax({
            dataType: 'json',
            url: url,
            type : 'POST',
            data : data,
            success: function(data){
                console.log("the registration", data)
                if (data.success == true){
                      $('#signup').hide();
					  
                      $('#registration_status').show().html('<div align="center"><strong>Registration Successfull</strong></div>').addClass("alert alert-success").removeClass("alert-danger");
                      $('#loadcredo').hide();
                }else{
                   var status = '<div align="center" class="alert alert-danger">' +  data.message + '</div>';
					$('#registration_status').show().html(status);
                }         
                
            },
            error : function(error){
				var status = '<div align="center" class="alert alert-danger">' +  data.message + '</div>';
                $('#registration_status').show().html(status);
            }
        });
        
}


    var rules_signup = {
        email : {
            required : true,
            email : true
        },
        username : {
            required : true,
            minlength : 5,
            maxlength : 100
        },
        realname : {
            required : true,
            minlength : 5,
            maxlength : 100
        },
        displayname : {
            required : true,
            minlength : 5,
            maxlength : 100
        },
        depositAddress : {
            required : true,
            minlength : 5,
            maxlength : 100
        },
        pubKey : {
            required : true,
            minlength : 5,
            maxlength : 100
        },
        privKey : {
            required : true,
            minlength : 5,
            maxlength : 100
        },
        password : {
            required : true,
            minlength : 8,
            maxlength : 100
        },
        re_password : {
            required : true,
            minlength : 8,
            maxlength : 100,
            equalTo : "#reg_password"
        },
		referrer : {
            required : false,
            minlength : 0,
            maxlength : 100,
        },
		phone_number : {
            required : true,
            minlength : 2,
            maxlength : 50,
        },
		country : {
            required : true,
            minlength : 0,
            maxlength : 10,
        }



    };
    var messages_signup = {

    }
    $('#signup').validate({
            rules : rules_signup,
            messages : messages_signup,
            submitHandler : function(form){

                ajaxRegister();
            },
            invalidHandler : function(event, validator){
                console.log('error form validation')
                
				
				
                $('#registration_status').show().html('<br><div align="center"><i>Invalid Data. Try Again</i></div>').removeClass("alert-success").addClass("alert alert-danger")
            }
    });



});