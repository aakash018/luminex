import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

interface Props {
  showInfo?: boolean;
}

interface Props {
  cover: string;
  name: string;
  author: string;
  id: string;
  progress: number;
}

const BookHolder: React.FC<Props> = ({
  showInfo = "true",
  author,
  cover,
  name,

  id,
  progress,
}) => {
  const nav = useNavigate();

  const handleRoute = () => {
    nav(`/reader/${id}`);
  };

  return (
    <div
      style={{
        background: `url(${cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={handleRoute}
      className="cursor-pointer relative min-w-[150px] min-h-[200px] lg:min-w-[200px] lg:min-h-[300px] "
    >
      {showInfo && (
        <div className="absolute bottom-0 h-2/3 bg-gradient-to-t from-[rgba(0,0,0,0.96)] from-20% via-[rgba(0,0,0,0.9)] via-60% lg:via-45%  w-full">
          <div className="mt-[40%] lg:mt-[58%] px-2 w-full flex flex-col gap-2  text-white">
            <div className="flex justify-between items-center">
              <div>
                <div className="truncate text-base lg:text-lg font-medium uppercase ">
                  {name}
                </div>
                <div className="truncate text-sm mt-[-5px] ">{author}</div>
              </div>
            </div>
            <ProgressBar progressPercentage={progress} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookHolder;
