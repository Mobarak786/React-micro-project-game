import React from "react";

const ScoreBoard = ({ player, userscore, pcscore, tie }) => {
  return (
    <div className="game-score">
      <div className={player === "circle" ? "yellow" : "blue"}>
        <p>{player === "circle" ? "(O)YOU" : "(X)YOU"}</p>
        <h2>{userscore}</h2>
      </div>
      <div>
        <p>Ties</p>
        <h2>{tie}</h2>
      </div>
      <div className={player === "circle" ? "blue" : "yellow"}>
        <p>{player === "circle" ? "(X)CPU" : "(O)CPU"}</p>
        <h2>{pcscore}</h2>
      </div>
    </div>
  );
};

export default ScoreBoard;
