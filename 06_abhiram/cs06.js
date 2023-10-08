const cs06_PIECE_RADIUS = 24;
const cs06_docBoard = document.getElementById('cs06_board');
const cs06_mainDoc = document.getElementById('cs06_main');
const cs06_startButton = document.getElementById('cs06_start_button');
const cs06_message = document.getElementById('cs06_message');

// -1 for white, 1 for red
const cs06_startBoard = 
[
	[ 0, -1, 0, -1, 0, -1, 0, -1],
	[ -1, 0, -1, 0, -1, 0, -1, 0],
	[ 0, -1, 0, -1, 0, -1, 0, -1],
	[ 0, 0, 0, 0, 0, 0, 0, 0],
	[ 0, 0, 0, 0, 0, 0, 0, 0],
	[ 1, 0, 1, 0, 1, 0, 1, 0],
	[ 0, 1, 0, 1, 0, 1, 0, 1],
	[ 1, 0, 1, 0, 1, 0, 1, 0],
];

var cs06_currentColour = "red";
var cs06_selectedPiece = null;
var cs06_acceptableSquares = [];
var cs06_jumpSquares = [];
var cs06_jumpDelPieces = [];
var cs06_numberOfWhites = 12;
var cs06_numberOfReds = 12;

cs06_startButton.addEventListener("click", cs06_StartGame);

/*
	Starts the game. Creates the board and the pieces.
*/
function cs06_StartGame()
{
	cs06_currentColour = "red";
	cs06_acceptableSquares = [];
	cs06_jumpSquares = [];
	cs06_jumpDelPieces = [];
	cs06_selectedPiece = null;
	cs06_startButton.textContent = 'Reset';
	cs06_numberOfWhites = 12;
	cs06_numberOfReds = 12;
	cs06_docBoard.textContent = "";

	// Create the board
	for (let i=0; i<8; i++)
	{
		for (let j=0; j<8; j++)
		{
			// Add the squares
			let square = document.createElement("div");
			square.classList.add("cs06_square");
			square.id = ("cs06_square_"+j+i);
			square.setAttribute("board_x",j);
			square.setAttribute("board_y",i);
			square.setAttribute("unselectable","on");
			square.classList.add((i+j)%2 == 0? "cs06_light_square": "cs06_dark_square");

			// Add events for piece drag and drop
			square.addEventListener('dragenter', cs06_PieceDragEnter, true);
			square.addEventListener('dragover', cs06_PieceDragOver, true);
			square.addEventListener('drop', cs06_PieceDrop, true);
			cs06_docBoard.appendChild(square);

			// Add the pieces
			if(cs06_startBoard[i][j] != 0)
			{
				let piece = document.createElement("div");
				piece.classList.add("cs06_piece");
				piece.classList.add("cs06_normal_piece");
				piece.classList.add(cs06_startBoard[i][j] == -1? "cs06_white_piece": "cs06_red_piece");
				//piece.id = ("cs06_piece_"+i+j);	
				piece.setAttribute("unselectable","on");
				piece.setAttribute("draggable","true");

				piece.addEventListener("dragstart", cs06_PieceDragStart, true);
				square.appendChild(piece);
			}
		}
	}
}

