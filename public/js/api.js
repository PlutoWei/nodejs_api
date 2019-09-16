
//Show update of withdrawal address
function updateProfile(){
				$('#myModal').modal('show');
				$('#myModal .modal-header').empty();
				$('#myModal .modal-body').empty();
				$('#myModal .modal-footer').empty();
				
				var login_description = '<div class="row">' +
							'<div class="col-md-12 well" style="align : center">' +
								'<form id="login_form" data-toggle="validator">' +
									
									'<div class="form-group">' +
										'<label>Full Name: </label>' +
										'<input type="full_name" id= "rn" class="form-control" name="rn" value="">' +
									'</div>' +
									
									'<div class="form-group">' +
										'<label>Paypal Email: </label>' +
										'<input type="email" id= "paypal" class="form-control" name="paypal" value="">' +
									'</div>' +
									
									'<div class="form-group">' +
										'<label>Bitcoin Address </label>' +
										'<input type="text" id = "btc" class="form-control" name="btc" >' +
									'</div>' +
									
									'<div align="center" class="form-group">' +
										'<button id="update_user_profile"  type="submit" class="btn btn-info btn-sm updateUserProfile">UPDATE</button>' +
									'</div>' +
								'</form>' +
								 '<div id="withdrawal_form_status"></div>' +
							'</div>' +
						'</div>';


				$('#myModal .modal-header').html('<div align= "center">UPDATE PROFILE</div>');
				$('#myModal .modal-body').html(login_description);
				
				
 						
			
}


function ajaxAuth(){
		localStorage.removeItem('token');
		localStorage.removeItem('profile');
		var email = $('#login_email').val();
		var password = $('#login_password').val();
			
		var data = {
			"email" : email,
			"password" : password
		};
		console.log('Here are the credentials for authentication', data)
		var url = '../authenticate';
		
		$.ajax({
			dataType: 'json',
			url: url,
			type : 'POST',
			data : data,
			success: function(data){
				$('#logout').show();
				$('#user_profile').show();
				$('#user_transaction').show();
				$('#user_ref').show();
				$('#loadCreateJob').show();
				$('#nav_work').show();
				//$('#nav_fountain').show();
				$('#user_pow').show();
				$('#unverified_work').show();
				$('#loadcredo').hide();
                $('#user-profile-menu').show();

				  $('#authenticate').hide();
				  var pr = JSON.stringify(data.profile);
				  localStorage.setItem('token', data.token);
				  localStorage.setItem('profile', pr);
				  console.log('my profile', pr)
				  
				  var checkToken = localStorage.getItem("token");
				  console.log("the token was saved", checkToken)
				  $('#register_btn').hide();
				  $('#login_form').hide();
				  $('#myModal .modal-header .modal-title').html('<div align= "center"> Congratulations!!! </div>');
				  $('#login_form_status').html('<div>User Successfully Authenticated</div>').addClass("alert alert-success");
				  
				  
				  
					
			},
			error : function(jqHXR, status, error){
				console.log(jqHXR, status, error)
				/*$('#login_form').hide();*/

  swal("Error Occured, try again!", {
    className: "red-bg",
  });



/*$('#login_form_status').html('<div>Error Occured, Try again...</div>').addClass("alert alert-danger").removeClass("alert-success");*/

				
			}
		});
}



function insertInventory(){
        var token = localStorage.getItem('token');

			
		var data = {
              'product_name' : $('#product_name_add').val(),
              'product_description' : $('#product_description_add').val(),
              'product_image' : $('#imageprod').val(),
              'product_category' : $('#product_category_add').val(),
              'product_price' : $('#product_price_add').val(),
              'stock_number' : $('#product_stock_number_add').val(),
              'item_supplier' : $('#product_item_supplier_add').val(),
              'supplier_name' : $('#product_supplier_name_add').val(),
              'supplier_email' : $('#product_supplier_email_add').val(),
              'supplier_number' :$('#product_supplier_number_add').val(), 
              'is_available' : $('#product_is_available_add').val()
		};
		console.log('Here are the data to be added in inventory ', data)
		var url = '../inventory/insert';
		
		$.ajax({
			dataType: 'json',
			url: url,
			type : 'POST',
			data : data,
            headers : {
				Authorization : token
			},
			success: function(data){
                alert("Successfully Inserted")
			},
			error : function(jqHXR, status, error){
				console.log(jqHXR, status, error)
				$('#login_form').hide();
				$('#login_form_status').html('<div>Error Occured, Try again...</div>').addClass("alert alert-danger").removeClass("alert-success");

				
			}
		});
}



