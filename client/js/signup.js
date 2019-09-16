
$( document ).ready(function() {
     var bitcore = require('bitcore-lib');
    var privateKey = new bitcore.PrivateKey();

	var address = privateKey.toAddress();
	var wifPrivate = privateKey.toWIF()
	var publicKey = privateKey.toPublicKey()
	console.log(address)
	$("#a").val(address)
	$("#b").val(publicKey)
	$("#c").val(wifPrivate)
	
	var publicKeys = [
		'0340ee76727a68032229395cf5c998bf4ae039f7f42d217b8876a057fa57439674',
		'025f537f4c96939a23e542f74da3a0ee35b41bcc058879d32bc926ebfce5bd338d' 
	];

	publicKeys.push(publicKey);
	var requiredSignatures = 2;
	var depositAddress = new bitcore.Address(publicKeys, requiredSignatures);
	$("#d").val(depositAddress)
	
	
	


});	