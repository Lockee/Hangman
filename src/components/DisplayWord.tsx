type DisplayWordProps = {
  readonly word: string[];
  readonly guessedLetters: string[];
  readonly hasWon: boolean;
  readonly hasLost: boolean;
};

const DisplayWord = ({
  word,
  hasWon,
  hasLost,
  guessedLetters,
}: DisplayWordProps) => {
  return (
    <div className="flex justify-center gap-2 mt-4 text-6xl">
      {word.length > 0 &&
        [word.at(0)!.toUpperCase(), ...word.slice(1)].map((char, index) => {
          return hasWon ? (
            <div key={`${char}OnPos${index}`} className="text-green-500">
              {char}
            </div>
          ) : hasLost ? (
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