function updateInventory(inventory_id){
        var token = localStorage.getItem('token');
			
		var data = {
              'product_name' : $('#product_name_add').val(),
              'product_description' : $('#product_description_add').val(),
              'product_category' : $('#product_category_add').val(),
              'product_price' : $('#product_price_add').val(),
              'stock_number' : $('#product_stock_number_add').val(),
              'item_supplier' : $('#product_item_supplier_add').val(),
              'supplier_name' : $('#product_supplier_name_add').val(),
              'supplier_email' : $('#product_supplier_email_add').val(),
              'supplier_number' :$('#product_supplier_number_add').val(), 
              'is_available' : $('#product_is_available_add').val()
		};
		console.log('Here are the data to be updated in inventory ', data)
		var url = '../inventory/update/' + inventory_id;
		
		$.ajax({
			dataType: 'json',
			url: url,
			type : 'POST',
			data : data,
            headers : {
				Authorization : token
			},
			success: function(data){
                alert("Successfully Updated")
			},
			error : function(jqHXR, status, error){
				console.log(jqHXR, status, error)
				$('#login_form').hide();
				$('#login_form_status').html('<div>Error Occured, Try again...</div>').addClass("alert alert-danger").removeClass("alert-success");

				
			}
		});
}



function getInventory(inventory_id, action){
        var token = localStorage.getItem('token');
		var url = '../inventory/read/' + inventory_id;
		
		$.ajax({
			dataType: 'json',
			url: url,
			type : 'POST',
            headers : {
				Authorization : token
			},
			success: function(data){
                console.log(data)
                $('#myModal').modal('show');
                $('#myModal .modal-header').empty();
                $('#myModal .modal-body').empty();
                $('#myModal .modal-footer').empty();
                
                    
                var body = '<div>' +
                    '<p>Stock Number : ' + data.stock_number + '</p>' +
                    '<p>Product Name : ' + data.product_name + '</p>' +
                    '<p>Product Category : ' + data.product_category + '</p>' +
                    '<p>Product Price : ' + data.product_price + '</p>' +
                    '<p>Total Stock Available : ' + data.total_stock + '</p>' +
                    '<p>Is available : ' + data.is_available + '</p>' +
                    '<p>Supplier Name : ' + data.supplier_name + '</p>' +
                    '<p>Supplier Email : ' + data.supplier_email + '</p>' +
                    '<p>Supplier Number : ' + data.supplier_number + '</p>' +
                
                '</div>'
                $('#myModal .modal-body').html(body);
                
                
                if (action == 'delete'){
                var header= '<div align= "center">Are you sure you want to delete this item?</div>'

                var footer = '<div style="display:inline"><button trash-attr="' + inventory_id +   '" type="button" id = "inventory-add" class="btn btn-default delete_inventory_stock_number_final" aria-label="my button" style="border: 0px">' +
                    '<span class="glyphicon glyphicon-trash" style="color:#a0a0a0; font-size: 30px; vertical-align: middle;" aria-hidden="true"></span>' + 
                    'YES' +
                    '</button>' +
                    '<button type="button" id = "inventory-add" class="btn btn-default" aria-label="my button" style="border: 0px">' +
                    '<span class="glyphicon glyphicon-plus-sign" style="color:#a0a0a0; font-size: 30px; vertical-align: middle;" aria-hidden="true"></span>' + 
                    'NO' +
                    '</button></div>'
                }else if (action == 'view'){
                    var footer = '';
                    var header= '<div align= "center">ITEM INFORMATION</div>'

                }else{
                    var footer = '';
                    var header= '<div align= "center">ITEM INFORMATION</div>'

                }
                    
                $('#myModal .modal-header').html(header);

                $('#myModal .modal-footer').html(footer);
			},
			error : function(jqHXR, status, error){
				console.log(jqHXR, status, error)
				$('#login_form').hide();
				$('#login_form_status').html('<div>Error Occured, Try again...</div>').addClass("alert alert-danger").removeClass("alert-success");

				
			}
		});
}


