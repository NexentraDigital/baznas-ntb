export default function ProgressBar({ progres = 0 }) {

  return (
    <div className="w-full max-w-md mx-auto ">
      <div className="w-full bg-neutral-300 rounded-full h-2 flex items-center">
        <div
          className={`bg-Primary-600 h-full transition-all rounded-l-full duration-300`}
          style={{ width: `${progres}%` }}
        ></div>
        <div className="h-4 w-4 bg-Primary-600 relative rounded-full -left-[1px] "></div>
      </div>
    </div>
  );
}
