
//====================================================================//
//          Main event to add reload to navigation functions          //
//====================================================================//
window.addEventListener("bridgeInitializeStart", function(evnt) {
	// get hold of the guideBridge object
	var gb = evnt.detail.guideBridge;
	gb.connect(function (){
		// this callback will be called after adaptive form is initialized
		guideBridge.on("elementNavigationChanged", function (event, payload) {
			// run code
			determineFieldsToShow();
		});
	});
});

//====================================================================//
//    Main function to parse form model and create object array       //
//====================================================================//
function determineFieldsToShow() {

	var fieldArray = []; // define global array

	window.guideBridge.visit(function(cmp){
	
		// Check its a valid field to be shown on the summary page
		
			// Add valid entries to array as new objects to be able to define specfic field types (used later)
			// for example
			fieldArray.push({
				"type":"block_heading",
				"size":size(cmp),
				"name":cmp.name,
				"value":$(cmp.value).html(),
				"grouped":grouped,
				"hideLink":hideLink, 
				"className":cmp.className, 
				"cssClassName":cmp.cssClassName,
				"id":cmp.id,
				"som":cmp.somExpression
			});
            

	});
	
	renderFields();
}

//====================================================================//
//    Main function to render summary component from object array     //
//====================================================================//
function renderFields() {

	var $html = $("#htmlNodeToBeRepaced");	// Static HTML node found on the page to be replaced with the dynamic container to be populated

	// Iterate fieldArray array
	for(var i = 0; i < fieldArray.length; i++){
	
		// Depending on field type detected, create a field specific version of the row for the summary
		// For example
		switch (fieldArray[i].type) {
			case "block_heading":
				var label = "<div class='labelClass'>" + fieldArray[i].label + "</div>";
				var value = "<div class='valueClass'>" + fieldArray[i].value + "</div>";
				var link = "<div class='linkClass'>" + fieldArray[i].linkHTML + "</div>";
				var rowHTML = "<div class='rowClass'>" + label + value + link + "</div>"
				$(rowHTML).appendTo($html);
				
				// It might also be neccesary to add events to the elements added to the page, something like
				$(".elementToFind").on('click', '#elementToUpdate',{som:som}, goToField);
				break;
		}
	}
}

//==============================//
// utility function 		//
//==============================//
function goToField(event){
    //	go to the field
    guideBridge.setFocus(event.data.som, "firstItem", false);
}
