// gameboard module //
const gameBoardModule = (() => {
  const boardArray = ['', '', '', '', '', '', '', '', ''];
  const squares = document.querySelectorAll('.square');

  const updateBoard = () => {
    squares.forEach((square, index) => {
      square.textContent = boardArray[index];
    });
  };

  const markSquare = (index) => {
    boardArray[index] = 'X';
    console.log(boardArray);
    updateBoard();
  };

  squares.forEach((square) => {
    square.addEventListener('click', (e) => {
      markSquare(e.target.id);
    });
  });

  return { boardArray };
  // check if valid move
  // check if winner
})();

console.log(gameBoardModule.boardArray);

// display module //
const displayModule = (() => {
})();

// players factory //
const playerFactory = (name, marker) => ({ name, marker });

// gameplay module //
const gamePlayModule = (() => {
  let playerX;
  let playerO;
  let currentPlayer;
  let turn = 0;
  const startButton = document.querySelector('.player-form');

  // start game
  const startGame = (e) => {
    e.preventDefault();
    playerX = playerFactory(document.getElementById('playerXname').value, 'X');
    playerO = playerFactory(document.getElementById('playerOname').value, 'O');
    console.log(playerX.name);
    console.log(playerO.marker);
  };

  startButton.addEventListener('submit', startGame);

  // take turn
  // switch player
  // check if winner or game over
})();
