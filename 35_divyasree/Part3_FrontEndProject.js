// file name- Part3_FrontEndProject.js 


//var cs35_player1 = prompt("Player One: Enter Your Name , you will be Blue");
var cs35_player1 = "Blue";
var cs35_player1Color = 'rgb(86, 151, 255)';

//var cs35_player2 = prompt("Player Two: Enter Your Name, you will be Red");
var cs35_player2 = "Red";
var cs35_player2Color = 'rgb(237, 45, 73)';

var cs35_game_on = true;
var cs35_table = $('table tr');
$('#cs35_reset_button').on("click",cs35_ResetGame);

// Start with Player One
var cs35_currentPlayer = 1;
var cs35_currentName = cs35_player1;
var cs35_currentColor = cs35_player1Color;

// Start with Player One
$('.cs35_h3').text(cs35_player1 + ": it is your turn, please pick a column to drop your blue chip.");

$('.cs35_board button').on('click', function() {

    // Recognize what column was chosen
    let col = $(this).closest("td").index();

    // Get back bottom available row to change
    let bottomAvail = cs35_checkBottom(col);

    // Drop the chip in that column at the bottomAvail Row
    cs35_changeColor(bottomAvail, col, cs35_currentColor);

    // Check for a win or a tie.
    if (cs35_horizontalWinCheck() || cs35_verticalWinCheck() || cs35_diagonalWinCheck()) {
        cs35_gameEnd(cs35_currentName);
    }

    // If no win or tie, continue to next player
    cs35_currentPlayer = cs35_currentPlayer * -1;

    // Re-Check who the current Player is.
    if (cs35_currentPlayer === 1) {
        cs35_currentName = cs35_player1;
        $('.cs35_h3').text(cs35_currentName + ": it is your turn, please pick a column to drop your blue chip.");
        cs35_currentColor = cs35_player1Color;
    } else {
        cs35_currentName = cs35_player2
        $('.cs35_h3').text(cs35_currentName + ": it is your turn, please pick a column to drop your red chip.");
        cs35_currentColor = cs35_player2Color;
    }

})

function cs35_ResetGame()
{
	$('.cs35_h3').fadeIn('fast');
    $('.cs35_h2').fadeIn('fast');
    $('.cs35_h1').text("");
	cs35_currentPlayer = 1;
	cs35_currentName = cs35_player1;
	cs35_currentColor = cs35_player1Color;
	$('.cs35_h3').text(cs35_player1 + ": it is your turn, please pick a column to drop your blue chip.");
	for(let i=0; i<6; i++)
	{
		for(let j=0; j<7; j++)
		{
			cs35_changeColor(i, j, "gray");
		}
	}
}

function cs35_reportWin(rowNum, colNum) {
    console.log("You won starting at this row,col");
    console.log(rowNum);
    console.log(colNum);
}
// Change the color of a button
function cs35_changeColor(rowIndex, colIndex, color) {
    return cs35_table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

// Report Back to current color of a button
function cs35_returnColor(rowIndex, colIndex) {
    return cs35_table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

// Take in column index, returns the bottom row that is still gray
function cs35_checkBottom(colIndex) {
    let colorReport = cs35_returnColor(5, colIndex);
    for (let row = 5; row > -1; row--) {
        colorReport = cs35_returnColor(row, colIndex);
        if (colorReport === 'rgb(128, 128, 128)') {
            return row
        }
    }
}

// Check to see if 4 inputs are the same color
function cs35_colorMatchCheck(one, two, three, four) {
    return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

// Check for Horizontal Wins
function cs35_horizontalWinCheck() {
    for (var row = 0; row < 6; row++) {
        for (var col = 0; col < 4; col++) {
            if (cs35_colorMatchCheck(cs35_returnColor(row, col), cs35_returnColor(row, col + 1), cs35_returnColor(row, col + 2), cs35_returnColor(row, col + 3))) {
                console.log('horiz');
                cs35_reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

// Check for Vertical Wins
function cs35_verticalWinCheck() {
    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 3; row++) {
            if (cs35_colorMatchCheck(cs35_returnColor(row, col), cs35_returnColor(row + 1, col), cs35_returnColor(row + 2, col), cs35_returnColor(row + 3, col))) {
                console.log('vertical');
                cs35_reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

// Check for Diagonal Wins
function cs35_diagonalWinCheck() {
    for (var col = 0; col < 5; col++) {
        for (var row = 0; row < 7; row++) {
            if (cs35_colorMatchCheck(cs35_returnColor(row, col), cs35_returnColor(row + 1, col + 1), cs35_returnColor(row + 2, col + 2), cs35_returnColor(row + 3, col + 3))) {
                console.log('diag');
                cs35_reportWin(row, col);
                return true;
            } else if (cs35_colorMatchCheck(cs35_returnColor(row, col), cs35_returnColor(row - 1, col + 1), cs35_returnColor(row - 2, col + 2), cs35_returnColor(row - 3, col + 3))) {
                console.log('diag');
                cs35_reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

// Game End
function cs35_gameEnd(winningPlayer) {
    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 7; row++) {
            $('.cs35_h3').fadeOut('fast');
            $('.cs35_h2').fadeOut('fast');
            $('.cs35_h1').text(winningPlayer + " has won! Reset to play again!").css("fontSize", "50px")
        }
    }
}