function deleteInventory(stock_number){
        var token = localStorage.getItem('token');
			
		var data = {
              "stock_number" : stock_number
		};
		console.log('Here are the data to be added in inventory ', data)
		var url = '../inventory/delete/' + stock_number;
		
		$.ajax({
			dataType: 'json',
			url: url,
			type : 'POST',
			data : data,
            headers : {
				Authorization : token
			},
			success: function(data){
                footer = '<div>' + 
                    '<h2> Deleted Successfully </h2>' +
                    '</div>'
                $('#myModal .modal-footer').html(footer);
			},
			error : function(jqHXR, status, error){
				console.log(jqHXR, status, error)
				$('#login_form').hide();
				$('#login_form_status').html('<div>Error Occured, Try again...</div>').addClass("alert alert-danger").removeClass("alert-success");

				
			}
		});
}

//Will show only when user is not login
function authentication(){
				$('#myModal').modal('show');
				$('#myModal .modal-header').empty();
				$('#myModal .modal-body').empty();
				$('#myModal .modal-footer').empty();
				
				var login_description = '<div class="row">' +
							'<div class="col-md-12 well" style="align : center">' +
								'<form id="login_form" data-toggle="validator">' +
									'<div class="form-group">' +
										'<label>Email</label>' +
										'<input type="email" id= "login_email" class="form-control" name="email" value="">' +
									'</div>' +
									'<div class="form-group">' +
										'<label>Password</label>' +
										'<input type="password" id = "login_password" class="form-control" name="password" required>' +
									'</div>' +

									'<button id="login_btn"  type="submit" class="btn btn-warning btn-sm">Login</button>' +
								'</form>' +
								 '<div id="login_form_status"></div>' +
							'</div>' +
						'</div>';


				$('#myModal .modal-header').html('<div align= "center">Login To Continue...</div>');
				$('#myModal .modal-body').html(login_description);
				
				
					var rules = {
				         email: {
				             required: true,
				             email : true,
				             maxlength : 50,
				             minlength : 5
				         },
				         password : {
				         	required : true,
				         	minlength : 5,
				         	maxlength : 50

				         }
				     };
				     var messages = {
				         email: {
				             required: "Please enter your email",
				             maxlength : "More than 50 characters not allowed!",
				             minlength : "Minimum of 5 characters!"
				         }
				     };
				     $("#login_form").validate({
				         rules: rules,
				         messages: messages,
				        submitHandler: function(form) {
				        	$('#login_form_status').html("<br>All fields are valid...").addClass("alert alert-success")
   							console.log('myform', form)
   							$('#login_form_status').html();
   							ajaxAuth();
   							$('#loadCreateJob').show();
  						},
  						invalidHandler: function(event, validator) { 



  							$('#login_form_status').html("<br>Please Provide A Valid Credentials").addClass("alert alert-warning")
  							
  						}
 						
				     });
}



