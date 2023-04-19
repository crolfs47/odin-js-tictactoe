// players factory ///////////////////////////////////////////
const playerFactory = (name, marker) => ({ name, marker });

// gameboard module ///////////////////////////////////////////
const gameBoardModule = (() => {
  let boardArray = ['', '', '', '', '', '', '', '', ''];
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
  const gameBoard = document.querySelector('.game-board-grid');
  let winner = null;

  const updateBoard = () => {
    squares.forEach((square, index) => {
      square.textContent = boardArray[index];
    });
  };

  const resetBoard = () => {
    boardArray = ['', '', '', '', '', '', '', '', ''];
    updateBoard();
    winner = null;
  };

  const checkValidMove = (index) => !(boardArray[index] === 'X' || boardArray[index] === 'O');

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

  const checkTie = () => !boardArray.includes('');

  return {
    squares,
    gameBoard,
    markSquare,
    checkValidMove,
    checkWinner,
    checkTie,
    resetBoard,
  };
})();

// display module ///////////////////////////////////////////
const displayModule = (() => {
  const gameStatus = document.querySelector('.game-status');

  const showTurn = (player) => {
    gameStatus.textContent = `${player}'s turn. Please click on a square.`;
  };

  const showAlert = (alert) => {
    gameStatus.textContent = alert;
  };

  const showResult = (player) => {
    if (gameBoardModule.checkWinner()) {
      gameStatus.textContent = `${player} wins!`;
    } else {
      gameStatus.textContent = "It's a tie!";
    }
  };

  const toggleHiddenClass = (elementName) => {
    elementName.classList.toggle('hidden');
  };

  return {
    showResult, gameStatus, showTurn, showAlert, toggleHiddenClass,
  };
})();

// gameplay module ///////////////////////////////////////////
const gamePlayModule = (() => {
  let playerX;
  let playerO;
  let currentPlayer;
  const playerForm = document.querySelector('.player-form');
  const newGameButton = document.querySelector('.new-game-button');

  const startGame = (e) => {
    e.preventDefault();
    playerX = playerFactory(document.getElementById('playerXname').value, 'X');
    playerO = playerFactory(document.getElementById('playerOname').value, 'O');
    if (playerX.name === '' || playerO.name === '') {
      displayModule.showAlert('Please enter a name for each player');
    } else {
      currentPlayer = playerX;
      displayModule.toggleHiddenClass(playerForm);
      displayModule.toggleHiddenClass(gameBoardModule.gameBoard);
      displayModule.toggleHiddenClass(newGameButton);
      displayModule.showTurn(currentPlayer.name);
    }
  };

  playerForm.addEventListener('submit', startGame);

  const newGame = () => {
    gameBoardModule.resetBoard();
    displayModule.toggleHiddenClass(playerForm);
    displayModule.toggleHiddenClass(gameBoardModule.gameBoard);
    displayModule.toggleHiddenClass(newGameButton);
    displayModule.showAlert('');
  };

  newGameButton.addEventListener('click', newGame);

  const switchPlayers = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  };

  const checkGameOver = () => gameBoardModule.checkWinner() || gameBoardModule.checkTie();

  const takeTurn = (squareIndex) => {
    if (gameBoardModule.checkValidMove(squareIndex)) {
      gameBoardModule.markSquare(currentPlayer.marker, squareIndex);
      if (checkGameOver()) {
        displayModule.showResult(currentPlayer.name);
      } else {
        switchPlayers();
        displayModule.showTurn(currentPlayer.name);
      }
    } else {
      displayModule.showAlert('Please select a valid square');
    }
  };

  const clickSquares = () => {
    gameBoardModule.squares.forEach((square) => {
      square.addEventListener('click', (e) => {
        if (!checkGameOver()) {
          takeTurn(e.target.id);
        }
      });
    });
  };

  clickSquares();
})();
