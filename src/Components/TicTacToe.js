import React, { useState } from "react";

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentplayer, setCurrentplayer] = useState(null);
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);

  const restartGame = () => {
    //     console.log(true);
    setBoard(Array(9).fill(null));
    setCurrentplayer(null);
    setWinner(null);
    setDraw(false);
  };
  const selecttplayer = (player) => {
    console.log("player is  selected");
    setCurrentplayer(player);
    setBoard(Array(9).fill(null));
    setWinner(null);
    setDraw(false);
  };

  // click on cell board

  const clickCellPlayer = (index) => {
    if (board[index] || winner || !currentplayer) return;

    const newboard = [...board];
    newboard[index] = currentplayer;
    setBoard(newboard);

    const win = checkwinner(newboard);
    if (win) {
      setWinner(win);
      return;
    }

    if (newboard.every((cell) => cell !== null)) {
      setDraw(true);
      return;
    }
    makecomputermove(newboard);
  };

  // Opponent's random move
  const makecomputermove = (board) => {
    const computermove = currentplayer === "X" ? "O" : "X";
    const newboard = [...board];
    // 1. Try to win if possible

    for (let i = 0; i < newboard.length; i++) {
      if (!newboard[i]) {
        newboard[i] = computermove;
        if (checkwinner(newboard) === computermove) {
          setWinner(computermove);
          setBoard(newboard);
          return;
        }
        newboard[i] = null;
      }
    }
    // 2. Block the user if they are about to win

    for (let i = 0; i < newboard.length; i++) {
      if (!newboard[i]) {
        newboard[i] = currentplayer;
        if (checkwinner(newboard) === currentplayer) {
          newboard[i] = computermove;
          setBoard(newboard);
          return;
        }
        newboard[i] = null;
      }
    }

    const emptycell = newboard
      .map((cell, idx) => (cell === null ? idx : null))
      .filter((idx) => idx !== null);

    if (emptycell.length > 0) {
      const randomindex =
        emptycell[Math.floor(Math.random() * emptycell.length)];
      newboard[randomindex] = currentplayer === "X" ? "O" : "X";
      setBoard(newboard);

      // check draw
      if (newboard.every((cell) => cell !== null)) {
        setDraw(true);
        return;
      }
    }

  };
  // chk winner logic

  const checkwinner = (board) => {
    const winnercombination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let combination of winnercombination) {
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
            onClick={() => selecttplayer("X")}
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
            onClick={() => selecttplayer("O")}
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

export default TicTacToe;
