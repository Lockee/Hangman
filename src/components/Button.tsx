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

export default Button;
