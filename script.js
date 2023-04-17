// gameboard module //
const gameBoardModule = (() => {
  let boardArray = ['', '', '', '', '', '', '', '', ''];
  const squares = document.querySelectorAll('.square');

  squares.forEach((square) => {
    square.addEventListener('click', () => {
      // make move
    });
  });

  return { boardArray };
  // mark square
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
