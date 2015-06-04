function printAllStatesAndDrawDFA() {
	
	var tempStateList = dfaStatesListArray;
	
	var graphvizString = "digraph finite_state_machine {";
	graphvizString = graphvizString + "rankdir=LR;";
	
	graphvizString = graphvizString + "node [shape = doublecircle];";
	
	//APPEND FINAL STATES
	for(var j=0; j < graphVizFinalStates.length; j++ ) {
		graphvizString = graphvizString + graphVizFinalStates[j] + "; ";		
	}
	
	graphvizString = graphvizString + "node [shape = circle];";
	graphvizString = graphvizString + "secret_node [style=invis, shape=point];";
	graphvizString = graphvizString + "secret_node -> " + graphVizStartState + " [style=bold];";
	
	
	for (var i = 0; i < tempStateList.length; i++) {
		console.log(tempStateList[i]);
		tempStateListCurrentNode = tempStateList[i];
		
		var tempTransitions = tempStateListCurrentNode.transitions;
		
			for (var sym in tempTransitions) {
				
				console.log("> " + tempStateListCurrentNode.stateName + " -> " + tempTransitions[sym] + " [ label = \"" + sym + "\"  ];" );
				graphvizString = graphvizString + tempStateListCurrentNode.stateName + " -> " + tempTransitions[sym] + " [ label = \"" + sym + "\"  ];";
//				console.log("s0 -> s1 [ label = \"a\"  ];");
			}

	}
	
	graphvizString = graphvizString + "}";
	
	console.log("----------------");
	console.log(graphvizString);
	
	var gvizXml = Viz(graphvizString, "svg");
	
	var ele = document.getElementById("DFADrawing");
	ele.style.visibility="visible";
	
	$("#DFADrawing").html(gvizXml);
	$("#DFADrawing").show();
		
}