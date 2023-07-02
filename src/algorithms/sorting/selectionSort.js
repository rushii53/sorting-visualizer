import { store } from "../../app/store"
import { setArray, setCompareArray, setSortedArray, setSwapArray } from "../../reducers/animation";
import { setRunning } from "../../reducers/interaction";

export const selectoinSort=async()=>{
    store.dispatch(setRunning(true));
    const state=store.getState();
    let speed=state.animate.speed;
    let tempArr=[...state.animate.array];
    let compareArr=[];
    let swappArr=[];
    let sortedArr=[];

    for(let i=0;i<tempArr.length;i++){
        let minIndex=i;
        for(let j=i+1;j<tempArr.length;j++){
            compareArr=[minIndex,j];
            store.dispatch(setCompareArray([...compareArr]));
            await new Promise((resolve) => setTimeout(resolve,speed));
            if(tempArr[minIndex]>tempArr[j]){
                minIndex=j;
            }
            compareArr=[];
            store.dispatch(setCompareArray([]));
        }
        if(minIndex!=i){
            swappArr=[minIndex,i];
            store.dispatch(setSwapArray([...swappArr]));
            await new Promise((resolve) => setTimeout(resolve,speed));
            let temp=tempArr[i];
            tempArr[i]=tempArr[minIndex];
            tempArr[minIndex]=temp;
            store.dispatch(setArray([...tempArr]));
            await new Promise((resolve) => setTimeout(resolve,speed));
            swappArr=[];
            store.dispatch(setSwapArray([]));
        }
        sortedArr=[...sortedArr,i];
        store.dispatch(setSortedArray([...sortedArr]));
    }
    await new Promise((resolve)=>setTimeout(resolve,1000));
    sortedArr=[];
    store.dispatch(setSortedArray([]));
    store.dispatch(setRunning(false));
}