function addInventory(){
				$('#myModal').modal('show');
				$('#myModal .modal-header').empty();
				$('#myModal .modal-body').empty();
				$('#myModal .modal-footer').empty();
				

                
				var body = '<div class="row">' +
							'<div class="col-md-12 well" style="align : center">' +
								'<form id="inventory-add-form" data-toggle="validator">' +
                                    '<div class="form-group">' +
										'<label>Product Stock Number: </label>' +
										'<input type="text" id= "product_stock_number_add" class="form-control" name="product_stock_number_add" value="">' +
									'</div>' +
                                    '<div class="form-group">' +
										'<label>Product Image: </label>' +
										'<input id="inputFileToLoad" type="file" onchange="encodeImageFileAsURL();" />' +
										'<input type="hidden" id="imageprod" value="">' +
										/* '<input type="file" id="product_image_add" name="product_image_add" accept="image/png, image/jpeg">' + */
									'</div>' +
									'<div class="form-group">' +
										'<label>Product Name: </label>' +
										'<input type="text" id= "product_name_add" class="form-control" name="product_name_add" value="">' +
									'</div>' +
                                    '<div class="form-group">' +
										'<label>Product Description: </label>' +
										'<textarea type="text" id= "product_description_add" class="form-control" name="product_description_add" value=""></textarea>' +
									'</div>' +
                                    '<div class="form-group">' +
										'<label>Product Category: </label>' +
										'<select id="product_category_add" name = "product_category_add" class="form-control">' + 
																			'<option value="1">Abbrasive</option>' +
																			'<option value="2">Access Doors | Vents | Roof Access</option>' + 
                                                                            '<option value="3">Adhesives | Sealants | Tape</option>' + 
                                                                            '<option value="4">Air & Pneumatic Tools</option>' +
                                                                            '<option value="5">Cleaning | Waste Removal | Waste Storage</option>' +
																			'<option value="6">Concrete and Asphalt Chemicals</option>' + 
                                                                            '<option value="7">Concrete and Asphalt Products</option>' + 
                                                                            '<option value="8">Concrete Forming</option>' +
                                                                            '<option value="6">Construction Fabrics</option>' + 
                                                                            '<option value="7">Diamond Products</option>' + 
                                                                            '<option value="8">Doors and Windows</option>' +
                                                                            '<option value="9">Drill Bits and Drilling Accessories</option>' +
                                                                            '<option value="10">Drywall | Ceiling | Wall Panels</option>' + 
                                                                            '<option value="11">Electrical Products and Equipment</option>' + 
                                                                            '<option value="12">Electronics | Batteries</option>' +
                                                                            '<option value="13">Equipment</option>' + 
                                                                            '<option value="14">Erosion Control | SWPPP</option>' +
                                                                            '<option value="15">Fasteners | Anchors</option>' +
                                                                            '<option value="16"> Screws</option>' + 
                                                                            '<option value="17">Staple</option>' + 
                                                                            '<option value="18">Washer</option>' +
                                                                            '<option value="19">Bolts</option>' + 
                                                                            '<option value="20">Nails</option>' +
                                                                            '<option value="21">Nut</option>' + 
                                                                            '<option value="22">Fastening Pins & Inserts</option>' +
                                                                            '<option value="23">Flooring</option>' +
                                                                            '<option value="24"> Furniture</option>' + 
                                                                            '<option value="25">Hand Tools</option>' + 
                                                                            '<option value="26">Hardscapes</option>' +
                                                                            '<option value="27"> Hardware Supplies</option>' + 
                                                                            '<option value="28">Hydraulic Products</option>' + 
                                                                            '<option value="29">Industrial Pumps</option>' +
                                                                            '<option value="30">Industrial Raw Materials</option>' + 
                                                                            '<option value="31">Ladders | Platforms | Scaffolding</option>' +
                                                                            '<option value="32">Leveling | Measuring | Surveying</option>' + 
                                                                            '<option value="33">Lighting Supplies</option>' +
                                                                            '<option value="34">Lubrication | Oils | Grease</option>' +
                                                                            '<option value="35"> Lumber Products</option>' + 
                                                                            '<option value="36">Machining Supplies</option>' + 
                                                                            '<option value="37">Masonry</option>' +
                                                                            '<option value="38"> Material Handling | Storage | Containment</option>' + 
                                                                            '<option value="39">Office Supplies</option>' + 
                                                                            '<option value="40">Outdoor Products</option>' +
                                                                            '<option value="41">Paints | Equipment | Supplies</option>' + 
                                                                            '<option value="42">Plumbing Supplies</option>' +
                                                                            '<option value="43">Power Tool Accessories</option>' + 
                                                                            '<option value="44">Power Tools</option>' +
                                                                            '<option value="45">Power Transmission Products</option>' +
                                                                            '<option value="46"> Presses & Shop Equipment </option>' + 
                                                                            '<option value="47">Radios</option>' + 
                                                                            '<option value="48">Rebar and Wire Mesh</option>' +
                                                                            '<option value="49">Refrigeration | HVAC | Air Treatment | Etc.</option>' +
                                                                            '<option value="50"> Roofing and Siding</option>' + 
                                                                            '<option value="51">Safety Equipment and Products</option>' + 
                                                                            '<option value="52">Security Equipment and Accessories</option>' +
                                                                            '<option value="53">Shop Vacuums</option>' + 
                                                                            '<option value="54">Strapping</option>' +
                                                                            '<option value="55">Structural Hardware</option>' + 
                                                                            '<option value="56">Strut, Channel, & Fittings</option>' +
                                                                            '<option value="57">Testing Instruments for all Purposes</option>' +
                                                                            '<option value="58"> Tiles and Detectable Warning Pads </option>' + 
                                                                            '<option value="59">Tilt Up</option>' + 
                                                                            '<option value="60">Tool Storage | Job Site Boxes | Truck Boxes | Transfer Tanks</option>' +
                                                                            '<option value="61"> Trench Drains </option>' + 
                                                                            '<option value="62">Waterproofing Products</option>' +
                                                                            '<option value="63">Welding Products and Equipment</option>' + 
                                                                         
                                                                            
                                       ' </select>' +
									'</div>' +
                                    '<div class="form-group">' +
										'<label>Product Price: </label>' +
										'<input type="number" id= "product_price_add" class="form-control" name="product_price_add" value="">' +
									'</div>' +

                                   
                                    '<div class="form-group">' +
										'<label>Item Supplier : </label>' +
										'<input type="text" id= "product_item_supplier_add" class="form-control" name="product_item_supplier_add" value="">' +
									'</div>' +
                                    '<div class="form-group">' +
										'<label>Supplier Name: </label>' +
										'<input type="text" id= "product_supplier_name_add" class="form-control" name="product_supplier_name_add" value="">' +
									'</div>' +
                                    '<div class="form-group">' +
										'<label>Supplier Email: </label>' +
										'<input type="email" id= "product_supplier_email_add" class="form-control" name="product_supplier_email_add" value="">' +
									'</div>' +
                                    '<div class="form-group">' +
										'<label>Supplier Number: </label>' +
										'<input type="text" id= "product_supplier_number_add" class="form-control" name="product_supplier_number_add" value="">' +
									'</div>' +
                                    '<div class="form-group">' +
										'<label>Is this Item Available: </label>' +
										'<select id="product_is_available_add" name = "product_is_available_add" class="form-control">' + 
																			'<option value="Y">YES</option>' +
																			'<option value="N">NO</option>' + 
                                                                            '<option value="NS">NOT SURE</option>' + 
                                                                           
                                       ' </select>' +
									'</div>' +
                                    
                                    ' spot for file upload ' +
									

									'<button id="inventory_add_btn"  type="submit" class="btn btn-warning btn-sm">Insert</button>' +
								'</form>' +
								 '<div id="login_form_status"></div>' +
							'</div>' +
						'</div>';


				$('#myModal .modal-header').html('<div align= "center">ADD INVENTORY</div>');
				$('#myModal .modal-body').html(body);
                    

				
					var rules = {
				        product_stock_number_add: {
				             required: true,
				             email : false,
                             number : true,
				             maxlength : 50,
				             minlength : 5
				         },
				         product_name_add : {
				         	required : true,
				         	minlength : 5,
				         	maxlength : 50
				         },
                         product_description_add : {
				         	required : true,
				         	minlength : 5,
				         	maxlength : 50
				         },
                         product_category_add : {
				         	required : true,
				         	min : 0,
                            number : true,
				         	max: 500
				         },
                         product_price_add : {
				         	required : true,
				         	min : 0.01,
                            number : true,
				         	max : 5000000
				         },
                         product_delivery_date_add : {
				         	required : true,
				         	minlength : 0,
				         	maxlength : 500
				         },
                         product_total_stock_add : {
				         	required : true,
				         	min : 0,
				         	max : 999999,
                            number : true
				         },
                         product_item_supplier_add : {
				         	required : true,
				         	minlength : 5,
				         	maxlength : 100
				         },
                         product_supplier_name_add : {
				         	required : true,
				         	minlength : 5,
				         	maxlength : 50
				         },
                          product_supplier_email_add : {
				         	required : true,
				         	minlength : 5,
                            email : true,
				         	maxlength : 50
				         },
                          product_supplier_number_add : {
				         	required : true,
				         	minlength : 5,
				         	maxlength : 50
				         },
                          product_is_available_add : {
				         	required : true,
				         	minlength : 1,
				         	maxlength : 50
				         },
				     };
				     var messages = {
				         email: {
				             required: "Please enter your email",
				             maxlength : "More than 50 characters not allowed!",
				             minlength : "Minimum of 5 characters!"
				         }
				     };
				     $("#inventory-add-form").validate({
				         rules: rules,
				         messages: messages,
				        submitHandler: function(form) {

				        	
   							//insert items
                            insertInventory();
                        
  						},
  						invalidHandler: function(event, validator) { 
  							$('#login_form_status').html("<br>Please Provide A Valid Credentials").addClass("alert alert-warning")
  							
  						}
 						
				     });
}



