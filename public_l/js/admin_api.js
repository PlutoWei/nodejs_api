


function deleteJob(jobid){
				$('#myModal').modal('show');
				$('#myModal .modal-header').empty();
				$('#myModal .modal-body').empty();
				$('#myModal .modal-footer').empty();
				
				var login_description = '<div class="row">' +
							'<div class="col-md-12 well" style="align : center">' +
								'<form id="deleteJob-form" data-toggle="validator">' +
									'<div class="form-group">' +
										'<label>Job ID</label>' +
										'<input readonly data-id=' + jobid + '" type="text"  class="form-control" name="email" ' + 'placeholder="'+ jobid + '"' +
									
									'</div>' +
									
									'<div class="form-group">' +
										'<label>Password</label>' +
										'<input type="text" id= "password" class="form-control" name="email" value="">' +
									'</div>' +

									'<button id="login_btn"  type="submit" class="btn btn-warning btn-sm">DELETE NOW!</button>' +
								'</form>' +
								 '<div id="deletejob_form_status"></div>' +
							'</div>' +
						'</div>';


				$('#myModal .modal-header').html('<div align= "center">Are you sure you want to delete this job? </div>');
				$('#myModal .modal-body').html(login_description);
								
}


var rules_createJob = {
        job_title : {
            required : true,
            minlength : 7,
			maxlength : 50
        },
        job_category : {
            required : true,
			digits : true,
			min : 0,
			max : 20
        },
        job_reward : {
            required : true,
			digits : true,
			min : 1,
			max : 2000
			
        },
        job_ttr : {
            required : true,
            digits : true,
			min : 1,
			max : 10
        },
        job_ttf : {
           required : true,
            digits : true,
			min : 1,
			max : 10
        },
        job_no_of_order : {
           required : true,
            digits : true,
			min : 300,
			max : 1000
        },
        job_description : {
            required : true,
            minlength : 10,
            maxlength : 1000
        },
        job_proof : {
            required : true,
            minlength : 10,
            maxlength : 1000
        },
		job_requiredPow : {
            required : true,
            digits : true,
			min : 0,
			max : 999999
        },
		job_maxProof : {
            required : true,
            digits : true,
			min : 0,
			max : 100
        },
		job_is_private : {
            required : true
        },
		job_password : {
            required : true
        }



 };
 
 
  var messages_createjob = {

    }


