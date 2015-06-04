//header.js

//user enters data in form for each state and on adding, this function handles form data
function addStateFromFormToDFAStatesList(form) {
	//set initially values of flags = 0
	var isCurrentStateStartingStateFlag = 0;
	var isCurrentStateFinalStateFlag = 0;
	
	var stateName = form.stateName.value;
	var DFATransitionsRawInput = form.transitions.value;
	
	if($("#DFAStartStateCheckBox").is(':checked'))	{
		isCurrentStateStartingStateFlag = 1;
	}
	if($("#DFAFinalStateCheckBox").is(':checked'))	{
		isCurrentStateFinalStateFlag = 1;
		
		//adding state to the final states array for graph construction
		if($.inArray(stateName, graphVizFinalStates) == -1) {
			graphVizFinalStates.push(stateName);
			console.log("final states: " + graphVizFinalStates);
		}		
	}
	
	$("#dfaTransitions").append("State: " + stateName + " |  Transitions: " + DFATransitionsRawInput + "<br/>");
	
	//New instance of DFAStateObject - like object of class with data about the state
	var tempDFACurtState = new dfaStateObject();
	
	if(!FLAG_isStartStateExists && isCurrentStateStartingStateFlag == 1)	{
		//hide the checkbox
		$("#startingStateLabel").remove();
		FLAG_isStartStateExists = true;
		dfaStartingState = tempDFACurtState;
		graphVizStartState = stateName;
	}

	//cleaning the user input
	DFATransitionsRawInput = DFATransitionsRawInput.replace(/\s+/g, '');
	
	var DFATransitions = {};
	
	//extracting key val pairs from transitions string
	
	
	if(DFATransitionsRawInput != ""){
		DFATransitionsStringToken = DFATransitionsRawInput.split(',');
		for (i = 0; i < DFATransitionsStringToken.length; i+=2) { 
			//extracting info from string that is splitted e.g (a,B) - here symbol is at 1 place
	    	var stateSym = DFATransitionsStringToken[i].substring(1);
			// end bracket remove and substring 
	    	var nextStateForGivenSym = DFATransitionsStringToken[i+1].substring(0, DFATransitionsStringToken[i+1].length-1);
	    	//save it in array
			DFATransitions[stateSym] = nextStateForGivenSym;
		}
	}
	
	tempDFACurtState.construct(isCurrentStateStartingStateFlag,isCurrentStateFinalStateFlag,stateName,DFATransitions);
	//update the list of DFA States
	dfaStatesListArray.push(tempDFACurtState);
	
	if(isCurrentStateFinalStateFlag)	{
		//update final states list
		dfaFinalStates.push(tempDFACurtState);
	}
	
	//reset and make it ready for next drawing!
	$('#formDFADetail')[0].reset();
}

//Loop through the DFA states list to find any state provided it's name 
function getStateFromStatesList(stateName)	{
	for (var i = 0; i < dfaStatesListArray.length; i++) {
	    if(dfaStatesListArray[i].stateName === stateName ){
	    	console.log(dfaStatesListArray[i]);
	    	return dfaStatesListArray[i];
	    }
	}
	return null;
}


//recursion function - called in generateDFAGraph() 
function populateDFAStatesListArrayRecursively(currentStateObject, transitions)	{
	
	//base case - reaches end; or state with no further transitions
	if (transitions.length <= 0)
		return;
	
	else	{
		for (var stateSymbol in transitions) {
		    //get the next state from array of stateSymbols individually 
			var nxtStateForSymbol = transitions[stateSymbol];
		    // find obj in dfaStatesListArray
		    var nxtDFAStateObject = getStateFromStatesList(nxtStateForSymbol);
			console.log(nxtDFAStateObject);
			
		    if(nxtDFAStateObject != null)	{
			    currentStateObject.next[stateSymbol] = nxtDFAStateObject;
				//don't span state if it has loop else it will go for infinite
			    if(nxtDFAStateObject.isCurrentStateHasLoop != 1)	{
			    	currentStateObject.isCurrentStateHasLoop = 1;
			    	//again loop recursively until base case is reached
					console.log("before recursion again");
					populateDFAStatesListArrayRecursively(nxtDFAStateObject, nxtDFAStateObject.transitions);
			    }			    
			}
		}
	}
}

function generateDFAGraph()	{
	var startFlag = dfaStartingState;
	if(startFlag){
		var ele = document.getElementById("DFAInteractiveForm");
		$("#dfaGraph").show();
		$("#AddStateBtn").prop('disabled', true);
		$("#GenDFABtn").prop('disabled', true);		
		populateDFAStatesListArrayRecursively(startFlag, startFlag.transitions);
	}
	else	{
		alert("Error: Unable to Draw DFA. Please Add Some States");
	}
	
	//draw graph
	printAllStatesAndDrawDFA();
	//Notify about Episolon
	islanguageContainsEpisolon();
	//Prepare a file of words & tell user if language is empty or not
	var fd = "";
	createFileOfPossibleWords(fd);
}


//string validator stringValidator.js

//printAllStatesAndDrawDFA

function islanguageContainsEpisolon() {
	$("#isLanguageContainE").show();
	var tempState = dfaStartingState;
	if(tempState.isCurrentStateFinalStateFlag == 1) {
			$("#isLanguageContainE").html("<b>Language Contains ε </b>");
	} else {
		$("#isLanguageContainE").html("<b>Language doesn't Contains ε </b>");
		
	}
	
}

//dfaLanguageWords.js



