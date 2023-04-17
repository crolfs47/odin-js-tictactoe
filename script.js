// gameboard module //
const gameBoardModule = (() => {
  let boardArray = ['', '', '', '', '', '', '', '', ''];
  const squares = document.querySelectorAll('.square');

  squares.forEach((square) => {
    square.addEventListener('click', () => {
      // make move
    });
  });
  
  //mark square
  //check if valid move
  //check if winner
})();

console.log(gameBoard.boardArray);

// display module //
const displayModule = (() => {
})();

// players factory //
const playerFactory = (name, marker) => {
  return {name, marker};
};

// gameplay module //
const gamePlayModule = (() => {
  let playerX;
  let playerO;
  let currentPlayer;
  let turn = 0;

  //start game
  //take turn
  //switch player
  //check if winner or game over


})();