function jobCreate(){
			
			var baseUrl = document.location.origin;
			var url =  baseUrl + '/api/createjob';
			var title = $('#job_title').val();
			var category = $('#job_category').val();
			var reward = $('#job_reward').val();
			var ttr = $('#job_ttr').val();
			var ttf = $('#job_ttf').val();
			var no_of_order = $('#job_no_of_order').val();
			var proof = $('#job_proof').val();
			var description = $('#job_description').val();
			var is_private = $('#job_is_private').val();
			var maxProof = $('#job_maxProof').val();
			var requiredPow = $('#job_requiredPow').val();
			var password = $('#job_password').val();
			
			console.log("the current url is", url);
			
			var token = localStorage.getItem('token');


			
			var data = {
				"title" : title,
				"category" : category,
				"description" : description,
				"no_of_order" : no_of_order,
				"ttr" : ttr,
				"ttf" : ttf,
				"reward" : reward,
				"proof" : proof,
				"maxProof" : maxProof,
				"requiredPow" : requiredPow,
				"is_private" : is_private,
				"password" : password
			};
			
			console.log("the data being sent", data);
			console.log("the requiredPow" , requiredPow);
				
				$.ajax({
					dataType: 'json',
					url: url,
					type : 'POST',
					data : data,
					headers : {
						Authorization : token
					},
					success: function(data){
						console.log(data);
								
						
					},
					error : function(jqHXR, status, error){
						
						console.log("the status of this", jqHXR)
						if (jqHXR.status == 401){
							console.log('Unauthorized')
							authentication();
							
						}else{
							var message = jqHXR.responseText;
							var x = JSON.parse(message);
							console.log('An Error Occured huhu', message, jqHXR)
							onError(x.message);
						
						}
					}
				});
					
}


	
$(document).ready(function(){
	
	$("#user_list").click(function(){
		
		var token = localStorage.getItem('token');
		console.log("token getting" , token); 
		var url = '../admin/users';
		$.ajax({
			dataType: 'json',
			url: url,
			headers : {
				Authorization : token
			},
			type : 'POST',
			success: function(data){
				//$('#list_of_users table').empty();
				
				console.log('getting job category', data)
				
				var tableHeader = '<table class="table table-hover table-striped" cellpadding="0" cellspacing="0" border="0">' +
							   '<thead>' +
									'<tr>' +
									'<strong>' +
									  '<th style="text-align:center">User ID</th>' +
									  '<th style="text-align:center">Email</th>' +
									  '<th style="text-align:center">Name</th>' +
									  '<th style="text-align:center">Phone</th>' +
									  '<th style="text-align:center">Country</th>' +
									  '<th style="text-align:center">Earnings</th>' +
									  '<th style="text-align:center">Update</th>' +
									  '<th style="text-align:center">Delete</th>' +
									  '</strong>' +
									'</tr>' +
								 '</thead>' +
								'</table>';
				
		
				$("#list_of_users").html(tableHeader);
				
				
				for(var i=0; i < data.length; i++){
					console.log(data[i]._id)
					
				

					$('#list_of_users table').append('<tr style="text-align:center" class= "table">' +
						'<td style="text-align:center">' + data[i]._id  + '</td>' +
						'<td style="text-align:center">' + data[i].email  + '</td>' +
						'<td style="text-align:center">' + data[i].real_name  + '</td>' +
						'<td style="text-align:center">' + data[i].phone_number  + '</td>' +
						'<td style="text-align:center">' + data[i].country + '</td>' +
						'<td style="text-align:center">' + data[i].earnings  + '</td>' +
						'<td style="text-align:center">' + '<button ' + 'id=' + data[i]._id +  ' type="button" class="btn btn-info btn-sm custom-modal-update-user" data-toggle="modal" data-target="#myModal"> UPDATE </button>'  + '</td>' +					
						'<td style="text-align:center">' + '<button ' + 'data-id=' + data[i]._id +  ' type="button" class="btn btn-info btn-sm custom-modal-delete-user"> DELETE </button>'  + '</td>' +		
						
					'</tr>' );
				}
				
			},
			error : function(jqHXR, status, error){
						
						console.log("the status of this", jqHXR)
						if (jqHXR.status == 401){
							console.log('Unauthorized')
							authentication();
							
						}else{
							var message = jqHXR.responseText;
							var x = JSON.parse(message);
							console.log('An Error Occured huhu', message, jqHXR)
							onError(x.message);
						
						}
			}
		});
	});
	
	
});



$(document).ready(function(){
	
		 $('#createJob_form').validate({
            rules : rules_createJob,
            messages : messages_createjob,
            submitHandler : function(form){
                
                jobCreate()
				alert("Success")
            },
            invalidHandler : function(event, validator){
                console.log('error form validation')
                
                $('#registration_status').show().html('<br><div align="center"><i>Invalid Data. Try Again</i></div>').removeClass("alert-success").addClass("alert alert-danger")
            }
    });
			
		

});




//For pop up login authentication
$(document).on('click', '#login_btn', function(){
		localStorage.removeItem('token');
		localStorage.removeItem('profile');
		var email = $('#login_email').val();
		var password = $('#login_password').val();
			
		var data = {
			"email" : email,
			"password" : password
		};
		console.log('data to be sent', data)
		var url = './authenticate';
		
		$.ajax({
			dataType: 'json',
			url: url,
			type : 'POST',
			data : data,
			success: function(data){
				
				  var pr = JSON.stringify(data.profile);
				  localStorage.setItem('token', data.token);
				  localStorage.setItem('profile', pr);
				  console.log('my profile', pr)
				  $('#register_btn').hide();
				  $('#login2').html('<div>User Successfully Authenticated</div>');
				  			  
					
			},
			error : function(error){
				 $('#login2').html('<div>Error Occured, Try again...</div>');
				
			}
		});
		
})