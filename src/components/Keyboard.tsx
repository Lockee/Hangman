import Button from "./Button";

const keyboard = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

type KeyboardProps = {
  readonly guessedLetters: string[];
  readonly determineColor: (key: string) => string;
  readonly onClick: (key: string) => void;
  readonly disabled?: boolean;
};

type KeyboardRowProps = {
  readonly row: string[];
} & KeyboardProps;

const KeyboardRow = ({
  row,
  guessedLetters,
  determineColor,
  disabled,
  onClick,
}: KeyboardRowProps) => {
  return (
    <div>
      {row.map((key) => (
        <Button
          key={key}
          label={key}
          onClick={() => onClick(key)}
          color={determineColor(key)}
          disabled={guessedLetters.includes(key) || disabled}
        />
      ))}
    </div>
  );
};

const Keyboard = ({
  guessedLetters,
  determineColor,
  disabled,
  onClick,
}: KeyboardProps) => {
  return (
    <div className="flex flex-col items-center m-20 flex-wrap">
      <KeyboardRow
        row={keyboard[0].split("")}
        guessedLetters={guessedLetters}
        determineColor={determineColor}
        disabled={disabled}
        onClick={onClick}
      />
      <KeyboardRow
        row={keyboard[1].split("")}
        guessedLetters={guessedLetters}
        determineColor={determineColor}
        disabled={disabled}
        onClick={onClick}
      />
      <KeyboardRow
        row={keyboard[2].split("")}
        guessedLetters={guessedLetters}
        determineColor={determineColor}
        disabled={disabled}
        onClick={onClick}
      />
    </div>
  );
};

export default Keyboard;
