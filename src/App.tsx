import React from "react";
import Button from "./components/Button";
import DisplayWord from "./components/DisplayWord";
import Keyboard from "./components/Keyboard";
import { useWord } from "./hooks/useWord";

export type GameState = "running" | "won" | "failed";

const MAX_NUMBER_OF_WRONG_GUESSES = 10;

const App = () => {
  const [gameState, setGameState] = React.useState<GameState>("running");
  const [guessCount, setGuessCount] = React.useState(0);
  const [guessedLetters, setGuessedLetters] = React.useState<string[]>([]);
  const { word } = useWord();

  const buttonColor = (char: string) => {
    if (gameState === "won") return "bg-green-500";
    if (gameState === "failed") return "bg-pink-500";
    if (guessedLetters.includes(char) && word.includes(char))
      return "bg-green-500";
    if (guessedLetters.includes(char) && !word.includes(char))
      return "bg-pink-500";
    return "bg-gray-500";
  };

  const checkGameOver = (
    guesses: number,
    guessedLetters: string[]
  ): GameState => {
    if (guesses >= MAX_NUMBER_OF_WRONG_GUESSES) return "failed";
    if (
      guesses < MAX_NUMBER_OF_WRONG_GUESSES &&
      word.every((char) => guessedLetters.includes(char))
    )
      return "won";
    return "running";
  };

  const handleClick = (char: string) => {
    setGuessedLetters((prevGuessLetters) => {
      const newGuessedLetters = [...prevGuessLetters, char];
      if (!word.includes(char))
        setGuessCount((prevGuessCount) => {
          const newGuessCount = prevGuessCount + 1;
          const newState = checkGameOver(newGuessCount, newGuessedLetters);
          const b = setGameState(newState);
          return newGuessCount;
        });
      else {
        const newState = checkGameOver(guessCount, newGuessedLetters);
        setGameState(newState);
      }
      return newGuessedLetters;
    });
  };

  return (
    <div className="flex flex-col items-center m-4 border-white-500">
      <h1 className="text-8xl mb-12">Hangman</h1>
      <div className="min-w-full flex justify-around font-mono ">
        <div className="flex flex-col justify-center items-center">
          <img
            src={`assets/stage${guessCount + 1}.png`}
            alt="Hangman Image"
            width="300"
            height="600"
          />
          <div>{`Wrong Guesses: ${guessCount}/10`}</div>
        </div>
        <div className="flex flex-col justify-around">
          <DisplayWord
            word={word}
            guessedLetters={guessedLetters}
            state={gameState}
          />
          <Keyboard
            guessedLetters={guessedLetters}
            determineColor={buttonColor}
            onClick={(key) => handleClick(key)}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
