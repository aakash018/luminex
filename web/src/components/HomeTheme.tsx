import Wave from "react-wavify";

interface Props {
  children: React.ReactNode;
}

const HomeTheme: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full h-full bg-theme-light-bg dark:bg-theme-dark-bg overflow-hidden">
      <div className="w-full h-full  text-black dark:text-white relative flex justify-center items-center flex-col">
        <div className="absolute top-0 w-full z-[0]">
          <div className="w-full dark:bg-theme-dark-prm bg-theme-light-prm h-[70px]"></div>
          <Wave
            className="rotate-180"
            fill={`
              ${
                document.documentElement.classList.contains("dark")
                  ? "#F71735"
                  : "#BBAB8C"
              }
            `}
            paused={false}
            style={{ display: "flex" }}
            options={{
              height: 30,
              amplitude: 50,
              speed: 0.2,
              points: 3,
            }}
          />
        </div>
        <div className="relative z-2 w-[85%]">{children}</div>
      </div>
    </div>
  );
};

export default HomeTheme;
