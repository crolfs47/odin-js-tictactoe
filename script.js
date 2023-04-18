// players factory ///////////////////////////////////////////
const playerFactory = (name, marker) => ({ name, marker });

// gameboard module ///////////////////////////////////////////
const gameBoardModule = (() => {
  const boardArray = ['', '', '', '', '', '', '', '', ''];
  const winningArrays = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];
  const squares = document.querySelectorAll('.square');
  const gameStatus = document.querySelector('.game-status');
  let winner = null;

  const updateBoard = () => {
    squares.forEach((square, index) => {
      square.textContent = boardArray[index];
    });
  };

  const checkMove = (index) => {
    const validMove = !((boardArray[index] === 'X' || boardArray[index] === 'O'));
    return validMove;
  };

  const markSquare = (marker, index) => {
    boardArray[index] = marker;
    updateBoard();
  };

  const checkWinner = () => {
    winningArrays.forEach((array) => {
      if (boardArray[array[0]] !== ''
        && boardArray[array[0]] === boardArray[array[1]]
        && boardArray[array[1]] === boardArray[array[2]]) {
        winner = true;
      }
    });
    return winner;
  };

  return {
    boardArray, gameStatus, markSquare, checkMove, checkWinner,
  };
})();

// gameplay module ///////////////////////////////////////////
const gamePlayModule = (() => {
  let playerX;
  let playerO;
  let currentPlayer;
  let turnCount = 0;
  const startButton = document.querySelector('.player-form');

  const startGame = (e) => {
    e.preventDefault();
    playerX = playerFactory(document.getElementById('playerXname').value, 'X');
    playerO = playerFactory(document.getElementById('playerOname').value, 'O');
    currentPlayer = playerX;
    gameBoardModule.gameStatus.textContent = `${currentPlayer.name}'s turn. Please click on a square.`;
  };
  // only start game if names are entered
  // only show gameboard after startgame and remove player form

  startButton.addEventListener('submit', startGame);

  const switchPlayers = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  };

  const gameOver = () => {
    if (gameBoardModule.checkWinner() || turnCount === 8) {
      return true;
    }
    return false;
  };

  const takeTurn = (squareIndex) => {
    if (gameBoardModule.checkMove(squareIndex)) {
      console.log(turnCount);
      gameBoardModule.markSquare(currentPlayer.marker, squareIndex);
      if (gameOver()) {
        displayModule.showResult(currentPlayer.name);
      } else {
        turnCount += 1;
        switchPlayers();
        gameBoardModule.gameStatus.textContent = `${currentPlayer.name}'s turn. Please click on a square.`;
      }
    } else {
      gameBoardModule.gameStatus.textContent = 'Please select a valid square';
    }
  };

  return { takeTurn, turnCount, currentPlayer };
})();

// display module ///////////////////////////////////////////
const displayModule = (() => {
  const squares = document.querySelectorAll('.square');

  squares.forEach((square) => {
    square.addEventListener('click', (e) => {
      gamePlayModule.takeTurn(e.target.id);
    });
  });

  const showResult = (player) => {
    if (gameBoardModule.checkWinner()) {
      gameBoardModule.gameStatus.textContent = `${player} wins!`;
    } else {
      gameBoardModule.gameStatus.textContent = "It's a tie!";
    }
  };

  return { showResult };
})();
