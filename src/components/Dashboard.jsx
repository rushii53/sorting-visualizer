import React, { useEffect, useState } from "react";
import { setArray, setSpeed } from "../reducers/animation";
import { useDispatch, useSelector } from "react-redux";
import { bubbleSort } from "../algorithms/sorting/bubbleSort";
import { selectoinSort } from "../algorithms/sorting/selectionSort";
import { mergeSort } from "../algorithms/sorting/mergeSort";
import { quickSort } from "../algorithms/sorting/quickSort";
import { heapSort } from "../algorithms/sorting/heapSort";
import Body from "./Body";

export default function Dashboard() {
  const interact = useSelector((state) => state.interact);

  const dispatch = useDispatch();
  const [range, setRange] = useState(50);
  const [isActive, setActive] = useState("");
  const handleChange = () => {
    setRange(event.target.value);
  };
  const generateNewArray = () => {
    setActive("");
    const tempArr = [];
    dispatch(setSpeed(range));
    let randomNumber = null;
    for (let i = 0; i < range; i++) {
      randomNumber = Math.floor(Math.random() * (200 - 5 + 5)) + 5;
      tempArr.push(randomNumber);
    }
    dispatch(setArray(tempArr));
  };
  useEffect(() => {
    generateNewArray();
  }, [range]);

  return (
    <>
      <div className="w-full bg-gray-800 text-white">
        <div className="flex p-3 h-20 w-full justify-center text-lg">
          <ul className="mx-4 flex items-center font-medium">
            <li className="mx-3 p-2 hover:bg-gray-900 rounded-xl font-medium">
              <button
                disabled={interact.isRunning}
                onClick={() => generateNewArray()}
              >
                Generate New Array
              </button>
            </li>
            <li className="mx-3 p-2">
              <label className="p-2">Change array size and sorting speed</label>
              <input
                className="w-48 text-white ml-2"
                style={{ cursor: "pointer", backgroundColor: "red" }}
                type="range"
                min="4"
                max="204"
                onChange={handleChange}
                disabled={interact.isRunning}
              />
            </li>
            <li
              className={`mx-3 hover:bg-gray-900 rounded-xl ${
                isActive === "selection-sort" ? "text-fuchsia-600" : ""
              }`}
            >
              <button
                className="p-2"
                disabled={interact.isRunning}
                onClick={() => {
                  setActive("selection-sort");
                  selectoinSort();
                }}
              >
                Selection Sort
              </button>
            </li>
            <li
              className={`mx-3 hover:bg-gray-900 rounded-xl ${
                isActive === "bubble-sort" ? "text-fuchsia-600" : ""
              }`}
            >
              {" "}
              <button
                className="p-2"
                disabled={interact.isRunning}
                onClick={() => {
                  setActive("bubble-sort");
                  bubbleSort();
                }}
              >
                Bubble Sort
              </button>
            </li>
            <li
              className={`mx-3 hover:bg-gray-900 rounded-xl ${
                isActive === "merge-sort" ? "text-fuchsia-600" : ""
              }`}
            >
              {" "}
              <button
                className="p-2"
                disabled={interact.isRunning}
                onClick={() => {
                  setActive("merge-sort");
                  mergeSort();
                }}
              >
                Merge Sort
              </button>
            </li>
            <li
              className={`mx-3 hover:bg-gray-900 rounded-xl ${
                isActive === "quick-sort" ? "text-fuchsia-600" : ""
              }`}
            >
              {" "}
              <button
                className="p-2"
                disabled={interact.isRunning}
                onClick={() => {
                  setActive("quick-sort");
                  quickSort();
                }}
              >
                Quick Sort
              </button>
            </li>
            <li
              className={`mx-3 hover:bg-gray-900 rounded-xl ${
                isActive === "heap-sort" ? "text-fuchsia-600" : ""
              }`}
            >
              {" "}
              <button className="p-2" disabled={interact.isRunning} onClick={()=>{
                setActive("heap-sort");
                heapSort();
              }}>
                Heap Sort
              </button>
            </li>
          </ul>
        </div>
      </div>
      <Body/>
    </>
  );
}
