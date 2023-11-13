import React from "react";
import refressicon from "../assets/refress.png";
import circle from "../assets/circle.png";
import cross from "../assets/cross.png";
const GameHeader = ({ player, computersturn, handleRefress }) => {
  return (
    <div className="game-header">
      <div className="game-icons" id="game-icon">
        <img src={player === "cross" ? cross : circle} alt="icon" />
        <img src={player === "cross" ? circle : cross} alt="icon" />
      </div>
      <div className="game-icons" id="whose-turn">
        <img src={computersturn ? circle : cross} alt="icon" />
        <h1>TURN</h1>
      </div>
      <div className="game-icons" id="refress-icon">
        <img onClick={handleRefress} src={refressicon} alt="refress" />
      </div>
    </div>
  );
};

export default GameHeader;
