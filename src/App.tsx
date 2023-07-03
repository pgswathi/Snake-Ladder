import React from "react";
import "./styles.css";
import { SetPlayers } from "./components/SetPlayers";
import { Layout } from "./components/Layout";
import { Ledger } from "./components/Ledger";
import Dice from "./components/dice";
import {
  snakePositions,
  ladderPositions,
} from "./assets/SnakeAndLadderPositions";

class App extends React.Component<
  {},
  {
    numOfPlayers: number;
    hidePlayerSelection: boolean;
    invalidNumOfPlayers?: boolean;
    chanceToRollDice?: string;
    showLayout?: boolean;
    diceValue?: number;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      numOfPlayers: 2,
      hidePlayerSelection: false,
    };
  }
  updateNumberOfPlayers = (e: { target: { value: number } }) => {
    this.setState({
      numOfPlayers: e.target.value,
      invalidNumOfPlayers: e.target.value > 4 || e.target.value < 2,
    });
  };
  initializeGame = () => {
    let playersState = {};
    for (let i = 1; i <= this.state.numOfPlayers; i++) {
      playersState[`P${i}`] = {
        currentPosition: 0,
      };
    }
    this.setState({
      showLayout: true,
      hidePlayerSelection: true,
      ...playersState,
      chanceToRollDice: "P1",
    });
  };
  updateChanceToRollDice = () => {
    const currentChance = this.state.chanceToRollDice;
    const playerIndex = currentChance.split("")[1];
    if (playerIndex.toString() === this.state.numOfPlayers.toString()) {
      this.setState({
        chanceToRollDice: "P1",
      });
    } else {
      this.setState({
        chanceToRollDice: `P${Number(playerIndex) + 1}`,
      });
    }
  };
  checkSnakeOrLadder = () => {
    const currentChance = this.state.chanceToRollDice;
    const currentPlayerPostion = this.state[currentChance].currentPosition;
    snakePositions.forEach((obj) => {
      if (obj.currentPosition === currentPlayerPostion) {
        new Audio(require("./assets/snake.mp3")).play();
        this.setState({
          ...this.state,
          [currentChance]: {
            currentPosition: obj.gotoPosition,
          },
        });
      }
    });
    ladderPositions.forEach((obj) => {
      if (obj.currentPosition === currentPlayerPostion) {
        new Audio(require("./assets/ladder.mp3")).play();
        this.setState({
          ...this.state,
          [currentChance]: {
            currentPosition: obj.gotoPosition,
          },
        });
      }
    });
  };
  timeout = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };
  updatePlayerPosition = async () => {
    const currentChance = this.state.chanceToRollDice;
    const currentPlayerPostion = this.state[currentChance].currentPosition;
    if (currentPlayerPostion + this.state.diceValue >= 100) {
      alert(
        `Game Over !!! Congrats ${(
          <div className={`${currentChance}_shape`} />
        )}`
      );
      this.setState({
        numOfPlayers: 2,
        hidePlayerSelection: false,
        showLayout: false,
      });
      return;
    }
    let diceVal = 1;

    while (diceVal <= this.state.diceValue) {
      this.setState({
        ...this.state,
        [currentChance]: {
          currentPosition: currentPlayerPostion + diceVal,
        },
      });
      await this.timeout(500);
      diceVal++;
    }
    this.setState(this.checkSnakeOrLadder);
  };
  rollDice = (num) => {
    this.setState(
      {
        diceValue: num,
      },
      this.updatePlayerPosition
    );
    this.updateChanceToRollDice(); // to be called last setTimeout
  };

  getNamesofPlayers = () => {
    let str = "";
    for (let i = 1; i <= this.state.numOfPlayers; i++) {
      str = str + <div className={`P${i}_shape`} />;
    }
    return str;
  };
  render() {
    const {
      numOfPlayers,
      invalidNumOfPlayers,
      showLayout,
      hidePlayerSelection,
      chanceToRollDice,
    } = this.state;
    return (
      <div className="App">
        <div className="left-container">
          <h1>Snake & Ladders</h1>
          {!hidePlayerSelection && (
            <SetPlayers
              invalidNumOfPlayers={invalidNumOfPlayers}
              numOfPlayers={numOfPlayers}
              updateNumberOfPlayers={this.updateNumberOfPlayers}
              showLayout={this.initializeGame}
            />
          )}
          {showLayout && (
            <>
              Turn :
              <p
                style={{
                  marginTop: "3rem",
                  marginLeft: "6rem",
                  justifyContent: "center",
                }}
              >
                <div className={`${chanceToRollDice}_shape`} />
              </p>
              <Dice rollDice={this.rollDice} />
            </>
          )}
          {!showLayout && <Ledger />}
        </div>
        <div className="right-container">
          {showLayout && <Layout updatedState={this.state} />}
        </div>
      </div>
    );
  }
}

export default App;
