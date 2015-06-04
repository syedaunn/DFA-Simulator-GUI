function createFileOfPossibleWords(fileDescriptor) {
	
	dfaLanguageWordsArray = [];
	
	var wordString = "";
	var currWordLength = 0;
	
	console.log("In prepareAcceptedWordRecursively\n");
	prepareAcceptedWordRecursively(dfaStartingState, wordString, currWordLength);
	console.log(dfaLanguageWordsArray);
	
	//update the link of download file	
	var link = document.getElementById('fileDownloadLink');
    link.href = makeTextFile(dfaLanguageWordsArray);
    link.style.display = 'block';
	
	$("#isLanguageEmptyAlert").show();
	if(dfaLanguageWordsArray.length == 0) {
		console.log("Empty Language");
		$("#isLanguageEmptyAlert").html("<b>Language is Empty </b>");
		
	} else {
		console.log("non empty language");
		$("#isLanguageEmptyAlert").html("<b>Language is not Empty </b>");
	}
	
	return dfaLanguageWordsArray;
	
}

function prepareAcceptedWordRecursively(currentStateObject, wordString, currWordLength)	{
	//incrementing the length as we need upto 10 
	currWordLength++;
	if(currentStateObject.isCurrentStateFinalStateFlag == 1){
		if(wordString==""){
			dfaLanguageWordsArray.push("E");	
		} else {
			dfaLanguageWordsArray.push(wordString);
		}
	}
	if(Object.getOwnPropertyNames(currentStateObject.next).length === 0 || currWordLength > 10){
		return;
	}
	else	{
		for (var DFAStateSymbol in currentStateObject.next) {
		    var nextDFAState = currentStateObject.next[DFAStateSymbol];
		    //concatenate and extend word
			concatenatedWord = wordString + DFAStateSymbol;
		    if(nextDFAState != null){
				//recursively span and loop through it.
	    		prepareAcceptedWordRecursively(nextDFAState, concatenatedWord, currWordLength);
	    	}		    
		}
	}

}

var textFile = null,	

	makeTextFile = function (text) {
		var data = new Blob([text], {type: 'text/plain'});

		// If we are replacing a previously generated file we need to
		// manually revoke the object URL to avoid memory leaks.
		if (textFile !== null) {
		  window.URL.revokeObjectURL(textFile);
		}

		textFile = window.URL.createObjectURL(data);

		// returns a URL you can use as a href
		return textFile;
  };