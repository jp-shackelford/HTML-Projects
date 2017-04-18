/*
	Joshua Shackelford
	CSE 154, AC
	TA: Tore Hanssen
		This is the page that gives the buttons and selectors seen by the user their functionality.
*/

(function () { //Anonymous wrapper function
	"use strict";
	var timer;
	var index = 0;		//global variables
	var frames;
	var fixed;

	//This function sets up the start and stop buttons, initially disableing the stop button since
	//nothing has been input at this point.
	window.onload = function () {
		var startButton = document.getElementById("start");
		var stopButton = document.getElementById("stop");
		stopButton.disabled = true;

		startButton.onclick = start;
		stopButton.onclick = end;

		disableStop();
	};

	//This function pulls the text placed in the textarea by the user and splits it on all white space,
	//including tabs and new lines. It then calls the show function to desplay the text to the user.
	function start() {
		var text = document.getElementById("input").value;
		frames = text.split(/[\s]+/);
		fixed = false; 
		show();	
	}

	//This function takes the array formed when the user's text is pulled apart and dispalys it on the
	//page one word at a time. It uses a timer with setInterval to determine the rate at which the words
	//flash on screen. The function will pay attention to words that end with some kind of puncuation, and
	//remove the puncuation; if there is multiple puncuation in a row, only the last will be removed.
	function show() {
		disableStart();	//disables the start button while the animation is going	
		var speed = document.getElementById("speed").value;
		clearInterval(timer);						// By calling these within this function, we allow
		timer = setInterval(show, speed);			// the user to change the size or speed during an
		size();										// animation and have it take effect imediatly.

		if (index < frames.length && frames[index].search(/.*[!?,.;:]$/) == 0 && !fixed) {
			frames[index] = frames[index].substring(0, frames[index].length - 1);
			document.getElementById("display").innerHTML = frames[index];
			fixed = true; //marks that the current word being looked at has had the last puncuation removed.
		} else if (index < frames.length) {
			document.getElementById("display").innerHTML = frames[index];
			index++;
			fixed = false; //marks that we have moved on to a new word that has not been checked for
							//end punctuation.
		} else {
			end();
		}
	}

	//This function will clear the current timer, reset the index of the frames, and clears the
	//display area that the user sees.
	function end() {
		index = 0;		
		clearInterval(timer); //stops the interval timer
		document.getElementById("display").innerHTML = " "; //makes the display area blank for the user
		disableStop(); //disables the stop button while the animaiton is stopped
	}

	//This function affects that text size of what is displayed to the user. It looks at which option
	//is checked by the user and scales the text to the apropriate value.
	function size() {
		var size = document.querySelectorAll("input");
		for (var i = 0; i < size.length; i++) {
			if (size[i].checked) { 
				document.getElementById("display").style.fontSize = size[i].value + "pt";
			}
		}		
	}

	//Disables the start button, enabling the stop button at the same time.
	function disableStart() {
		var start = document.getElementById("start");
		var stop = document.getElementById("stop");
		start.disabled = true;
		stop.disabled = false;
		colorButton(start, stop);		
	}

	//Disables the stop button, enabling the start button at the same time.
	function disableStop() {
		var start = document.getElementById("start");
		var stop = document.getElementById("stop");	
		start.disabled = false;
		stop.disabled = true;
		colorButton(start, stop);	
	}

	//Checks which button is disabled and give the disabled button a lightgray background and
	//the enabled button a white background.
	function colorButton(startButton, stopButton) {
		if(startButton.disabled) {
			startButton.style.backgroundColor = "lightgray";
			stopButton.style.backgroundColor = "white";
		} else {
			stopButton.style.backgroundColor = "lightgray";
			startButton.style.backgroundColor = "white";
		}
	}
}) ();