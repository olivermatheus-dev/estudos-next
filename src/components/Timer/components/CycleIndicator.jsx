import React, { useEffect, useState } from "react";

export default function CycleIndicator({ cyclesCompleted, totalCycles }) {
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    const arrCircles = [];
    for (let i = 1; i <= totalCycles; i++) {
      arrCircles.push(false);
    }

    setCircles(arrCircles);
  }, []);

  useEffect(() => {
    const arrCircles = [];
    for (let i = 1; i <= cyclesCompleted; i++) {
      arrCircles.push(true);
    }
    for (let i = 1; i <= totalCycles - cyclesCompleted; i++) {
      arrCircles.push(false);
    }
    setCircles(arrCircles);
  }, [cyclesCompleted]);

  return (
    <div className="flex  justify-center items-center gap-4">
      {circles?.map((e) => {
        return e === true ? (
          <div className="rounded-full w-10 h-10 bg-emerald-600" />
        ) : (
          <div className="rounded-full w-10 h-10 bg-zinc-200" />
        );
      })}
    </div>
  );
}
