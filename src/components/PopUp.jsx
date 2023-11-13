import React from "react";
import circle from "../assets/circle.png";
import cross from "../assets/cross.png";
import { useNavigate } from "react-router-dom";

const PopUp = ({
  setOpen,
  setSquares,
  setComputersturn,
  refress,
  setRefress,
  defaultSquare,
  winner,
  player,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    setSquares(defaultSquare);
    setComputersturn(false);
    setOpen(false);
    setRefress(false);
  };
  const handleQuit = () => {
    localStorage.clear();
    navigate("/");
  };
  const usersChoice = JSON.parse(localStorage.getItem("player"));

  return (
    <div className="popup-body">
      <h2>
        {refress
          ? ""
          : winner === "player"
          ? "YOU OWN!"
          : winner === "computer"
          ? "CPU OWN!"
          : "TIE!"}
      </h2>
      <div className="message">
        {refress || winner === "tie" ? (
          ""
        ) : (
          <img
            src={
              winner === "computer"
                ? player === "cross"
                  ? circle
                  : cross
                : player === "cross"
                ? cross
                : circle
            }
            alt="icon"
          />
        )}

        {winner === "tie" ? (
          <h1>Tie! Please Try Again</h1>
        ) : (
          <h1
            style={{
              color:
                winner === "player"
                  ? player === "cross"
                    ? "rgb(49, 196, 190)"
                    : "rgb(247, 179, 54)"
                  : player === "cross"
                  ? "rgb(247, 179, 54)"
                  : "rgb(49, 196, 190)",
            }}
          >
            {refress ? "Do you want to quit ?" : "TAKES THE ROUND"}
          </h1>
        )}
      </div>
      <div className="popup-buttons">
        <button onClick={handleQuit} id="quite">
          QUIT
        </button>
        <button onClick={handleClick}>PLAY AGAIN</button>
      </div>
    </div>
  );
};

export default PopUp;
