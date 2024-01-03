import Wave from "react-wavify";
import book from "/login/bookCover4.jpg";
interface Props {
  children: React.ReactNode;
}

const HomeTheme: React.FC<Props> = ({ children }) => {
  return (
    <div
      className="w-full h-[100vh] lg:flex justify-center items-center
     bg-theme-light-bg dark:bg-theme-dark-bg
      overflow-hidden "
    >
      <div className="lg:w-fit h-full lg:h-[600px] lg:flex lg:border-2 border-black dark:border-gray-500">
        <div className="h-full w-[550px] hidden lg:block">
          <img
            src={book}
            alt="book cover"
            className="object-cover w-full h-full dark:brightness-[70%]"
          />
        </div>
        <div
          className="w-full h-full lg:w-[400px] 
         text-black dark:text-white
          relative flex justify-center items-center flex-col"
        >
          <div className="absolute top-0  w-full z-[0]  ">
            <div className="w-full dark:bg-theme-dark-prm bg-theme-light-prm h-[70px] lg:h-[10px]"></div>
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
          <div className="relative z-2 w-[85%] lg:w-[75%]">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default HomeTheme;
