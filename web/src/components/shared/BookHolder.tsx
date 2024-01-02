import ProgressBar from "./ProgressBar";

interface Props {
  showInfo?: boolean;
}

const BookHolder: React.FC<Props> = ({ showInfo = "true" }) => {
  return (
    <div className='relative bg-[url("/dash/book-test-cover.jpg")] min-w-[170px] min-h-[250px] bg-cover bg-no-repeat bg-top'>
      {showInfo && (
        <div className="absolute bottom-0 h-2/3 bg-gradient-to-t from-[rgba(0,0,0,0.96)] from-20% via-[rgba(0,0,0,0.9)] via-60%  w-full">
          <div className="mt-[47%] px-2 w-full flex flex-col gap-1 text-white">
            <div className="truncate text-lg font-medium uppercase">
              The book of art as da sd da asd
            </div>
            <div className="truncate text-sm mt-[-10px] ">
              William Shakespeare
            </div>
            <ProgressBar progressPercentage={60} />
            <div className="text-sm">56/345</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookHolder;
