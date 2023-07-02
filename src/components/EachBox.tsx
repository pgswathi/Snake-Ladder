import React from "react";
import { snakePositions, ladderPositions } from "./SnakeAndLadderPositions";

export const EachBox = (props) => {
  const { boxIndex, updatedState } = props;
  const { numOfPlayers } = updatedState;
  const getPlayerNamesArr = () => {
    let arr = [];
    for (let i = 1; i <= numOfPlayers; i++) {
      arr.push(`P${i}`);
    }
    return arr;
  };
  return (
    <div className="each-box">
      <div className="icons-in-box">
        {getPlayerNamesArr().map((playerName) => {
          return (
            updatedState[playerName].currentPosition === boxIndex && (
              <div className={`${playerName}_shape`} />
            )
          );
        })}
      </div>
    </div>
  );
};
