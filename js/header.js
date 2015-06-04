var FLAG_isStartStateExists = false;	//flag to check if user has set starting state, initially set false
var dfaStatesListArray = [];	// holds the states of DFA
var dfaStartingState = null;	// reference to the starting state of FSM
var graphVizFinalStates = [];	//holds final states of DFA - graphviz helper 
var graphVizStartState = "";	//holds Start states of DFA - graphgiz helper

var dfaFinalStates = [];	//holds final states of DFA
var dfaLanguageWordsArray = []; 	//helper for createFileOfPossibleWords function. stores the words of language

//helper function - class Alike! Stores information of a DFA state

 function dfaStateObject(){
	this.stateName = "";
	this.isCurrentStateStartingStateFlag = 0;
	this.isCurrentStateFinalStateFlag = 0;
	this.transitions = {};
	this.next = {};	//KeyVal pairs
	this.isCurrentStateHasLoop = 0;

	this.construct = function(isCurrentStateStartingStateFlag, isCurrentStateFinalStateFlag, stateName, transitions)	{
		this.isCurrentStateStartingStateFlag = isCurrentStateStartingStateFlag;
		this.isCurrentStateFinalStateFlag = isCurrentStateFinalStateFlag;
		this.stateName = stateName;
		this.transitions = transitions;
	}
}