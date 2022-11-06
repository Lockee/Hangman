import Button from "./Button";

const keyboard = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

type KeyboardProps = {
  readonly guessedLetters: string[];
  readonly onClick: (key: string) => void;
  readonly winningCondition: (key: string) => boolean;
  readonly lostCondition: (key: string) => boolean;
  readonly disabled?: boolean;
};

type KeyboardRowProps = {
  readonly row: string[];
} & KeyboardProps;

const KeyboardRow = ({
  row,
  guessedLetters,
  disabled,
  onClick,
  lostCondition,
  winningCondition,
}: KeyboardRowProps) => {
  const getKeyColor = (key: string) => {
    if (winningCondition(key)) return "bg-green-500";
    if (lostCondition(key)) return "bg-pink-500";
    return "bg-gray-500";
  };

  return (
    <div>
      {row.map((key) => (
        <Button
          key={key}
          label={key}
          onClick={() => onClick(key)}
          color={getKeyColor(key)}
          disabled={guessedLetters.includes(key) || disabled}
        />
      ))}
    </div>
  );
};

const Keyboard = ({
  guessedLetters,
  lostCondition,
  winningCondition,
  disabled,
  onClick,
}: KeyboardProps) => {
  return (
    <div className="flex flex-col items-center m-20 flex-wrap">
      <KeyboardRow
        winningCondition={winningCondition}
        lostCondition={lostCondition}
        row={keyboard[0].split("")}
        guessedLetters={guessedLetters}
        disabled={disabled}
        onClick={onClick}
      />
      <KeyboardRow
        winningCondition={winningCondition}
        lostCondition={lostCondition}
        row={keyboard[1].split("")}
        guessedLetters={guessedLetters}
        disabled={disabled}
        onClick={onClick}
      />
      <KeyboardRow
        winningCondition={winningCondition}
        lostCondition={lostCondition}
        row={keyboard[2].split("")}
        guessedLetters={guessedLetters}
        disabled={disabled}
        onClick={onClick}
      />
    </div>
  );
};

export default Keyboard;
