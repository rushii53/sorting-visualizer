import { store } from "../../app/store";
import { setArray, setCompareArray, setSortedArray, setSwapArray } from "../../reducers/animation";
import { setRunning } from "../../reducers/interaction";

export const bubbleSort = async () => {
  store.dispatch(setRunning(true));
  let state=store.getState();
  let speed=state.animate.speed;
  let tempArr = [...state.animate.array];
  let swappArr = [];
  let compareArr = [];
  let sortedArr = [];
  for (let i = 0; i < tempArr.length; i++) {
    for (let j = 0; j < tempArr.length - i; j++) {
      if(j!=tempArr.length-i-1){
        compareArr=[j,j+1];
        store.dispatch(setCompareArray([...compareArr]));
      }
      await new Promise((resolve) => setTimeout(resolve,speed));
      compareArr = [];
      store.dispatch(setCompareArray(compareArr));
      if (tempArr[j] > tempArr[j + 1]) {
        swappArr=[j,j+1];
        store.dispatch(setSwapArray([...swappArr]));

        await new Promise((resolve) => {
          setTimeout(resolve,speed);
        });

        let temp = tempArr[j];
        tempArr[j] = tempArr[j + 1];
        tempArr[j + 1] = temp;

        store.dispatch(setArray([...tempArr]));
        await new Promise((resolve) => {
          setTimeout(resolve,speed);
        });
        
        swappArr = [];
        store.dispatch(setSwapArray([...swappArr]));
      }
    }
    sortedArr.push(tempArr.length - i - 1);
    store.dispatch(setSortedArray([...sortedArr]));
  }
  //retain orginal colour to sorted array
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  store.dispatch(setSortedArray([]));
  store.dispatch(setRunning(false));
};
