$(document).ready(function(){
	
    $("#dialButton").click(function () {
		alert('dial clicked');
    });	


	var tokenRequest    = new XMLHttpRequest();
	tokenRequest.onload = function() {
  
    //alert(tokenRequest.responseText);
	Twilio.Device.setup(tokenRequest.responseText);
    var connection=null;
    
    
    $("#dialButton").click(function () {
        params = {
            "PhoneNumber": $('#phoneNumber').val(),
                "FromNumber": "+1XXXXXXXXXX", // your Twilio phone number
                "FromName": "Name" // Your Twilio name
        };
        connection = Twilio.Device.connect(params);
    });
    
    $("#hangupButton").click(function() {
                             Twilio.Device.disconnectAll();
                             });
    
    
    Twilio.Device.ready(function (device) {
                        $('#statusMessage').text('Ready to start call');
                        });
    
    Twilio.Device.incoming(function (conn) {
                           if (confirm('Accept incoming call from ' + conn.parameters.From + '?')){
                            connection=conn;
                            conn.accept();
                            }
                           });
    
    Twilio.Device.offline(function (device) {
                          //$('#statusMessage').text('Offline');
                          });
    
    Twilio.Device.error(function (error) {
                        $('#statusMessage').text(error);
                        });
    
    Twilio.Device.connect(function (conn) {
                          $('#statusMessage').text("Successfully established call");
                          $('#dialButton').toggle();
                          $('#hangupButton').toggle();
                          });
    
    Twilio.Device.disconnect(function (conn) {
                             $('#statusMessage').text("Call ended");
                             $('#dialButton').toggle();
                             $('#hangupButton').toggle();
                             });
  };
    
    
  tokenRequest.open('GET', 'http://you-web-site.com/Twillio/get_token.php'); //view the php folder in this project
  tokenRequest.send();
  
});
                                