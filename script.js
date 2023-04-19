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

  const checkMove = (index) => {
    const validMove = !((boardArray[index] === 'X' || boardArray[index] === 'O'));
    return validMove;
  };

  const markSquare = (marker, index) => {
    if (!gamePlayModule.checkGameOver()) {
      boardArray[index] = marker;
      updateBoard();
    }
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
    boardArray, markSquare, checkMove, checkWinner, gameBoard, updateBoard, resetBoard,
  };
})();

// gameplay module ///////////////////////////////////////////
const gamePlayModule = (() => {
  let playerX;
  let playerO;
  let currentPlayer;
  let turnCount = 0;
  const playerForm = document.querySelector('.player-form');
  const newGameButton = document.querySelector('.new-game-button');

  const startGame = (e) => {
    e.preventDefault();
    playerX = playerFactory(document.getElementById('playerXname').value, 'X');
    playerO = playerFactory(document.getElementById('playerOname').value, 'O');
    if (playerX.name ==='' || playerO.name === '') {
      displayModule.showAlert('Please enter a name for each player');
    }
    else {
      currentPlayer = playerX;
      displayModule.toggleHiddenClass(playerForm);
      displayModule.toggleHiddenClass(gameBoardModule.gameBoard);
      displayModule.toggleHiddenClass(newGameButton);
      displayModule.toggleHiddenClass(displayModule.gameStatus);
      displayModule.showTurn(currentPlayer.name);
    }
  };

  playerForm.addEventListener('submit', startGame);

  const newGame = () => {
    gameBoardModule.resetBoard();
    turnCount = 0;
    console.log(gameBoardModule.boardArray);
    displayModule.toggleHiddenClass(playerForm);
    displayModule.toggleHiddenClass(gameBoardModule.gameBoard);
    displayModule.toggleHiddenClass(newGameButton);
    displayModule.toggleHiddenClass(displayModule.gameStatus);
  };

  newGameButton.addEventListener('click', newGame);

  const switchPlayers = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  };

  const checkGameOver = () => {
    if (gameBoardModule.checkWinner() || turnCount === 8) {
      return true;
    }
    return false;
  };

  const takeTurn = (squareIndex) => {
    if (gameBoardModule.checkMove(squareIndex)) {
      gameBoardModule.markSquare(currentPlayer.marker, squareIndex);
      if (checkGameOver()) {
        displayModule.showResult(currentPlayer.name);
      } else {
        turnCount += 1;
        switchPlayers();
        displayModule.showTurn(currentPlayer.name);
        console.log(turnCount);
      }
    } else {
      displayModule.showAlert('Please select a valid square');
    }
  };

  return {
    takeTurn, turnCount, currentPlayer, checkGameOver,
  };
})();

// display module ///////////////////////////////////////////
const displayModule = (() => {
  const squares = document.querySelectorAll('.square');
  const gameStatus = document.querySelector('.game-status');

  squares.forEach((square) => {
    square.addEventListener('click', (e) => {
      gamePlayModule.takeTurn(e.target.id);
    });
  });

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
