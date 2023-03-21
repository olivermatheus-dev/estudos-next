import { useEffect, useState } from "react";

export default function Timer({ resetTimer, timeSelected }) {
  const [hour, setHour] = useState(timeSelected.hourSelected);
  const [min, setMin] = useState(timeSelected.minSelected);
  const [second, setSecond] = useState(0);
  const [hourFormated, setHourFormated] = useState();
  const [isPaused, setIsPaused] = useState(false);
  const [pauseStartTime, setPauseStartTime] = useState();
  const [pauseTime, setPauseTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const totalTime = (hour * 3600 + min * 60 + second) * 1000;
  const remainingTime = (hour * 3600 + min * 60 + second - pauseTime) * 1000;
  const progress = Math.floor((elapsedTime / totalTime) * 100);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1000);
        if (second > 0) {
          setSecond(second - 1);
        } else if (min > 0) {
          setMin(min - 1);
          setSecond(59);
        } else if (hour > 0) {
          setHour(hour - 1);
          setMin(59);
          setSecond(59);
        } else {
          clearInterval(interval);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [hour, min, second, isPaused]);

  useEffect(() => {
    let secondFormated = second;
    let minFormated = min;
    let hourFormated = hour;
    if (second < 10) {
      secondFormated = `0${second}`;
    }
    if (min < 10) {
      minFormated = `0${min}`;
    }
    if (hour < 10) {
      hourFormated = `0${hour}`;
    }
    setHourFormated(`${hourFormated}:${minFormated}:${secondFormated}`);
  }, [hour, min, second]);

  const handlePause = () => {
    setIsPaused(true);
    setPauseStartTime(new Date());
  };

  const handleContinue = () => {
    setIsPaused(false);
    const pauseEndTime = new Date();
    const pauseDuration = pauseEndTime - pauseStartTime;
    setPauseTime(pauseTime + pauseDuration);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h1
        className={`z-10 font-thin text-9xl text-zinc-200 ${
          isPaused && "animate-pulse"
        }  transition-all`}
      >
        {hourFormated}
      </h1>
      <div className="relative h-2 rounded-full w-96 overflow-hidden border">
        <div className="absolute top-0 left-0 h-full bg-yellow-600  w-full" />
        <div
          className="absolute top-0 left-0 h-full bg-white"
          style={{ width: `${100 - progress}%` }}
        />
      </div>
      <div className="flex gap-5">
        {!isPaused ? (
          <button
            onClick={handlePause}
            className=" text-zinc-200 rounded-md w-24 h-32 hover:bg-stone-600 transition-all flex flex-col gap-2 items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-14 h-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Pause
          </button>
        ) : (
          <button
            onClick={handleContinue}
            className=" text-zinc-200 rounded-md w-24 h-32 hover:bg-stone-600 transition-all flex flex-col gap-2 items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-14 h-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
              />
            </svg>
            Continue
          </button>
        )}
        <button
          onClick={resetTimer}
          className=" text-zinc-200 rounded-md w-24 h-32 hover:bg-stone-600 transition-all flex flex-col gap-2 items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-14 h-14"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          Reset
        </button>
      </div>
    </div>
  );
}
