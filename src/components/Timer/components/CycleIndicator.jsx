import React from "react";

export default function CycleIndicator({ currentCycle, totalCycles }) {
  const createCircles = () => {
    const circles = [];
    for (let i = 1; i <= totalCycles; i++) {
      circles.push(
        <div
          key={i}
          className={`w-10 h-10 rounded-full bg-zinc-200 ${
            i <= currentCycle ? "bg-black" : ""
          }`}
        ></div>
      );
    }
    return circles;
  };

  return (
    <div className="flex  justify-center items-center gap-4">
      {createCircles()}
    </div>
  );
}
