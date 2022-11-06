import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import React from "react";
import DisplayWord from "./components/DisplayWord";
import Keyboard from "./components/Keyboard";
import Button from "./components/Button";
import { fetchWord } from "./utils/fetchWord";

const MAX_NUMBER_OF_WRONG_GUESSES = 10;

const App = () => {
  const [guessCount, setGuessCount] = React.useState(0);
  const [guessedLetters, setGuessedLetters] = React.useState<string[]>([]);
  // FIX: for a brief second, when data has been refetched and the game was lost, the new word was fully displayed in red
  const [waitForNewGame, setWaitForNewGame] = React.useState(false);

  const {
    data: word,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["word"],
    queryFn: fetchWord,
    refetchOnWindowFocus: false,
    onSuccess: () => {
      setGuessCount(0);
      setGuessedLetters([]);
      setWaitForNewGame(false);
    },
  });

  const hasWon =
    guessCount < MAX_NUMBER_OF_WRONG_GUESSES &&
    word &&
    word.every((char) => guessedLetters.includes(char));
  const hasLost = guessCount >= MAX_NUMBER_OF_WRONG_GUESSES;

  const handleKeyClicked = (char: string) => {
    setGuessedLetters((prevGuessLetters) => {
      const newGuessedLetters = [...prevGuessLetters, char];
      if (!word?.includes(char))
        setGuessCount((prevGuessCount) => {
          const newGuessCount = prevGuessCount + 1;
          return newGuessCount;
        });
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
          <div>{`Guesses Left: ${
            MAX_NUMBER_OF_WRONG_GUESSES - guessCount
          }`}</div>
        </div>
        <div className="flex flex-col justify-around">
          {!word || isLoading || waitForNewGame ? (
            <div>Loading...</div>
          ) : (
            <>
              <DisplayWord
                word={word}
                guessedLetters={guessedLetters}
                hasLost={hasLost ?? false}
                hasWon={hasWon ?? false}
              />
              <Keyboard
                guessedLetters={guessedLetters}
                onClick={(key) => handleKeyClicked(key)}
                winningCondition={(key) =>
                  hasWon ||
                  (!hasLost &&
                    guessedLetters.includes(key) &&
                    word.includes(key))
                }
                lostCondition={(key) =>
                  hasLost ||
                  (!hasWon &&
                    guessedLetters.includes(key) &&
                    !word.includes(key))
                }
              />
              {(hasWon || hasLost) && (
                <Button
                  label="Restart Game"
                  color="bg-gray-500"
                  onClick={() => {
                    setWaitForNewGame(true);
                    refetch();
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
