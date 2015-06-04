// test the user string for validity
function testUserString(form)	{
	
	var userInputString = form.inputTestString.value;
	console.log("String to Check: " + userInputString );
	
	//get an instance of starting state as we need to start checking from that
	var tempState = dfaStartingState;
	console.log(tempState);
	console.log("here: val of final state: " + tempState.isCurrentStateFinalStateFlag);
	
	//language accepts Episolon
	if(tempState.isCurrentStateFinalStateFlag==1 && userInputString == "")	{
		$("#StringValidationAlert").removeClass('alert-danger');
		$("#StringValidationAlert").addClass('alert-success');
		$("#stringValidationText").html('<font face="verdana" color="white">Valid!</font>');
		return 1;
	}
	
	// none found
	for (var i = 0; i < userInputString.length; i++) {
		console.log(tempState);
		tempState = tempState.next[userInputString.charAt(i)];
		console.log(tempState);
		if(!tempState)	{
			$("#StringValidationAlert").addClass('alert-danger');
			$("#stringValidationText").html('<font face="verdana" color="white">Invalid!</font>');
			return 0;
		}
	}
	
	//if it is accepting - final state
	if(tempState.isCurrentStateFinalStateFlag == 1)	{
		$("#StringValidationAlert").removeClass('alert-danger');
		$("#StringValidationAlert").addClass('alert-success');
		$("#stringValidationText").html('<font face="verdana" color="white">Valid!</font>');
		return 1;
	}
	
	$("#StringValidationAlert").addClass('alert-danger');
	$("#stringValidationText").html('<font face="verdana" color="white">Invalid!</font>');
	return 0;
}