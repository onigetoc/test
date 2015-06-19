<?php
include '../Services/Twilio/Capability.php'; // Enter the right path to Capability.php

// put your Twilio API credentials here
$accountSid = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
$authToken  = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

// put your Twilio Application Sid here
$appSid     = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

// put your default Twilio Client name here
$clientName = 'jeny';

// get the Twilio Client name from the page request parameters, if given
if (isset($_REQUEST['client'])) {
    $clientName = $_REQUEST['client'];
}

$capability = new Services_Twilio_Capability($accountSid, $authToken);
$capability->allowClientOutgoing($appSid);
$capability->allowClientIncoming($clientName);
$token = $capability->generateToken();

//echo '{"twilioToken": "'.$token.'"}';
echo $token;
?>