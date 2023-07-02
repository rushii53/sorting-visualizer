import { store } from "../../app/store"
import { setArray, setCompareArray, setHeapCompare, setSortedArray, setSwapArray, setSwapCompare } from "../../reducers/animation";
import { setRunning } from "../../reducers/interaction";

const heapify=async(array,parentIndex,size,speed)=>{
    let compareArr=[];
    let swapArr=[];
    let leftChildIndex,rightChildIndex,largest;
    while(parentIndex<size){
        largest=parentIndex;
        leftChildIndex=parentIndex*2+1;
        rightChildIndex=parentIndex*2+2;
        if(leftChildIndex<size && array[leftChildIndex]>array[largest]){
            //adding indices in compare array
            largest=leftChildIndex;
            compareArr=[largest,parentIndex];
            store.dispatch(setCompareArray([...compareArr]));
            await new Promise(resolve=>setTimeout(resolve,speed));
        }
        if(rightChildIndex<size && array[rightChildIndex]>array[largest]){
            //adding indices in compare array
            largest=rightChildIndex;
            compareArr=[largest,parentIndex];
            store.dispatch(setCompareArray([...compareArr]));
            await new Promise(resolve=>setTimeout(resolve,speed));
        }
        if(largest!=parentIndex){
            swapArr=[largest,parentIndex];
            store.dispatch(setSwapArray([...swapArr]));
            await new Promise(resolve=>setTimeout(resolve,speed));
            [array[parentIndex],array[largest]]=[array[largest],array[parentIndex]]
            store.dispatch(setArray([...array]));
            await new Promise(resolve=>(setTimeout(resolve,speed)));
            store.dispatch(setSwapCompare([]));
            parentIndex=largest;
        }
        else{
            break;
        }
    }
}

export const heapSort=async()=>{
    store.dispatch(setRunning(true));
    let state=store.getState();
    let array=[...state.animate.array];
    let sortedArr=[];
    let heapCompareArr=[];
    let speed=state.animate.speed;
    let size=array.length;
    let index=Math.floor(size/2);
    for(let i=index;i>=0;i--){
        await heapify(array,i,size,speed);
    }

    for(let i=size-1;i>=0;i--){
        sortedArr.push(i);
        heapCompareArr=[0,i];
        store.dispatch(setHeapCompare([...heapCompareArr]));
        await new Promise((resolve)=>setTimeout(resolve,speed));

        [array[0],array[i]]=[array[i],array[0]];
        store.dispatch(setArray([...array]));
        await new Promise((resolve)=>setTimeout(resolve,speed));
        store.dispatch(setHeapCompare([]));
        store.dispatch(setSortedArray([...sortedArr]));
        await heapify(array,0,i,speed);
    }
    await new Promise((resolve)=>setTimeout(resolve,1000));
    store.dispatch(setSortedArray([]));
    store.dispatch(setRunning(false));
}