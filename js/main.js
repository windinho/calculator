/*
TODO:
Limit number input
Disallow . from being entered multiple times
Clean up structure
*/

(function() {
	"use strict";

// Shortcut to get elements
var el = function(element) {
if (element.charAt(0) === "#") { // If passed an ID...
return document.querySelector(element); // ... returns single element
}

return document.querySelectorAll(element); // Otherwise, returns a nodelist
};

// Variables
var viewer = el("#result span"), // Calculator screen where result is displayed
inp = el("#input input"),
equals = el("#equals"), // Equal button
nums = el(".num"), // List of numbers
ops = el(".ops"), // List of operators
theNum = "", // Current number
oldNum = "", // First number
resultNum, // Result
str = "", // Expression string
operator = "", // Op
db = [],
show = el("#show")

// When: Number is clicked. Get the current number selected
var setNum = function() {
	theNum = this.getAttribute("data-num");
	str += theNum

	if(inp.value === "0")
		inp.value = ""

	inp.value = str

}

// When: Operator is clicked. Pass number to oldNum and save operator
var setOp = function() {
	operator = this.getAttribute("data-ops");

	var ops = ["*", "/", "+", "-", "."]

	if(ops.indexOf(str.charAt(str.length-1)) > -1)
		str = str.slice(0, -1)

	if(inp.value === "0")
		str = 0

	str += operator
	inp.value = str
}

// When: Equals is clicked. Calculate result
var displayNum = function() {
	resultNum = eval(str)

	// Display result, finally!
	viewer.innerHTML = resultNum;
	viewer.title = resultNum;

	if(db.length > 4)
		db.shift()

	db.push(str + "=" + resultNum)

	el("#db").innerHTML = ""
	/*for (var i = 0; i < db.length; i++) {
		el("#db").innerHTML += "<p>" + db[i] + "</p>"
	}*/
	for (var i = db.length - 1; i >= 0; i--) {
		el("#db").innerHTML += "<p>" + db[i] + "</p>"
	}
}

// When: Clear button is pressed. Clear everything
var clearAll = function() {
	str = ""
	inp.value = "0"
}

var showMe = function() {
	var disp = el("#db")
	disp.style.visibility = "visible"
}

// The click events

// Add click event to numbers
for (var i = 0, l = nums.length; i < l; i++) {
	nums[i].onclick = setNum
}

// Add click event to operators
for (var i = 0, l = ops.length; i < l; i++) {
	ops[i].onclick = setOp
}

// Add click event to equal sign
equals.onclick = displayNum

show.onclick = showMe

// Add click event to clear button
el("#clear").onclick = clearAll

}());