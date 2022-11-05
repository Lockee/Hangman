import React from "react";

const keyboard = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
const baseUrl = "https://random-word-api.herokuapp.com";

type ButtonProps = {
  readonly label: string;
  readonly color?: string;
  readonly onClick?: React.MouseEventHandler<HTMLButtonElement>;
  readonly disabled?: boolean;
};

const Button = ({ label, color, onClick, disabled }: ButtonProps) => (
  <button
    className={`${color ?? ""} m-2 p-6 border-gray-50`}
    onClick={onClick}
    key={`char${label}`}
    disabled={disabled}
  >
    {label}
  </button>
);

type GameState = "running" | "won" | "failed";

type DisplayWordProps = {
  readonly word: string[];
  readonly guessedLetters: string[];
  readonly state: GameState;
};

const DisplayWord = ({ word, state, guessedLetters }: DisplayWordProps) => {
  return (
    <div className="flex justify-center gap-2 mt-4 text-6xl">
      {[word.at(0)!.toUpperCase(), ...word.slice(1)].map((char, index) => {
        return state === "won" ? (
          <div key={`${char}OnPos${index}`} className="text-green-500">
            {char}
          </div>
        ) : state === "failed" ? (
          <div key={`${char}OnPos${index}`} className="text-pink-500">
            {char}
          </div>
        ) : (
          <div key={`${char}OnPos${index}`}>
            {guessedLetters.includes(char.toLowerCase()) ? char : "_"}
          </div>
        );
      })}
    </div>
  );
};

const MAX_NUMBER_OF_WRONG_GUESSES = 10;

const App = () => {
  const [gameState, setGameState] = React.useState<GameState>("running");
  const [guessCount, setGuessCount] = React.useState(0);
  const [guessedLetters, setGuessedLetters] = React.useState<string[]>([]);
  const [word, setWord] = React.useState<string[]>("bullshitted".split(""));

  const buttonColor = (char: string) => {
    if (gameState === "won") return "bg-green-500";
    if (gameState === "failed") return "bg-pink-500";
    if (guessedLetters.includes(char) && word.includes(char))
      return "bg-green-500";
    if (guessedLetters.includes(char) && !word.includes(char))
      return "bg-pink-500";
    return "bg-gray-500";
  };

  const fetchWord = React.useCallback(
    async (controller?: AbortController): Promise<string[]> => {
      return fetch(`${baseUrl}/word`, { signal: controller?.signal }).then(
        (r) => r.json()
      );
    },
    []
  );

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

  React.useEffect(() => {
    const controller = new AbortController();
    fetchWord(controller)
      .then((words: string[]) => {
        const word = words[0].split("");
        setWord(word);
      })
      .catch(() => {});

    return () => {
      controller.abort();
    };
  }, []);

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
          <div className="flex flex-col items-center m-20 flex-wrap">
            <div>
              {keyboard[0].split("").map((char, idx) => (
                <Button
                  key={`row0${idx}`}
                  label={char}
                  onClick={() => handleClick(char)}
                  color={buttonColor(char)}
                  disabled={
                    guessedLetters.includes(char) || gameState !== "running"
                  }
                />
              ))}
            </div>
            <div>
              {keyboard[1].split("").map((char, idx) => (
                <Button
                  key={`row1${idx}`}
                  label={char}
                  onClick={() => handleClick(char)}
                  color={buttonColor(char)}
                  disabled={
                    guessedLetters.includes(char) || gameState !== "running"
                  }
                />
              ))}
            </div>
            <div>
              {keyboard[2].split("").map((char, idx) => (
                <Button
                  key={`row2${idx}`}
                  label={char}
                  onClick={() => handleClick(char)}
                  color={buttonColor(char)}
                  disabled={
                    guessedLetters.includes(char) || gameState !== "running"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
