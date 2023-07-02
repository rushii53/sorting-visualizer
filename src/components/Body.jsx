import React from "react";
import { useSelector } from "react-redux";

export default function Body() {
  const animate = useSelector((state) => state.animate);
  return (
    <div className="mx-6 justify-center">
      <div
        className={`flex`}
        style={{
          paddingLeft: 400 - animate.array.length + "px",
          paddingRight: 400 - animate.array.length + "px",
        }}
      >
        {animate.array.map((num, index) => {
          let background = animate.sortedarray.includes(index)
            ? "bg-green-400"
            : animate.pivote==index || animate.heapcompare.includes(index)
            ? "bg-purple-400"
            : animate.swaparray.includes(index)
            ? "bg-red-400"
            : animate.comparearray.includes(index)
            ? "bg-yellow-400"
            : "bg-cyan-400";

          let animation = animate.swaparray.includes(index)
            ? "transform 1s ease"
            : "";

          return (
            <div
              key={index}
              className={`w-full border-2 ${background}`}
              style={{
                height: 10 + num * 3.1 + "px",
                transition: { animation },
              }}
            >
              <h1 className="text-lg font-bold text-center text-white">
                {animate.array.length < 25 ? num : ""}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
