import React from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Quotes from "../components/Quotes";
import circle from "../assets/circle.png";
import cross from "../assets/cross.png";

const Home = ({ setSymbol, symbol }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (symbol !== "") {
      localStorage.setItem("player", JSON.stringify(symbol));
      navigate("/game");
    } else toast("please select a player");
  };

  const notify = async () => {
    await navigator.clipboard.writeText(location.href);
    toast("invite link copied");
  };

  return (
    <main className="main-section">
      <div className="game-homepage">
        <div className="game-logo">
          <img src={cross} />
          <img src={circle} />
        </div>
        <div className="choose-player">
          <h1>PICK PLAYER </h1>
          <div className="button-section">
            <button onClick={() => setSymbol("cross")}>
              <img src={cross} alt="cross" />
            </button>
            <button onClick={() => setSymbol("circle")}>
              <img src={circle} alt="circle" />
            </button>
          </div>
        </div>
        <div className="playing-option">
          <button onClick={handleClick}>NEW GAME ( VS CPU )</button>
          <button>NEW GAME ( VS HUMAN ) Coming soon</button>
        </div>

        <button className="invite-section" onClick={notify}>
          Invite your friend
        </button>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: "#363636",
              color: "rgba(242, 178, 55, 1)",
            },
          }}
        />
      </div>

      <Quotes />
    </main>
  );
};

export default Home;
