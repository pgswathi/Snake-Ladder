import React from "react";
import ReactDice from "react-dice-complete";
import diceSound from "../assets/diceroll.mp3";

class Dice extends React.Component {
  rollAll = () => {
    new Audio(diceSound).play();
    this.reactDice.rollAll();
  };
  rollDoneCallback = (num) => {
    const { rollDice } = this.props;
    rollDice(num);
  };
  render() {
    return (
      <>
        <ReactDice
          numDice={1}
          rollDone={this.rollDoneCallback}
          ref={(dice) => (this.reactDice = dice)}
        />
        <button onClick={this.rollAll}>Roll Dice</button>
      </>
    );
  }
}

export default Dice;
