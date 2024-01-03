interface Props {
  label: string;
  onClick?: () => any;
}

const Button: React.FC<Props> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={
        "dark:bg-theme-dark-prm bg-theme-light-prm dark:text-white text-black px-1 py-2 rounded-sm lg:text-sm"
      }
    >
      {label}
    </button>
  );
};

export default Button;
