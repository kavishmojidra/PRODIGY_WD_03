// script.js
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameMode = 'pvp';
let gameOver = false;

function startGame(mode) {
    gameMode = mode;
    resetGame();
}

function handleClick(index) {
    if (board[index] || gameOver) return;
    board[index] = currentPlayer;
    renderBoard();
    if (checkWinner()) {
        document.getElementById('status').innerText = `${currentPlayer} Wins!`;
        gameOver = true;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (gameMode === 'ai' && currentPlayer === 'O') {
        aiMove();
    }
}

function aiMove() {
    let availableCells = board.map((val, idx) => (val === '' ? idx : null)).filter(val => val !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    handleClick(randomIndex);
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === currentPlayer)
    );
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    document.getElementById('status').innerText = '';
    renderBoard();
}

function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        if (cell) cellElement.classList.add('taken');
        cellElement.innerText = cell;
        cellElement.onclick = () => handleClick(index);
        boardElement.appendChild(cellElement);
    });
}
