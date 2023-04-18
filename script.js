// players factory ///////////////////////////////////////////
const playerFactory = (name, marker) => ({ name, marker });

// gameboard module ///////////////////////////////////////////
const gameBoardModule = (() => {
  const boardArray = ['', '', '', '', '', '', '', '', ''];
  const squares = document.querySelectorAll('.square');

  const updateBoard = () => {
    squares.forEach((square, index) => {
      square.textContent = boardArray[index];
    });
  };

  const markSquare = (marker, index) => {
    boardArray[index] = marker;
    updateBoard();
  };

  return { boardArray, markSquare };
  // check if valid move
  // check if winner
})();

console.log(gameBoardModule.boardArray);

// gameplay module ///////////////////////////////////////////
const gamePlayModule = (() => {
  let playerX;
  let playerO;
  let currentPlayer;
  let turn = 0;
  const startButton = document.querySelector('.player-form');
  const gameStatus = document.querySelector('.game-status');

  const startGame = (e) => {
    e.preventDefault();
    playerX = playerFactory(document.getElementById('playerXname').value, 'X');
    playerO = playerFactory(document.getElementById('playerOname').value, 'O');
    currentPlayer = playerX;
    gameStatus.textContent = `${currentPlayer.name}'s turn. Please click on a square.`;
  };
  // only show gameboard after startgame and remove player form

  startButton.addEventListener('submit', startGame);

  const switchPlayers = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  }

  const takeTurn = (squareIndex) => {
    gameBoardModule.markSquare(currentPlayer.marker, squareIndex);
    switchPlayers();
    gameStatus.textContent = `${currentPlayer.name}'s turn. Please click on a square.`;
  };

  return { takeTurn };
  // check if winner or game over
})();

// display module ///////////////////////////////////////////
const displayModule = (() => {
  const squares = document.querySelectorAll('.square');

  squares.forEach((square) => {
    square.addEventListener('click', (e) => {
      gamePlayModule.takeTurn(e.target.id);
    });
  });
})();
