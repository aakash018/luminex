interface Props {
  label: string;
  onClick?: () => any;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({ label, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        "disabled:bg-gray-300 disabled:cursor-not-allowed dark:bg-theme-dark-prm bg-theme-light-prm dark:text-white text-black px-1 py-2 rounded-sm lg:text-sm"
      }
    >
      {label}
    </button>
  );
};

export default Button;
