import React, { useEffect, useState } from "react";
import Quotes from "./Quotes";
import circle from "../assets/circle.png";
import cross from "../assets/cross.png";
import empty from "../assets/empty.png";
import PopUp from "./PopUp";
import ScoreBoard from "./ScoreBoard";
import GameHeader from "./GameHeader";

const defaultSquare = () => new Array(9).fill(null);

const Lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

const Game = ({ symbol }) => {
  const [squares, setSquares] = useState(defaultSquare);
  const [computersturn, setComputersturn] = useState(false);
  const [player, setPlayer] = useState("");
  const [open, setOpen] = useState(false);
  const [refress, setRefress] = useState(false);
  const [winner, setWinner] = useState("");
  const [pcscore, setPcscore] = useState(
    Number(JSON.parse(localStorage.getItem("pc-score"))) || 0
  );
  const [userscore, setUserscore] = useState(
    Number(JSON.parse(localStorage.getItem("user-score"))) || 0
  );
  const [tie, setTie] = useState(
    Number(JSON.parse(localStorage.getItem("tie-score"))) || 0
  );
  const handleRefress = () => {
    setOpen(true);
    setRefress(true);
  };
  useEffect(() => {
    localStorage.setItem("pc-score", JSON.stringify(pcscore));
    localStorage.setItem("user-score", JSON.stringify(userscore));
    localStorage.setItem("tie-score", JSON.stringify(tie));
  }, [winner]);

  // fetches the player symbol from local storage..
  useEffect(() => {
    setPlayer(JSON.parse(localStorage.getItem("player") || null));
  }, [symbol]);

  //  this useEffcet runs the functions for the computer after the players turn..
  useEffect(() => {
    const linesWhichAre = (a, b, c) => {
      return Lines.filter((squareIndex) => {
        const squareValues = squareIndex.map((index) => squares[index]);
        return (
          JSON.stringify([a, b, c].sort()) ===
          JSON.stringify(squareValues.sort())
        );
      });
    };

    const playerOwn =
      player === "cross"
        ? linesWhichAre("X", "X", "X")
        : linesWhichAre("O", "O", "O");
    const computerOwn =
      player === "circle"
        ? linesWhichAre("X", "X", "X")
        : linesWhichAre("O", "O", "O");

    if (playerOwn.length > 0) {
      setWinner("player");
      setUserscore(() => userscore + 1);

      setOpen(true);

      return;
    }
    if (computerOwn.length > 0) {
      setTimeout(() => {
        setWinner("computer");
        setPcscore(() => pcscore + 1);

        setOpen(true);
      }, 500);
      return;
    }
    const ties = squares.filter((square) => square === null);
    if (ties.length === 0) {
      setTimeout(() => {
        setWinner("tie");
        setTie(() => tie + 1);
        setOpen(true);
      }, 500);
      return;
    }
    const emptySquares = squares
      .map((square, index) => (square === null ? index : null))
      .filter((square) => square !== null);

    const putComputerAt = (index) => {
      let newSquares = squares;
      player === "circle"
        ? (newSquares[index] = "X")
        : (newSquares[index] = "O");
      setSquares([...newSquares]);
    };
    const randomIndex =
      emptySquares[Math.ceil(Math.random() * emptySquares.length)];

    if (computersturn) {
      // winning logic for the computer play next turn
      const LinesToWin =
        player === "circle"
          ? linesWhichAre("X", "X", null)
          : linesWhichAre("O", "O", null);
      if (LinesToWin.length > 0) {
        const winIndex = LinesToWin[0].filter(
          (index) => squares[index] === null
        );
        putComputerAt(winIndex[0]);
        setComputersturn(false);
        return;
      }
      // blocking the players position by computer
      const linesToBlock =
        player === "circle"
          ? linesWhichAre("O", "O", null)
          : linesWhichAre("X", "X", null);
      if (linesToBlock.length > 0) {
        const blockIndex = linesToBlock[0].filter(
          (index) => squares[index] === null
        );

        putComputerAt(blockIndex[0]);
        setComputersturn(false);
        return;
      }
      // random position for the computer to play
      putComputerAt(randomIndex);
      setComputersturn(false);
    }
  }, [computersturn]);

  const handleClick = (index, square) => {
    if (square === "X" || square === "O") {
      return;
    }
    let newSquares = squares;
    player === "cross" ? (newSquares[index] = "X") : (newSquares[index] = "O");
    setSquares([...newSquares]);
    setComputersturn(true);
  };

  return (
    <main className="game-mainpage">
      <div className="game-homepage">
        {/* game header section */}
        <GameHeader
          player={player}
          computersturn={computersturn}
          handleRefress={handleRefress}
        />

        {/* game play section  */}
        <div className="game-board">
          {squares.map((square, index) => (
            <div
              onClick={() => handleClick(index, square)}
              key={index}
              className="square"
            >
              {
                <img
                  src={
                    square !== null ? (square === "X" ? cross : circle) : empty
                  }
                />
              }
            </div>
          ))}
        </div>

        {/* game scoreboard section  */}
        <ScoreBoard
          player={player}
          userscore={userscore}
          pcscore={pcscore}
          tie={tie}
        />

        {/* show poup-bar on game over */}
        {open && (
          <div className="poup-bar">
            <PopUp
              winner={winner}
              setSquares={setSquares}
              setComputersturn={setComputersturn}
              setOpen={setOpen}
              setRefress={setRefress}
              refress={refress}
              defaultSquare={defaultSquare}
              player={player}
            />
          </div>
        )}
      </div>
      <Quotes />
    </main>
  );
};

export default Game;
