/*
	Joshua Shackelford
	CSE 154 AC
	TA: Tore Hanssen
		This is the JavaScript for the fifteen tile puzzle game. It creates the divs that make up
		the puzzle, and runs all the logic that determins what pieces move, where they move, and
		what they look like when selected.
*/

(function() {
	"use strict";

	var empty = "4_4"; //Sets the initial empty square, the bottom right

	window.onload = function() {
		createSquares();

		document.getElementById("shufflebutton").onclick = shuffle;
	};

	//This function creates the initial puzzle, already in its "finished" state. It creates
	//elements and inserts them back into the HTML using the appendChild function. As it creates
	//each square, it gives it the hover and click functionality that it needs.
	function createSquares() {
		var row = 1;
		var col = 1;

		for(var i = 0; i < 15; i++) {
			var square = document.createElement("div");
			square.className = "squares";
			if(col > 4) {
				row++;
				col = 1;
			}			
			square.id = row + "_" + col;
			placeSquare(square, square.id);
			square.style.backgroundImage = "url(fifteen.jpg)";
			//sets the apropriate piece of the background image behind each square of the puzzle
			square.style.backgroundPosition = (-(col - 1) * 100) + "px " + (-(row - 1) * 100) + "px";			
			col++;
			square.innerHTML = i+1;
			document.getElementById("puzzlearea").appendChild(square); //injects div into HTML

			square.onmouseover = highlight;
			square.onmouseleave = unHighlight;
			square.onclick = moveListener;
		}		
	}

	//This is the shuffle algorithm that will randomize the bord for the user. It ensures that any
	//outcome will be solvable by using only legal moves to reset the board, it simply does it
	//1000 times and therefore creates psuedorandomness.
	function shuffle() {
		for(var i = 0; i < 1000; i++) {
			var neighbors = []; //array to store valid moves
			var emptyRow = parseInt(empty.split("_")[0]);
			var emptyCol = parseInt(empty.split("_")[1]);
			var above = document.getElementById(emptyRow-1 + "_" + emptyCol);
			var below = document.getElementById(emptyRow+1 + "_" + emptyCol);
			var left = document.getElementById(emptyRow + "_" + (emptyCol-1));
			var right = document.getElementById(emptyRow + "_" + (emptyCol+1));

			//All if conditions are to check if the considered move is on the bord or not
			if(emptyRow+1 < 5) {
				neighbors.push(below);
			}
			if(emptyRow-1 > 0) {
				neighbors.push(above);
			}
			if(emptyCol-1 > 0) {
				neighbors.push(left);
			}
			if(emptyCol+1 < 5) {
				neighbors.push(right);
			}
			//choses a random path from the availabe options
			var chosen = parseInt(Math.random() * neighbors.length);
			moveSquare(neighbors[chosen]);
		}
	}

	//This function sets the x and y coordinates of each square on the board so that they
	//will appear in the proper location on the board acording to the row and column 
	//designated by their ids.
	function placeSquare(square, id) {
		var row = id.split("_")[0];
		var col = id.split("_")[1];
		square.style.top = row * 100 - 100 + "px";
		square.style.left = col * 100 - 100 + "px";		
	}

	//This is the onclick function called when a valid square is clicked by the user.
	//It simly calls checkNeighbor, passing it the div that called this function.
	function moveListener() {
		moveSquare(this);
	}

	//Checks if the tile that the user is hovering over is next to an empty space, and
	//if it is will change the border and number within the tile red, as well as changing
	//the user's cursor into a selector hand.
	function highlight() {
		if (emptyNeighbor(this)) {
			this.style.color = "red";
			this.style.border = "5px solid red";
			this.style.cursor = "pointer";
		}
	}

	//returns the color and cursor back to default settings when the user stops hovering
	//over a tile.
	function unHighlight() {
		this.style.color = "black";
		this.style.border = "5px solid black";
		this.style.cursor = "default";
	}

	//This function checks if the selected square is adjacent to the empty space and moves
	//the selected square into that empty space if it is. When doing this it also changes
	//the id of the moved square to match its row/col possition, and changes the indicator
	//for the empty space (initially set by the "4_4" at the top).
	function moveSquare(square) {
		if(emptyNeighbor(square)) { 
			placeSquare(square, empty);
			var temp = empty;
			empty = square.id;
			square.id = temp;
		}
	}

	//This function determins whether or not a passed square is directly above, below,
	//left, or right of the empty space. Returning true if it is and false otherwise.
	function emptyNeighbor(square) {
		var row = parseInt(square.id.split("_")[0]);
		var col = parseInt(square.id.split("_")[1]);	
		var emptyRow = parseInt(empty.split("_")[0]);
		var emptyCol = parseInt(empty.split("_")[1]);

		if((row-1 == emptyRow || row+1 == emptyRow) && col == emptyCol) {
			return true;
		} else if ((col-1 == emptyCol || col +1 == emptyCol) && row == emptyRow) {
			return true;
		} else {
			return false;
		}
	}
}) ();