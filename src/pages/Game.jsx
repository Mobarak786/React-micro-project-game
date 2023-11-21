import React, { useEffect, useState } from "react";

import cross from "../assets/cross.png";
import circle from "../assets/circle.png";
import empty from "../assets/empty.png";

import Quotes from "../components/Quotes";
import PopUp from "../components/PopUp";
import ScoreBoard from "../components/ScoreBoard";
import GameHeader from "../components/GameHeader";

import { RoundNumber, SetGameScore, playSound } from "../functions";
import { linesWhichAre } from "../functions";

const defaultSquare = () => new Array(9).fill(null);

const Game = ({ symbol }) => {
  const [squares, setSquares] = useState(defaultSquare);
  const [computersturn, setComputersturn] = useState(false);
  const [player, setPlayer] = useState("");
  const [open, setOpen] = useState(false);
  const [refress, setRefress] = useState(false);
  const [winner, setWinner] = useState("");
  const [finalwinner, setFinalwinner] = useState("");

  const [pcscore, setPcscore] = useState(
    Number(JSON.parse(localStorage.getItem("pc-score"))) || 0
  );

  const [userscore, setUserscore] = useState(
    Number(JSON.parse(localStorage.getItem("user-score"))) || 0
  );

  const [tie, setTie] = useState(
    Number(JSON.parse(localStorage.getItem("tie-score"))) || 0
  );

  const [round, setRound] = useState(
    Number(JSON.parse(localStorage.getItem("roundno"))) || 0
  );

  const handleClick = (index, square) => {
    if (square === "X" || square === "O") {
      return;
    }
    let newSquares = squares;
    player === "cross" ? (newSquares[index] = "X") : (newSquares[index] = "O");
    setSquares([...newSquares]);
    playSound();
    setComputersturn(true);
  };

  const handleRefress = () => {
    setRefress(true);
    setOpen(true);
  };

  // fetches the player symbol from local storage..
  useEffect(() => {
    setPlayer(JSON.parse(localStorage.getItem("player") || null));
  }, [symbol]);

  useEffect(() => {
    // for setting the gamescore & round in localStorage
    RoundNumber(round);
    SetGameScore(pcscore, userscore, tie);

    //calulating final winner to show in popup
    if (round === 5) {
      userscore > pcscore && userscore > tie
        ? setFinalwinner("🎉🎉YOU ARE THE FINAL WINNER🎉🎉")
        : pcscore > userscore && pcscore > tie
        ? setFinalwinner("🎉🎉PC IS THE FINAL WINNER🎉🎉")
        : setFinalwinner("🌟🌟THE GAME IS TIE🌟🌟");
    }
  }, [winner, refress]);

  useEffect(() => {
    // this method determines if the player is winner
    const playerOwn =
      player === "cross"
        ? linesWhichAre("X", "X", "X", squares)
        : linesWhichAre("O", "O", "O", squares);

    // this method determines if the computer is winner
    const computerOwn =
      player === "circle"
        ? linesWhichAre("X", "X", "X", squares)
        : linesWhichAre("O", "O", "O", squares);

    // if the player is winner
    if (playerOwn.length > 0) {
      setUserscore(() => userscore + 1);
      setRound(() => round + 1);
      setWinner("player");
      setTimeout(() => {
        setOpen(true);
      }, 1000);
      return;
    }

    // if the computer is winner
    if (computerOwn.length > 0) {
      setPcscore(() => pcscore + 1);
      setRound(() => round + 1);
      setWinner("computer");
      setComputersturn(false);
      setTimeout(() => {
        setOpen(true);
      }, 1000);
      return;
    }

    // if the game is tie
    const ties = squares.filter((square) => square === null);
    if (ties.length === 0) {
      setTie(() => tie + 1);
      setRound(() => round + 1);
      setWinner("tie");
      setTimeout(() => {
        setOpen(true);
      }, 1000);
      return;
    }

    // calculates the remaining empty turns to play for the computer
    const emptySquares = squares
      .map((square, index) => (square === null ? index : null))
      .filter((square) => square !== null);

    //putting the computer value at its position
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
      // winning logic for the computer to play next turn
      const LinesToWin =
        player === "circle"
          ? linesWhichAre("X", "X", null, squares)
          : linesWhichAre("O", "O", null, squares);
      if (LinesToWin.length > 0) {
        const winIndex = LinesToWin[0].filter(
          (index) => squares[index] === null
        );
        setTimeout(() => {
          putComputerAt(winIndex[0]);
          playSound();
          setComputersturn(false);
        }, 1000);
        return;
      }
      // blocking the players position by computer
      const linesToBlock =
        player === "circle"
          ? linesWhichAre("O", "O", null, squares)
          : linesWhichAre("X", "X", null, squares);
      if (linesToBlock.length > 0) {
        const blockIndex = linesToBlock[0].filter(
          (index) => squares[index] === null
        );
        setTimeout(() => {
          putComputerAt(blockIndex[0]);
          playSound();
          setComputersturn(false);
        }, 1000);
        return;
      }

      //random position for the computer to play it turn
      setTimeout(() => {
        putComputerAt(randomIndex);
        playSound();
        setComputersturn(false);
      }, 1000);
    }
  }, [computersturn]);

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

        {/* show the popup on game over */}

        {open && (
          <div className="poup-bar">
            <PopUp
              winner={winner}
              setWinner={setWinner}
              setSquares={setSquares}
              setComputersturn={setComputersturn}
              setOpen={setOpen}
              setRefress={setRefress}
              refress={refress}
              defaultSquare={defaultSquare}
              player={player}
              round={round}
              setRound={setRound}
              setTie={setTie}
              setUserscore={setUserscore}
              setPcscore={setPcscore}
              finalwinner={finalwinner}
              setFinalwinner={setFinalwinner}
            />
          </div>
        )}
      </div>

      <Quotes />
    </main>
  );
};

export default Game;
