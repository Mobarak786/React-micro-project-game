import swipe from "../assets/swipe.mp3";
export const Lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

// setting the game score to local
export const SetGameScore = (pcscore, userscore, tie) => {
  localStorage.setItem("pc-score", JSON.stringify(pcscore));
  localStorage.setItem("user-score", JSON.stringify(userscore));
  localStorage.setItem("tie-score", JSON.stringify(tie));
};

// setting the round
export const RoundNumber = (round) => {
  localStorage.setItem("roundno", JSON.stringify(round));
};

// determines the lines
export const linesWhichAre = (a, b, c, squares) => {
  return Lines.filter((squareIndex) => {
    const squareValues = squareIndex.map((index) => squares[index]);
    return (
      JSON.stringify([a, b, c].sort()) === JSON.stringify(squareValues.sort())
    );
  });
};

export const playSound = () => {
  const beat = new Audio(swipe);
  beat.play();
};
