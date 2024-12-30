import React, { useState } from "react";

function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(null);
    setWinner(null);
    setDraw(false);
  };

  const selectPlayer = (player) => {
    setCurrentPlayer(player);
    setBoard(Array(9).fill(null));
    setWinner(null);
    setDraw(false);
  };

  const clickCellPlayer = (index) => {
    if (board[index] || winner || !currentPlayer) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    // Check if the user wins after this move
    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
      return;
    }

    // Check if the game ends in a draw
    if (newBoard.every((cell) => cell !== null)) {
      setDraw(true);
      return;
    }

    // Opponent's move with strategy
    // setTimeout(() => {
      makeOpponentMove(newBoard);
    // }, 500);
  };

  const makeOpponentMove = (board) => {
    const opponent = currentPlayer === "X" ? "O" : "X";
    // Sets the opponent’s symbol as the opposite of the current player ("X" or "O").
    const newBoard = [...board];

    // 1. Try to win if possible
    for (let i = 0; i < newBoard.length; i++) {
      if (!newBoard[i]) {
        newBoard[i] = opponent;
        if (checkWinner(newBoard) === opponent) {
          setBoard(newBoard);
          setWinner(opponent);
          return;
        }
        newBoard[i] = null;
      }

      // Loops through the board:
       // Places the opponent’s symbol in an empty cell (!newBoard   [i]).
       // Checks if this move results in a win (checkWinner).
       // If so, updates the board and declares the opponent as the winner.
    }

    // 2. Block the user if they are about to win
    for (let i = 0; i < newBoard.length; i++) {
      if (!newBoard[i]) {
        newBoard[i] = currentPlayer;
        if (checkWinner(newBoard) === currentPlayer) {
          newBoard[i] = opponent;
          setBoard(newBoard);
          return;
        }
        newBoard[i] = null;
      }
      // Checks if the user is about to win and blocks that move by placing the opponent's symbol in the critical cell.
    }

    // 3. Otherwise, pick a random empty cell
    const emptyCells = newBoard
      .map((cell, idx) => (cell === null ? idx : null))
      .filter((idx) => idx !== null);

      // If the cell is empty (cell === null), it keeps the index of that cell (idx).
      // If the cell is not empty (cell !== null),means value assign hy  to osko filter  kr ki osko remove kr dy  

      if (emptyCells.length > 0) {
      const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      newBoard[randomIndex] = opponent;
      setBoard(newBoard);

      // Check if the game ends in a draw after the opponent's move
      if (newBoard.every((cell) => cell !== null)) {
        setDraw(true);
        return;
      }
    }
  };

  const checkWinner = (board) => {
    const winningCombination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombination) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  return (
    <div className="bg-purple-800 flex items-center justify-center min-h-screen">
      <div className="bg-purple-900 p-4 sm:p-8 rounded-lg w-full max-w-xs sm:max-w-md">
        <div className="flex justify-center items-center mb-4 sm:mb-8">
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg"
            onClick={restartGame}
          >
            Restart
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-8">
          <button
            className="bg-blue-400 text-white font-bold py-2 px-4 rounded-lg"
            onClick={() => selectPlayer("X")}
          >
            Player X
          </button>
          <button
            className="bg-blue-200 text-gray-800 font-bold py-2 px-4 rounded-lg"
            disabled
          >
            DRAW
          </button>
          <button
            className="bg-blue-400 text-white font-bold py-2 px-4 rounded-lg"
            onClick={() => selectPlayer("O")}
          >
            Player O
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {board.map((value, index) => (
            <div
              key={index}
              className="bg-purple-800 p-8 sm:p-16 rounded-lg flex items-center justify-center cursor-pointer"
              onClick={() => clickCellPlayer(index)}
            >
              <p className="text-2xl sm:text-4xl font-bold text-white">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          {winner && (
            <p className="text-white text-xl font-bold">Winner: {winner} 🎉</p>
          )}
          {draw && !winner && (
            <p className="text-white text-xl font-bold">Game is Over 🤝</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Game;
