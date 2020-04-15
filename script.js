// Using the Shopping List files from the previous videos update the shopping list app to do the following:

// 1. If you click on the list item, it toggles the .done class on and off.
// 2. Add buttons next to each list item to delete the item when clicked on its corresponding delete button.
// 3. BONUS: When adding a new list item, it automatically adds the delete button next to it (hint: be sure to check if new items are clickable too!)
// 4. MY PESONAL BONUS: Make existing items editable
// NEED TO DISABLE OTHER BUTTONS WHEN IN EDIT MODE

// DOM Strings
var button = document.getElementById("enter");
var input = document.getElementById("inputText")
var ul = document.querySelector("ul");
var li = document.querySelector("li");
var del = document.getElementsByClassName("del");
var edit = document.getElementsByClassName("edit");

var tickBtn = li.childNodes[3];
var delBtn = li.childNodes[5];

function clearInput() {
	// Clear input field
	input.value = "";
	// Focus style on input field
	input.focus();
}

function addListItem() {
	// 1. Create a new list item and span
	var listItem = document.createElement("li");
	var spanEl = document.createElement("span");
	// 2. Get value of the input
	var inputItem = document.createTextNode(input.value);
	// 3. Create Delete & Edit Buttons to add to list items
	var editBtn = document.createElement("button");
	editBtn.classList.add("edit");
	editBtn.innerHTML = "Edit";
	var delBtn = document.createElement("button");
	delBtn.classList.add("del");
	delBtn.innerHTML = "Del";
	// 4. Add value to the new span item then add to list item
	listItem.appendChild(spanEl);
	spanEl.appendChild(inputItem);
	// 5. Add edit and delete buttons to list item
	listItem.appendChild(editBtn);
	listItem.appendChild(delBtn);
	// 6. Add new list item to the bottom of the ul
	ul.appendChild(listItem);
	// 7. Clear the input and add fosus()
	clearInput();
}

// Edit an existing list item [FIRST STEP - OUT OF THREE]
function editListItem(event) {
	var editContent = event.target.parentNode.getElementsByTagName("span")[0];
	// If editContent is true while in it:
	if(editContent) {
		// if edit mode hasn't been selected yet
		if(event.target.className === "edit") {
			editItem(event);
			// else if buttons are still in edit mode
		} else if(event.target.className === "tick") {
			if(inputValueLength() > 0) {
				confirmEdit(event);
			} else {
				alert("Can't be empty!")
				editItem(event);
			}
		} 
	} else {
		alert("No chance Lance");
	} 
}

// EDIT LIST ITEM [SECOND STEP - OUT OF THREE]
function editItem(event) {
	var editContent = event.target.parentNode.getElementsByTagName("span")[0];
	editContent.parentNode.classList.add('current');
	console.log(editContent.parentNode);
	// 1. Have the input equal the text so it can be edited
	input.value = editContent.textContent;
	// 2. Focus on the input area
	input.focus();
	// 3. Change text on button to show it is in edit mode
	button.innerHTML = "Confirm";
	// Change classes from edit to tick[e.g. confirm]
	event.target.classList.remove('edit');
	event.target.classList.add('tick');
	// Hide UL list while editing
	ul.classList.add('opacity');
	// Remove event listener for AddAfterEnter key as we need a new action - updateAfterEnter
	input.removeEventListener("keypress", addAfterEnter);
	button.removeEventListener("click", addAfterClick);
	ul.removeEventListener("click", toggleListItem);
	ul.removeEventListener("click", deleteListItem);
	ul.removeEventListener("click", editListItem);
	// console.log("addAfterEnter Event Listener removed");
	input.addEventListener("keypress", updateAfterEnter);
	button.addEventListener("click", updateAfterClick);
}

// UPDATE LIST ITEM [THIRD STEP - OUT OF THREE]
function confirmEdit(event) {
	var current = document.getElementsByClassName("current");
	var editContent = current[0].getElementsByTagName("span")[0];
	// The list item is updated
	editContent.textContent = input.value;
	// Remove the "current" class from the item
	current[0].classList.remove("current");
	// Need to change all buttons to regular state as they don't change on enter key
	button.innerHTML = "Enter";
	// Change classes back to normal state
	tickBtn.classList.remove("tick");
	tickBtn.classList.add("edit");
	// Show UL list after updated edit
	ul.classList.remove('opacity');
	// Remove event listener for AddAfterEnter key as we need a new action - updateAfterEnter
	input.removeEventListener("keypress", updateAfterEnter);
	button.removeEventListener("click", updateAfterClick);
	// console.log("addAfterEnter Event Listener reinstated");
	input.addEventListener("keypress", addAfterEnter);
	button.addEventListener("click", addAfterClick);
	ul.addEventListener("click", toggleListItem);
	ul.addEventListener("click", deleteListItem);
	ul.addEventListener("click", editListItem);
	// 7. Clear the input and add focus()
	clearInput();
}

function toggleListItem(event) {
	if(event.target.tagName === "SPAN") {
		event.target.classList.toggle("done");
	}
}

function deleteListItem(event) {
	if(event.target.className === "del") {
		ul.removeChild(event.target.parentNode);
	}
}

function inputValueLength() {
	return input.value.length;
}

function addAfterClick() {
	if(inputValueLength() > 0) {
		addListItem();
	}
}
function addAfterEnter(event) {
	if(inputValueLength() > 0 && event.which === 13) {
		addListItem();
	}
}
function updateAfterClick() {
	if(inputValueLength() > 0) {
		confirmEdit(event);
	}
}
function updateAfterEnter(event) {
	if(inputValueLength() > 0 && event.which === 13) {
		confirmEdit(event);
	}
}
// Event Listeners
button.addEventListener("click", addAfterClick);
input.addEventListener("keypress", addAfterEnter);
ul.addEventListener("click", toggleListItem);
ul.addEventListener("click", deleteListItem);
ul.addEventListener("click", editListItem);