/*
	Mouse Down Event for pieces
*/
function cs06_PieceDragStart(event)
{
	if(event.currentTarget.classList.contains("cs06_"+cs06_currentColour+"_piece"))
	{
		cs06_message.innerHTML = "";
		event.dataTransfer.setData("draughts/piece", event.target);
		event.dataTransfer.effectAllowed = 'move';
		cs06_selectedPiece = event.currentTarget;
		const startingLocation = {

            x : Number(event.currentTarget.parentNode.getAttribute('board_x')),
            y : Number(event.currentTarget.parentNode.getAttribute('board_y'))

        };
		cs06_acceptableSquares = [];
		cs06_jumpDelPieces = [];
		cs06_jumpSquares = [];

		let up = false;
		let down = false;
		if(cs06_currentColour == "red" || event.currentTarget.classList.contains('cs06_king_piece'))
			up = true;
		if(cs06_currentColour == "white" || event.currentTarget.classList.contains('cs06_king_piece'))
			down = true;
		cs06_CheckJumps(startingLocation,up,down);
		if(cs06_jumpSquares.length == 0)
		{
			for(let i=0; i<8; i++)
			{
				for(let j=0; j<8; j++)
				{
					let square = document.getElementById("cs06_square_"+i+j);
					if(square.firstChild != null)
					{
						if(square.firstChild.classList.contains("cs06_"+cs06_currentColour+"_piece"))
						{
							up = false;
							down = false;
							if(cs06_currentColour == "red" || square.firstChild.classList.contains('cs06_king_piece'))
								up = true;
							if(cs06_currentColour == "white" || square.firstChild.classList.contains('cs06_king_piece'))
								down = true;
							cs06_CheckJumps({x:i, y:j},up,down);
						}
					}
				}
			}
			if(cs06_jumpSquares.length != 0)
			{
				cs06_message.innerHTML = "You need to jump!";
				event.preventDefault();
				return;
			}

			cs06_acceptableSquares = [];
			// Check immediate diagonals
			up = false;
			down = false;
			if(cs06_currentColour == "red" || event.currentTarget.classList.contains('cs06_king_piece'))
				up = true;
			if(cs06_currentColour == "white" || event.currentTarget.classList.contains('cs06_king_piece'))
				down = true;
			cs06_CheckAdjacent(startingLocation,up,down);
		}
	}
	else
	{
		cs06_message.innerHTML = "Not your turn!";
		event.preventDefault();
	}
}

function cs06_PieceDragEnter(event)
{
	/*if(cs06_selectedPiece == null)
		return;*/

	if((cs06_jumpSquares.length == 0 && cs06_acceptableSquares.includes(event.currentTarget))
		|| cs06_jumpSquares.includes(event.currentTarget))
		event.preventDefault();
}

function cs06_PieceDragOver(event)
{
	/*if(cs06_selectedPiece == null)
		return;*/
	event.dataTransfer.dropEffect = 'move';
	event.preventDefault();
}

function cs06_PieceDrop(event)
{
	/*if(cs06_selectedPiece == null)
		return;*/
	let jumps = cs06_jumpSquares.includes(event.currentTarget);
	if((cs06_jumpSquares.length == 0 && cs06_acceptableSquares.includes(event.currentTarget))
		|| jumps)
	{
		cs06_selectedPiece.parentNode.removeChild(cs06_selectedPiece);
		event.currentTarget.appendChild(cs06_selectedPiece);
		if(jumps)
		{
			let index = cs06_jumpSquares.indexOf(event.currentTarget);
			cs06_jumpDelPieces[index].removeChild(cs06_jumpDelPieces[index].firstChild);
			if(cs06_currentColour == "red")
			{
				cs06_numberOfWhites--;
				if(cs06_numberOfWhites == 0)
				{
					cs06_message.innerHTML = "Red won!";
					cs06_EndGame();
					event.preventDefault();
					return;
				}
			}
			else
			{
				cs06_numberOfReds--;
				if(cs06_numberOfReds == 0)
				{
					cs06_message.innerHTML = "White won!";
					cs06_EndGame();
					event.preventDefault();
					return;
				}
			}
		}
		cs06_jumpDelPieces = [];
		cs06_jumpSquares = [];

		if(cs06_currentColour == "red" && Number(event.currentTarget.getAttribute("board_y")) == 0)
			cs06_selectedPiece.classList.add('cs06_king_piece');
		else if(cs06_currentColour == "white" && Number(event.currentTarget.getAttribute("board_y")) == 7)
		cs06_selectedPiece.classList.add('cs06_king_piece');

		if(jumps)
		{
			let up = false;
			let down = false;
			if(cs06_currentColour == "red" || cs06_selectedPiece.classList.contains('cs06_king_piece'))
				up = true;
			if(cs06_currentColour == "white" || cs06_selectedPiece.classList.contains('cs06_king_piece'))
				down = true;
			cs06_CheckJumps({
				x: Number(event.currentTarget.getAttribute("board_x")),
				y: Number(event.currentTarget.getAttribute("board_y")),
			}, up, down);
			if(cs06_jumpSquares.length == 0)
				cs06_currentColour = (cs06_currentColour == 'red')?'white':'red';
		}
		else
		{
			cs06_currentColour = (cs06_currentColour == 'red')?'white':'red';
			cs06_jumpSquares = [];
			cs06_jumpDelPieces = [];
			cs06_acceptableSquares = [];

			let up = false;
			let down = false;
			if(cs06_currentColour == "red" || event.currentTarget.classList.contains('cs06_king_piece'))
				up = true;
			if(cs06_currentColour == "white" || event.currentTarget.classList.contains('cs06_king_piece'))
				down = true;

			for(let i=0; i<8; i++)
			{
				for(let j=0; j<8; j++)
				{
					let square = document.getElementById("cs06_square_"+i+j);
					if(square.firstChild != null)
					{
						if(square.firstChild.classList.contains("cs06_"+cs06_currentColour+"_piece"))
						{
							up = false;
							down = false;
							if(cs06_currentColour == "red" || square.firstChild.classList.contains('cs06_king_piece'))
								up = true;
							if(cs06_currentColour == "white" || square.firstChild.classList.contains('cs06_king_piece'))
								down = true;
							cs06_CheckJumps({x:i, y:j},up,down);
							cs06_CheckAdjacent({x:i, y:j},up,down);
						}
					}
				}
			}
			if(cs06_acceptableSquares.length == 0 && cs06_jumpSquares.length == 0)
			{
				cs06_message.innerHTML = "Draw!";
				cs06_EndGame();
			}
		}
		cs06_selectedPiece = null;
		event.preventDefault();
	}
	//cs06_startingLocation = {x:0, y:0};
}

