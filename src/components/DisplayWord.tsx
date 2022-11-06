import { GameState } from "@/App";

type DisplayWordProps = {
  readonly word: string[];
  readonly guessedLetters: string[];
  readonly state: GameState;
};

const DisplayWord = ({ word, state, guessedLetters }: DisplayWordProps) => {
  return (
    <div className="flex justify-center gap-2 mt-4 text-6xl">
      {word.length > 0 &&
        [word.at(0)!.toUpperCase(), ...word.slice(1)].map((char, index) => {
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

export default DisplayWord;