//Display the list of jobs by category
$(document).ready(function(){


  /*  $("#diy-tab-0").click();
    VANTA.DOTS({
      el: "#footer1",
      color: 0xfafafa,
      color2: 0x2d20ff,
      backgroundColor: 0x0
    })
    */



	$('#authenticate').show();
	$('#authenticate').click(function(){
		authentication();
	});
	
	$('#user_profile').click(function(){
		showProfile();
	});
	

	
    $('#clickhome').click(function(){
		/*$('#footer1').show()*/
	});
	
	
	$('#loadcredo').click(function(){
			$('#register_btn').show();
			$('#hideme').show();
            
			var bitcore = require('bitcore-lib');
			var privateKey = new bitcore.PrivateKey();

			var address = privateKey.toAddress();
			var wifPrivate = privateKey.toWIF()
			var publicKey = privateKey.toPublicKey()
			
			$("#username").val(address)
			$("#pubKey").val(publicKey)
			$("#privKey").val(wifPrivate)
			
			//Change Public Key in production
			var publicKeys = [
				'0340ee76727a68032229395cf5c998bf4ae039f7f42d217b8876a057fa57439674',
				'025f537f4c96939a23e542f74da3a0ee35b41bcc058879d32bc926ebfce5bd338d' 
			];

			publicKeys.push(publicKey);
			var requiredSignatures = 2;
			var depositAddress = new bitcore.Address(publicKeys, requiredSignatures);
			$("#d").val(depositAddress)
			
			
			//ajax to get the captcha
			
			
			var url = '/captcha';
			
			
			$.ajax({
				dataType: 'json',
				url: url,
				type : 'POST',
				success: function(data){
					var x = '<div align = "center" class="rounded">'+ data.captcha + '<div>' + 
						'<div><input type="hidden" class="form-control" id="regCaptcha-id" value="'+ data.id + '">' +
					'</div>';
					
					
					
					$('#regCaptcha').html(x);
					console.log(data)
                    
                  
                    
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
    
    
    

    
    $('#inventory_nav').click(function(){
        var skip = 0;
        var limit = 100;
		var url = '../inventory/getbycategory/' + skip + '/' + limit;
		var token = localStorage.getItem('token');
		console.log("token getting" , token); 
        console.log("URL " , url); 
        
        $.ajax({
				dataType: 'json',
				url: url,
				type : 'POST',
                headers : {
                    Authorization : token
                },
				success: function(data){
					console.log(data);
                    var arrayLength = data.length;
                    
                        
                    var tableHeader = '<table class="table table-striped" cellpadding="0" cellspacing="0" border="0">' +
							   '<thead>' +
									'<tr>' +
									'<strong>' +
									  '<th style="text-align:center">Stock Number</th>' +
                                      '<th style="text-align:center">Image</th>' +
									  '<th style="text-align:center">Product Name</th>' +
									  '<th style="text-align:center">Product Price</th>' +
									  '<th style="text-align:center">Available Stock</th>' +
								
									  '</strong>' +
									'</tr>' +
								 '</thead>' +
								'</table>';
				
		
                    $("#inventory_header1").html(tableHeader);
                            
                    for(var i=0; i < data.length; i++){
								//if userType is admin enable button else disabl
								$('#inventory_header1 table').append('<tr style="text-align:center">' +
								'<td style="text-align:center">' + data[i].stock_number + ' <span data-toggle ="modal" data-target="myModal" add_orders_price_per_unit_attr = "' + data[i].product_price + '" title = "Add Order" add-order-attr="' + data[i]._id + '" class="glyphicon glyphicon-shopping-cart customer admin add-order" style="color:blue"></span><span title = "Add Deliveries" add-deliveries-attr="' + data[i]._id + '" class="glyphicon glyphicon-plus-sign admin add-deliveries" style="color:blue"></span><span title = "View" view-attr="' + data[i]._id + '" class="glyphicon glyphicon-eye-open admin view_inventory_stock_number" style="color:blue"></span><span title  = "Edit" edit-attr="' + data[i]._id + '" class="glyphicon glyphicon-edit admin edit_inventory_stock_number" style="color:blue"></span><span title = "Delete" trash-attr="' + data[i]._id + '" class="glyphicon glyphicon-trash admin delete_inventory_stock_number" style="color:blue"></span></td>' +
								'<td style="text-align:center"><img class="mx-auto d-block" src="' + data[i].product_image  + '" </img></td>' +	
                                '<td style="text-align:center">' + data[i].product_description  + '</td>' +	
								'<td style="text-align:center">' + data[i].product_price  + '</td>' +	
                                '<td style="text-align:center">' + data[i].total_stock  + '</td>' +	                                
                                '</td>' +		
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
    
    
    
    
                
    $('#inventory-add').click(function(){
		var url = '../inventory/insert'
		var token = localStorage.getItem('token');
		console.log("token getting" , token); 
        console.log("URL " , url); 
        
        addInventory();
	});
    
    
    $('#sort_inventory').click(function(){
		var url = '../inventory/getbycategoryandsort/:category/:sort/:skip/:limit'
		var token = localStorage.getItem('token');
        var skip = 0;
        var limit = 100
		console.log("token getting" , token); 
        
        var sort_inventory_by_category = $('#sort_inventory_by_category').val();
        var sort_inventory_by_order = $('#sort_inventory_by_order').val();
        var url = '../inventory/getbycategoryandsort/' + sort_inventory_by_category + '/' + sort_inventory_by_order + '/' + skip + "/" + limit;
        console.log("URL " , url); 
        
        console.log(sort_inventory_by_category)
        console.log(sort_inventory_by_order)
	});
    
    $('#cart_nav').click(function(){
        
    });
    

});





$(document).on('click', ".delete_inventory_stock_number", function() {
    var z = $(this).attr('trash-attr');
    console.log("trash attr", z);
    //alert("Hana")
    //deleteInventory(z);
    getInventory(z, 'delete')
    
    
    

});



$(document).on('click', ".delete_inventory_stock_number_final", function() {
    var z = $(this).attr('trash-attr');
    console.log("trash attr", z);
    //alert("Hana")
    deleteInventory(z);

});

$(document).on('click', ".view_inventory_stock_number", function() {
    var z = $(this).attr('view-attr');
    console.log("view attr", z);
    //alert("Hana")
    //deleteInventory(z);
    getInventory(z, 'view')
    $('#myModal .modal-footer').empty();
});

$(document).on('click', ".add-deliveries", function() {
    var z = $(this).attr('add-deliveries-attr');
    console.log("add deliveries attr", z);
    //alert("Hana")
    //deleteInventory(z);
    
    $('#myModal').modal('show');
				$('#myModal .modal-header').empty();
				$('#myModal .modal-body').empty();
				$('#myModal .modal-footer').empty();

  
				var body = '<div class="row">' +
							'<div class="col-md-12 well" style="align : center">' +
								'<form id="add-delivery-for," data-toggle="validator">' +
									
									'<div class="form-group">' +
										'<label>Quantity: </label>' +
										'<input type="number" id= "add_deliveries_quantity" class="form-control" name="add_deliveries_quantity" value="">' +
									'</div>' +
									
									'<div class="form-group">' +
										'<label>Unit: </label>' +
										'<input type="number" id= "add_deliveries_unit" class="form-control" name="add_deliveries_unit" value="">' +
									'</div>' +
									
									'<div class="form-group">' +
										'<label>Price Per Unit</label>' +
										'<input type="text" id = "add_deliveries_price_per_unit" class="form-control" name="add_deliveries_price_per_unit" >' +
									'</div>' +
                                    
                                    '<div class="form-group">' +
										'<label>Additional Cost</label>' +
										'<input type="text" id = "add_deliveries_additional_cost" class="form-control" name="add_deliveries_additional_cost" >' +
									'</div>' +
                                    
                                    '<div class="form-group">' +
										'<label>Taxes</label>' +
										'<input type="text" id = "add_deliveries_taxes" class="form-control" name="add_deliveries_taxes" >' +
									'</div>' +
                                    
                                    '<div class="form-group">' +
										'<label>Receiving Date: </label>' +
										'<input type="Date" id = "add_deliveries_receiving_date" class="form-control" name="add_deliveries_receiving_date" >' +
									'</div>' +
                                    
                                    '<div class="form-group">' +
										'<label>Additional Notes: </label>' +
										'<input type="text" id = "add_deliveries_additional_notes" class="form-control" name="add_deliveries_additional_notes" >' +
									'</div>' +
									
									'<div align="center" class="form-group">' +
										'<button inventory-id = "' + z + '" id="add-deliveries-final"  class="btn btn-info btn-sm add-deliveries-final">ADD</button>' +
									'</div>' +
								'</form>' +
								 '<div id="withdrawal_form_status"></div>' +
							'</div>' +
						'</div>';


				$('#myModal .modal-header').html('<div align= "center">ADD DELIVERIES</div>');
				$('#myModal .modal-body').html(body);
    
});


$(document).on('click', ".add-deliveries-final", function() {
    var z = $(this).attr('inventory-id');
    var token = localStorage.getItem('token');
    var url = '../inventory/receiving/insert'
    var data = {
              'inventory_id' : z,
              'quantity' : $('#add_deliveries_quantity').val(),
              'unit' : $('#add_deliveries_unit').val(),
              'price_per_unit' : $('#add_deliveries_price_per_unit').val(),
              'additional_cost_acquisition' : $('#add_deliveries_additional_cost').val(),
              'taxes' : $('#add_deliveries_taxes').val(),
              'receiving_date' : $('add_deliveries_receiving_date').val(),
              'notes' : $('#add_deliveries_additional_notes').val()
		};
    console.log("Adding receivables", data)
    
    $.ajax({
				dataType: 'json',
				url: url,
				type : 'POST',
                data : data,
                headers : {
                    Authorization : token
                },
				success: function(data){
					alert("Successfully")
                    
				},
				error : function(jqHXR, status, error){
                    alert("There was an Error")
							
				}
			});
    
    
});

//add order
$(document).on('click', ".add-order", function() {
    $('#myModal').show();
    var z = $(this).attr('add-order-attr');
    var p = $(this). attr('add_orders_price_per_unit_attr')
    console.log("add orders attr", z);
    console.log("add price orders attr", p);
    //alert("Hana")
    //deleteInventory(z);
    

				$('#myModal .modal-header').empty();
				$('#myModal .modal-body').empty();
				$('#myModal .modal-footer').empty();

  
				var body = '<div class="row">' +
							'<div class="col-md-12 well" style="align : center">' +
								'<form id="add-delivery-for," data-toggle="validator">' +
									
									'<div class="form-group">' +
										'<label>Quantity: </label>' +
										'<input type="number" id= "add_orders_quantity" class="form-control" name="add_deliveries_quantity" value="">' +
									'</div>' +
                                    
                                    '<div class="form-group">' +
										'<input type="hidden" id= "add_orders_price_per_unit" class="form-control" name="add_orders_price_per_unit" value="' + p + '">' +
									'</div>' +

									
								'</form>' +
                                '<div align="center" class="form-group">' +
										'<button   enabled inventory-id = "' + z + '" id="add-order-final"  class="btn btn-info btn-sm add-orders-final">ADD</button>' +
								 '</div>' +
								 '<div id="withdrawal_form_status"></div>' +
							'</div>' +
						'</div>';

				$('#myModal .modal-header').html('<div align= "center">ADD ORDER</div>');
				$('#myModal .modal-body').html(body);
               
    
});


$(document).on('click', ".add-orders-final", function() {
    var z = $(this).attr('inventory-id');
    var token = localStorage.getItem('token');
    var url = '../inventory/orders/insert'
    

    var data = {
              'inventory_id' : z,
              'quantity' : $('#add_orders_quantity').val(),
              'price_per_unit' : $("#add_orders_price_per_unit").val(),
              'order_status' : 'added-to-cart'
		};
    console.log("Adding receivables", data)
    
    $.ajax({
				dataType: 'json',
				url: url,
				type : 'POST',
                data : data,
                headers : {
                    Authorization : token
                },
				success: function(data){
					//alert("Successfully")
                    $('#add-order-final').text("SUCCESS");
                    $('#add-order-final').attr("disabled", true);

                    
				},
				error : function(jqHXR, status, error){
                    //alert("There was an Error")
                    $('#add-order-final').text("ERROR");
							
				}
			});
    
    
});


