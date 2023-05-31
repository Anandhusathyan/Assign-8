document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const message = document.querySelector('.message');
    const restartBtn = document.querySelector('.restart-btn');
  
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
  
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];
  
    const handleCellClick = (event) => {
      const clickedCell = event.target;
      const clickedCellIndex = Array.from(cells).indexOf(clickedCell);
  
      if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return; // Cell already played or game ended
      }
  
      gameState[clickedCellIndex] = currentPlayer;
      clickedCell.textContent = currentPlayer;
  
      validateGame();
    };
  
    const validateGame = () => {
      let roundWon = false;
      for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        const val1 = gameState[a];
        const val2 = gameState[b];
        const val3 = gameState[c];
  
        if (val1 !== '' && val1 === val2 && val1 === val3) {
          roundWon = true;
          break;
        }
      }
  
      if (roundWon) {
        message.textContent = `Player ${currentPlayer} won!`;
        gameActive = false;
        return;
      }
  
      const isGameDrawn = !gameState.includes('');
      if (isGameDrawn) {
        message.textContent = "It's a draw!";
        gameActive = false;
        return;
      }
  
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      message.textContent = `Player ${currentPlayer}'s turn`;
    };
  
    const restartGame = () => {
      currentPlayer = 'X';
      gameActive = true;
      gameState = ['', '', '', '', '', '', '', '', ''];
      message.textContent = `Player ${currentPlayer}'s turn`;
      cells.forEach(cell => cell.textContent = '');
    };
  
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartBtn.addEventListener('click', restartGame);
  });
  