function cs06_CheckJumps(position, up, down)
{
	for(let y=-1; y<2; y+=2)
	{
		if(y == -1 && (!up || position.y<=1))
			continue;
		if(y == 1  && (!down || position.y>=6))
			continue;

		for(let x=-1; x<2; x+=2)
		{
			if(((x<0 && position.x > 1) || (x>0 && position.x < 6)))
			{
				let dsquare = document.getElementById("cs06_square_"+(position.x+2*x)+(position.y+2*y));
				let csquare = document.getElementById("cs06_square_"+(position.x+x)+(position.y+y));
				if(csquare.firstChild != null && dsquare.firstChild == null)
				{
					if(!csquare.firstChild.classList.contains("cs06_"+cs06_currentColour+"_piece"))
					{
						cs06_jumpSquares.push(dsquare);
						cs06_jumpDelPieces.push(csquare);
					}
				}
			}
		}
	}
}

function cs06_CheckAdjacent(startingLocation, up, down)
{
	if(startingLocation.x<7)
	{
		// TR
		if(startingLocation.y>0 && up)
		{
			let square = document.getElementById("cs06_square_"+(startingLocation.x+1)+(startingLocation.y-1));
			if(square.firstChild == null)
				cs06_acceptableSquares.push(square);
		}
		// DR
		if(startingLocation.y<7 && down)
		{
			let square = document.getElementById("cs06_square_"+(startingLocation.x+1)+(startingLocation.y+1));
			if(square.firstChild == null)
				cs06_acceptableSquares.push(square);
		}
	}
	if(startingLocation.x>0)
	{
		// TL
		if(startingLocation.y>0 && up)
		{
			let square = document.getElementById("cs06_square_"+(startingLocation.x-1)+(startingLocation.y-1));
			if(square.firstChild == null)
				cs06_acceptableSquares.push(square);
		}
		// DL
		if(startingLocation.y<7 && down)
		{
			let square = document.getElementById("cs06_square_"+(startingLocation.x-1)+(startingLocation.y+1));
			if(square.firstChild == null)
				cs06_acceptableSquares.push(square);
		}
	}
}

function cs06_EndGame()
{
	cs06_currentColour = "red";
	cs06_acceptableSquares = [];
	cs06_jumpSquares = [];
	cs06_jumpDelPieces = [];
	cs06_selectedPiece = null;
	cs06_startButton.textContent = 'Start';
	cs06_numberOfWhites = 12;
	cs06_numberOfReds = 12;

	cs06_docBoard.textContent = "";
}